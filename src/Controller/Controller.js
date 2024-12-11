import InputValidator from '../utils/InputValidator.js';
import { InputView } from '../View/InputView.js';
import Menu from '../Model/Menu.js';
import { OutputView } from '../View/OutputView.js';
import IOMessage from '../constants/IOMessage.js';
import formatOrderedList from '../utils/formatOrderedList.js';
import splitInput from '../utils/splitInput.js';
import Event from '../Model/Event.js';
import { getPriceList, getTotalPrice } from '../getPriceList.js';
import Bonus from '../Model/Bonus.js';
import Discount from '../Model/Discount.js';
import Badge from '../Model/Badge.js';

class Controller {
  static async processPlan() {
    const date = await this.getDate();
    const orderedList = await this.getMenu();
    await this.printMenuList(date, orderedList);
    const priceList = getPriceList(orderedList);
    const totalPrice = getTotalPrice(priceList);
    if (totalPrice >= 10000) {
      await this.processDiscount(date, totalPrice, priceList);
    } else {
      await this.printDiscountList({});
    }
  }

  static async getDate() {
    while (true) {
      try {
        const date = await InputView.getInput(IOMessage.GET_DATE);
        InputValidator.processDateInput(date);
        return Number(date);
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
  }

  static async getMenu() {
    while (true) {
      try {
        const menu = await InputView.getInput(IOMessage.GET_MENU);
        const orderedList = Menu.validateSplittedInput(splitInput(menu));
        return orderedList;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
  }

  static async printMenuList(date, orderedList) {
    OutputView.printMessage(IOMessage.BENEFIT_PREVIEW(date));
    OutputView.printMessage(IOMessage.MENU_LIST);
    OutputView.printMessage(formatOrderedList(orderedList));
  }

  static async printTotalPrice(price) {
    OutputView.printMessage(IOMessage.TOTAL_BEFORE_DISCOUNT);
    OutputView.printMessage(`${price.toLocaleString()}원`);
  }

  static async printDiscountList(discountData) {
    OutputView.printMessage(`${IOMessage.DISCOUNT_LIST}`);
    const hasValidDiscount = Object.values(discountData).some(price => price > 0);
    if (!hasValidDiscount) {
      OutputView.printMessage('없음');
      return;
    }
    for (const [discountName, price] of Object.entries(discountData)) {
      if (price > 0) {
        OutputView.printMessage(`${discountName}: -${price.toLocaleString()}원`);
      }
    }
  }

  static async printTotalDiscount(discountTotalData, bonusEventPrice) {
    OutputView.printMessage(IOMessage.DISCOUNT_TOTAL);
    const totalBenefitPrice = discountTotalData + bonusEventPrice;
    OutputView.printMessage(`-${totalBenefitPrice.toLocaleString()}원`);
  }

  static async printFinalPrice(totalPrice, discountTotalData) {
    const finalPrice = totalPrice - discountTotalData;
    OutputView.printMessage(IOMessage.TOTAL_AFTER_DISCOUNT);
    OutputView.printMessage(`${finalPrice.toLocaleString()}원`);
  }

  static async printBadge(discountTotalData, bonusPrice) {
    OutputView.printMessage(IOMessage.EVENT_BADGE);
    const totalPrice = discountTotalData + bonusPrice;
    OutputView.printMessage(Badge.calculateBadge(totalPrice));
  }

  static async processDiscount(date, totalPrice, priceList) {
    await this.printTotalPrice(totalPrice);
    const bonusPrice = Bonus.calculateBonusPrice(totalPrice);
    const eventData = Event.processEvent(date);
    const discountTotalData = Discount.calculateDiscount(date, eventData, priceList, bonusPrice);
    await this.printDiscountList(Discount.discountData);
    await this.printTotalDiscount(discountTotalData, bonusPrice);
    await this.printFinalPrice(totalPrice, discountTotalData);
    await this.printBadge(discountTotalData, bonusPrice);
  }
}
export default Controller;

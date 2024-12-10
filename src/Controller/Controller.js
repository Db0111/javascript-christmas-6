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
    const menu = await this.getMenu();
    const orderedList = Menu.validateSplittedInput(splitInput(menu));
    await this.printMenuList(date, orderedList);
    const priceList = getPriceList(orderedList);
    const totalPrice = getTotalPrice(priceList);
    await this.printTotalPrice(totalPrice);
    const bonusPrice = Bonus.calculateBonusPrice(totalPrice);
    const eventData = Event.processEvent(date);
    const discountTotalData = Discount.calculateDiscount(date, eventData, priceList, bonusPrice);
    await this.printDiscountList(Discount.discountData);
    await this.printTotalDiscount(discountTotalData, bonusPrice);
    await this.printFinalPrice(totalPrice, discountTotalData);
    await this.printBadge(discountTotalData, bonusPrice);
  }

  static async getDate() {
    const date = await InputView.getInput(IOMessage.GET_DATE);
    InputValidator.processDateInput(date);
    return Number(date);
  }

  static async getMenu() {
    const menu = await InputView.getInput(IOMessage.GET_MENU);
    return menu;
  }

  static async printMenuList(date, orderedList) {
    OutputView.printMessage(IOMessage.BENEFIT_PREVIEW(date));
    OutputView.printMessage(IOMessage.MENU_LIST);
    OutputView.printMessage(formatOrderedList(orderedList));
  }

  static async printTotalPrice(price) {
    OutputView.printMessage(IOMessage.TOTAL_BEFORE_DISCOUNT);
    OutputView.printMessage(`${price}원`);
  }

  static async printDiscountList(discountData) {
    OutputView.printMessage(IOMessage.DISCOUNT_LIST);
    for (const [discountName, price] of Object.entries(discountData)) {
      if (price > 0) {
        OutputView.printMessage(`${discountName}: -${price}원`);
      }
    }
  }

  static async printTotalDiscount(discountTotalData, bonusEventPrice) {
    OutputView.printMessage(IOMessage.DISCOUNT_TOTAL);
    OutputView.printMessage(`-${discountTotalData + bonusEventPrice}원`);
  }

  static async printFinalPrice(totalPrice, discountTotalData) {
    const finalPrice = totalPrice - discountTotalData;
    OutputView.printMessage(IOMessage.TOTAL_AFTER_DISCOUNT);
    OutputView.printMessage(`${finalPrice}원`);
  }

  static async printBadge(discountTotalData, bonusPrice) {
    OutputView.printMessage(IOMessage.EVENT_BADGE);
    const totalPrice = discountTotalData + bonusPrice;
    OutputView.printMessage(Badge.calculateBadge(totalPrice));
  }
}
export default Controller;

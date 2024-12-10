import InputValidator from '../utils/InputValidator.js';
import { InputView } from '../View/InputView.js';
import Menu from '../Model/Menu.js';
import { OutputView } from '../View/OutputView.js';
import IOMessage from '../constants/IOMessage.js';
import formatOrderedList from '../utils/formatOrderedList.js';
import splitInput from '../utils/splitInput.js';
import Event from '../Model/Event.js';
import { getPriceList } from '../getPriceList.js';

class Controller {
  static async processPlan() {
    const date = await this.getDate();
    const menu = await this.getMenu();
    const orderedList = Menu.validateSplittedInput(splitInput(menu));
    await this.printMenuList(date, orderedList);
    console.log(getPriceList(orderedList));
    const price = 0;
    await this.printTotalPrice(price);
    const eventData = Event.processEvent(date);
    // Discount.calculateTotalPrice(orderedList);
    // Discount.calculateDiscount(date, eventData);
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
}
export default Controller;

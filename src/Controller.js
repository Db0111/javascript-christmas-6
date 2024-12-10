import InputValidator from './InputValidator.js';
import { InputView } from './InputView.js';
import Menu from './Menu.js';
import IOMessage from './constants/IOMessage.js';

class Controller {
  static async processPlan() {
    await this.getDate();
    const menu = await this.getMenu();
    const result = await Menu.splitInput(menu);
    Menu.validateSplittedInput(result);
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
}
export default Controller;

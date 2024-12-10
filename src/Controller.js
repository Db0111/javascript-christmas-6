import InputValidator from './InputValidator.js';
import { InputView } from './InputView.js';
import IOMessage from './constants/IOMessage.js';

class Controller {
  static async getDate() {
    const date = await InputView.getInput(IOMessage.GET_DATE);
    InputValidator.processDateInput(date);
    return date;
  }
}
export default Controller;

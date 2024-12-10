import { regex } from './constants/Constants.js';
import ErrorMessage from './constants/ErrorMessage.js';

class InputValidator {
  static isEmpty(input) {
    if (input === '') {
      throw new Error(ErrorMessage.INVALID_VALUE);
    }
  }

  static isNotANum(input) {
    if (!regex.test(input)) {
      throw new Error(ErrorMessage.NOT_A_NUMBER);
    }
  }

  static isOutOfRange(input) {
    if (Number(input) < 1 || Number(input) > 31) {
      throw new Error(ErrorMessage.INVALID_DATE);
    }
  }

  static processDateInput(input) {
    this.isEmpty(input);
    this.isNotANum(input);
    this.isOutOfRange(input);
  }
}
export default InputValidator;

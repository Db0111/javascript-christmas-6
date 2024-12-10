import InputValidator from './InputValidator.js';
import { formatRegex } from './constants/Constants.js';
import ErrorMessage from './constants/ErrorMessage.js';

class Menu {
  #input;

  constructor(input) {
    this.#input = input;
  }

  static validateInput(input) {
    InputValidator.isEmpty(input);
    if (!formatRegex.test(input)) {
      throw new Error(ErrorMessage.INVALID_ORDER);
    }
  }

  static splitInput(input) {
    const parsedInput = input.split(',');
    return parsedInput.reduce((acc, item) => {
      const [name, quantity] = item.split('-');
      acc[name.trim()] = parseInt(quantity.trim(), 10);
      return acc;
    }, {});
  }

  static validateSplittedInput(splittedInput) {
    // this.isValidMenu(splittedInput);
    if (this.isValidNum(splittedInput) && this.isNotDuplicated(splittedInput) && this.isBelowLimit(splittedInput)) {
      return splittedInput;
    }
  }

  //   static isValidMenu(splittedInput) {
  //     const menus = Object.values(splittedInput)
  //     for (const menu of menus ) {
  //       if (nt === false) {
  //         throw new Error(ErrorMessage.NO_MENU);
  //       }
  //     }
  //   }

  static isValidNum(splittedInput) {
    for (const quantity of Object.values(splittedInput)) {
      if (quantity < 1) {
        throw new Error(ErrorMessage.INVALID_ORDERNUM);
      }
    }
    return true;
  }

  static isNotDuplicated(splittedInput) {
    const orderedMenu = Object.keys(splittedInput);
    if (orderedMenu.length !== new Set(orderedMenu).size) {
      throw new Error(ErrorMessage.DUPLICATED_ORDER);
    }
    return true;
  }

  static isBelowLimit(splittedInput) {
    let total = 0;
    for (const quantity in Object.values(splittedInput)) {
      total += quantity;
    }
    if (total > 20) {
      throw new Error(ErrorMessage.EXCEED_ORDER_LIMIT);
    }
    return true;
  }

  //Todo: 음료만 주문시 에러 처리
}

export default Menu;

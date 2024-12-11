import InputValidator from '../utils/InputValidator.js';
import { regex, formatRegex } from '../constants/Constants.js';
import ErrorMessage from '../constants/ErrorMessage.js';
import { menuList } from '../MenuList.js';

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
    if (
      this.isMenuItemValid(splittedInput) &&
      this.isValidNum(splittedInput) &&
      this.isValidQuantity(splittedInput) &&
      this.isBelowLimit(splittedInput)
    ) {
      return splittedInput;
    }
  }

  static isMenuItemValid(splittedInput) {
    const categories = Object.values(menuList);
    const allItems = categories.flatMap(category => Object.keys(category));

    Object.keys(splittedInput).forEach(item => {
      if (!allItems.includes(item)) {
        throw new Error(ErrorMessage.NO_MENU);
      }
    });
    return true;
  }

  static isValidNum(splittedInput) {
    for (const quantity of Object.values(splittedInput)) {
      if (quantity < 1) {
        throw new Error(ErrorMessage.INVALID_ORDERNUM);
      }
    }
    return true;
  }

  static isValidQuantity(splittedInput) {
    for (const quantity of Object.values(splittedInput)) {
      if (!regex.test(quantity)) {
        throw new Error(ErrorMessage.INVALID_ORDER);
      }
    }
    return true;
  }

  static isBelowLimit(splittedInput) {
    let total = 0;
    for (const quantity in Object.values(splittedInput)) {
      total += Number(quantity);
    }
    if (total > 20) {
      throw new Error(ErrorMessage.EXCEED_ORDER_LIMIT);
    }
    return true;
  }

  // static isOnlyDrink(splittedInput) {
  //   const orderedItems = Object.keys(splittedInput);
  //   const isValidItems = orderedItems.every(item => Object.values(menuList).some(category => item in category));
  //   if (!isValidItems) {
  //     throw new Error(ErrorMessage.INVALID_ITEM);
  //   }
  //   const isAllDrinks = orderedItems.every(item => item in menuList.drink);
  //   if (isAllDrinks) {
  //     throw new Error(ErrorMessage.ONLY_DRINK);
  //   }
  // }
}

export default Menu;

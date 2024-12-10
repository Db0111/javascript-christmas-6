import InputValidator from './InputValidator.js';
import { formatRegex } from './constants/Constants.js';
import ErrorMessage from './constants/ErrorMessage.js';

class Menu {
  #input;

  constructor(input) {
    this.#input = input;
  }

  static menuList = {
    appetizer: { 양송이스프: 6000, 타파스: 5500, 시저샐러드: 8000 },
    main: { 티본스테이크: 55000, 바비큐립: 54000, 해산물파스타: 35000, 크리스마스파스타: 25000 },
    dessert: { 초코케이크: 15000, 아이스크림: 5000 },
    drink: { 제로콜라: 3000, 레드와인: 60000, 샴페인: 25000 },
  };

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
    this.isValidMenu(splittedInput);
    this.isValidNum(splittedInput);
    this.isNotDuplicated(splittedInput);
    this.isBelowLimit(splittedInput);
  }

  static isValidMenu(splittedInput) {
    for (const name in Object.keys(splittedInput)) {
      if (name in this.menuList === false) {
        throw new Error(ErrorMessage.NO_MENU);
      }
    }
  }

  static isValidNum(splittedInput) {
    for (const quantity in Object.values(splittedInput)) {
      if (quantity < 1) {
        throw new Error(ErrorMessage.INVALID_ORDERNUM);
      }
    }
  }

  static isNotDuplicated(splittedInput) {
    const orderedMenu = Object.keys(splittedInput);
    if (orderedMenu !== new Set(orderedMenu)) {
      throw new Error(ErrorMessage.DUPLICATED_ORDER);
    }
  }

  static isBelowLimit(splittedInput) {
    let total = 0;
    for (const quantity in Object.values(splittedInput)) {
      total += quantity;
    }
    if (total > 20) {
      throw new Error(ErrorMessage.EXCEED_ORDER_LIMIT);
    }
  }

  //Todo: 음료만 주문시 에러 처리
}

export default Menu;

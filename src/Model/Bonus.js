import { BonusItem } from '../MenuList.js';
import { OutputView } from '../View/OutputView.js';
import IOMessage from '../constants/IOMessage.js';

class Bonus {
  static discountBonus(totalPrice) {
    OutputView.printMessage(IOMessage.BONUS_MENU);
    if (totalPrice > 120000) {
      this.printBonusMessage();
      return true;
    } else {
      this.printNoMessage();
      return false;
    }
  }

  static printBonusMessage() {
    OutputView.printMessage(`${IOMessage.BONUS_ITEM} 1개`);
  }

  static printNoMessage() {
    OutputView.printMessage(IOMessage.NO_ITEM);
  }

  static calculateBonusPrice(totalPrice) {
    if (this.discountBonus(totalPrice)) {
      return Number(BonusItem[IOMessage.BONUS_ITEM]);
    }
    return 0;
  }
}
export default Bonus;

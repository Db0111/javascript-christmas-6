class Discount {
  static discountData = {};

  static calculateDiscount(date, eventData, priceList, bonusPrice) {
    let totalDiscountPrice = 0;
    totalDiscountPrice += this.calculateChristmas(date, eventData, totalDiscountPrice);
    totalDiscountPrice += this.calculateWeekday(eventData, priceList);
    totalDiscountPrice += this.calculateWeekend(eventData, priceList);
    totalDiscountPrice += this.calculateSpecial(eventData);
    this.addBonusDiscount(bonusPrice);
    return totalDiscountPrice;
  }

  static calculateChristmas(date, eventData) {
    if (eventData.Christmas) {
      const ChristmasDiscount = 1000 + 100 * (date - 1);
      this.discountData['크리스마스 디데이 할인'] = ChristmasDiscount;
      return ChristmasDiscount;
    }
    return 0;
  }

  static calculateWeekday(eventData, priceList) {
    if (!eventData.Weekday) return 0;
    const weekDayDiscount = 2023;
    let totalDiscount = 0;
    for (const itemInfo of Object.values(priceList)) {
      if (itemInfo.category === 'dessert') {
        totalDiscount += weekDayDiscount * itemInfo.quantity;
      }
    }
    this.discountData['평일 할인'] = totalDiscount;

    return totalDiscount;
  }

  static calculateWeekend(eventData, priceList) {
    if (!eventData.Weekend) return 0;
    const weekEndDiscount = 2023;
    let totalDiscount = 0;
    for (const itemInfo of Object.values(priceList)) {
      if (itemInfo.category === 'main') {
        totalDiscount += weekEndDiscount * itemInfo.quantity;
      }
    }
    this.discountData['주말 할인'] = totalDiscount;
    return totalDiscount;
  }

  static calculateSpecial(eventData) {
    if (!eventData.SpecialDay) return 0;
    const specialDiscount = 1000;
    this.discountData['특별 할인'] = specialDiscount;
    return specialDiscount;
  }

  static addBonusDiscount(bonusPrice) {
    this.discountData['증정 이벤트'] = bonusPrice;
    return bonusPrice;
  }
}
export default Discount;

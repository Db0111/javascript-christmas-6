const IOMessage = Object.freeze({
  WELCOME_MESSAGE: `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n`,
  GET_DATE: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  GET_MENU: `주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`,
  BENEFIT_PREVIEW: date => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  MENU_LIST: `<주문 메뉴>`,
  TOTAL_BEFORE_DISCOUNT: `\n<할인 전 총주문 금액>`,
  BONUS_MENU: `\n<증정 메뉴>`,
  BONUS_ITEM: `샴페인`,
  NO_ITEM: `없음`,
  DISCOUNT_LIST: `\n<혜택 내역>`,
  DISCOUNT_TOTAL: `\n<총혜택 금액>`,
  TOTAL_AFTER_DISCOUNT: `\n<할인 후 예상 결제 금액>`,
  EVENT_BADGE: `\n<12월 이벤트 배지>`,
});

export default IOMessage;

const IOMessage = Object.freeze({
  WELCOME_MESSAGE: `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.`,
  GET_DATE: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)`,
  GET_MENU: `주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)`,
  BENEFIT_PREVIEW: date => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  MENU_LIST: `<주문 메뉴>`,
  TOTAL_BEFORE_DISCOUNT: `<할인 전 총주문 금액>`,
  BONUS_MENU: `<증정 메뉴>`,
  DISCOUNT_LIST: `<혜택 내역>`,
  DISCOUNT_TOTAL: `<총혜택 금액>`,
  TOTAL_AFTER_DISCOUNT: `<할인 후 에상 결제 금액>`,
  EVENT_BADGE: `<12월 이벤트 배지>`,
});

export default IOMessage;
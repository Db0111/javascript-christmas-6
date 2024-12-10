const ErrorMessage = Object.freeze({
  INVALID_DATE: `[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  INVALID_VALUE: `[ERROR] 유효하지 않은 입력입니다. 다시 입력해 주세요.`,
  NOT_A_NUMBER: `[ERROR] 숫자는 입력할 수 없습니다. 다시 입력해주세요`,
  NO_MENU: `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  INVALID_ORDERNUM: `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  INVALID_ORDER: `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  DUPLICATED_ORDER: `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  EXCEED_ORDER_LIMIT: `[ERROR] 구매 가능한 수량을 초과하였습니다. 최대 구매는 20개까지 가능합니다.`,
  ONLY_DRINK: `ERROR] 음료만 주문하는 것은 불가능합니다. 다시 입력해 주세요.  `,
});

export default ErrorMessage;

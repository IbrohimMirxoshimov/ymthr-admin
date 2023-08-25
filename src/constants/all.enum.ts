export enum PolicyFreeCancellationLimit {
  NON_REFUNDABLE = 0,
  DAY_SIX_OCLOCK = 1,
  FIRST_DAY = 2,
  SECOND_DAY = 3,
  FOUR_DAY = 4,
  FIVE_DAY = 5,
  SIX_DAY = 6,
  SEVEN_DAY = 7,
  EIGHT_DAY = 8,
  NINE_DAY = 9,
  TEN_DAY = 10,
  TWO_WEEK = 14,
  ONE_MONTH = 30,
  ANY_TIME = 99,
}

export enum PolicyCancelPenalty {
  FIRST_DAY = 0,
  HALF_OF_RESERVATION = 1,
  TOTAL_OF_RESERVATION = 2,
}

export enum PolicyNoShowPenalty {
  FIRST_DAY = 0,
  HALF_OF_RESERVATION = 1,
  TOTAL_OF_RESERVATION = 2,
}

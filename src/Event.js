class Event {
  static eventList = {
    Christmas: false,
    Weekend: false,
    Weekday: false,
    SpecialDay: false,
  };

  static isChristmasDday(date) {
    if (date >= 1 && date <= 25) {
      this.eventList.Christmas = true;
    }
  }

  static isWeekend(date) {
    const weekend = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
    if (weekend.includes(date)) {
      this.eventList.Weekend = true;
    } else {
      this.eventList.Weekday = true;
    }
  }

  static isSpecialDay(date) {
    const specialDay = [3, 10, 17, 24, 25, 31];
    if (specialDay.includes(date)) {
      this.eventList.SpecialDay = true;
    }
  }
}
export default Event;

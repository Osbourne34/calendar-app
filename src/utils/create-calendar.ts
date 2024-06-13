import { Dayjs } from "dayjs";

const CELL_AMOUNT = 42;

export const createCalendar = (date: Dayjs): Dayjs[] => {
  const startDay = date.startOf("month").startOf("week");
  let day = startDay;

  const calendar = Array(CELL_AMOUNT);

  for (let i = 0; i < CELL_AMOUNT; i++) {
    calendar[i] = day;
    day = day.add(1, "day");
  }

  // let i = 0;
  // while (i < CELL_AMOUNT) {
  //   calendar[i] = day;
  //   day = day.add(1, "day");
  //   i++;
  // }

  return calendar;
};

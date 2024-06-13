import { useMemo, useState } from "react";
import { clsx } from "clsx";

import { Cell } from "./cell";

import { dayjs } from "../../config/dayjs";
import { createCalendar } from "../../utils/create-calendar";

export const Calendar = () => {
  const [date, setDate] = useState(() => dayjs());

  const calendar = useMemo(() => createCalendar(date), [date]);
  const year = useMemo(() => date.year(), [date]);
  const month = useMemo(() => date.format("MMMM"), [date]);

  const handlePrevYear = () => {
    setDate((date) => date.subtract(1, "year"));
  };

  const handlePrevMonth = () => {
    setDate((date) => date.subtract(1, "month"));
  };

  const handleNextYear = () => {
    setDate((date) => date.add(1, "year"));
  };

  const handleNextMonth = () => {
    setDate((date) => date.add(1, "month"));
  };

  const handleToday = () => {
    setDate(() => dayjs());
  };

  const currentDay = useMemo(() => date.isSame(dayjs(), "month"), [date]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <p className="text-2xl font-bold">{month}</p>
          <p className="text-2xl">{year}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            title="Prev year"
            className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
            onClick={handlePrevYear}
          >
            {"<<"}
          </button>
          <button
            title="Prev month"
            className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
            onClick={handlePrevMonth}
          >
            {"<"}
          </button>
          <button
            disabled={currentDay}
            onClick={handleToday}
            className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-gray-300"
          >
            Today
          </button>
          <button
            title="Next month"
            className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
            onClick={handleNextMonth}
          >
            {">"}
          </button>
          <button
            title="Next year"
            className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
            onClick={handleNextYear}
          >
            {">>"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-r border-t">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={clsx("border-b border-l p-2 text-end text-sm")}
          >
            {dayjs().day(++index).format("ddd")}
          </div>
        ))}

        {calendar.map((day, index) => {
          return (
            <Cell
              key={index}
              date={day}
              currentDay={day.isSame(dayjs(), "day")}
              pastDay={!day.isSame(date, "month")}
            />
          );
        })}
      </div>
    </div>
  );
};

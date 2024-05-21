import { clsx } from "clsx";
import { useState } from "react";

export const App = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Calendar date={date} />
    </div>
  );
};

interface CalendarProps {
  date: Date;
}

const Calendar = (props: CalendarProps) => {
  const [date, setDate] = useState(new Date());

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array(daysInMonth);

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(currentYear, currentMonth, i);
    days[i - 1] = day;
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setDate(new Date(currentYear, currentMonth - 1))}
          className="border p-1"
        >
          Prev month
        </button>
        <p>
          {currentMonth + 1}.{currentYear}
        </p>
        <button
          onClick={() => setDate(new Date(currentYear, currentMonth + 1))}
          className="border p-1"
        >
          Next month
        </button>
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const date = new Date();

          return (
            <div
              key={index}
              className={clsx("px-3 pb-5 pt-1", {
                "bg-blue-500 text-white":
                  +new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                  ) === +day,
              })}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { clsx } from "clsx";
import { useState } from "react";

const weekDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

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

  // Количество дней в месяце (МАЙ - 31)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // День недели 1-го дня
  const firstDayofMonth = new Date(currentYear, currentMonth, 7).getDay();
  // День недели последнего дня
  const lastDayofMonth = new Date(
    currentYear,
    currentMonth,
    daysInMonth,
  ).getDay();

  const days = [];

  for (let i = firstDayofMonth; i > 0; i--) {
    const day = new Date(currentYear, currentMonth, -i + 1);
    days.push(day);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(currentYear, currentMonth, i);
    days.push(day);
  }

  console.log(lastDayofMonth);

  for (let i = lastDayofMonth; i > 0; i--) {
    const day = new Date(currentYear, currentMonth + 1, i);
    console.log(day);

    days.push(day);
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center space-x-2">
        <button
          className="rounded border p-2"
          onClick={() => setDate(new Date(currentYear, currentMonth - 1))}
        >
          Prev month
        </button>
        <div>
          {date.getMonth() + 1}.{date.getFullYear()}
        </div>
        <button
          className="rounded border p-2"
          onClick={() => setDate(new Date(currentYear, currentMonth + 1))}
        >
          Next month
        </button>
      </div>

      <div className="grid grid-cols-7">
        {days.map((date, index) => (
          <div key={index}>{date.getDate()}</div>
        ))}
      </div>
    </div>
  );
};

import { clsx } from "clsx";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Modal } from "./ui/modal";

import dayjs, { Dayjs } from "dayjs";
import updatelocale from "dayjs/plugin/updateLocale";

dayjs.extend(updatelocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

interface Todo {
  date: string;
  todos: { title: string }[];
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      date: "2024-05-22T00:00:00",
      todos: [
        {
          title: "todo 1",
        },
        {
          title: "todo 2",
        },
      ],
    },
    {
      date: "2024-05-23T00:00:00",
      todos: [
        {
          title: "todo 4",
        },
        {
          title: "todo 5",
        },
      ],
    },
  ]);

  const handleAddTodo = (todo: { title: string; date: string }) => {
    console.log(todo, "handleAddTodo");
    console.log(new Date(todo.date));
  };

  return (
    <div className="space-y-5 p-5">
      <Calendar todos={todos} addTodo={handleAddTodo} />
    </div>
  );
};

interface CalendarProps {
  todos: Todo[];
  addTodo: (todo: { title: string; date: string }) => void;
}

const Calendar = (props: CalendarProps) => {
  const { todos, addTodo } = props;
  const [date, setDate] = useState(dayjs());

  const startDay = date.startOf("month").startOf("week");
  const endDay = date.endOf("month").endOf("week");

  const calendar = [];

  for (let day = startDay; !day.isAfter(endDay); day = day.add(1, "day")) {
    calendar.push(day);
  }

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <button
          title="Prev year"
          className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => setDate(date.subtract(1, "year"))}
        >
          {"<<"}
        </button>
        <button
          title="Prev month"
          className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => setDate(date.subtract(1, "month"))}
        >
          {"<"}
        </button>
        <button
          title="Next month"
          className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => setDate(date.add(1, "month"))}
        >
          {">"}
        </button>
        <button
          title="Next year"
          className="rounded border px-2 py-1 transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => setDate(date.add(1, "year"))}
        >
          {">>"}
        </button>
        <div>
          {months[date.month()]} {date.year()}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 border-r border-t">
        {weekDays.map((weekDay, index) => (
          <div key={index} className={clsx("border-b border-l p-2")}>
            <p className={clsx("flex h-8 w-8 items-center justify-center", {})}>
              {weekDay}
            </p>
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

interface CellType {
  date: Dayjs;
}

interface CellProps extends CellType {
  currentDay: boolean;
  pastDay: boolean;
}

const Cell = ({ date, currentDay, pastDay }: CellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={clsx("border-b border-l p-2 pb-5")}
      >
        <p
          className={clsx("flex h-8 w-8 items-center justify-center", {
            "select-none text-gray-300": pastDay,
            "rounded-full bg-blue-600 font-medium text-white": currentDay,
          })}
        >
          {date.date()}
        </p>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Добавление задачи"
      >
        <Form onSubmit={() => {}} />
      </Modal>
    </>
  );
};

const Form = ({
  onSubmit,
}: {
  onSubmit: (todo: { date: string; title: string }) => void;
}) => {
  const [values, setValues] = useState({
    title: "",
    date: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={values.title}
        onChange={handleChange}
        name="title"
        required
        className="rounded border px-4 py-2"
      />
      <input
        type="date"
        value={values.date}
        onChange={handleChange}
        name="date"
        required
        className="rounded border px-4 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Add todo
      </button>
    </form>
  );
};

import {
  ChangeEventHandler,
  ReactNode,
  SyntheticEvent,
  useMemo,
  useState,
} from "react";
import { clsx } from "clsx";

import { Cell } from "./cell";

import { dayjs } from "../../config/dayjs";
import { createCalendar } from "../../utils/create-calendar";
import { Dayjs } from "dayjs";
import { Modal } from "../modal/modal";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: number;
}

const eventsDB: Event[] = [
  {
    id: 1,
    title: "14 JUN",
    description: "lorem ipsum",
    date: 1718323200,
  },
  {
    id: 2,
    title: "15 JUN",
    description: "lorem ipsum 2",
    date: 1718409600,
  },
  {
    id: 3,
    title: "27 MAY",
    description: "lorem ipsum 3",
    date: 1716768000,
  },
  {
    id: 4,
    title: "7 JUL",
    description: "lorem ipsum 4",
    date: 1720310400,
  },
  {
    id: 5,
    title: "8 JUN",
    description: "lorem ipsum 5",
    date: 1720396800,
  },
  {
    id: 6,
    title: "14 JUN withDate",
    description: "lorem ipsum 6",
    date: 1718341530,
  },
  {
    id: 7,
    title: "14 JUN withDate end",
    description: "lorem ipsum 6",
    date: 1718409599,
  },
  {
    id: 8,
    title: "15 JUN",
    description: "lorem ipsum 6",
    date: 1718409600,
  },
];

const getStart = (day: Dayjs) => {
  return day.utc(true).unix();
};

const getEnd = (day: Dayjs) => {
  return day.endOf("day").utc(true).unix();
};

const filterStartEnd = (start: number, end: number) => (event: Event) => {
  return event.date >= start && event.date <= end;
};

export const Calendar = () => {
  const [date, setDate] = useState(() => dayjs());
  const [events, setEvents] = useState(() => eventsDB);

  const calendar = useMemo(() => createCalendar(date), [date]);
  const year = useMemo(() => date.year(), [date]);
  const month = useMemo(() => date.format("MMMM"), [date]);

  const calendarEvents = useMemo(() => {
    return events.filter(
      filterStartEnd(
        getStart(calendar[0]),
        getEnd(calendar[calendar.length - 1]),
      ),
    );
  }, [calendar, events]);

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

  const [open, setOpen] = useState(false);
  const [cellDate, setCellDate] = useState<Event | null>(null);
  const [method, setMethod] = useState<"create" | "update" | null>(null);

  const handleClickCell = (date: Dayjs) => {
    setCellDate({
      date: date.utc(true).unix(),
      description: "",
      title: "",
      id: 0,
    });
    setMethod("create");
    setOpen(true);
  };

  const handleClickEvent = (data: Event) => {
    setCellDate(data);
    setMethod("update");
    setOpen(true);
  };

  const onClose = () => {
    setCellDate(null);
    setMethod(null);
    setOpen(false);
  };

  const createAndUpdateEvent = (data: {
    title: string;
    description: string;
  }) => {
    switch (method) {
      case "create": {
        setEvents((prevState) => [
          ...prevState,
          {
            date: cellDate!.date,
            id: Date.now(),
            ...data,
          },
        ]);
        break;
      }
      case "update": {
        setEvents((prevState) => {
          return prevState.map((event) => {
            if (event.id === cellDate!.id) {
              return {
                id: cellDate!.id,
                date: cellDate!.date,
                ...data,
              };
            }
            return event;
          });
        });
        break;
      }
      default: {
        setEvents((prevState) => prevState);
      }
    }

    onClose();
  };

  const removeEvent = () => {
    setEvents((prevState) =>
      prevState.filter((event) => event.id !== cellDate!.id),
    );
    onClose();
  };

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
              onClick={() => handleClickCell(day)}
              onEventClick={(e, event) => {
                e.stopPropagation();
                handleClickEvent(event);
              }}
              key={index}
              date={day}
              currentDay={day.isSame(dayjs(), "day")}
              pastDay={!day.isSame(date, "month")}
              events={calendarEvents.filter(
                filterStartEnd(getStart(day), getEnd(day)),
              )}
            />
          );
        })}
      </div>

      <Modal
        title={method === "create" ? "Add Event" : "Update Event"}
        open={open}
        onClose={onClose}
      >
        <Form
          onSubmit={createAndUpdateEvent}
          initialValues={{
            description: cellDate?.description ?? "",
            title: cellDate?.title ?? "",
          }}
          deleteButton={
            method === "update" ? (
              <button
                type="button"
                onClick={removeEvent}
                className="h-10 rounded bg-red-600 px-3 font-medium text-white"
              >
                Remove
              </button>
            ) : null
          }
        />
      </Modal>
    </div>
  );
};

interface FormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  initialValues: { title: string; description: string };
  deleteButton?: ReactNode;
}

const Form = (props: FormProps) => {
  const [state, setState] = useState({
    title: props.initialValues.title,
    description: props.initialValues.description,
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(state);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={handleChange}
          className="h-10 w-full rounded border px-3"
          required
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={state.description}
          onChange={handleChange}
          className="h-10 w-full rounded border px-3"
          required
        />
      </div>
      <div className="mt-5 flex justify-end space-x-4">
        {props.deleteButton}
        <button
          type="submit"
          className="h-10 rounded bg-blue-600 px-3 font-medium text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

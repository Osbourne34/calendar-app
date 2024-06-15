import { clsx } from "clsx";
import { Dayjs } from "dayjs";
import { Event } from "./calendar";
import { MouseEvent } from "react";

interface CellProps {
  date: Dayjs;
  currentDay: boolean;
  pastDay: boolean;
  events: Event[];
  onClick: () => void;
  onEventClick: (e: MouseEvent, event: Event) => void;
}

export const Cell = ({
  date,
  currentDay,
  pastDay,
  events,
  onClick,
  onEventClick,
}: CellProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className={clsx("select-none border-b border-l p-2 pb-4 transition", {
          "bg-blue-100 hover:bg-blue-200": currentDay,
          "hover:bg-gray-100": !currentDay && !pastDay,
          "bg-gray-50": (date.day() === 6 || date.day() === 0) && !currentDay,
        })}
      >
        <p
          className={clsx("text-end", {
            "text-gray-300": pastDay,
            "font-medium text-blue-600": currentDay,
          })}
        >
          {date.date()}
        </p>
        {events.length > 0 && (
          <ul className="space-y-1">
            {events.map((event) => (
              <li
                onClick={(e) => onEventClick(e, event)}
                key={event.id}
                className={clsx(
                  "flex cursor-pointer items-center space-x-2 rounded px-2 py-1 transition ",
                  {
                    "hover:bg-blue-300": currentDay,
                    "hover:bg-gray-200": !currentDay,
                  },
                )}
              >
                <div className="h-3 w-3 flex-shrink-0 rounded-full bg-blue-600"></div>
                <p>{event.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

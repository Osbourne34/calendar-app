import { clsx } from "clsx";
import { Dayjs } from "dayjs";

interface CellProps {
  date: Dayjs;
  currentDay: boolean;
  pastDay: boolean;
}

export const Cell = ({ date, currentDay, pastDay }: CellProps) => {
  return (
    <>
      <div
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
      </div>
    </>
  );
};

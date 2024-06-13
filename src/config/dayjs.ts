import dayjsInstanse from "dayjs";
import updatelocale from "dayjs/plugin/updateLocale";

export const dayjs = dayjsInstanse;
dayjs.extend(updatelocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

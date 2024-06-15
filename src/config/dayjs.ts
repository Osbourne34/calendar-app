import dayjsInstanse from "dayjs";
import updatelocale from "dayjs/plugin/updateLocale";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";

export const dayjs = dayjsInstanse;
dayjs.extend(updatelocale);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.updateLocale("en", {
  weekStart: 1,
});

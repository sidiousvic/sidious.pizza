// TODO: Refactor into functional TS as found in switchselectedconfig.ts
import { getElementById } from "./domutils.ts";

addEventListener("DOMContentLoaded", () => {
  const LEAP_DAYS_SINCE_1991_MS = 691_200_000;
  const vicsBirthday = new Date("September 24, 1991, 23:54:00 GMT-7");
  setInterval(() => {
    const unixNow = new Date();
    const vicsAgeDate = new Date(unixNow.getTime() - vicsBirthday.getTime());
    const vicsAgeMs = vicsAgeDate.getTime();
    const vicsAgeYrs =
      (vicsAgeMs - LEAP_DAYS_SINCE_1991_MS) / 1000 / 60 / 60 / 24 / 365;
    getElementById("age").innerHTML = `${vicsAgeYrs.toFixed(
      13
    )} <em>years old</em>`;
  });
});

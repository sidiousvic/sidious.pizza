// TODO: Refactor into functional TS as found in switchselectedconfig.ts
import { getElementById } from "./domutils";
import { isMobile } from "./utils";

const LEAP_DAYS_SINCE_1991_MS = 691_200_000;
const vicsBirthday = new Date("September 24, 1991, 23:54:00 GMT-7");
const INTERVAL = isMobile(navigator.userAgent) ? 1000 : undefined;

function updateVicsAge() {
  const unixNow = new Date();
  const vicsAgeDate = new Date(unixNow.getTime() - vicsBirthday.getTime());
  const vicsAgeMs = vicsAgeDate.getTime();
  const vicsAgeYrs =
    (vicsAgeMs - LEAP_DAYS_SINCE_1991_MS) / 1000 / 60 / 60 / 24 / 365;
  getElementById("age").innerHTML = `${vicsAgeYrs.toFixed(13).padEnd(15, "0")}`;
}

addEventListener("DOMContentLoaded", () => {
  setInterval(updateVicsAge, INTERVAL);
});

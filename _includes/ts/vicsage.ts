// TODO: Refactor into functional TS as found in switchselectedconfig.ts
import { getElementById } from "./domutils";
import { isMobile } from "./utils";

const LEAP_DAYS_SINCE_1991_MS = 691_200_000; // 1991 から 2021 までの閏年を除いた日数
const vicsBirthday = new Date("September 24, 1991, 23:54:00 GMT-7"); // Vic's birthday

const MOBILE_INTERVAL = 9999999; // Don't update on mobile
const DESKTOP_INTERVAL = undefined; // Update every frame

const INTERVAL_TO_USE = isMobile(navigator.userAgent)
  ? MOBILE_INTERVAL
  : DESKTOP_INTERVAL;

function updateVicsAge() {
  const unixNow = new Date();
  const vicsAgeDate = new Date(unixNow.getTime() - vicsBirthday.getTime());
  const vicsAgeMs = vicsAgeDate.getTime();
  const vicsAgeYrs =
    (vicsAgeMs - LEAP_DAYS_SINCE_1991_MS) / 1000 / 60 / 60 / 24 / 365;
  getElementById("vicsage").innerHTML = `${vicsAgeYrs.toFixed(13).padEnd(15, "0")}`;
}

addEventListener("DOMContentLoaded", () => {
  updateVicsAge();
  setInterval(updateVicsAge, INTERVAL_TO_USE);
});

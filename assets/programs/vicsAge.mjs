document.addEventListener("DOMContentLoaded", () => {
  const ageElement = document.getElementById("age");
  const LEAP_DAYS_SINCE_1991_MS = 691_200_000;
  const vicsBirthday = new Date("September 24, 1991, 23:54:00 GMT-7");
  setInterval(() => {
    const unixNow = new Date();
    const vicsAgeDate = new Date(unixNow.getTime() - vicsBirthday.getTime());
    const vicsAgeMs = vicsAgeDate.getTime();
    const vicsAgeYrs = (vicsAgeMs - LEAP_DAYS_SINCE_1991_MS) / 1000 / 60 / 60 /
      24 / 365;
    ageElement.innerHTML = `${vicsAgeYrs.toFixed(20)} <em>years old</em>`;
  });
});

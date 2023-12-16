import { COLORS, TYPOGRAPHIES } from "./constants.mjs";
import { pipe, inject, mutate, random } from "./utils.mjs";

const getType = (s) => s.split("-")[0];

const loadingTime_ms = (type) => (type === "typography" ? 1000 : 0);

const z_0 = {
  colors: COLORS,
  typography: TYPOGRAPHIES,
  user: { stored: undefined },
};

const switchAutoRandomConfig = pipe(
  inject(z_0),
  mutate(() => (document.getElementById("curtain").style.opacity = "1")),
  mutate((z) =>
    setTimeout(
      () => (
        [...document.documentElement.classList].map(
          (c) =>
            c.includes(getType(z.target.dataset.config)) &&
            document.documentElement.classList.remove(c)
        ),
        localStorage.removeItem(getType(z.target.dataset.config)),
        document.documentElement.classList.add(
          `${getType(z.target.dataset.config)}-${random(
            z[getType(z.target.dataset.config)]
          )}`
        ),
        (document.getElementById("curtain").style.opacity = "0")
      ),
      loadingTime_ms(getType(z.target.dataset.config))
    )
  )
);

[...document.querySelectorAll(".config-auto-random")].map((button) =>
  button.addEventListener("click", switchAutoRandomConfig)
);

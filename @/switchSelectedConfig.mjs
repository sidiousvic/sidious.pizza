import { pipe, apply, inject, mutate } from "./utils.mjs";

const getType = (s) => s.split("-")[0];

const getValue = (s) => s.split("-")[1];

const loadingTime_ms = (type) => (type === "typography" ? 1000 : 0);

const z_0 = {
  colors: ["zero", "venom", "fire", "void", "phantom"],
  typography: ["sinister", "dexter", "virgil", "nilheim", "doomed", "sidious"],
  user: { stored: undefined },
};

const switchSelectedConfig = pipe(
  inject(z_0),
  apply(({ target }) => ({
    user: {
      stored: localStorage.getItem(getType(target.dataset.config))
        ? `${getType(target.dataset.config)}-${localStorage.getItem(
            getType(target.dataset.config)
          )}`
        : undefined,
    },
  })),
  mutate(() => (document.getElementById("curtain").style.opacity = "1")),
  mutate((z) =>
    setTimeout(
      () => (
        [...document.documentElement.classList].map(
          (c) =>
            c.includes(getType(z.target.dataset.config)) &&
            document.documentElement.classList.remove(c)
        ),
        localStorage.setItem(
          getType(z.target.dataset.config),
          getValue(z.target.dataset.config)
        ),
        document.documentElement.classList.add(z.target.dataset.config),
        (document.getElementById("curtain").style.opacity = "0")
      ),
      loadingTime_ms(getType(z.target.dataset.config))
    )
  )
);

[...document.querySelectorAll(".config-select")].map((button) =>
  button.addEventListener("click", switchSelectedConfig)
);

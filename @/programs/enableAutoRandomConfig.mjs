import {
  pipe,
  inject,
  mutate,
  random,
  COLORS,
  TYPOGRAPHIES,
} from "/@/programs/utils.mjs";

const computeLoadingTime_ms = (type) => (type === "typography" ? 1000 : 0);

const fx_setCurtainOpacity = (value) =>
  (document.getElementById("curtain").style.opacity = value);

const fx_removeClassContaining = (type) =>
  [...document.documentElement.classList].map(
    (c) => c.includes(type) && document.documentElement.classList.remove(c)
  );

const fx_removeStoredItem = (type) => localStorage.removeItem(type);

const fx_enableAutoRandomConfig = (type) =>
  document.documentElement.classList.add(
    `${type}-${type === "typography" ? random(TYPOGRAPHIES) : random(COLORS)}`
  );

const z_0 = { user: { stored: undefined } };

const switchAutoRandomConfig = pipe(
  inject(z_0),
  mutate(
    (z) => (
      fx_setCurtainOpacity(1),
      setTimeout(
        () => (
          fx_removeClassContaining(z.target.dataset.type),
          fx_removeStoredItem(z.target.dataset.type),
          fx_enableAutoRandomConfig(z.target.dataset.type),
          fx_setCurtainOpacity(0)
        ),
        computeLoadingTime_ms(z.target.dataset.type)
      )
    )
  )
);

[...document.querySelectorAll(".config-auto-random")].map((button) =>
  button.addEventListener("click", switchAutoRandomConfig)
);

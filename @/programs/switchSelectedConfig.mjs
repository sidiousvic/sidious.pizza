import { pipe, apply, inject, mutate } from "/@/programs/utils.mjs";

const computeLoadingTime_ms = (type) => (type === "typography" ? 1000 : 0);

const fx_setCurtainOpacity = (value) =>
  (document.getElementById("curtain").style.opacity = value);

const fx_removeClassContaining = (type) =>
  [...document.documentElement.classList].map(
    (c) => c.includes(type) && document.documentElement.classList.remove(c)
  );

const fx_removeStoredItem = (type) => localStorage.removeItem(type);

const fx_enableSelectedConfig = (type, value) =>
  document.documentElement.classList.add(`${type}-${value}`);

const fx_storeSelectedConfig = (type, value) =>
  localStorage.setItem(type, value);

const z_0 = { user: { stored: undefined } };

const switchSelectedConfig = pipe(
  inject(z_0),
  apply((z) => ({
    user: {
      stored: localStorage.getItem(z.target.dataset.type)
        ? `${z.target.dataset.type}-${localStorage.getItem(
            z.target.dataset.type
          )}`
        : undefined,
    },
  })),
  mutate(
    (z) => (
      fx_setCurtainOpacity(1),
      setTimeout(
        () => (
          fx_removeClassContaining(z.target.dataset.type),
          fx_removeStoredItem(z.target.dataset.type),
          fx_enableSelectedConfig(
            z.target.dataset.type,
            z.target.dataset.value
          ),
          fx_storeSelectedConfig(z.target.dataset.type, z.target.dataset.value),
          fx_setCurtainOpacity(0)
        ),
        computeLoadingTime_ms(z.target.dataset.type)
      )
    )
  )
);

[...document.querySelectorAll(".config-select")].map((button) =>
  button.addEventListener("click", switchSelectedConfig)
);

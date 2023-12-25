export const random = <T>(list: T[]) =>
  list[Math.floor(Math.random() * list.length)];

export const pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);

export const apply = (fn) => (z) => inject(fn(z))(z);

export const inject = (a) => (b) =>
  Object.getOwnPropertyNames(a).reduce(
    (acc, key) => (
      void Object.defineProperty(
        acc,
        key,
        Object.getOwnPropertyDescriptor(a, key),
      ), acc
    ),
    b,
  );

export const map = (fn) => (z) => fn(z);

export const mix = (fn) => (z) => ({ ...z, ...fn(z) });

export const mutate = (fn) => (z) => (fn(z), z);

export const isMobile = (userAgent) =>
  /iPhone|iPad|iPod|Android/i.test(userAgent);

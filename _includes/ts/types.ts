type Just<T> = {
  readonly isJust: true;
  readonly isNothing: false;
  readonly map: <U>(fn: (value: T) => U) => Maybe<U>;
  readonly fold: <U>(f: () => U, g: (value: T) => U) => U;
  readonly getOrElse: (defaultValue: T) => T;
};

type Nothing = {
  readonly isJust: false;
  readonly isNothing: true;
  readonly map: <U>(fn: (value: any) => U) => Maybe<U>;
  readonly fold: <U>(f: () => U, g: (value: any) => U) => U;
  readonly getOrElse: <U>(defaultValue: U) => U;
};

type Maybe<T> = Just<T> | Nothing;

const Maybe = {
  just: <T>(value: T): Just<T> => ({
    isJust: true,
    isNothing: false,
    map: <U>(fn: (value: T) => U) => Maybe.just(fn(value)),
    fold: <U>(f: () => U, g: (value: T) => U) => g(value),
    getOrElse: () => value,
  }),
  nothing: (): Nothing => ({
    isJust: false,
    isNothing: true,
    map: <U>() => Maybe.nothing(),
    fold: <U>(f: () => U) => f(),
    getOrElse: <U>(defaultValue: U) => defaultValue,
  }),
};

const fromNullable = <T>(value: T | null | undefined): Maybe<T> =>
  value != null ? Maybe.just(value) : Maybe.nothing();

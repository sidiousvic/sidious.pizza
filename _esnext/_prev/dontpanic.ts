export const Panic = (message: string) => {
  throw new Error(message);
};

export const Try = <T>(nullable: T) => (message: string) =>
  nullable ?? Panic(message);

export const Guard =
  <T>(value: T) => (predicate: (value: T) => boolean) => (message: string) =>
    predicate(value) ? value : Panic(message);

export const TryOr = <T>(nullable: T) => (fx: () => void) => nullable ?? fx();

export type State<T> = T;

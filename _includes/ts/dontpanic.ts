export const Panic = (message: string) => {
  throw new Error(message);
};

export const Try = <T>(nullable: T) => (message: string) =>
  nullable ?? Panic(message);

export type State<T> = T;

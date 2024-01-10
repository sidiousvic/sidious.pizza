import { Try } from "./dontpanic.ts";
import { inject, mutate, pipe } from "./utils.ts";

type Config = { curtainId: string };

const config: Config = { curtainId: "curtain" };

type State = Config & Event;

const setCurtainOpacityToZero = (z: State) =>
  (Try(document.getElementById(z.curtainId))(
    `ID ${z.curtainId} not found.`
  ).style.opacity = `0`);

const liftCurtain = pipe(inject(config), mutate(setCurtainOpacityToZero));

addEventListener("screenDimensionsReady", liftCurtain);

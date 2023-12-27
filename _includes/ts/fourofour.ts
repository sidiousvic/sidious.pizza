import { Try } from "./dontpanic.ts";
import { inject, mutate, pipe, random } from "./utils.ts";

type Config = {
  messageID: string;
  messages: string[];
};

type State = Config & Event;

const config: Config = {
  messageID: "404-page-message",
  messages: [
    "Are you lost?",
    "You seem to be lost.",
    "You should not be here.",
    "There is nothing here for you.",
    "Turn around.",
    "Wrong turn, perhaps?",
    "They are watching you.",
    "You won't find it here.",
    "What are you searching for?",
    "Someone's keeping tabs.",
    "Look behind you.",
    "There are no secrets left.",
  ],
};

const randomize404Message = (z: State) =>
  Try(document.getElementById(z.messageID))(
    `ID ${z.messageID} not found.`,
  ).innerHTML = random(z.messages);

addEventListener(
  "DOMContentLoaded",
  pipe(
    inject(config),
    mutate(randomize404Message),
  ),
);

import { getElement, getStoredItem } from "./domutils.ts";
import { inject, isMobile, mutate, pipe } from "./utils.ts";

type Config = {
  playbackTriggerMessageElement: HTMLDivElement;
};

type State = Config & KeyboardEvent;

addEventListener("DOMContentLoaded", () => {
  const config: Config = {
    playbackTriggerMessageElement: getElement(
      "#trigger-playback",
    ) as HTMLDivElement,
  };

  toggleTapMessageOnMobile(config as State);

  addEventListener(
    "keydown",
    pipe(
      inject(config),
      mutate(toggleVenomousBody),
      mutate(togglePlaybackSpacebarMessage),
    ),
  );

  addEventListener(
    "touchstart",
    pipe(
      inject(config),
      mutate(toggleVenomousBody),
      mutate(togglePlaybackTapMessage),
    ),
  );
});

const toggleVenomousBody = (z: State) =>
  getStoredItem("audioplaystate") === "play"
    ? z.key === " " && document.body.classList.add("venomous")
    : z.key === " " && document.body.classList.remove("venomous");

const togglePlaybackSpacebarMessage = (z: State) =>
  getStoredItem("audioplaystate") === "pause"
    ? z.key === " " &&
      (z.playbackTriggerMessageElement.innerHTML =
        `Press <span class="tag border venomous">spacebar</span> to play`)
    : z.key === " " &&
      (z.playbackTriggerMessageElement.innerHTML =
        `Press <span class="tag border venomous">spacebar</span> to pause`);

const togglePlaybackTapMessage = (z: State) =>
  getStoredItem("audioplaystate") === "pause"
    ? z.type === "touchstart" &&
      (z.playbackTriggerMessageElement.innerHTML =
        `Press <span class="tag border venomous">tap</span> to play`)
    : z.type === "touchstart" &&
      (z.playbackTriggerMessageElement.innerHTML =
        `Press <span class="tag border venomous">tap</span> to pause`);

const toggleTapMessageOnMobile = (z: State) =>
  isMobile(navigator.userAgent) &&
  (z.playbackTriggerMessageElement.innerHTML =
    `Press <span class="tag border venomous">tap</span> to play`);

import { getElement, getStoredItem } from "./domutils.ts";
import { inject, mutate, pipe } from "./utils.ts";

let animationFrame: number | undefined;

type Playstate = "play" | "pause";

type Config = {
  defaultPlaystate: Playstate;
  audio: HTMLAudioElement;
  seekSlider: HTMLProgressElement;
  duration: HTMLSpanElement;
  currentTime: HTMLSpanElement;
  musicPlayer: HTMLDivElement;
};

type State = Config & Event;

addEventListener("DOMContentLoaded", () => {
  const config: Config = {
    defaultPlaystate: "pause",
    audio: getElement("audio") as HTMLAudioElement,
    seekSlider: getElement("#seek-slider") as HTMLProgressElement,
    duration: getElement("#duration") as HTMLSpanElement,
    currentTime: getElement("#current-time") as HTMLSpanElement,
    musicPlayer: getElement("#music-player") as HTMLDivElement,
  };

  storeDefaultPlaystate(config as State);

  addEventListener(
    "keydown",
    pipe(
      inject(config),
      mutate(togglePlaystateOnKey(" ")),
      mutate(playback),
      mutate(runAnimationIfPlaying),
    ),
  );

  addEventListener(
    "touchstart",
    pipe(
      inject(config),
      mutate(togglePlaystateOnTouch),
      mutate(playback),
      mutate(runAnimationIfPlaying),
    ),
  );

  config.audio.addEventListener(
    "loadedmetadata",
    pipe(
      inject(config),
      mutate(displayDuration),
      mutate(setSliderMax),
      mutate(displayBuffered),
    ),
  );

  config.audio.addEventListener(
    "progress",
    pipe(
      inject(config),
      mutate(displayBuffered),
      mutate(displayCurrentTime),
    ),
  );

  config.seekSlider.addEventListener(
    "input",
    pipe(
      inject(config),
      mutate(showRangeProgress),
      mutate(displayCurrentTime),
      mutate(pauseAnimationIfPlaying),
    ),
  );

  config.seekSlider.addEventListener(
    "change",
    pipe(
      inject(config),
      mutate(setAudioTimeToSliderValue),
      mutate(runAnimationIfPlaying),
    ),
  );
});

const storeDefaultPlaystate = (z: State) =>
  localStorage.setItem("audioplaystate", z.defaultPlaystate);

const togglePlaystateOnKey = (key: string) => (z: State & KeyboardEvent) =>
  getStoredItem("audioplaystate") === "pause"
    ? z.key === key && localStorage.setItem("audioplaystate", "play")
    : z.key === key && localStorage.setItem("audioplaystate", "pause");

const togglePlaystateOnTouch = (z: State & TouchEvent) =>
  getStoredItem("audioplaystate") === "pause"
    ? z.type === "touchstart" &&
      localStorage.setItem("audioplaystate", "play")
    : z.type === "touchstart" &&
      localStorage.setItem("audioplaystate", "pause");

const playback = (z: State) =>
  // @ts-ignore: Audio[playstate]() can be indexed with "play" or "pause"
  z.audio[getStoredItem("audioplaystate") ?? z.defaultPlaystate]();

const showRangeProgress = (z: State) =>
  z.musicPlayer.style.setProperty(
    "--seek-before-width",
    (z.seekSlider.value / z.seekSlider.max) * 100 + "%",
  );

const calculateTime = (timeS: number) => {
  const minutes = Math.floor(timeS / 60);
  const seconds = Math.floor(timeS % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const displayDuration = (z: State) =>
  z.duration.textContent = calculateTime(z.audio.duration);

const displayCurrentTime = (z: State) =>
  z.currentTime.textContent = calculateTime(z.seekSlider.value);

const setSliderMax = (z: State) =>
  z.seekSlider.max = Math.floor(z.audio.duration);

const displayBuffered = (z: State) => {
  const bufferedAmount = z.audio.buffered.length
    ? Math.floor(z.audio.buffered.end(z.audio.buffered.length - 1))
    : 0;
  z.musicPlayer.style.setProperty(
    "--buffered-width",
    `${(bufferedAmount / z.seekSlider.max) * 100}%`,
  );
};

const whilePlaying = (z: State) => () => {
  z.seekSlider.value = Math.floor(z.audio.currentTime);
  z.currentTime.textContent = calculateTime(z.seekSlider.value);
  z.musicPlayer.style.setProperty(
    "--seek-before-width",
    `${(z.seekSlider.value / z.seekSlider.max) * 100}%`,
  );
  animationFrame = requestAnimationFrame(whilePlaying(z));
};

const setAudioTimeToSliderValue = (z: State) =>
  z.audio.currentTime = z.seekSlider.value;

const pauseAnimationIfPlaying = (z: State) =>
  !z.audio.paused &&
  cancelAnimationFrame(animationFrame ?? 0);

const runAnimationIfPlaying = (z: State) =>
  !z.audio.paused &&
  requestAnimationFrame(whilePlaying(z));

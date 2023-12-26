import { getElementById } from "./domutils.ts";
import { inject, mutate, pipe } from "./utils.ts";

type Config = { playbackTriggerMessageID: string };

const config: Config = { playbackTriggerMessageID: "trigger-playback" };

type State = Config & Event;

const mixBlendDarkenNavbar = (
  z: State,
) => (getElementById(z.navbarID).style.mixBlendMode = "darken !important");

addEventListener("DOMContentLoaded", () => {
  const musicPlayer = document.getElementById("music-player");
  const seekSlider = document.getElementById("seek-slider");
  const volumeSlider = document.getElementById("volume-slider");
  const triggerPlayback = document.getElementById("trigger-playback");
  const muteIcon = document.getElementById("mute-icon");
  let playState = "play";
  let muteState = "unmute";

  triggerPlayback.innerHTML = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent,
    )
    ? '<span class="tag border venomous">Tap</span> to play'
    : 'Press <span class="tag border venomous">spacebar</span> to play';

  function playbackFX(playstate, tabOrSpacebar) {
    playState === "play"
      ? (audio.play(),
        requestAnimationFrame(whilePlaying),
        (playState = "pause"),
        document.body.classList.add("venomous"),
        (document.querySelector(".navbar-home").style.mixBlendMode =
          "exclusion"),
        (triggerPlayback.innerHTML =
          `Press <span class="tag border venomous">${tabOrSpacebar}</span> to pause`))
      : (audio.pause(),
        (playState = "play"),
        document.body.classList.remove("venomous"),
        (document.querySelector(".navbar-home").style.mixBlendMode = "unset"),
        (triggerPlayback.innerHTML =
          `Press <span class="tag border venomous">${tabOrSpacebar}</span> to play`));
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === " ") playbackFX(playState, "spacebar");
  });

  window.addEventListener("touchstart", (e) => {
    playbackFX(playState, "tap");
  });

  muteIcon.addEventListener("click", () => {
    muteState === "unmute"
      ? ((audio.muted = true), (muteState = "mute"))
      : ((audio.muted = false), (muteState = "unmute"));
  });

  const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) {
      musicPlayer.style.setProperty(
        "--seek-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%",
      );
    } else {
      musicPlayer.style.setProperty(
        "--volume-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%",
      );
    }
  };

  seekSlider.addEventListener("input", (e) => {
    showRangeProgress(e.target);
  });
  volumeSlider.addEventListener("input", (e) => {
    showRangeProgress(e.target);
  });

  /* Implementation of the functionality of the audio player */

  const audio = document.querySelector("audio");
  const durationContainer = document.getElementById("duration");
  const currentTimeContainer = document.getElementById("current-time");
  const outputContainer = document.getElementById("volume-output");
  let raf = null;

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
  };

  const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
  };

  const displayBufferedAmount = () => {
    const bufferedAmount = audio.buffered.length
      ? Math.floor(audio.buffered.end(audio.buffered.length - 1))
      : undefined;
    musicPlayer.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / seekSlider.max) * 100}%`,
    );
  };

  const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    musicPlayer.style.setProperty(
      "--seek-before-width",
      `${(seekSlider.value / seekSlider.max) * 100}%`,
    );
    raf = requestAnimationFrame(whilePlaying);
  };

  if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  } else {
    audio.addEventListener("loadedmetadata", () => {
      displayDuration();
      setSliderMax();
      displayBufferedAmount();
    });
  }

  audio.addEventListener("progress", displayBufferedAmount);

  seekSlider.addEventListener("input", () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if (!audio.paused) {
      cancelAnimationFrame(raf);
    }
  });

  seekSlider.addEventListener("change", () => {
    audio.currentTime = seekSlider.value;
    if (!audio.paused) {
      requestAnimationFrame(whilePlaying);
    }
  });

  volumeSlider.addEventListener("input", (e) => {
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
  });
});

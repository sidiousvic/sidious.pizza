const musicPlayer = document.getElementById("music-player");
const seekSlider = document.getElementById("seek-slider");
const volumeSlider = document.getElementById("volume-slider");
const triggerPlayback = document.getElementById("trigger-playback");
const muteIcon = document.getElementById("mute-icon");
let playState = "play";
let muteState = "unmute";

triggerPlayback.innerHTML =
  window.innerWidth > 768
    ? 'Press <span class="tag border venomous">spacebar</span> to play'
    : '<span class="tag border venomous">Tap</span> to play';

function playbackFX(playstate, tabOrSpacebar) {
  playState === "play"
    ? (audio.play(),
      requestAnimationFrame(whilePlaying),
      (playState = "pause"),
      document.body.classList.add("venomous"),
      (document.querySelector(".navbar-links").style.mixBlendMode = "darken"),
      (document.querySelector(".navbar-links").style.filter = "invert(1)"),
      (triggerPlayback.innerHTML = `Press <span class="tag border venomous">${tabOrSpacebar}</span> to pause`))
    : (audio.pause(),
      (playState = "play"),
      document.body.classList.remove("venomous"),
      (document.querySelector(".navbar-links").style.mixBlendMode = "unset"),
      (document.querySelector(".navbar-links").style.filter = "unset"),
      (triggerPlayback.innerHTML = `Press <span class="tag border venomous">${tabOrSpacebar}</span> to play`));
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
  if (rangeInput === seekSlider)
    musicPlayer.style.setProperty(
      "--seek-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  else
    musicPlayer.style.setProperty(
      "--volume-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
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
    `${(bufferedAmount / seekSlider.max) * 100}%`
  );
};

const whilePlaying = () => {
  seekSlider.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  musicPlayer.style.setProperty(
    "--seek-before-width",
    `${(seekSlider.value / seekSlider.max) * 100}%`
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

/* Implementation of the Media Session API */
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "Komorebi",
    artist: "Anitek",
    album: "MainStay",
    artwork: [
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });

  navigator.mediaSession.setActionHandler("play", () => {
    if (playState === "play") {
      audio.play();
      playAnimation.playSegments([14, 27], true);
      requestAnimationFrame(whilePlaying);
      playState = "pause";
    } else {
      audio.pause();
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(raf);
      playState = "play";
    }
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    if (playState === "play") {
      audio.play();
      playAnimation.playSegments([14, 27], true);
      requestAnimationFrame(whilePlaying);
      playState = "pause";
    } else {
      audio.pause();
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(raf);
      playState = "play";
    }
  });

  navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    audio.currentTime = audio.currentTime - (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler("seekforward", (details) => {
    audio.currentTime = audio.currentTime + (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler("seekto", (details) => {
    if (details.fastSeek && "fastSeek" in audio) {
      audio.fastSeek(details.seekTime);
      return;
    }
    audio.currentTime = details.seekTime;
  });

  navigator.mediaSession.setActionHandler("stop", () => {
    audio.currentTime = 0;
    seekSlider.value = 0;
    musicPlayer.style.setProperty("--seek-before-width", "0%");
    currentTimeContainer.textContent = "0:00";
    if (playState === "pause") {
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(raf);
      playState = "play";
    }
  });
}

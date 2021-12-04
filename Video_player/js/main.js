// Grab DOM elements
const video = document.querySelector(".video");
const playButton = document.querySelector(".play");
const playButtonIcon = playButton.querySelector("i");
const stopButton = document.querySelector(".stop");
const progressBar = document.querySelector(".progress");
const timestamp = document.querySelector(".timestamp");

// Listen for events
video.addEventListener("click", playPauseVideo);
progressBar.addEventListener("change", setVideoProgress);
playButton.addEventListener("click", playPauseVideo);
stopButton.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", updateVideoProgress);

// Utility functions
function playPauseVideo() {
  video[video.paused ? "play" : "pause"]();
  playButtonToggleIcon();
}

function playButtonToggleIcon() {
  if (video.paused) {
    playButtonIcon.classList.remove("fa-pause-circle");
    playButtonIcon.classList.add("fa-play-circle");
  } else {
    playButtonIcon.classList.remove("fa-play-circle");
    playButtonIcon.classList.add("fa-pause-circle");
  }

}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
  playButtonToggleIcon();
  progressBar.value = 0;
}

function setVideoProgress() {
  video.currentTime = Number((progressBar.value * video.duration) / 100);
}

function updateVideoProgress() {
  progressBar.value = Number((video.currentTime / video.duration) * 100);

  let minutes = Math.floor(video.duration / 60);
  let seconds = Math.florr(video.currentTime % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timestamp.textContent = `${minutes}:${seconds}`;
}

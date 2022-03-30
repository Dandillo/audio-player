let isPlay = false;
const playBtn = document.querySelector(".btn-play");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const singer = document.querySelector(".singer");
const song = document.querySelector(".song-name");
const cover = document.querySelector(".cover");
const background = document.querySelector(".background");
const progress = document.querySelector(".progress-box");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const dividerText = document.querySelector(".divider");
const audio = new Audio("./assets/audio/panda.mp3");
const isSwitched = false;
durationTime.textContent = getTimeCode(parseInt(audio.duration));
currentTime.textContent = getTimeCode(parseInt(audio.currentTime));
dividerText.textContent = "/";

let playNum = 0;
let tracks = [
  {
    singer: "Desiigner",
    song: "Panda",
    path: "./assets/audio/panda.mp3",
    cover: "./assets/img/panda.png",
  },
  {
    singer: "Beyonce",
    song: "Don't Hurt Yourself",
    path: "./assets/audio/beyonce.mp3",
    cover: "./assets/img/lemonade.png",
  },
  {
    singer: "Dua Lipa",
    song: "Don't start now",
    path: "./assets/audio/dontstartnow.mp3",
    cover: "./assets/img/dontstartnow.png",
  },
];
setInterval(() => {
  const progressRange = document.querySelector(".progress");
  progressRange.style.width = (audio.currentTime / audio.duration) * 100 + "%";

  durationTime.textContent = getTimeCode(parseInt(audio.duration));
  currentTime.textContent = getTimeCode(parseInt(audio.currentTime));
}, 250);
function getTimeCode(seconds) {
  minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return timeString;
}
function playNext() {
  if (playNum >= tracks.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }
  changeSong();
  playPauseAudio();
}
function changeSong() {
  audio.src = tracks[playNum].path;
  singer.textContent = tracks[playNum].singer;
  song.textContent = tracks[playNum].song;
  cover.src = tracks[playNum].cover;
  background.src = tracks[playNum].cover;
}
function playPrev() {
  if (playNum === 0) {
    playNum = tracks.length - 1;
  } else {
    playNum--;
  }
  changeSong();
  isPlay = false;
  playPauseAudio();
}

function playPauseAudio() {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("pause");
  }
}
const timeline = document.querySelector(".progress-box");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);
playBtn.addEventListener("click", playPauseAudio);
prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);

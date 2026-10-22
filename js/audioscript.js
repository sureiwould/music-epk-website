/*
querySelector() selects HTML elements and
addEventListener() responds to user interactions.
If JavaScript is disabled, the browser's
built-in audio player is still available.
*/


/* Custom Music Player */

// Select HTML elements
const audio = document.querySelector("#music-player");
const playButton = document.querySelector("#play-pause");
const progress = document.querySelector("#song-progress");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const songTitle = document.querySelector("#song-title");

// Playlist

const songs = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3",
    "song4.mp3",
    "song5.mp3",
    "song6.mp3",
    "song7.mp3"
];

let songIndex = 0;

// Show custom controls
document.querySelector(".custom-player").hidden = false;
audio.controls = false;

// Load a song
function loadSong() {
    audio.src = "audio/" + songs[songIndex];
    songTitle.textContent = "Song " + (songIndex + 1);
    audio.load();
}

// Play and pause
playButton.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
});

// Previous song
document.querySelector("#prev-song").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong();
    audio.play();
});

// Next song
document.querySelector("#next-song").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();
    audio.play();
});

// Update play button
audio.addEventListener("play", () => playButton.textContent = "⏸");
audio.addEventListener("pause", () => playButton.textContent = "▶");

// Format time
function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";
    return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;
}

// Update progress and timer
audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Show duration
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

// Seek through song
progress.addEventListener("input", () => {
    if (audio.duration > 0) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

// Load first song
loadSong();


// Volume control
const volumeSlider = document.querySelector("#volume-slider");

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});


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
const volumeSlider = document.querySelector("#volume-slider");

// Playlist
const songs = [
    "Song1.mp3",
    "Song2.mp3",
    "Song3.mp3",
    "Song4.mp3",
    "Song5.mp3",
    "Song6.mp3",
    "Song7.mp3"
];

let songIndex = 0;

// Web Audio API for mobile volume control
const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

let audioContext;
let gainNode;

if (AudioContextClass) {
    audioContext = new AudioContextClass();

    const source = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set initial volume
    gainNode.gain.value = Number(volumeSlider.value);
} else {
    // browsers without Web Audio API
    audio.volume = Number(volumeSlider.value);
}

// Resume audio context when needed
async function resumeAudio() {
    if (audioContext && audioContext.state === "suspended") {
        await audioContext.resume();
    }
}

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
playButton.addEventListener("click", async () => {
    try {
        await resumeAudio();

        if (audio.paused) {
            await audio.play();
        } else {
            audio.pause();
        }
    } catch (error) {
        console.error("Audio playback failed:", error);
    }
});

// Previous song
document.querySelector("#prev-song").addEventListener("click", async () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong();

    try {
        await resumeAudio();
        await audio.play();
    } catch (error) {
        console.error("Audio playback failed:", error);
    }
});

// Next song
document.querySelector("#next-song").addEventListener("click", async () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();

    try {
        await resumeAudio();
        await audio.play();
    } catch (error) {
        console.error("Audio playback failed:", error);
    }
});

// Update play button
audio.addEventListener("play", () => {
    playButton.textContent = "⏸";
});

audio.addEventListener("pause", () => {
    playButton.textContent = "▶";
});

// Format time
function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    return `${Math.floor(time / 60)}:${String(
        Math.floor(time % 60)
    ).padStart(2, "0")}`;
}

// Update progress and timer
audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    progress.value =
        (audio.currentTime / audio.duration) * 100 || 0;
});

// Show duration
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

// Seek through song
progress.addEventListener("input", () => {
    if (audio.duration > 0) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

// Volume control
volumeSlider.addEventListener("input", () => {
    const volume = Number(volumeSlider.value);

    if (gainNode) {
        gainNode.gain.value = volume;
    } else {
        audio.volume = volume;
    }
});

// Automatically play next song
audio.addEventListener("ended", async () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();

    try {
        await resumeAudio();
        await audio.play();
    } catch (error) {
        console.error("Audio playback failed:", error);
    }
});

// Load first song
loadSong();

username = "Gunny";
var namePlaceholder = document.getElementById("username");
namePlaceholder.innerHTML = username;

function add(id) {
    var elem = document.getElementById(id);

    var newNum = parseInt(elem.innerText) + 1;
    elem.innerHTML = newNum;
}

function sub(id) {
    var elem = document.getElementById(id);

    var newNum = parseInt(elem.innerText) - 1;
    elem.innerHTML = newNum;
}

var track_art = document.querySelector(".track-art");
var track_name = document.querySelector(".track-name");
var track_artist = document.querySelector(".track-artist");

var playpause_btn = document.querySelector(".playpause-track");
var nextbtn = document.querySelector(".next-track");
var prevbtn = document.querySelector(".prev-track");

var seek_slider = document.querySelector(".seek_slider");
var volume_slider = document.querySelector(".volume_slider");
var curr_time = document.querySelector(".current-time");
var total_duration = document.querySelector(".total-duration");

var curr_track = document.createElement('audio');

var track_index = 0;
var isPlaying = false;
var updateTimer;
function loadTrack() {
    curr_track.src = "music/track1.m4a";
    curr_track.load();

    track_art.style.backgroundImage = "url(images/album.webp)";
    track_name.textContent = "Freedom";
    track_artist.textContent = "Beyoncé, Kendrick Lamar";

    updateTimer = setInterval(seekUpdate, 1000);
}

function playpauseTrack() {
    if (!isPlaying) {
        curr_track.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    else {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
}

// CODE FROM https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}
function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);


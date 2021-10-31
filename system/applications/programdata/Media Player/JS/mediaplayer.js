function mediaPlayerCurrentTime() {

    let mediaPlayer = document.getElementById("ArcOSMediaPlayerAudioObj");

    return ((mediaPlayer.currentTime / mediaPlayer.duration) * 100);

}

function mediaPlayerToggle() {
    let mediaPlayer = document.getElementById("ArcOSMediaPlayerAudioObj");

    if (mediaPlayer.paused && mediaPlayer.duration > 0) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function mediaPlayerStop() {
    let mediaPlayer = document.getElementById("ArcOSMediaPlayerAudioObj");

    mediaPlayer.pause();
    mediaPlayer.src = "";
    mediaPlayer.currentTime = 0;
    mediaPlayer.volume = !getCurrentUserData().muted ? globalVolume : 0;

    document.getElementById("musicPlayerProgressBarIndicator").style.width = "";
    document.getElementById("musicPlayerCurrentTimeDisplay").innerText = `00:00 / 00:00`;

    setTimeout(() => {
        document.getElementById("mediaPlayerTitle").innerHTML = "Stopped";
    }, 100);
}

function setProgress(target = "musicPlayerProgressBarIndicator", multiplier = 4) {
    target = document.getElementById(target);

    target.style.width = (mediaPlayerCurrentTime() * multiplier) + "px";
}

function startMediaPlayerStatusInterval() {
    mediaPlayerInterval = setInterval(() => {

        setProgress();

        let mediaPlayer = document.getElementById("ArcOSMediaPlayerAudioObj");

        mediaPlayer.volume = !getCurrentUserData().muted ? globalVolume : 0;

        if (mediaPlayer.paused) {
            document.getElementById("mediaPlayerPauseButton").classList.add("selected");
            document.getElementById("mediaPlayerPlayButton").classList.remove("selected");

            if (mediaPlayer.src != "") {
                document.getElementById("mediaPlayerTitle").innerHTML = "Paused";
            } else {
                document.getElementById("mediaPlayerTitle").innerHTML = "Stopped";
            }

        } else {

            document.getElementById("mediaPlayerPauseButton").classList.remove("selected");
            document.getElementById("mediaPlayerPlayButton").classList.add("selected");

            let file = mediaPlayer.src;
            let filename = path.parse(file).base;

            document.getElementById("mediaPlayerTitle").innerHTML = "Playing";

        }
        if (mediaPlayer.duration > 0 && mediaPlayer.currentTime > 0) {

            function convertToMinutes(seconds) {
                let hr = Math.floor(seconds / 3600);
                let min = Math.floor((seconds - (hr * 3600)) / 60);
                let sec = Math.floor(seconds - (hr * 3600) - (min * 60));

                if (sec < 10) {
                    sec = "0" + sec;
                }

                return min + ':' + sec;
            }

            document.getElementById("musicPlayerCurrentTimeDisplay").innerText =
                `${convertToMinutes(mediaPlayer.currentTime)} / ${convertToMinutes(mediaPlayer.duration)}`;
        }
    }, 50);
}

function openAudioFile(file) {
    let mediaPlayer = document.getElementById("ArcOSMediaPlayerAudioObj");
    mediaPlayer.src = file;
    mediaPlayer.volume = !getCurrentUserData().muted ? globalVolume : 0;
    windowLogic.openWindow("Music Player")
    mediaPlayer.play();
    startMediaPlayerStatusInterval();
}

function mediaPlayerForward(sec) {
    document.getElementById("ArcOSMediaPlayerAudioObj").currentTime += sec;
}

function mediaPlayerRewind(sec) {
    document.getElementById("ArcOSMediaPlayerAudioObj").currentTime -= sec;
}
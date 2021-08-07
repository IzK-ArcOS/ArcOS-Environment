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

    if (mediaPlayer.children[0].tagName = "source") {
        mediaPlayer.pause();
        mediaPlayer.children[0].src = "";
    }
}

function setProgress(target) {
    // TODO: Make setProgress Code
}
<div class="window" id="Music Player" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Music Player - <span id="mediaPlayerTitle">Stopped</span></p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);mediaPlayerStop();" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <div class="musicPlayerControlsDiv">
            <span>
            <button class="play" id="mediaPlayerPlayButton" onclick="mediaPlayerToggle();">
                <span class="material-icons">play_arrow</span>
            </button>
            <button class="pause" id="mediaPlayerPauseButton" onclick="mediaPlayerToggle();">
                <span class="material-icons">pause</span>
            </button>
            </span>
            <button class="rewind" onclick="mediaPlayerRewind(10);">
                <span class="material-icons">fast_rewind</span>
            </button>
            <button class="forward" onclick="mediaPlayerForward(10);">
                <span class="material-icons">fast_forward</span>
            </button>
            <button class="stop" onclick="mediaPlayerStop();">
                <span class="material-icons">stop</span>
            </button>
        </div>
        <div class="musicPlayerProgressBarOutline">
            <div class="progressIndicator" id="musicPlayerProgressBarIndicator"></div>
        </div>
        <p id="musicPlayerCurrentTimeDisplay">00:00 / 00:00</p>
        <audio id="ArcOSMediaPlayerAudioObj" controls>
        </audio>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/musicPlayer.css">
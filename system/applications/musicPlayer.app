<div class="window" id="Music Player" onclick="bringToFront(this);" style="min-width:320px;min-height:200px;resize: none;">
    <div class="windowTitle" onclick="bringToFront(parentNode);">
        <p>Music Player</p>
        <button onclick="closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding:20px;">
        <audio id="ArcOSMediaPlayerAudioObj" controls >
            <source src="./system/sounds/notification.mp3" type="audio/mpeg">
        </audio>
    </div>
</div>
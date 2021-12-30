<div class="window" id="ArcOS Updater">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">ArcOS Updater</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span
                class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span
                class="material-icons">minimize</span></button>
    </div>

    <div class="body">
        <p>Download Progress:</p>
        <progress id="updateProgressBar" max="100" value="0"></progress>
        <p>Destination: <span id="updateDestinationDisplay">Unknown</span></p>
        <p>File Size: <span id="updateFileSizeDisplay">0 B</span></p>
        <button>Close</button>
    </div>
</div>

<link rel="stylesheet" href="./../apps/update.css">
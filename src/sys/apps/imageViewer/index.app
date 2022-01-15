<div class="window" id="Image Viewer" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Image Viewer</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span
                class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span
                class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <img id="imageViewerMainImage" height="500px" src="./../img/no-image.png">
    </div>
</div>
<div class="window" id="Image Viewer" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Image Viewer</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <center><img id="imageViewerMainImage" height="500px" src="./system/images/no-image.png"></center>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/imageViewer.css">
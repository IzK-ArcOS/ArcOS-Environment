<div class="window" id="Image Viewer" onclick="new WindowLogic().bringToFront(this);" style="max-width:1024;max-height:600px;min-height:unset;resize: none;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);">
        <p class="titleText">Image Viewer</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding-left:0px;">
        <center><img id="imageViewerMainImage" src="./system/images/no-image.png" style="max-width:1024px;"></center>
    </div>
</div>
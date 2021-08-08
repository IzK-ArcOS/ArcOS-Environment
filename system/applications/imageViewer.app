<div class="window" id="Image Viewer" onclick="bringToFront(this);"
    style="max-width:1024;max-height:600px;min-height:unset;resize: none;">
    <div class="windowTitle" onclick="bringToFront(parentNode);">
        <p>Image Viewer</p>
        <button onclick="closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding-left:0px;">
        <center><img id="imageViewerMainImage" src="./system/images/no-image.png" style="max-width:1024px;"></center>
    </div>
</div>
function openImage(path, width = 0, height = 0) {
    let fs = require("fs");
    try {
        document.getElementById("imageViewerMainImage").src = path;
        if (width != 0) {
            document.getElementById("imageViewerMainImage").style.width = width + "px";
        }
        if (height != 0) {
            document.getElementById("imageViewerMainImage").style.height = height + "px";
        }
    } catch {
        new ErrorLogic().sendError("Image Viewer", "The requested file couldn't be found. Please check the name and try again.<br><br>Path: " + path);
    }
    if (!activeapps.includes("Image Viewer")) {
        openWindow("Image Viewer");
    }
}
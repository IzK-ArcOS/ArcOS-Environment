function openImage(path, width = 0, height = 0) {
    const imageViewerMainImage = document.getElementById("imageViewerMainImage");
    if (imageViewerMainImage) {
        imageViewerMainImage.src = path;

        if (width) imageViewerMainImage.style.width = width + "px";
        if (height) imageViewerMainImage.style.height = height + "px";
    }
    if (!activeapps.includes("Image Viewer")) {
        windowLogic.openWindow("Image Viewer");
    } else {
        setTimeout(() => {
            windowLogic.bringToFront(document.getElementById("Image Viewer"));            
        }, 100);
    }
}
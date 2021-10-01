function openWith(file) {
    new WindowLogic().openWindow("Open With");
    document.getElementById("openWithFileInput").value = file;
}
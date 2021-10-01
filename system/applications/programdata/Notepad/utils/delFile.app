<div class="window" id="Delete Notepad" onclick="new WindowLogic().bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);">
        <p class="titleText">Delete Notepad</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of your Notepad:</p>
        <input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" maxlength="40" id="notepadDeleteFileInput"><br>
        <i style="margin-top:10px;margin-bottom:10px;">Will delete: <span
                id="notepadDeleteFilePathDisplay"></span></i><br>
        <button onclick="deleteNotepad();">Delete</button>
    </div>
</div>
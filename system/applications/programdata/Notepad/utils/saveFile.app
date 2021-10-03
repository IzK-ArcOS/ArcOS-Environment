<div class="window" id="Save Notepad" onclick="windowLogic.bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Save Notepad</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter a name for your Notepad:</p>
        <input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" maxlength="40" id="notepadSaveFileInput"><br>
        <i style="margin-top:10px;margin-bottom:10px;">Will be saved in: <span
                id="notepadSaveFilePathDisplay"></span></i><br>
        <button onclick="saveNotepad();">Save</button>
    </div>
</div>
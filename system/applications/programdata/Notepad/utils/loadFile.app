<div class="window" id="Load Notepad" onclick="new WindowLogic().bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);">
        <p class="titleText">Load Notepad</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of your Notepad:</p>
        <input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" maxlength="40" id="notepadLoadFileInput"><br>
        <i style="margin-top:10px;margin-bottom:10px;">Will load: <span id="notepadLoadFilePathDisplay"></span></i><br>
        <button onclick="loadNotepad();">Load</button>
    </div>
</div>
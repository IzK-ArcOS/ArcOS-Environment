<div class="window" id="ArcOS Notepad" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);" ondblclick="windowLogic.toggleMaximizedState(this.parentNode);">
        <p class="titleText">ArcOS Notepad</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);notepadNewFile();" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.toggleMaximizedState(this.parentNode.parentNode);" class="title"><span class="material-icons">crop_square</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <div class="menuBar">
            <button onclick="notepadSaveFile();">Save</button>
            <button onclick="notepadLoadFile();">Load</button>
            <button onclick="notepadDeleteFile();">Delete</button>
            <button class="right" onclick="notepadNewFile();">New</button>
        </div>
        <textarea id="notepadTextField" spellcheck="false"></textarea>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/notepad.css">
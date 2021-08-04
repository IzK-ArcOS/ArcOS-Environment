<div class="window" id="ArcOS Notepad" onclick="bringToFront(this);" style="/*resize:none;*/width:fit-content;height:fit-content;min-width:unset;min-height:unset;min-width:794px;min-height:537px;">
    <div class="windowTitle" onclick="bringToFront(parentNode);">
        <p>ArcOS Notepad</p>
        <button onclick="closewindow(this.parentNode.parentNode);notepadNewFile();" class="title close">✖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding:0px;height:100%;width:100%;">
        <div class="menuBar">
            <button onclick="notepadSaveFile();">Save</button>
            <button onclick="notepadLoadFile();">Load</button>
            <button onclick="notepadDeleteFile();">Delete</button>
            <button class="right" onclick="notepadNewFile();">New</button>
        </div>
        <textarea id="notepadTextField" style="resize:none;width:100%;height:100%;min-width:794px;min-height:507px;" spellcheck="false"></textarea>
    </div>
</div>
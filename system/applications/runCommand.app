<div class="window" id="Execute Command" onclick="bringToFront(this);"
    style="width:610px;min-height:fit-content;resize: none;">
    <div class="windowTitle" onclick="bringToFront(parentNode);">
        <p>Execute Command</p>
        <button onclick="closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding-left:0px;">
        <br>
        <p style="margin-left:15px;">Enter command to execute: </p><br>
        <center>
            <input id="runDialogInput"
                style="padding:10px;width:600px;margin-left:20px;font-family:monospace;margin-bottom:21px;"
                spellcheck="false">
            <button style="padding:10px;margin-left:10px;margin-bottom:20px;margin-right:20px"
                onclick="new ArcTermUserInterface().executeProgram([document.getElementById('runDialogInput').value])">Execute</button>
        </center>
    </div>
</div>
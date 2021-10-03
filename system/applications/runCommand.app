<div class="window" id="Execute Command" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Execute Command</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <br>
        <p class="runDialog">Enter command to execute: </p><br>
        <center>
            <input id="runDialogInput" spellcheck="false">
            <button class="runDialogExecute" onclick="new ArcTermUserInterface().executeProgram([document.getElementById('runDialogInput').value])">Execute</button>
        </center>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/runCommand.css">
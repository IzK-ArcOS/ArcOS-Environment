<div class="window" id="Open With" onclick="new WindowLogic().bringToFront(this);" style="min-height:480px;max-height:480px;min-width:482px;max-width: 482px;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);">
        <p class="titleText">Open With</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding:20px;">
        <p>Open this file: </p>
        <input class="fullWidth" id="openWithFileInput">
        <br>
        <p>With this application:</p>
        <button class="fullWidth folder big" style="max-width:unset;width:100%;padding-left:10px;" onclick="new WindowLogic().closewindow(document.getElementById('Open With'));openWithNotepad(document.getElementById('openWithFileInput').value);">
            <img src="./system/images/notepad.svg" style="height:30px;vertical-align:middle;">&nbsp;&nbsp;Notepad
        </button>
        <button class="fullWidth folder big" style="max-width:unset;width:100%;padding-left:10px;" onclick="new WindowLogic().closewindow(document.getElementById('Open With'));executeECS(document.getElementById('openWithFileInput').value);">
            <img src="./system/images/execute command.svg"
                style="height:30px;vertical-align:middle;">&nbsp;&nbsp;Execute Command Shortcut Executer
        </button>
        <button class="fullWidth folder big" style="max-width:unset;width:100%;padding-left:10px;" onclick="new WindowLogic().closewindow(document.getElementById('Open With'));new WindowLogic().loadWindow(document.getElementById('openWithFileInput').value,0);">
            <img src="./system/images/addappicon.svg" style="height:30px;vertical-align:middle;">&nbsp;&nbsp;Application
            Loader
        </button>
        <button class="fullWidth folder big" style="max-width:unset;width:100%;padding-left:10px;" onclick="new WindowLogic().closewindow(document.getElementById('Open With'))">
            <img src="./system/images/errorMessage.svg" style="height:30px;vertical-align:middle;">&nbsp;&nbsp;Cancel
        </button>
    </div>
</div>
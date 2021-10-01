<div class="window" id="App Manager" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">App Manager</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <table>
            <tr>
                <td><b>Process Name</b></td>
                <td></td>
            </tr>
            <tr>
                <td id="appManagerProcessNames"></td>
                <td id="appManagerProcessKillButtons"></td>
            </tr>
        </table>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/appManager.css">
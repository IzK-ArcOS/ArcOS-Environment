<div class="window" id="App Manager" onclick="windowLogic.bringToFront(this);" style="min-width:320px;min-height:180px;resize: none;">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">App Manager</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);" style="padding:20px;">
        <table>
            <tr>
                <td><b>Process Name</b></td>
                <td></td>
            </tr>
            <tr>
                <td id="appManagerProcessNames" style="width:400px;"></td>
                <td id="appManagerProcessKillButtons"></td>
            </tr>
        </table>
    </div>
</div>
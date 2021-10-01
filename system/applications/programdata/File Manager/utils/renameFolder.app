<div class="window" id="File Manager - Rename Folder" onclick="new WindowLogic().bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);">
        <p class="titleText">File Manager - Rename Folder</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of the file you wish to rename:</p>
        Old folder name:<input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerRenameFolderOldNameInput"><br> New folder name:<input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerRenameFolderNewNameInput">
        <br>
        <button onclick="renameFolder(fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerRenameFolderOldNameInput').value,fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerRenameFolderNewNameInput').value);">Rename</button>
    </div>
</div>
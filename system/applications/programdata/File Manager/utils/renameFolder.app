<div class="window" id="File Manager - Rename Folder" onclick="windowLogic.bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">File Manager - Rename Folder</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of the file you wish to rename:</p>
        Old folder name:<input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerRenameFolderOldNameInput"><br> New folder name:<input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerRenameFolderNewNameInput">
        <br>
        <button onclick="renameFolder(fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerRenameFolderOldNameInput').value,fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerRenameFolderNewNameInput').value);">Rename</button>
    </div>
</div>
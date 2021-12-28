<div class="window" id="File Manager - Delete Folder" onclick="windowLogic.bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">File Manager - Delete Folder</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of the folder you wish to delete:</p>
        <input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerDeleteFolderInput">
        <br>
        <button onclick="deleteFolder(fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerDeleteFolderInput').value);">Delete</button>
    </div>
</div>
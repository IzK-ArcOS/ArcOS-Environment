<div class="window" id="File Manager - Create File" onclick="bringToFront(this);" style="resize:none;width:fit-content;height:fit-content;min-width:unset;min-height:unset;">
    <div class="windowTitle" onclick="bringToFront(parentNode);">
        <p class="titleText">File Manager - Create File</p>
        <button onclick="closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding:20px;">
        <p style="margin-bottom:5px;">Enter the name of the file you wish to create (with extension):</p>
        <input style="padding-top:10px;padding-bottom:10px;width:100%;min-width:500px;" id="fileExplorerCreateFileInput">
        <br>
        <button onclick="createFile(fileExplorerCurrentDir + '/' + document.getElementById('fileExplorerCreateFileInput').value);">Create</button>
    </div>
</div>
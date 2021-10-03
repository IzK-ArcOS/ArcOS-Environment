<div class="window" id="File Manager" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);" ondblclick="windowLogic.toggleMaximizedState(this.parentNode);">
        <p class="titleText">File Manager</p>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Create File');"><img src="./system/images/File Manager - Create File.svg"></button>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Delete File');"><img src="./system/images/File Manager - Delete File.svg"></button>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Rename File');"><img src="./system/images/File Manager - Rename File.svg"></button>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Create Folder');"><img src="./system/images/File Manager - Create Folder.svg"></button>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Delete Folder');"><img src="./system/images/File Manager - Rename Folder.svg"></button>
        <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Rename Folder');"><img src="./system/images/File Manager - Delete Folder.svg"></button>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.toggleMaximizedState(this.parentNode.parentNode);" class="title"><span class="material-icons">crop_square</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <div class="fileExplorerLeftPane">
            <div class="fileExplorerLeftPaneDiv" id="fileExplorerRecentLocations">
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Create File');">Create
                    File</button><br>
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Delete File');">Delete
                    File</button><br>
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Rename File');">Rename
                    File</button><br>
                <hr>
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Create Folder');">Create
                    Folder</button><br>
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Delete Folder');">Delete
                    Folder</button><br>
                <button class="fileExplorerSideBar" onclick="windowLogic.openWindow('File Manager - Rename Folder');">Rename
                    Folder</button><br>

            </div>
            <br>
            <h4>Locations</h4>
            <div class="fileExplorerLeftPaneDiv" id="fileExplorerRecentLocations">
                <button class="fileExplorerSideBar" onclick="fileExplorerOpenDir(__dirname)">Root
                    Folder</button><br>
                <button class="fileExplorerSideBar" onclick="getDriveLetters()">Drives</button>
            </div>
        </div>
        <div class="fileExplorerTopPane">
            <button onclick="fileExplorerParentDir()">^</button>
            <input class="fullwidth" id="fileExplorerAddressBar">
            <button onclick="fileExplorerOpenDir(document.getElementById('fileExplorerAddressBar').value);">Go</button>
        </div>
        <div class="fileExplorerMainFrame" id="fileExplorerMainFrameOut">

        </div>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/fileExplorer.css">
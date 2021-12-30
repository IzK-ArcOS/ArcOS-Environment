<div class="window" id="File Manager" onclick="windowLogic.bringToFront(this);">
        <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);"
                ondblclick="windowLogic.toggleMaximizedState(this.parentNode);">
                <button class="titleAction" onclick="getDriveLetters();"><img src="./../img/hdd.svg"></button>
                <p class="titleText">File Manager</p>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Create File');"><img
                                src="./../img/file manager - create file.svg"></button>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Delete File');"><img
                                src="./../img/file manager - delete file.svg"></button>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Rename File');"><img
                                src="./../img/file manager - rename file.svg"></button>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Create Folder');"><img
                                src="./../img/file manager - create folder.svg"></button>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Delete Folder');"><img
                                src="./../img/file manager - delete folder.svg"></button>
                <button class="titleAction" onclick="windowLogic.openWindow('File Manager - Rename Folder');"><img
                                src="./../img/file manager - rename folder.svg"></button>
                <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span
                                class="material-icons">close</span></button>
                <button onclick="windowLogic.toggleMaximizedState(this.parentNode.parentNode);" class="title"><span
                                class="material-icons">crop_square</span></button>
                <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span
                                class="material-icons">minimize</span></button>
        </div>
        <div class="body" onclick="windowLogic.bringToFront(parentNode);">
                <div class="fileExplorerTopPane">
                        <button onclick="fileExplorerParentDir()"><span
                                        class="material-icons">expand_less</span></button>
                        <input class="fullwidth" id="fileExplorerAddressBar">
                        <button onclick="fileExplorerOpenDir(document.getElementById('fileExplorerAddressBar').value);"><span
                                        class="material-icons">chevron_right</span></button>
                </div>
                <div class="fileExplorerMainFrame" id="fileExplorerMainFrameOut">

                </div>
        </div>
</div>

<link rel="stylesheet" href="./../apps/fileExplorer.css">
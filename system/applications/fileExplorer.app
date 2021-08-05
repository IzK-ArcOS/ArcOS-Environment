<div class="window" id="File Manager" onclick="bringToFront(this);" style="min-width: 948px; min-height: 514px;">
    <div class="windowTitle" onclick="bringToFront(parentNode);" ondblclick="toggleMaximizedState(this.parentNode);">
        <p>File Manager</p>
        <button onclick="closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="toggleMaximizedState(this.parentNode.parentNode);" class="title">🗖</button>
        <button onclick="minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="bringToFront(parentNode);" style="padding:0px;">
        <div class="fileExplorerLeftPane">
            <h4>Tasks</h4>
            <div class="fileExplorerLeftPaneDiv" id="fileExplorerRecentLocations">
                <button class="fileExplorerSideBar" onclick="fileExplorerParentDir()">Parent Directory</button>
                <hr>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Create File');">Create
                    File</button><br>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Delete File');">Delete
                    File</button><br>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Rename File');">Rename
                    File</button><br>
                <hr>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Create Folder');">Create
                    Folder</button><br>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Delete Folder');">Delete
                    Folder</button><br>
                <button class="fileExplorerSideBar" onclick="openWindow('File Manager - Rename Folder');">Rename
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
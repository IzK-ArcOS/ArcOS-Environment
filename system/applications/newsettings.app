<div class="window" id="Settings" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);" ondblclick="windowLogic.toggleMaximizedState(this.parentNode);">
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="titlesettings close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.toggleMaximizedState(this.parentNode.parentNode);" class="titlesettings"><span class="material-icons">crop_square</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="titlesettings"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <div class="controlPanelLeftPane">
            <center>
                <h2 class="settingsHeader"><img src="./system/images/settings.svg">&nbsp;&nbsp;Settings</h2>
            </center>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('home',this);">
                <span class="material-icons">home</span>
                &nbsp;&nbsp;
                <span class="caption">Home</span>
            </button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('personalize',this);">
                <span class="material-icons">palette</span>
                &nbsp;&nbsp;
                <span class="caption">Personalization</span>
            </button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('addapp',this);">
                <span class="material-icons">extension</span>
                &nbsp;&nbsp;
                <span class="caption">Import App</span>
            </button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('user',this);">
                <span class="material-icons">account_circle</span>
                &nbsp;&nbsp;
                <span class="caption">User Settings</span>
            </button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('about',this);">
                <span class="material-icons">info</span>
                &nbsp;&nbsp;
                <span class="caption">About</span>
            </button><br>
            <button class="fullWidth controlPanelSidebar" onclick="shell.openExternal('https://github.com/TWI-ArcOS/ArcOS-Environment/issues');">
                <span class="material-icons">bug_report</span>
                &nbsp;&nbsp;
                <span class="caption">Report bugs</span>
            </button><br>
        </div>
        <div class="controlPanelMainFrame" id="controlPanelContent">

        </div>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/newsettings.css">
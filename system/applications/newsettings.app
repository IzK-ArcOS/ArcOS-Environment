<div class="window" id="Settings" onclick="new WindowLogic().bringToFront(this);" style="min-width: 800px; min-height: 600px;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);" ondblclick="new WindowLogic().toggleMaximizedState(this.parentNode);">
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="titlesettings close">✖</button>
        <button onclick="new WindowLogic().toggleMaximizedState(this.parentNode.parentNode);" class="titlesettings">🗖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="titlesettings">🗕</button>
    </div>
    <div class="body" onclick="new WindowLogic().bringToFront(parentNode);" style="padding:0px;">
        <div class="controlPanelLeftPane">
            <center>
                <h2 style="font-weight: 300;margin-bottom:20px;"><img src="./system/images/settings.svg" style="height:25px;margin-top:30px;vertical-align: bottom;">&nbsp;&nbsp;Settings</h2>
            </center>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('home',this);"><span
                    class="material-icons">home</span>&nbsp;&nbsp;<span
                    style="vertical-align: top;">Home</span></button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('personalize',this);"><span
                    class="material-icons">palette</span>&nbsp;&nbsp;<span
                    style="vertical-align: top;">Personalization</span></button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('addapp',this);"><span
                    class="material-icons">extension</span>&nbsp;&nbsp;<span style="vertical-align: top;">Import
                    App</span></button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('user',this);"><span
                    class="material-icons">account_circle</span>&nbsp;&nbsp;<span style="vertical-align: top;">User
                    Settings</span></button><br>
            <button class="fullWidth controlPanelSidebar" onclick="openSettingsPane('about',this);"><span
                    class="material-icons">info</span>&nbsp;&nbsp;<span
                    style="vertical-align: top;">About</span></button><br>
        </div>
        <div class="controlPanelMainFrame" id="controlPanelContent">

        </div>
    </div>
</div>
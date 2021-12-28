<div class="newStartMenu small" id="startMenu" tabindex="-1">
    <div class="bottomPane">
        <span class="h3" id="usernameStartMenu"></span>
        <button class="transparent newStartMenuShutDownButton" onclick="windowLogic.openWindow('Shut Down ArcOS');">
            <span class="material-icons">
                power_settings_new
            </span>
        </button>

        <button class="transparent newStartMenuShutDownButton" onclick="powerLogic.lock();">
            <span class="material-icons">
                lock
            </span>
        </button>
    </div>
    <div class="leftPane" id="startMenuAppList"></div>
    <div class="rightPane">
        <button class="transparent fullWidth textAlignLeft" onclick="windowLogic.openWindow('File Manager');">
            <img src="./../img/file manager.svg">&nbsp;&nbsp;File Manager
        </button><br>
        <hr>
        <button class="transparent fullWidth textAlignLeft" onclick="windowLogic.openWindow('Settings');">
            <img src="./../img/settings.svg">&nbsp;&nbsp;Settings
        </button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('personalize',document.getElementsByClassName('controlPanelSidebar')[1]);windowLogic.openWindow('Settings');">
            <span class="material-icons">palette</span>&nbsp;&nbsp;Personalization
        </button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('addapp',document.getElementsByClassName('controlPanelSidebar')[2]);windowLogic.openWindow('Settings');">
            <span class="material-icons">extension</span>&nbsp;&nbsp;Import App
        </button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('user',document.getElementsByClassName('controlPanelSidebar')[3]);windowLogic.openWindow('Settings');">
            <span class="material-icons">account_circle</span>&nbsp;&nbsp;User Settings
        </button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('updates',document.getElementsByClassName('controlPanelSidebar')[5]);windowLogic.openWindow('Settings');">
            <span class="material-icons">autorenew</span>&nbsp;&nbsp;Updates
        </button><br>
        <hr>
        <button class="transparent fullWidth textAlignLeft" onclick="windowLogic.openWindow('Execute Command');">
            <img src="./../img/execute command.svg">&nbsp;&nbsp;Execute Command
        </button><br>
    </div>
</div>
<div class="notificationCenter retracted" id="notificationCenter" tabindex="-1">
    <h2 class="notificationCenterHeader">
        Notifications
        <button id="notificationCenterClearButton" class="transparent" onclick="notificationList = [];">
            Clear
        </button>
    </h2>
    <div class="notifications" id="notificationCenterInline"></div>
    <div class="actions">
        <span class="row">
            <div class="notificationCenterAction">
                <h3 margin-top:10px;">Current Time</h3>
                <h1 style="margin:0px;"><span id="taskbarClockWidgetTime"></span>
                </h1>
            </div>
            <div class="notificationCenterAction">
                <br>
                <p style="margin-top:10px;">
                    <label for="volumeControlEnableSoundSwitch" style="vertical-align: middle;">Mute Sound</label>
                    <input type="checkbox" id="volumeControlEnableSoundSwitch"
                        style="min-width: unset;vertical-align: middle;" onclick="changeVolumeState();">
                </p>
            </div>
        </span>
        <span class="row">
            <div class="notificationCenterAction">
                <p style="margin-bottom:5px;">Volume:</p>
                <input type="range" min="1" max="10" id="systemVolumeSlider" style="width:50%;padding:0px;"
                    class="slider" onchange="personalizationLogic.updateVolume(this);">
            </div>
            <div class="notificationCenterAction">
                <h3 style="margin: 9px 0;">
                    ArcOS Updates
                </h3>
                <button class="transparent"
                    onclick="openSettingsPane('updates',document.getElementsByClassName('controlPanelSidebar')[5]);windowLogic.openWindow('Settings');">Goto
                    Settings</button>
            </div>
        </span>
    </div>
</div>
<div class="taskbar" id="taskbar" tabindex="-1">
    <button class="startButton" id="startButton" onclick="toggleStart();">
        <img src="./../img/systemIcon.svg" height="20px">
    </button>
    <div id="taskbarButtons" class="taskbarButtons"></div>
    <span style="float:right;height:43px;">
        <button class="startButton" style="height:100%;margin-right:10px;padding-top:12px;"
            id="notificationCenterButton" onclick="notificationLogic.toggleNotificationCenter();">
            <span class="material-icons" style="vertical-align: top;font-size:16px;">notifications</span> &nbsp;&nbsp;
            <span class="material-icons" style="vertical-align: top;font-size:15px;">volume_up</span>&nbsp;&nbsp;
            <span id="taskbarClock" style="vertical-align: middle;">--:--</span>
        </button>
    </span>
</div>

<link rel="stylesheet" href="./../apps/newUserInterface.css">
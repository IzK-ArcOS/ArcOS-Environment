<div class="newStartMenu" id="startMenu">
    <div class="bottomPane">
        <span class="h3" id="usernameStartMenu"></span>
        <button class="transparent newStartMenuShutDownButton" onclick="openWindow('Shut Down ArcOS');"><span
                class="material-icons" style="font-size:20px;">power_settings_new</span></button>
        <button class="transparent newStartMenuShutDownButton" onclick="new PowerLogic().lock();"><span
                class="material-icons" style="font-size:20px;">lock</span></button>
    </div>
    <div class="leftPane" id="startMenuAppList"></div>
    <div class="rightPane">
        <button class="transparent fullWidth textAlignLeft" onclick="openWindow('File Manager');"><img
                src="./system/images/file manager.svg" style="height:15px;vertical-align:middle">&nbsp;&nbsp;File
            Manager</button><br>
        <hr>
        <button class="transparent fullWidth textAlignLeft" onclick="openWindow('Settings');"><img
                src="./system/images/settings.svg"
                style="height:15px;vertical-align:middle">&nbsp;&nbsp;Settings</button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('personalize',document.getElementsByClassName('controlPanelSidebar')[1]);openWindow('Settings');"><span
                class="material-icons"
                style="font-size:20px;vertical-align: bottom;">palette</span>&nbsp;&nbsp;Personalization</button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('addapp',document.getElementsByClassName('controlPanelSidebar')[2]);openWindow('Settings');"><span
                class="material-icons" style="font-size:20px;vertical-align: bottom;">extension</span>&nbsp;&nbsp;Import
            App</button><br>
        <button class="transparent fullWidth textAlignLeft"
            onclick="openSettingsPane('user',document.getElementsByClassName('controlPanelSidebar')[3]);openWindow('Settings');"><span
                class="material-icons"
                style="font-size:20px;vertical-align: bottom;">account_circle</span>&nbsp;&nbsp;User
            Settings</button><br>

        <hr>
        <button class="transparent fullWidth textAlignLeft" onclick="openWindow('Execute Command');"><img
                src="./system/images/execute command.svg" style="height:15px;vertical-align:middle">&nbsp;&nbsp;Execute
            Command</button><br>
    </div>
</div>
<div class="notificationCenter retracted" id="notificationCenter">
    <h2 style="margin:14px 20px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 100;">
        Notifications<button style="float:right;min-width:unset;" class="transparent"
            onclick="notificationList = [];">Clear</button></h2>
    <div class="notifications" id="notificationCenterInline"></div>
    <div class="actions">
        <span style="display:flex">
            <div class="notificationCenterAction">
                <h3 style="margin-top:10px;">Current Time</h3>
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
        <span style="display:flex">
            <div class="notificationCenterAction">
                <p style="margin-bottom:5px;">Volume:</p>
                <input type="range" min="1" max="10" id="systemVolumeSlider" style="width:50%;padding:0px;"
                    class="slider" onchange="new PersonalizationLogic().updateVolume(this);">
            </div>
            <div class="notificationCenterAction">
            </div>
        </span>
    </div>
</div>
<div class="taskbar" id="taskbar">
    <button class="startButton" id="startButton" onclick="toggleStart();">
        <img src="./system/images/systemIcon.svg" height="20px">
    </button>
    <div id="taskbarButtons" class="taskbarButtons"></div>
    <span style="float:right;height:43px;">
        <button class="startButton" style="height:100%;margin-right:10px;padding-top:12px;"
            id="notificationCenterButton" onclick="new NotificationLogic().toggleNotificationCenter();">
            <h3"><span class="material-icons"
                    style="vertical-align: top;font-size:16px;">notifications</span>&nbsp;&nbsp;<span
                    class="material-icons" style="vertical-align: top;font-size:15px;">volume_up</span>&nbsp;&nbsp;
                <span id="taskbarClock" style="vertical-align: middle;">--:--</span></h3>
        </button>
    </span>
</div>
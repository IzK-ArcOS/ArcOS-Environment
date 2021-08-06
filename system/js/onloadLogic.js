new consoleNotifier().startModule("ArcOS.System.onloadLogic");

onload = function() {
    if (!clientInformation.appVersion.includes("Electron")) { window.location.href = "invalidClient.html"; }
    let ol = new OnloadLogic();
    ol.startTime();
    ol.loadDefaultApps();
    setTimeout(() => {
        ol.loadSafemodeDependingFunctions();
        ol.onloadSetEventListeners();
        ol.onloadSetIntervals();
        setToolbarTrigger();
        new ContextMenuLogic().hideMenu();
        ol.loadTheme();
        ol.loadTaskbarPos();
        populateAppManager();
        getDriveLetters();
        updateTaskBar();
        hideStart();
        openSettingsPane("home", document.getElementsByClassName("controlPanelSidebar")[0]);
        new NotificationLogic().startNotificationCenterPopulator();
        globalVolume = parseInt(this.localStorage.getItem(args.get("uername") + "_volume"));
        document.getElementById("systemVolumeSlider").value = globalVolume;
        setTimeout(() => {
            ol.hideBlock();
        }, 500);
    }, 1000);
}

onbeforeunload = function() {
    if (!allowExit) {
        new ErrorLogic().sendError("Access Denied", "The global variable <code>allowExit</code> is set to <code>false</code>, so you can't log off or shutdown.");
        return allowExit;
    } else {
        localStorage.setItem("safeMode", 0);
        localStorage.removeItem("username");
        deleteUserData("ArcOS Safe Mode", false);
        deleteWindowData();
    }
}

new consoleNotifier().notifyStartService("ArcOS.System.onloadLogic.startTime service");

class OnloadLogic {
    startTime() {
        setInterval(() => {
            try {
                let today = new Date();
                let h = today.getHours();
                let m = today.getMinutes();
                let s = today.getSeconds();
                m = this.checkTime(m);
                s = this.checkTime(s);
                document.getElementById('taskbarClock', 0).innerText =
                    h + ":" + m;
                document.getElementById("taskbarClockWidgetTime", 0).innerText =
                    h + ":" + m + ":" + s;
            } catch {}
        }, 500);
    }
    
    checkTime(i) {
        if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
        return i;
    }
    
    onloadSetWindowControls() {
        try {
            setInterval(() => {
                try {
                    let eas = localStorage.getItem(args.get("username") + "_enableAnimations");
                    let tbl = localStorage.getItem(args.get("username") + "_titlebarButtonsLeft");
                    let mtd = localStorage.getItem(args.get("username") + "_muted");
                    let stl = localStorage.getItem(args.get("username") + "_noTaskbarButtonLabels");
                    if (eas != document.getElementById("preferencesAnimationsSwitch").checked.toString()) {
                        switch (eas) {
                            case "true":
                                document.getElementById("preferencesAnimationsSwitch").checked = true;
                                document.getElementById("animationsAddonLoader").href = "";
                                break;
                            default:
                                document.getElementById("preferencesAnimationsSwitch").checked = false;
                                document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
                                break;
                        }
                    }
                    if (stl != document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked.toString()) {
                        switch (stl) {
                            case "false":
                                document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked = true;
                                updateTaskBar();
                                break;
                            default:
                                document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked = false;
                                updateTaskBar();
                                break;
                        }
                    }
                    switch (tbl) {
                        case "true":
                            document.getElementById("preferencesTitlebarButtonsSwitch").checked = true;
                            //localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "true")
                            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
                            break;
                        default:
                            document.getElementById("preferencesTitlebarButtonsSwitch").checked = false;
                            //localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "false")
                            document.getElementById("titlebarAddonLoader").href = "";
                            break;
                    }
                    switch (mtd) {
                        case "true":
                            document.getElementById("volumeControlEnableSoundSwitch").checked = true;
                            break;
                        default:
                            localStorage.setItem(args.get("username") + "_muted", 0);
                            break;
                    }
                } catch {}
            }, 100);
            new consoleNotifier().notifyStartService("ArcOS.System.onloadLogic.onloadSetWindowControls");
    
        } catch (e) {
            new consoleNotifier().notifyStopService("ArcOS.System.onloadLogic.onloadSetWindowControls:" + e);
            onloadSetWindowControls();
        }
    }

    onloadSetDesktopIcons() {
        try {
            new consoleNotifier().notifyStartService("ArcOS.System.onloadLogic.onloadDesktopIcons");
            let show = localStorage.getItem(args.get("username") + "_showDesktopIcons");
            switch (show) {
                case 0:
                    document.getElementById("desktopIcons").style.visibility = 'hidden';
                    localStorage.setItem(args.get("username") + "_showDesktopIcons", 0);
                    break;
                case 1:
                    document.getElementById("showDesktopIconsSwitch").setAttribute('checked', 'true');
                    document.getElementById("desktopIcons").style.visibility = 'visible';
                    localStorage.setItem(args.get("username") + "_showDesktopIcons", 1);
                    break;
                default:
                    document.getElementById("showDesktopIconsSwitch").setAttribute('checked', 'true');
                    document.getElementById("desktopIcons").style.visibility = 'visible';
                    localStorage.setItem(args.get("username") + "_showDesktopIcons", 1);
                    break;
            }
        } catch {
            if (onloadDesktopIconsRetryCount >= 3) {
                new ErrorLogic().bsod("OnloadLogic.onloadSetDesktopIcons: OSDIRC_OVERFLOW", "process couldn't be started.")
            } else {
                new consoleNotifier().notifyStopService("ArcOS.System.onloadLogic.onloadDesktopIcons");
                onloadSetDesktopIcons();
            }
        }
    }
    
    onloadSetIntervals() {
        setInterval(() => {
            try {
                let passwordStatus = "";
                if (localStorage.getItem(args.get("username") + "_pswd") != null) {
                    passwordStatus = "Password Protected";
                } else {
                    passwordStatus = "No Password";
                }
                document.getElementById("userSettingsPasswordStatusDisplay", 0).innerHTML = passwordStatus
                document.getElementById("usernameDisplay", 0).innerHTML = args.get("username");
                let newPicture = "./system/images/profilePictures/" + localStorage.getItem(args.get("username") + "_picture") + ".png";
                document.getElementById("userSettingsProfilePicture", 0).src = newPicture
            } catch {}
            document.getElementById("usernameStartMenu").innerHTML = args.get('username');
        }, 5);
        setInterval(() => {
            if (localStorage.getItem(args.get("username")) != "1") {
                new ErrorLogic().bsod("OnloadLogic.onloadSetIntervals: USR_DATA_MISSING", "The user data corrupted while the session was running.");
            }
        }, 5);
        setInterval(() => {
            try {
                new DOMLogic().getElemId("aboutScreenVersionNumber").innerText = version;
            } catch {}
        }, 5);
        setInterval(() => {
            let newVolume = parseInt(document.getElementById("systemVolumeSlider").value) / 10;
            localStorage.setItem(args.get("username") + "_volume", newVolume)
            globalVolume = newVolume;
    
        }, 50)
    }
    
    onloadSetEventListeners() {
        window.addEventListener('keydown', (e) => {
            let { key, altKey } = e;
            if (key === 'F4' && altKey) {
                e.preventDefault();
                if (activeapps.length == 0) {
                    openWindow("Shut Down ArcOS");
                } else {
                    closewindow(document.getElementById(focusedWindow));
                }
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        });
    
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.altKey && e.shiftKey && e.key.toLowerCase() === 'x') {
                openWindow("Execute Command");
            }
        });
    
        new consoleNotifier().notifyStartService("ArcOS.System.onloadLogic.EventListener.mousedown", "taskbarVolumeControl");
        window.addEventListener('mousedown', function(event) {
            try {
                let center = document.getElementById('notificationCenter', 0);
                let button = document.getElementById('notificationCenterButton', 0);
                if (!event.path.includes(center) &&
                    !event.path.includes(button)) {
                    if (!center.classList.contains("retracted")) {
                        center.classList.add("retracted");
                    }
                }
            } catch (e) {
                throw e;
                //new ErrorLogic().bsod("OnloadLogic.onloadSetEventListeners: TVC_MISSING", "The taskbarVolumeControl couldn't be found.")
            }
    
        });
    }
    
    loadTaskbarPos() {
        try {
            let pos = localStorage.getItem(args.get("username") + "_taskbarpos");
            switch (pos) {
                case "top":
                    document.getElementById("taskbarAddonLoader").href = "./system/css/taskbarontop.css";
                case "bottom":
                    document.getElementById("taskbarAddonLoader").href = "";
            }
        } catch {
            loadTaskbarPos();
        }
    }
    
    loadTheme() {
        try {
            if (args.get("username") + "_theme" !== "") {
                let theme = localStorage.getItem(args.get("username") + "_theme");
                switch (theme) {
                    case "darkrounded":
                        document.getElementById("addonShellLoader").href = "";
                        break;
                    case "darksharp":
                        document.getElementById("addonShellLoader").href = "./system/css/darkModeSharp.css";
                        break;
                    case "lightrounded":
                        document.getElementById("addonShellLoader").href = "./system/css/lightmoderounded.css";
                        break;
                    case "lightsharp":
                        document.getElementById("addonShellLoader").href = "./system/css/lightmodesharp.css";
                        break;
                }
            } else {
                localStorage.setItem(args.get("username") + "_theme", "darkrounded");
            }
        } catch { loadTheme(); }
    }
    
    showBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
    }
    
    hideBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "hidden";
        document.getElementsByClassName("block")[0].style.opacity = "0";
    }
    
    loadTitlebarButtonPos() {
        let tbp = localStorage.getItem(args.get("username") + "_titlebarButtonsLeft");
        if (tbp == "true") {
            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
        } else {
            document.getElementById("titlebarAddonLoader").href = "";
        }
    }
    
    loadDefaultApps() {
        loadWindow("./system/applications/newUserInterface.app", 1, 0);
        setTimeout(() => {
            //loadWindow("./system/applications/controlPanel.app", 1);
            loadWindow("./system/applications/calculator.app", 1);
            loadWindow("./system/applications/shutdown.app", 1);
            //loadWindow("./system/applications/changeUsername.app", 1);
            //loadWindow("./system/applications/themeSelector.app", 1);
            //loadWindow("./system/applications/addApp.app", 1);
            loadWindow("./system/applications/runCommand.app", 1);
            //loadWindow("./system/applications/wallpaperSettings.app", 1);
            //loadWindow("./system/applications/systemSettings.app", 1);
            loadWindow("./system/applications/notepad.app", 1);
            loadWindow("./system/applications/programdata/Notepad/utils/loadFile.app", 1, 0);
            loadWindow("./system/applications/programdata/Notepad/utils/saveFile.app", 1, 0);
            loadWindow("./system/applications/programdata/Notepad/utils/delFile.app", 1, 0);
            loadWindow("./system/applications/desktopIcons.app", 1, 0);
            //loadWindow("./system/applications/programdata/User Settings/utils/changePassword.app", 1);
            //loadWindow("./system/applications/programdata/User Settings/utils/changeUsername.app", 1);
            //loadWindow("./system/applications/programdata/User Settings/utils/changeUserPicture.app", 1);
            //loadWindow("./system/applications/programdata/User Settings/utils/createUserAccount.app", 1);
            //loadWindow("./system/applications/programdata/User Settings/utils/deleteUserAccount.app", 1);
            loadWindow("./system/applications/fileExplorer.app", 1);
            loadWindow("./system/applications/programdata/File Manager/utils/createFile.app", 1, 0);
            loadWindow("./system/applications/programdata/File Manager/utils/deleteFile.app", 1, 0);
            loadWindow("./system/applications/programdata/File Manager/utils/renameFile.app", 1, 0);
            loadWindow("./system/applications/programdata/File Manager/utils/renameFolder.app", 1, 0);
            loadWindow("./system/applications/programdata/File Manager/utils/deleteFolder.app", 1, 0);
            loadWindow("./system/applications/programdata/File Manager/utils/createFolder.app", 1, 0);
            loadWindow("./system/applications/imageViewer.app", 1, 0);
            loadWindow("./system/applications/appManager.app", 1);
            loadWindow("./system/applications/openWith.app", 1);
            loadWindow("./system/applications/newsettings.app", 1);
            loadWindow("./system/applications/ArcTerm.app",0,1);
            setTimeout(() => {
                initiateArcTerm();
            }, 100);
        }, 100);
    }
    
    noShell() {
        try {
            document.getElementById("shellLoader").href = "";
            document.body.style.backgroundColor = "#fff";
            let windows = document.getElementsByClassName("window");
            for (let i = 0; i < windows.length; i++) {
                windows[i].style.position = "absolute";
            }
        } catch {}
        //try { closeAllWindows(); } catch {}
    }
    
    loadSafemodeDependingFunctions() {
        if (localStorage.getItem("safeMode") != 1) {
            this.onloadSetDesktopIcons();
            this.onloadSetIntervals();
            this.onloadSetWindowControls();
        } else {
            document.getElementsByClassName("block")[0].style.backgroundImage = "unset";
            document.getElementById("addonShellLoader").href = "./system/css/darkModeSharp.css";
            document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
            document.getElementById("wallpaper").style.backgroundImage = "unset";
            new ErrorLogic().sendError("Safe Mode", "ArcOS is running in Safe Mode.<br> - If this was not your intention, just restart from the start menu.<br> - If this was your intention, use this mode only to repair ArcOS if it doesn't boot. ", 1)
        }
    }
}

    
let onloadDesktopIconsRetryCount = 0;
new consoleNotifier().startModule("ArcOS.System.onloadLogic");



onload = function() {
    if (!clientInformation.appVersion.includes("Electron")) { window.location.href = "invalidClient.html"; }
    setInterval(() => {
        try {
            if (this.localStorage.getItem("safeMode") != "1") {
                let usrEnabled = getCurrentUserData();
                if (!usrEnabled || !usrEnabled.enabled) {
                    errorLogic.bsod("OnloadLogic.onloadSetIntervals: USR_DATA_MISSING", "The user data corrupted while the session was running.");
                }
            }
        } catch {}
    }, 5);
    let ol = onloadLogic;
    ol.startTime();
    ol.loadDefaultApps();
    setTimeout(() => {
        ol.loadSafemodeDependingFunctions();
        setTimeout(() => {
            ol.hideBlock();
        }, 500);
    }, 1000);
    if (this.localStorage.getItem("safeMode") == "1") {
        createUserData("ArcOS Safe Mode", true, false);
    }
}

onbeforeunload = function() {
    if (!allowExit) {
        errorLogic.sendError("Access Denied", "The global variable <code>allowExit</code> is set to <code>false</code>, so you can't log off or shutdown.");
        return allowExit;
    } else {
        localStorage.setItem("safeMode", 0);
        localStorage.removeItem("username");
        deleteUserData("ArcOS Safe Mode", true, false);
        windowLogic.deleteWindowData();
    }
}

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
                let userData = getCurrentUserData();
                let eas = userData.enableAnimations.toString();
                let mtd = userData.muted.toString();
                let stl = userData.noTaskbarButtonLabels.toString();

                try {
                    switch (eas) {
                        case "true":
                            document.getElementById("preferencesAnimationsSwitch").checked = true;
                            document.getElementById("animationsAddonLoader").href = "";
                            break;
                        default:
                            document.getElementById("preferencesAnimationsSwitch").checked = false;
                            document.getElementById("animationsAddonLoader").href = "system/css/noAnimations.css";
                            break;
                    }
                } catch {}
                try {
                    if (stl != document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked.toString()) {
                        switch (stl) {
                            case "false":
                                try { document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked = true; } catch {}
                                userData.noTaskbarButtonLabels = false;
                                windowLogic.updateTaskBar();
                                break;
                            default:
                                try { document.getElementById("preferencesTaskbarButtonLabelsSwitch").checked = false; } catch {}
                                userData.noTaskbarButtonLabels = true;
                                windowLogic.updateTaskBar();
                                break;
                        }
                        localStorage.setItem(args.get("username"), JSON.stringify(userdata));
                    }
                } catch {}
                try {
                    switch (mtd) {
                        case "true":
                            document.getElementById("volumeControlEnableSoundSwitch").checked = true;
                            break;
                        default:
                            userData.muted = 0;
                            localStorage.setItem(args.get("username"), JSON.stringify(userdata));
                            break;
                    }
                } catch {}
            }, 100);

        } catch (e) {
            this.onloadSetWindowControls();
        }
    }

    onloadSetDesktopIcons() {
        try {
            new consoleNotifier().notifyStartService("ArcOS.System.onloadLogic.onloadDesktopIcons");
            let userData = getCurrentUserData();
            let show = userData.showDesktopIcons;
            switch (show) {
                case 0:
                    document.getElementById("desktopIcons").style.visibility = 'hidden';
                    userData.showDesktopIcons = 0
                    break;
                case 1:
                    document.getElementById("showDesktopIconsSwitch").setAttribute('checked', 'true');
                    document.getElementById("desktopIcons").style.visibility = 'visible';
                    userData.showDesktopIcons = 1;
                    break;
                default:
                    document.getElementById("showDesktopIconsSwitch").setAttribute('checked', 'true');
                    document.getElementById("desktopIcons").style.visibility = 'visible';
                    userData.showDesktopIcons = 1;
                    break;
            }

            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        } catch {
            if (onloadDesktopIconsRetryCount >= 3) {
                errorLogic.bsod("OnloadLogic.onloadSetDesktopIcons: OSDIRC_OVERFLOW", "process couldn't be started.")
            } else {
                this.onloadSetDesktopIcons();
            }
        }
    }

    onloadSetIntervals() {
        setInterval(() => {
            try {
                let passwordStatus = "";
                let userData = getCurrentUserData()
                if (userData.pswd) {
                    passwordStatus = "Password Protected";
                } else {
                    passwordStatus = "No Password";
                }
                document.getElementById("userSettingsPasswordStatusDisplay", 0).innerHTML = passwordStatus
                document.getElementById("usernameDisplay", 0).innerHTML = args.get("username");
                let pfp = getCurrentUserData().profilePicture
                let newPicture = "./system/images/profilePictures/" + pfp + ".png";
                document.getElementById("userSettingsProfilePicture", 0).src = newPicture


            } catch (e) {}
            try { document.getElementById("usernameStartMenu").innerHTML = args.get('username'); } catch (e) {}
        }, 5);
        setInterval(() => {
            try {
                new DOMLogic().getElemId("aboutScreenVersionNumber").innerText = version;
            } catch {}
        }, 5);
    }

    onloadSetEventListeners() {
        window.addEventListener('keydown', (e) => {
            if (!lockScreenActive) {
                let { key, altKey } = e;
                if (key === 'F4' && altKey) {
                    e.preventDefault();
                    if (activeapps.length == 0) {
                        windowLogic.openWindow("Shut Down ArcOS");
                    } else {
                        windowLogic.closewindow(document.getElementById(focusedWindow));
                    }
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                } else if (key.toLowerCase() == 'tab') {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        });

        window.addEventListener("keydown", (e) => {
            if (!lockScreenActive) {
                if (e.ctrlKey && e.altKey && e.shiftKey && e.key.toLowerCase() === 'x') {
                    windowLogic.openWindow("ArcTerm");
                }
            }
        });

        window.addEventListener("keydown", (e) => {
            if (lockScreenActive) {
                if (document.activeElement != document.getElementById("lockScreenPasswordInputField")) {
                    e.preventDefault();
                    return false;
                } else {
                    if (e.key.toLowerCase() == "enter") {
                        powerLogic.unlock();
                    }
                }
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
                //errorLogic.bsod("OnloadLogic.onloadSetEventListeners: TVC_MISSING", "The taskbarVolumeControl couldn't be found.")
            }

        });
    }

    loadTaskbarPos() {
        try {
            let userData = getCurrentUserData();
            let pos = userData.taskbarpos;
            switch (pos) {
                case "top":
                    document.getElementById("taskbarAddonLoader").href = "./system/css/taskbarontop.css";
                case "bottom":
                    document.getElementById("taskbarAddonLoader").href = "";
            }
        } catch {}
    }

    loadTheme() {
        try {
            if (getCurrentUserData().theme !== "") {
                let userData = getCurrentUserData();
                let theme = userData.theme;
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
                let userData = getCurrentUserData();
                userData.theme = "darkrounded";
                localStorage.setItem(args.get("username"), JSON.stringify(userData));
            }
        } catch {}
    }

    showBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
    }

    hideBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "hidden";
        document.getElementsByClassName("block")[0].style.opacity = "0";
    }

    /*loadTitlebarButtonPos(updatePreferenceSwitch) {
        let userData = getCurrentUserData();
        let tbp = userData.titlebarButtonsLeft;
        if (tbp == "true") {
            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
        } else {
            document.getElementById("titlebarAddonLoader").href = "";
        }

        if (updatePreferenceSwitch) {
            document.getElementById("preferencesAnimationsSwitch").checked = tbp;
        }
    }*/

    loadDefaultApps() {
        windowLogic.loadWindow("./system/applications/newUserInterface.app", 1, 0);
        setTimeout(() => {
            //windowLogic.loadWindow("./system/applications/controlPanel.app", 1);
            windowLogic.loadWindow("./system/applications/calculator.app", 1);
            windowLogic.loadWindow("./system/applications/shutdown.app", 1);
            //windowLogic.loadWindow("./system/applications/changeUsername.app", 1);
            //windowLogic.loadWindow("./system/applications/themeSelector.app", 1);
            //windowLogic.loadWindow("./system/applications/addApp.app", 1);
            windowLogic.loadWindow("./system/applications/runCommand.app", 1);
            //windowLogic.loadWindow("./system/applications/wallpaperSettings.app", 1);
            //windowLogic.loadWindow("./system/applications/systemSettings.app", 1);
            windowLogic.loadWindow("./system/applications/notepad.app", 1);
            windowLogic.loadWindow("./system/applications/programdata/Notepad/utils/loadFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/Notepad/utils/saveFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/Notepad/utils/delFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/desktopIcons.app", 1, 0);
            //windowLogic.loadWindow("./system/applications/programdata/User Settings/utils/changePassword.app", 1);
            //windowLogic.loadWindow("./system/applications/programdata/User Settings/utils/changeUsername.app", 1);
            //windowLogic.loadWindow("./system/applications/programdata/User Settings/utils/changeUserPicture.app", 1);
            //windowLogic.loadWindow("./system/applications/programdata/User Settings/utils/createUserAccount.app", 1);
            //windowLogic.loadWindow("./system/applications/programdata/User Settings/utils/deleteUserAccount.app", 1);
            windowLogic.loadWindow("./system/applications/fileExplorer.app", 1);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/createFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/deleteFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/renameFile.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/renameFolder.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/deleteFolder.app", 1, 0);
            windowLogic.loadWindow("./system/applications/programdata/File Manager/utils/createFolder.app", 1, 0);
            windowLogic.loadWindow("./system/applications/imageViewer.app", 1, 0);
            windowLogic.loadWindow("./system/applications/appManager.app", 1);
            windowLogic.loadWindow("./system/applications/openWith.app", 1, 0);
            windowLogic.loadWindow("./system/applications/newsettings.app", 1);
            windowLogic.loadWindow("./system/applications/ArcTerm.app", 1);
            windowLogic.loadWindow("./system/applications/musicPlayer.app", 1, 0);
            windowLogic.loadWindow("./system/applications/lockScreen.app", 1, 0);
            windowLogic.loadWindow("./system/applications/clock.app", 0, 0)
            setTimeout(() => {
                initiateArcTerm();
                //clockSwitchPage("home",0);
            }, 1000);
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
        //try { windowLogic.closeAllWindows(); } catch {}
    }

    loadSafemodeDependingFunctions() {
        getDriveLetters();
        windowLogic.updateTaskBar();
        hideStart();
        this.setStartMenuSize();
        this.setTaskbarButtonLocation();
        openSettingsPane("home", document.getElementsByClassName("controlPanelSidebar")[0]);
        contextMenuLogic.hideMenu();
        notificationLogic.startNotificationCenterPopulator();
        this.onloadSetDesktopIcons();
        this.onloadSetIntervals();
        this.onloadSetWindowControls();
        this.onloadSetEventListeners();
        setToolbarTrigger();
        this.loadTheme();
        this.loadTaskbarPos();
        populateAppManager();
        globalVolume = parseInt(getCurrentUserData().globalVolume);
        startUserDataUpdateCycle();
        document.getElementById("showDesktopIconsSwitch").checked = getCurrentUserData().showDesktopIcons;
        personalizationLogic.setTitlebarButtonLocations(false, false)
        generalLogic.updateDesktopIcons();
        personalizationLogic.setAnimations(false);
        if (localStorage.getItem("safeMode") != 1) {

        } else {
            document.getElementsByClassName("block")[0].style.backgroundImage = "unset";
            document.getElementById("addonShellLoader").href = "./system/css/darkModeSharp.css";
            document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
            document.getElementById("wallpaper").style.backgroundImage = "unset";
            errorLogic.sendError("Safe Mode", "ArcOS is running in Safe Mode.<br> - If this was not your intention, just restart from the start menu.<br> - If this was your intention, use this mode only to repair ArcOS if it doesn't boot.<br><br>Pleae note the following: all changes made in this account will be deleted at logoff.", 1)
        }
    }

    setStartMenuSize() {
        let userData = getCurrentUserData();

        let checked = userData.smallStart;

        if (checked) {
            document.getElementById("startMenu").classList.add("small");
        } else {
            document.getElementById("startMenu").classList.remove("small");
        }
    }

    setTaskbarButtonLocation() {
        let userData = getCurrentUserData();

        let checked = userData.centeredTaskbarButtons;

        if (checked) {
            document.getElementById("taskbarButtons").classList.add("center");
        } else {
            document.getElementById("taskbarButtons").classList.remove("center");
        }
    }
}

let onloadLogic = new OnloadLogic();

let onloadDesktopIconsRetryCount = 0;
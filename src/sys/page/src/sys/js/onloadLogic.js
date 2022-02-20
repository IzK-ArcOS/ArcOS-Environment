ConsoleNotifier.startModule("ArcOS.System.onloadLogic");



onload = function () {
    onloadLogic.startTime();
    onloadLogic.loadDefaultApps();

    setTimeout(() => {
        onloadLogic.loadSafemodeDependingFunctions();
        
        setTimeout(() => {
            onloadLogic.hideBlock();

            const volumeControlEnableSoundSwitch = document.getElementById("volumeControlEnableSoundSwitch");

            if (volumeControlEnableSoundSwitch) document.getElementById("volumeControlEnableSoundSwitch").checked = getCurrentUserData().muted == 1;
        }, 500);
    }, 1000);

    if (this.localStorage.getItem("safeMode") == "1") {
        createUserData("ArcOS Safe Mode", true, false);
    }
}

onbeforeunload = function () {
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
            let taskbarClock = document.getElementById('taskbarClock');
            let taskbarClockWidgetTime = document.getElementById('taskbarClockWidgetTime');
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();

            m = this.checkTime(m);
            s = this.checkTime(s);

            if (taskbarClock) taskbarClock.innerText = `${h}:${m}`;
            if (taskbarClockWidgetTime) taskbarClockWidgetTime.innerText = `${h}:${m}:${s}`;
        }, 500);
    }

    checkTime(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    onloadSetWindowControls() {
        setInterval(() => {
            const userData = getCurrentUserData();
            const eas = userData.enableAnimations.toString();
            const stl = userData.noTaskbarButtonLabels.toString();

            const preferencesAnimationsSwitch = document.getElementById("preferencesAnimationsSwitch");
            const preferencesTaskbarButtonLabelsSwitch = document.getElementById("preferencesTaskbarButtonLabelsSwitch");
            const animationsAddonLoader = document.getElementById("animationsAddonLoader");

            if (preferencesAnimationsSwitch) preferencesAnimationsSwitch.checked = (eas == 'true');
            if (preferencesTaskbarButtonLabelsSwitch) preferencesTaskbarButtonLabelsSwitch.checked = (stl == 'false');

            if (animationsAddonLoader) animationsAddonLoader.href = eas == 'true' ? "" : "../css/noAnimations.css";

            userData.noTaskbarButtonLabels = (stl == 'true');

            windowLogic.updateTaskBar();

            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        }, 100);
    }

    onloadSetDesktopIcons() {
        ConsoleNotifier.notifyStartService("ArcOS.System.onloadLogic.onloadDesktopIcons");

        const userData = getCurrentUserData();
        const show = userData.showDesktopIcons;
        const desktopIcons = document.getElementById("desktopIcons");

        if (desktopIcons) desktopIcons.style.visibility = (show == 0) ? 'hidden' : 'visible';

        userData.showDesktopIcons = (show == 1 || show == 0) ? show : 1;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));
    }

    onloadSetIntervals() {
        setInterval(() => {
            const uSPSD = document.getElementById("userSettingsPasswordStatusDisplay");
            const uD = document.getElementById("usernameDisplay");
            const uSPP = document.getElementById("userSettingsProfilePicture");
            const uSM = document.getElementById("usernameStartMenu");
            const aSVN = document.getElementById("aboutScreenVersionNumber");

            const userData = getCurrentUserData();
            const passwordStatus = userData.pswd ? "Password Protected" : "No Password";

            const pfp = getCurrentUserData().profilePicture;
            const newPicture = `./../img/profilePictures/${pfp}.png`;

            if (uSPSD) uSPSD.innerHTML = passwordStatus
            if (uD) uD.innerHTML = args.get("username");
            if (uSPP) uSPP.src = newPicture;
            if (uSM) uSM.innerHTML = args.get('username');
            if (aSVN) aSVN.innerText = version;
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
                }/*  else if (key.toLowerCase() == 'tab') {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    return false;
                } */
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

        ConsoleNotifier.notifyStartService("ArcOS.System.onloadLogic.EventListener.mousedown", "taskbarVolumeControl");
        window.addEventListener('mousedown', function (event) {
            let center = document.getElementById('notificationCenter', 0);
            let button = document.getElementById('notificationCenterButton', 0);

            if (!event.path.includes(center) &&
                !event.path.includes(button)) {
                if (!center.classList.contains("retracted")) {
                    center.classList.add("retracted");
                }
            }
        });
    }

    loadTaskbarPos() {
        const taskbarAddonLoader = document.getElementById("taskbarAddonLoader");
        const userData = getCurrentUserData();
        const pos = userData.taskbarpos;

        if (taskbarAddonLoader)
            switch (pos) {
                case "top":
                    taskbarAddonLoader.href = "../css/taskbarontop.css";
                    break;
                case "bottom":
                    taskbarAddonLoader.href = "";
                    break;
            }
    }

    loadTheme() {
        const addonShellLoader = document.getElementById("addonShellLoader");

        if (addonShellLoader) {
            if (getCurrentUserData().theme) {
                let userData = getCurrentUserData();
                let theme = userData.theme;

                switch (theme) {
                    case "darkrounded":
                        document.getElementById("addonShellLoader").href = "";
                        break;
                    case "darksharp":
                        document.getElementById("addonShellLoader").href = "../css/darkModeSharp.css";
                        break;
                    case "lightrounded":
                        document.getElementById("addonShellLoader").href = "../css/lightmoderounded.css";
                        break;
                    case "lightsharp":
                        document.getElementById("addonShellLoader").href = "../css/lightmodesharp.css";
                        break;
                }
            } else {
                let userData = getCurrentUserData();

                userData.theme = "darkrounded";

                localStorage.setItem(args.get("username"), JSON.stringify(userData));
            }
        }
    }

    showBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
    }

    hideBlock() {
        document.getElementsByClassName("block")[0].style.visibility = "hidden";
        document.getElementsByClassName("block")[0].style.opacity = "0";
    }

    loadDefaultApps() {
        /**Application Script Loading */
        windowLogic.loadWindow("./../apps/newUserInterface", 1, 0);
        setTimeout(() => {
            //Application Files Loading
            windowLogic.loadWindow("./../apps/calculator", 1);
            windowLogic.loadWindow("./../apps/shutdown", 1);
            windowLogic.loadWindow("./../apps/runCommand", 1);
            windowLogic.loadWindow("./../apps/notepad", 1);
            windowLogic.loadWindow("./../apps/loadFile", 1, 0);
            windowLogic.loadWindow("./../apps/saveFile", 1, 0);
            windowLogic.loadWindow("./../apps/delFile", 1, 0);
            windowLogic.loadWindow("./../apps/desktopIcons", 1, 0);
            windowLogic.loadWindow("./../apps/fileExplorer", 1);
            windowLogic.loadWindow("./../apps/createFile", 1, 0);
            windowLogic.loadWindow("./../apps/deleteFile", 1, 0);
            windowLogic.loadWindow("./../apps/renameFile", 1, 0);
            windowLogic.loadWindow("./../apps/renameFolder", 1, 0);
            windowLogic.loadWindow("./../apps/deleteFolder", 1, 0);
            windowLogic.loadWindow("./../apps/createFolder", 1, 0);
            windowLogic.loadWindow("./../apps/imageViewer", 1, 0);
            windowLogic.loadWindow("./../apps/appManager", 1);
            windowLogic.loadWindow("./../apps/openWith", 1, 0);
            windowLogic.loadWindow("./../apps/newSettings", 1);
            windowLogic.loadWindow("./../apps/ArcTerm", 1);
            windowLogic.loadWindow("./../apps/musicPlayer", 1, 0);
            windowLogic.loadWindow("./../apps/lockscreen", 1, 0);
            windowLogic.loadWindow("./../apps/clock", 1, 0)
        }, 100);


    }

    noShell() {
        const shellLoader = document.getElementById("shellLoader");

        if (shellLoader) shellLoader.href = "";

        document.body.style.backgroundColor = "#fff";

        const windows = document.getElementsByClassName("window");

        for (let i = 0; i < windows.length; i++) {
            if (windows[i]) windows[i].style.position = "absolute";
        }
    }

    loadSafemodeDependingFunctions() {
        
        setToolbarTrigger();
        startUserDataUpdateCycle();
        initiateArcTerm(document.getElementById("ArcTermBody"));

        windowLogic.updateTaskBar();
        contextMenuLogic.hideMenu();
        notificationLogic.startNotificationCenterPopulator();
        personalizationLogic.setTitlebarButtonLocations(false, false)
        personalizationLogic.setAnimations(false);
        personalizationLogic.startCustomColorInterval();
        personalizationLogic.loadWallpaper();

        this.setStartMenuSize();
        this.setTaskbarButtonLocation();
        this.onloadSetDesktopIcons();
        this.onloadSetIntervals();
        this.onloadSetWindowControls();
        this.onloadSetEventListeners();
        this.loadTheme();
        this.loadTaskbarPos();

        if (localStorage.getItem("safeMode") == 1) {
            document.getElementsByClassName("block")[0].style.backgroundImage = "none !important";
            document.getElementById("addonShellLoader").href = "../css/darkModeSharp.css";
            document.getElementById("animationsAddonLoader").href = "../css/noanimations.css";
            document.getElementById("wallpaper").style.display = "none";

            errorLogic.sendError("Safe Mode", "ArcOS is running in safe mode.<br><br>- If this was your intention, use this instance <b>only to repair ArcOS</b><br>-If this was not your intention, restart via the start menu.", 1)
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
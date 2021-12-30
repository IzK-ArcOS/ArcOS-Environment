ConsoleNotifier.startModule("ArcOS.System.personalizationLogic");

class PersonalizationLogic {
    applyTheme() {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.applyTheme");

        let userData = getCurrentUserData();

        userData.theme = document.getElementById("themeSelect").value;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));

        let theme = document.getElementById("themeSelect").value;

        if (theme === "darkrounded") {
            document.getElementById("addonShellLoader").href = "";
        } else if (theme === "darksharp") {
            document.getElementById("addonShellLoader").href = "../css/darkModeSharp.css"
        } else if (theme === "lightrounded") {
            document.getElementById("addonShellLoader").href = "../css/lightmoderounded.css"
        } else if (theme === "lightsharp") {
            document.getElementById("addonShellLoader").href = "../css/lightmodesharp.css"
        }
    }

    applyTaskbarPos() {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.applyTaskbarPos");

        let userData = getCurrentUserData();

        userData.taskbarpos = document.getElementById("taskbarPosSelect").value;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));

        let pos = document.getElementById("taskbarPosSelect").value;

        document.getElementById("taskbarAddonLoader").href = pos === "top" ? "../css/taskbarontop.css" : "";
    }

    setAnimations(updateLS) {

        ConsoleNotifier.notifyStartService("PersonalizationLogic.setAnimations");

        let checked;
        let userData = getCurrentUserData();

        if (updateLS) {
            checked = document.getElementById("preferencesAnimationsSwitch").checked;
        } else {
            checked = userData.enableAnimations
        }

        if (checked) {
            userData.enableAnimations = true;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
            document.getElementById("animationsAddonLoader").href = "";
        } else {
            userData.enableAnimations = false;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
            document.getElementById("animationsAddonLoader").href = "../css/noAnimations.css";
        }
    }

    setTitlebarButtonLocations(updateLS) {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.setTitlebarButtonLocations");

        let checked;
        let userData = getCurrentUserData();

        if (updateLS) {
            checked = document.getElementById("preferencesTitlebarButtonsSwitch").checked;

            userData.titlebarButtonsLeft = checked;

            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        } else {
            checked = userData.titlebarButtonsLeft
        }

        if (checked) {
            document.getElementById("titlebarAddonLoader").href = "../css/titleBarButtonsLeft.css";
        } else {
            document.getElementById("titlebarAddonLoader").href = "";
        }
    }

    toggleTaskbarButtonLabels() {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.toggleTaskbarButtonLabels");

        let userData = getCurrentUserData();

        userData.taskbarButtonLabels = !userData.taskbarButtonLabels;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));

        windowLogic.updateTaskBar();
    }

    setTaskbarButtonLabels(obj) {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.setTaskbarButtonLabels");

        let checked = !obj.checked;
        let userData = getCurrentUserData();

        userData.noTaskbarButtonLabels = checked;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));

        windowLogic.updateTaskBar();
    }

    updateVolume(obj) {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.updateVolume");

        let userData = getCurrentUserData();

        userData.globalVolume = obj.value / 10;

        localStorage.setItem(args.get("username"), JSON.stringify(userData));

        globalVolume = userData.globalVolume;
    }

    setStartmenuSize(updateLS) {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.setStartmenuSize");

        let checked;
        let userData = getCurrentUserData();

        if (updateLS) {
            checked = document.getElementById("preferencesSmallStartSwitch").checked;

            userData.smallStart = checked;

            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        } else {
            checked = userData.smallStart
        }

        if (checked) {
            document.getElementById("startMenu").classList.add("small");
        } else {
            document.getElementById("startMenu").classList.remove("small");
        }
    }

    setTaskbarButtonLocation(updateLS) {
        ConsoleNotifier.notifyStartService("PersonalizationLogic.setTaskbarButtonLocation");

        let checked;
        let userData = getCurrentUserData();

        if (updateLS) {
            checked = document.getElementById("preferencesCenteredTaskbarButtonsSwitch").checked;

            userData.centeredTaskbarButtons = checked;

            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        } else {
            checked = userData.centeredTaskbarButtons
        }

        if (checked) {
            document.getElementById("taskbarButtons").classList.add("center");
        } else {
            document.getElementById("taskbarButtons").classList.remove("center");
        }
    }

    startCustomColorInterval() {
        setInterval(() => {
            let userData = getCurrentUserData();

            if (userData.customThemeColor) {
                document.documentElement.style.setProperty('--controlPanelMainBackgroundColor', userData.customThemeColor);
            } else {
                document.documentElement.style.setProperty('--controlPanelMainBackgroundColor', '');
            }
        }, 100);
    }

    setCustomThemeColor() {
        let color = document.getElementById("preferencesCustomThemeColorInputField");
        let uData = getCurrentUserData();

        if (color.value) {
            uData.customThemeColor = color.value;
        } else {
            errorLogic.sendError("Custom color reset", "The entered color value was invalid, so it was reset to default");
            uData.customThemeColor = "";
        }

        localStorage.setItem(args.get("username"), JSON.stringify(uData));
    }

    loadWallpaper() {
        let uData = getCurrentUserData();
        let wallpaper = uData.wallpaper;
        let wallDiv = document.getElementById("wallpaper")

        if (wallpaper) {
            fs.exists(`../bg/${wallpaper}.jpg`, (exists) => {
                if (exists) {
                    wallDiv.style.backgroundImage = (wallpaper != "theme") ? `url(../bg/${wallpaper}.jpg)` : "";
                } else {
                    wallDiv.style.backgroundImage = "";
                }
            });

        }
    }

    setWallpaper(wallpaper) {
        let uData = getCurrentUserData();
        uData.wallpaper = wallpaper || "theme";

        localStorage.setItem(args.get("username"), JSON.stringify(uData));

        this.loadWallpaper();
    }
}

let personalizationLogic = new PersonalizationLogic();
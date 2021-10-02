new consoleNotifier().startModule("ArcOS.System.personalizationLogic");

class PersonalizationLogic {
    applyTheme() {

        new consoleNotifier().notifyStartService("PersonalizationLogic.applyTheme");

        let userData = getCurrentUserData();
        userData.theme = document.getElementById("themeSelect").value;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        let theme = document.getElementById("themeSelect").value;
        if (theme === "darkrounded") {
            document.getElementById("addonShellLoader").href = "";
        } else if (theme === "darksharp") {
            document.getElementById("addonShellLoader").href = "./system/css/darkModeSharp.css"
        } else if (theme === "lightrounded") {
            document.getElementById("addonShellLoader").href = "./system/css/lightmoderounded.css"
        } else if (theme === "lightsharp") {
            document.getElementById("addonShellLoader").href = "./system/css/lightmodesharp.css"
        }
    }

    applyTaskbarPos() {

        new consoleNotifier().notifyStartService("PersonalizationLogic.applyTaskbarPos");

        let userData = getCurrentUserData();
        userData.taskbarpos = document.getElementById("taskbarPosSelect").value;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        let pos = document.getElementById("taskbarPosSelect").value;
        if (pos === "top") {
            document.getElementById("taskbarAddonLoader").href = "./system/css/taskbarontop.css";
        } else if (pos === "bottom") {
            document.getElementById("taskbarAddonLoader").href = "";
        }
    }

    setAnimations(updateLS) {

        new consoleNotifier().notifyStartService("PersonalizationLogic.setAnimations");

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
            document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
        }
    }

    setTitlebarButtonLocations(updateLS) {

        new consoleNotifier().notifyStartService("PersonalizationLogic.setTitlebarButtonLocations");

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
            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
        } else {
            document.getElementById("titlebarAddonLoader").href = "";
        }
    }

    toggleTaskbarButtonLabels() {

        new consoleNotifier().notifyStartService("PersonalizationLogic.toggleTaskbarButtonLabels");

        let userData = getCurrentUserData();
        userData.taskbarButtonLabels = !userData.taskbarButtonLabels;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        windowLogic.updateTaskBar();
    }

    setTaskbarButtonLabels(obj) {

        new consoleNotifier().notifyStartService("PersonalizationLogic.setTaskbarButtonLabels");

        let checked = !obj.checked;
        let userData = getCurrentUserData();
        userData.noTaskbarButtonLabels = checked;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        windowLogic.updateTaskBar();
    }

    updateVolume(obj) {

        new consoleNotifier().notifyStartService("PersonalizationLogic.updateVolume");

        let userData = getCurrentUserData();
        userData.globalVolume = obj.value / 10;
        console.log("LOCAL:", userData);
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        console.log("LS:", JSON.parse(localStorage.getItem(args.get("username"))));
    }

    setStartmenuSize(updateLS) {
        new consoleNotifier().notifyStartService("PersonalizationLogic.setStartmenuSize");

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
}

let personalizationLogic = new PersonalizationLogic();
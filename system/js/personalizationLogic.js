new consoleNotifier().startModule("ArcOS.System.personalizationLogic");

class PersonalizationLogic {
    applyTheme() {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
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
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        userData.taskbarpos = document.getElementById("taskbarPosSelect").value;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        let pos = document.getElementById("taskbarPosSelect").value;
        if (pos === "top") {
            document.getElementById("taskbarAddonLoader").href = "./system/css/taskbarontop.css";
        } else if (pos === "bottom") {
            document.getElementById("taskbarAddonLoader").href = "";
        }
    }

    setAnimations() {
        let checked = document.getElementById("preferencesAnimationsSwitch").checked;
        if (checked == true) {
            let userData = JSON.parse(localStorage.getItem(args.get("username")));
            userData.enableAnimations = true;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
            document.getElementById("animationsAddonLoader").href = "";
        } else {
            let userData = JSON.parse(localStorage.getItem(args.get("username")));
            userData.enableAnimations = false;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
            document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
        }
    }

    setTitlebarButtonLocations() {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        let checked = userData.titlebarButtonsLeft;
        checked = !userData.titlebarButtonsLeft;
        userData.setTitlebarButtonsLeft = checked;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        
        if (checked) {
            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
        } else {
            document.getElementById("titlebarAddonLoader").href = "";
        }
    }

    toggleTaskbarButtonLabels() {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        userData.taskbarButtonLabels = !userData.taskbarButtonLabels;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        updateTaskBar();
    }

    setTaskbarButtonLabels(obj) {
        let checked = !obj.checked;
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        userData.noTaskbarButtonLabels = checked;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        updateTaskBar();
    }

    updateVolume(obj) {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        userData.globalVolume = obj.value / 10;
        console.log("LOCAL:",userData);
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
        console.log("LS:",JSON.parse(localStorage.getItem(args.get("username"))));
    }
}

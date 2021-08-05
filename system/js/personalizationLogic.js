new consoleNotifier().startModule("ArcOS.System.personalizationLogic");

class PersonalizationLogic {
    applyTheme() {
        localStorage.setItem(args.get("username") + "_theme", document.getElementById("themeSelect").value);
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
        localStorage.setItem(args.get("username") + "_taskbarpos", document.getElementById("taskbarPosSelect").value);
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
            localStorage.setItem(args.get("username") + "_enableAnimations", true);
            document.getElementById("animationsAddonLoader").href = "";
        } else {
            localStorage.setItem(args.get("username") + "_enableAnimations", false);
            document.getElementById("animationsAddonLoader").href = "system/css/noanimations.css";
        }
    }
    
    setTitlebarButtonLocations() {
        let checked = document.getElementById("preferencesTitlebarButtonsSwitch").checked;
        if (checked == true) {
            localStorage.setItem(args.get("username") + "_titlebarButtonsLeft", true);
            document.getElementById("titlebarAddonLoader").href = "system/css/titleBarButtonsLeft.css";
        } else {
            localStorage.setItem(args.get("username") + "_titlebarButtonsLeft", false);
            document.getElementById("titlebarAddonLoader").href = "";
        }
    }
    
    toggleTaskbarButtonLabels() {
        if (localStorage.getItem(args.get("username") + "_noTaskbarButtonLabels") == "true") {
            localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "false");
        } else {
            localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "true");
        }
        updateTaskBar();
    }
    
    setTaskbarButtonLabels(obj) {
        let checked = obj.checked;
        if (checked) {
            localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "false");
        } else {
            localStorage.setItem(args.get("username") + "_noTaskbarButtonLabels", "true");
        }
        updateTaskBar();
    }
}

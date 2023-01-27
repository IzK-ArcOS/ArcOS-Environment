/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 28th 2022,
 * and was finished at 3:23PM that day.
 * 
 * This file had pass 2 of rewriting on June 30th 2022,
 * and was finished at 3:39PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

ConsoleNotifier.registerMod("ArcOS.System.generalLogic");

class GeneralLogic {
    addNewApp() {
        ConsoleNotifier.notifyStartService("GeneralLogic.addNewApp");

        const startWAddChkBox = document.getElementById("startAppAfterAddCheckbox");
        const addInpField = document.getElementById("addAppInputField");

        if (!startWAddChkBox || !addInpField) {
            errorLogic.sendError("Cannot add new app", "Not all required modules are loaded.");

            return;
        }

        const open = startWAddChkBox.checked ? 1 : 0;

        windowLogic.loadWindow(addInpField.value, open, open);
    }

    replaceAllCharsInStr(s, from, to) {
        ConsoleNotifier.notifyStartService("GeneralLogic.replaceAllCharsInStr")

        let out = "";

        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === from) {
                out += to;

                continue;
            }

            out += s.charAt(i);
        }

        return out;
    }

    countOccurrences(string, subString, allowOverlapping) {
        ConsoleNotifier.notifyStartService("GeneralLogic.countOccurrences")

        string += "";
        subString += "";

        if (subString.length <= 0) return (string.length + 1);

        let n = 0;
        let pos = 0;
        let step = allowOverlapping ? 1 : subString.length;

        for (; ;) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }

        return n;
    }

    setExit(allowed = false) {
        ConsoleNotifier.notifyStartService("GeneralLogic.setExit");

        allowExit = allowed;
    }

    reloadShell() {
        ConsoleNotifier.notifyStartService("GeneralLogic.reloadShell")

        const links = document.getElementsByTagName("link");

        for (let i = 0; i < links.length; i++) {
            const link = links[i];

            if (link.rel == "stylesheet") {
                const href = link.href;

                link.href = "";

                setTimeout(() => {
                    link.href = href;
                }, 350);
            }
        }

        document.getElementById("shellLoader").href = "";

        setTimeout(() => {
            document.getElementById("shellLoader").href = "../css/main.css";
        }, 100);
    }

    reloadApplications() {
        ConsoleNotifier.notifyStartService("GeneralLogic.reloadApplications")

        const tempList = activeapps;
        const tempFocusedWindow = focusedWindow;

        loadedApps = [];
        applications = [];
        activeapps = [];
        focusedWindow = "";

        document.getElementById("windowStore").innerHTML = "";

        function loadDefaultAppsTimeout() {
            onloadLogic.loadDefaultApps();
        }

        function reOpenWindowsTimeout() {
            for (let i = 0; i < tempList.length; i++) {
                windowLogic.openWindow(tempList[i]);
            }
        }

        function bringToFrontTimeout() {
            windowLogic.bringToFront(document.getElementById(tempFocusedWindow));
        }

        setTimeout(loadDefaultAppsTimeout, 100);
        setTimeout(reOpenWindowsTimeout, 1100);
        setTimeout(bringToFrontTimeout, 2100);
    }
}

let generalLogic = new GeneralLogic();

window.addEventListener("click", e => {
    if (!lockScreenActive) {
        windowLogic.updateTitlebar(e);

        const userData = getCurrentUserData();
        const systemVolumeSlider = document.getElementById("systemVolumeSlider");
        const volumeControlEnableSoundSwitch = document.getElementById("volumeControlEnableSoundSwitch");

        if (!systemVolumeSlider || !volumeControlEnableSoundSwitch) { return; }

        systemVolumeSlider.value = userData.globalVolume * 10;
        volumeControlEnableSoundSwitch.checked = userData.muted == 1;
    }
});
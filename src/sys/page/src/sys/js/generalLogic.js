ConsoleNotifier.startModule("ArcOS.System.generalLogic");

class GeneralLogic {
    addNewApp() {
        ConsoleNotifier.notifyStartService("GeneralLogic.addNewApp");

        const open = document.getElementById("startAppAfterAddCheckBox").checked ? 1 : 0;

        windowLogic.loadWindow(document.getElementById("addAppInputField").value, open, open);
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

        let n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        for (; ;) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }

        return n;
    }

    disableExit() {
        ConsoleNotifier.notifyStartService("GeneralLogic.disableExit");

        allowExit = false;
    }

    enableExit() {
        ConsoleNotifier.notifyStartService("GeneralLogic.enableExit");

        allowExit = true;
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

        let tempList = activeapps;
        let tempFocusedWindow = focusedWindow;

        loadedApps = [];
        applications = [];
        activeapps = [];
        focusedWindow = "";

        document.getElementById("windowStore").innerHTML = "";

        setTimeout(() => {
            onloadLogic.loadDefaultApps();

            setTimeout(() => {
                for (let i = 0; i < tempList.length; i++) {
                    windowLogic.openWindow(tempList[i]);
                }

                setTimeout(() => {
                    windowLogic.bringToFront(document.getElementById(tempFocusedWindow));
                }, 1000);
            }, 1000);
        }, 100);
    }
}

let generalLogic = new GeneralLogic();

window.addEventListener("click", e => {
    if (!lockScreenActive) {
        windowLogic.updateTitlebar(e);

        let userData = getCurrentUserData();

        const systemVolumeSlider = document.getElementById("systemVolumeSlider");
        const volumeControlEnableSoundSwitch = document.getElementById("volumeControlEnableSoundSwitch");

        if (systemVolumeSlider) systemVolumeSlider.value = userData.globalVolume * 10;
        if (volumeControlEnableSoundSwitch) volumeControlEnableSoundSwitch.checked = userData.muted == 1;
    }
});
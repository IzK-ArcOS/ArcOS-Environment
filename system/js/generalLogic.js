new consoleNotifier().startModule("ArcOS.System.generalLogic");

class GeneralLogic {
    changeUsername() {
        newUsername = document.getElementById("changeUsernameInputField").value;
        changeUserDataName(args.get("username"), newUsername);
    }

    addNewApp() {
        try {
            if (document.getElementById("addAppInputField").value !== "") {
                let open = document.getElementById("startAppAfterAddCheckBox").checked;
                if (open == true) {
                    loadWindow(document.getElementById("addAppInputField").value, 0, 0);
                } else {
                    loadWindow(document.getElementById("addAppInputField").value, 1, 1);
                }
            } else {
                new ErrorLogic().sendError("Application not found", "The Application you tried to import couldn't be found. Check the <b>relative</b> path and try again.");
            }
        } catch {
            new ErrorLogic().sendError("Application not found", "The Application you tried to import couldn't be found. Check the <b>relative</b> path and try again.");
        }
    }

    updateDesktopIcons() {
        let elmnt = document.getElementById("showDesktopIconsSwitch").checked;
        if (elmnt) {
            document.getElementById("desktopIcons").style.visibility = "visible";
            let userData = JSON.parse(localStorage.getItem(args.get("username")));
            userData.showDesktopIcons = 1;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        } else {
            document.getElementById("desktopIcons").style.visibility = "hidden";
            let userData = JSON.parse(localStorage.getItem(args.get("username")));
            userData.showDesktopIcons = 0;
            localStorage.setItem(args.get("username"), JSON.stringify(userData));
        }
    }


    replaceAllCharsInStr(s, from, to) {
        let out = "";
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === from) {
                out += to;
            } else {
                out += s.charAt(i);
            }
        }
        return out;
    }

    countOccurrences(string, subString, allowOverlapping) {

        string += "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

        let n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    }

    executeWindowsShellCommand(command, args) {
        const { spawn } = require("child_process");

        const ls = spawn(command, args);

        console.log(command, args);

        ls.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        ls.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        ls.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });
    }

    disableExit() {
        allowExit = false;
    }

    enableExit() {
        allowExit = true;
    }

    getAllFunctions() {
        let myfunctions = [];
        for (let l in this) {
            if (this.hasOwnProperty(l) &&
                this[l] instanceof Function &&
                !/myfunctions/i.test(l)) {
                myfunctions.push(this[l]);
            }
        }
        return myfunctions;
    }

    reloadShell() {
        document.getElementById("shellLoader").href = "";
        setTimeout(() => {
            document.getElementById("shellLoader").href = "./system/css/arcosshell.css";
        }, 100);
    }

    reloadApplications() {
        let tempList = activeapps;
        let tempFocusedWindow = focusedWindow;
        loadedApps = [];
        applications = [];
        activeapps = [];
        focusedWindow = "";
        document.getElementById("windowStore").innerHTML = "";
        setTimeout(() => {
            new OnloadLogic().loadDefaultApps();
            setTimeout(() => {
                for (let i = 0; i < tempList.length; i++) {
                    openWindow(tempList[i]);
                }
                setTimeout(() => {
                    bringToFront(document.getElementById(tempFocusedWindow));
                }, 1000);
            }, 1000);
        }, 100);
    }
}


window.addEventListener("click", e => {
    if (!lockScreenActive) {
        updateTitlebar();
        new GeneralLogic().updateDesktopIcons();
        //new PersonalizationLogic().setTitlebarButtonLocations(false, false);
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        try { document.getElementById("systemVolumeSlider").value = userData.globalVolume * 10; } catch {}
        try { document.getElementById("volumeControlEnableSoundSwitch").checked = userData.muted } catch { }
    }
});

window.addEventListener("contextmenu", e => {
    updateTitlebar();
    new GeneralLogic().updateDesktopIcons();
})

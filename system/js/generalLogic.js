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
            localStorage.setItem(args.get("username") + "_showDesktopIcons", "1");
        } else {
            document.getElementById("desktopIcons").style.visibility = "hidden";
            localStorage.setItem(args.get("username") + "_showDesktopIcons", "0");
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
}


window.addEventListener("click", e => {
    updateTitlebar();
});

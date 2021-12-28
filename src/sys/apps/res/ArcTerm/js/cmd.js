/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class ArcTermCommands {
    default() {
        ArcTermUI.outputColor(`[Error]: "${globalCommandList[0]}" was not recognized.`, ``, "var(--red)");
    }

    echo() {
        let str = "";
        for (let i = 1; i < globalCommandList.length; i++) {
            str += `${globalCommandList[i]} `;
        }
        ArcTermUI.output(str);
        ArcTermUI.prompt();
    }

    ver() {
        /* ArcTermUI.outputColor(`[███████████]`,`var(--color)`,`var(--blue)`);
        ArcTermUI.outputColor(`[█]██[████████]`,`var(--color)`,`var(--blue)`);
        ArcTermUI.outputColor(`[███]██[██████]`,`var(--color)`,`var(--blue)`);
        ArcTermUI.outputColor(`[█]██[████]███[█]`,`var(--color)`,`var(--blue)`);
        ArcTermUI.outputColor(`[███████████]`,`var(--color)`,`var(--blue)`); */
        ArcTermUI.outputColor(`You are currently running ArcOS [${version}].`, ``, `var(--blue)`);
        ArcTermUI.prompt();
    }

    prompt() {
        if (globalCommandList[1] === "on") {
            displayPrompt = true;
        } else if (globalCommandList[1] === "off") {
            displayPrompt = false;
        } else {
            ArcTermUI.outputColor(`Environment Variable [displayPrompt] is set to [${displayPrompt}]`, ``, `var(--blue)`)
        }
        ArcTermUI.prompt();
    }

    error() {
        console.error("Indeterminate Error: Testing Purposes");
        ArcTermUI.prompt();
    }

    cls() {
        ArcTermUI.clearScreen();
        ArcTermUI.prompt();
    }

    restart() {
        powerLogic.restart();
    }

    shutdown() {
        powerLogic.shutdown();
    }

    logoff() {
        ArcTermUI.outputColor("[Note]: redirecting to login in 5 seconds...", ``, `var(--orange)`);
        setTimeout(() => {
            powerLogic.logoff();
        }, 5000);
    }

    dir() {
        let fileList = "";
        let foldList = "";
        let directory = "";

        if (globalCommandList[1]) {
            // eslint-disable-next-line prefer-destructuring
            directory = globalCommandList[1];
        } else {
            directory = currentDir;
        }

        fs.readdir(directory, { encoding: "utf8" }, (err, files) => {
            if (!files || err) {
                ArcTermUI.output(`Failed to open directory.\nReason: "${directory}" could not be found`);
                ArcTermUI.prompt();
            } else {
                ArcTermUI.outputColor(`Contents of [${directory}]`, ``, `var(--blue)`);
                for (let i = 0; i < files.length; i++) {
                    if (this.isDir(`${directory}/${files[i]}`)) {
                        foldList += `<span class="material-icons folder">folder</span> [${files[i]}/]<br>`;
                    } else {
                        fileList += `<span class="material-icons file">description</span> ${files[i]}<br>`;
                    }
                }
                const final = `${foldList}${fileList}`;
                ArcTermUI.outputColor(final, ``, `var(--blue)`);
                ArcTermUI.prompt();
            }
        });
    }

    isDir(path) {
        try {
            const stat = fs.lstatSync(path);
            return stat.isDirectory();
        } catch (e) {
            return false;
        }
    }

    isFile(file) {
        try {
            const stat = fs.lstatSync(file);
            return stat.isFile();
        } catch (e) {
            return false;
        }
    }

    cd() {
        let newPath = "";
        for (let i = 1; i < globalCommandList.length; i++) {
            if (i !== globalCommandList.length - 1) {
                newPath += `${globalCommandList[i]} `;
            } else { newPath += globalCommandList[i]; }
        }
        if (newPath !== "/") {
            if (this.isDir(path.join(currentDir, newPath))) {
                currentDir = path.join(currentDir, newPath);
            } else if (this.isDir(newPath)) {
                currentDir = newPath;
            } else {
                ArcTermUI.output(`Unable to change the directory.\nReason:"${newPath}" could not be found.`)
            }
        } else {
            currentDir = newPath;
        }
        ArcTermUI.prompt();
    }

    cdParentDir() {
        const prevPath = currentDir;
        const newPath = path.dirname(prevPath).split("/").pop();
        if (prevPath === newPath) {
            currentDir = newPath;
        }
    }

    rf() {
        let file = "";
        for (let i = 1; i < globalCommandList.length; i++) {
            file += `${globalCommandList[i]} `;
        }
        file = file.trim();
        if (!this.isFile(file) && this.isFile(`${currentDir}/${file}`)) {
            file = `${currentDir}/${file}`;
        }
        fs.readFile(file, (err, data) => {
            if (err || !data) {
                ArcTermUI.output(`Unable to read file.\nReason: "${file}" could not be found.`);
                ArcTermUI.prompt();
            } else {
                ArcTermUI.outputColor(`Reading file: [${file}]<br><br><hr>`, ``, `var(--blue)`);
                ArcTermUI.output(data);
                ArcTermOutputDiv.children[ArcTermOutputDiv.children.length - 1].style.whiteSpace = "pre";
                ArcTermUI.outputHTML(`<br><hr>`);
                ArcTermUI.prompt();
            }
        });
    }

    colors() {
        ArcTermUI.outputColor(`(01) Black&nbsp; : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `black`);
        ArcTermUI.outputColor(`(02) White &nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, 'white');
        ArcTermUI.outputColor(`(03) Normal : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, ``);
        ArcTermUI.outputColor(`(04) Gray&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--gray)`);
        ArcTermUI.outputColor(`(05) Red&nbsp;&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--red)`);
        ArcTermUI.outputColor(`(06) Green&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--green)`);
        ArcTermUI.outputColor(`(07) Yellow : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--yellow)`);
        ArcTermUI.outputColor(`(08) Blue&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--blue)`);
        ArcTermUI.outputColor(`(09) Purple : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--purple)`);
        ArcTermUI.outputColor(`(0A) Aqua&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--aqua)`);
        ArcTermUI.outputColor(`(0B) Orange : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--orange)`);
        ArcTermUI.prompt();
    }

    intro() {
        /*userInterfaceClass.outputColor("[█] Welcome to [ArcTerm]!", "", 'var(--purple)');
        userInterfaceClass.outputColor("[█]", "", 'var(--blue)');
        userInterfaceClass.outputColor(`[█] You are currently running ArcOS [${version}].`, "", 'var(--aqua)');
        userInterfaceClass.outputColor("[█]", "", 'var(--green)');
        userInterfaceClass.outputColor("[█] You can type [help] for a list of commands.", "", 'var(--yellow)');*/
        userInterfaceClass.outputColor(
            "    [_]         _____             <br>" +
            "   [/_\\]  _ _ _|_   _|__ _ _ _ __  <br>" +
            "  [/ _ \\]| '_/ _|| |/ -_) '_| '  \\ <br>" +
            " [/_/ \\_\\]_| \\__||_|\\___|_| |_|_|_|<br>", ``, `var(--blue)`, true);
        userInterfaceClass.outputColor(
            `<br>ArcTerm & ArcOS [${version}].<br><br>` +
            `ArcOS and all components created by the [ArcOS team].<br><br>Entire project Licensed under [GPLv3].<br>` +
            `Type [LICENSE] to open the license in ArcOS Notepad.<br><br>Type [HELP] for a list of commands.`, ``, `var(--blue)`
        )
        ArcTermUI.prompt();
    }

    ls() {
        ArcTermUI.outputColor("Showing contents of [localStorage]<br><br>", ``, `var(--blue)`);
        for (let i = 0; i < localStorage.length; i++) {
            if (!isUser(localStorage.key(i))) {
                ArcTermUI.outputColor(`[${localStorage.key(i)}]: ${localStorage.getItem(localStorage.key(i))}`, ``, `var(--yellow)`);
            }
        }
        ArcTermUI.prompt();
    }

    help() {
        help();
    }

    getAllCommandArgs(startIndex, lowerCase = false) {
        let arg = "";
        for (let i = startIndex; i < globalCommandList.length; i++) {
            arg += `${globalCommandList[i]} `;
        }
        arg = arg.trim();
        if (lowerCase) {
            arg = arg.toLowerCase();
        }
        return arg;
    }

    history() {
        ArcTermUI.outputColor("Contents of [history] list:<br><br>", ``, `var(--blue)`);
        for (let i = 0; i < hist.length; i++) {
            ArcTermUI.outputColor(`[${hist[i]}]`, ``, `var(--yellow)`);
        }
        ArcTermUI.prompt();
    }

    rand() {
        const nr = parseInt(this.getAllCommandArgs(1, true));
        if (nr) {
            ArcTermUI.outputColor(`Min: [0], Max: [${nr}], Output: [${Math.floor(Math.random() * nr)}]`, ``, `var(--yellow)`);
        } else {
            ArcTermUI.outputColor(`[Error]: Number specified invalid!`);
        }
        ArcTermUI.prompt();
    }

    setls() {
        const item = globalCommandList[1];
        const valu = this.getAllCommandArgs(2);

        if (item && valu) {
            localStorage.setItem(item, valu);
            ArcTermUI.outputColor(`localStorage item [${item}] set to [${valu}].`, ``, `var(--yellow)`);
        } else {
            ArcTermUI.outputColor(`[Error]: Arguments specified invalid!`);
        }
        ArcTermUI.prompt();
    }

    remls() {
        const item = globalCommandList[1];
        if (item) {
            localStorage.removeItem(item);
            ArcTermUI.outputColor(`localStorage item [${item}] removed.`, ``, `var(--yellow)`);
        } else {
            ArcTermUI.outputColor(`[Error]: item specified invalid!`);
        }
        ArcTermUI.prompt();
    }

    exit() {
        if (!ArcTermOnly) {
            ArcTermUI.outputColor("[█] Now stopping ArcTerm . . .", "", 'var(--green)');
            document.getElementById(inputId).setAttribute("disabled", "");
            windowLogic.closewindow(document.getElementById("ArcTerm"));
            initiateArcTerm(ArcTermOutputDiv);
        } else {
            window.location.href = "main.html";
        }
    }

    crusr() {
        let username = this.getAllCommandArgs(1, false);

        if (username) {
            createUserData(username);
            ArcTermUI.outputColor(`User [${username}] created.`, ``, `var(--blue)`);
        } else {
            ArcTermUI.outputColor(`[Error]: entered username cannot be empty.`);
        }
        ArcTermUI.prompt();
    }

    rmusr() {
        if (isAdmin(args.get("username"))) {
            let username = this.getAllCommandArgs(1, false);

            if (username) {
                deleteUserData(username, false);
                ArcTermUI.outputColor(`User [${username}] deleted.`, ``, `var(--blue)`);
            } else {
                ArcTermUI.outputColor(`[Error]: entered username cannot be empty.`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: You need admin rights to delete an account.`);
        }
        ArcTermUI.prompt();
    }

    open() {
        if (!ArcTermOnly) {
            let program = this.getAllCommandArgs(1, false);

            if (loadedApps.includes(program) && program) {
                ArcTermUI.outputColor(`Program [${program}] opened.`, ``, `var(--blue)`);
                windowLogic.openWindow(program);
            } else {
                ArcTermUI.outputColor(`[Error]: program not found or entry empty.`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    bsod() {
        let message = this.getAllCommandArgs(1, false);

        if (message) {
            errorLogic.bsod("USR_SPECIFIED_ERR", message);
        } else {
            ArcTermUI.outputColor(`[Error]: entered message cannot be empty.`);
        }
        ArcTermUI.prompt();
    }

    close() {
        if (!ArcTermOnly) {
            let program = this.getAllCommandArgs(1, false);

            if (activeapps.includes(program) && program) {
                ArcTermUI.outputColor(`Program [${program}] closed.`, ``, `var(--blue)`);
                windowLogic.closewindow(document.getElementById(program));
            } else {
                ArcTermUI.outputColor(`[Error]: program not opnened or entry empty.`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    user() {
        let user = this.getAllCommandArgs(1);

        if (args.get("username") != user) {
            if (localStorage.getItem(user)) {
                let userData = JSON.parse(localStorage.getItem(user));

                if (!userData.pswd) {
                    this.listUserData(user);
                } else {
                    if (!isAdmin(args.get("username"))) {
                        ArcTermUI.outputColor(`[Error]: You need admin rights to list a password-protected account.`, ``);
                    } else {
                        this.listUserData(user);
                    }
                }
            } else {
                ArcTermUI.outputColor(`[Error]: The specified account doesn't exist`, ``);
            }
        } else {
            this.listUserData(user);
        }

        ArcTermUI.prompt();
    }

    listUserData(user) {
        let userData = JSON.parse(localStorage.getItem(user));
        ArcTermUI.outputColor(`user data of [${user}]:<br>JSON: {`, ``, `var(--yellow)`, true);
        for (let key in userData)
            ArcTermUI.outputColor(`[  ${key.padEnd(25, ' ')}]: ${userData[key]}`, ``, `var(--yellow)`, true);
        ArcTermUI.outputColor(`}`, ``, `var(--yellow)`, true);
    }

    notifications() {
        if (!ArcTermOnly) {
            if (notificationList.length) {
                for (let i = 0; i < notificationList.length; i++) {
                    let title = notificationList[i].title,
                        message = notificationList[i].message;

                    ArcTermUI.outputColor(`[Index ${i} | ${title}]<br>${message}<br><br>`, ``, `var(--yellow)`);
                }
            } else {
                ArcTermUI.outputColor(`[NotificationService]: there are no notifications`, ``, `var(--yellow)`);
            }

        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    delnotification() {
        if (!ArcTermOnly) {
            let index = parseInt(this.getAllCommandArgs(1));

            console.log(`"${index}"`);
            if (index >= 0 && notificationList[index]) {
                notificationList.splice(index, 1);
                ArcTermUI.outputColor(`[NotificationService]: Notification at index ${index} deleted.`, ``, `var(--yellow)`);
            } else {
                ArcTermUI.outputColor(`[Error]: The specified index was invalid or there was no notification at the index.`, ``);
            }

        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    run() {
        if (!ArcTermOnly) {
            let file = currentDir + "/" + this.getAllCommandArgs(1);

            if (this.isFile(file)) {
                ArcTermUI.outputColor(`Opening [${file.replace("\\", "/")}]...`, ``, `var(--yellow)`);

                fileExplorerOpenFile(file);
            } else {
                ArcTermUI.outputColor(`[Error]: The specified file is invalid.`, ``, `var(--red)`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();

    }

    runwith() {
        if (!ArcTermOnly) {
            let file = currentDir + "/" + this.getAllCommandArgs(1);

            if (this.isFile(file)) {
                ArcTermUI.outputColor(`Opening [Open With] for [${file.replace("\\", "/")}]...`, ``, `var(--yellow)`);
                openWith(file);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    resui() {
        if (!ArcTermOnly) {
            let shellLoader = document.getElementById("shellLoader");
            let shellPath = shellLoader.href;

            shellLoader.href = "";
            setTimeout(() => {
                document.getElementById("shellLoader").href = shellPath;
            }, 100);
            ArcTermUI.outputColor(`[Success]: ArcOS shell has been reloaded.`, ``, `var(--green)`);
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();

    }

    openapps() {
        if (!ArcTermOnly) {
            ArcTermUI.outputColor(`List of [active] applications:`, ``, `var(--yellow)`);
            for (let i = 0; i < activeapps.length; i++) {
                ArcTermUI.outputColor(`[${i.toString().padEnd(3, ' ')}] ${activeapps[i]}`, ``, `var(--yellow)`, true);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    lock() {
        if (!ArcTermOnly) {
            let userData = getCurrentUserData();

            if (userData.pswd) {
                document.getElementById("lockScreenUsername").innerText = args.get("username");
                document.getElementsByClassName("lockScreen")[0].classList.remove("hidden");
                lockScreenActive = true;
                ConsoleNotifier.notifyStartService("powerLogic.lock: locked ArcOS Desktop")
                ArcTermUI.outputColor(`[Lock]: ArcOS Desktop is now locked.`, ``, `var(--yellow)`);
            } else {
                ArcTermUI.outputColor(`[Error]: Unable to lock: user account doesn't have a password.`);
            }


        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    admin() {
        if (isAdmin(args.get("username"))) {
            let toggle = globalCommandList[1];
            let user = this.getAllCommandArgs(2);
            if (localStorage.getItem(user)) {
                let userData = JSON.parse(localStorage.getItem(user));
                switch (toggle) {
                    case "allow":
                        userData.isAdmin = true;
                        ArcTermUI.outputColor(`[ALLOW]: The user account of [${user}] now has admin rights.`, ``, `var(--green)`);
                        break;
                    case "deny":
                        userData.isAdmin = false;
                        ArcTermUI.outputColor(`[DENY ]: The user account of [${user}] no longer has admin rights.`, ``, `var(--red)`);
                        break;
                    default:
                        ArcTermUI.outputColor(`[Error]: unknown type "${toggle}", expected "allow" or "deny"`);
                        break;
                }
                localStorage.setItem(user, JSON.stringify(userData));
            } else {
                ArcTermUI.outputColor(`[Error]: User account doesn't exist.`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: You need admin rights to give other accounts admin rights.`);
        }

        ArcTermUI.prompt();
    }

    swapusr() {
        if (!ArcTermOnly) {
            let username = this.getAllCommandArgs(1);
            if (localStorage.getItem(username)) {
                let userData = JSON.parse(localStorage.getItem(username));
                if (!userData.pswd) {
                    ArcTermUI.outputColor(`[Swap User]: Swapping to user account [${username}]...`, ``, `var(--blue)`);
                    setTimeout(() => {
                        hotSwapUserAccount(username);
                    }, 2000);
                } else {
                    ArcTermUI.outputColor(`[Error]: Requested user account is password-protected.`);
                }
            } else {
                ArcTermUI.outputColor(`[Error]: Requested user account doesn't exist.`);
            }
        } else {
            ArcTermUI.outputColor(`[Error]: ArcOS Desktop is not loaded!`);
        }
        ArcTermUI.prompt();
    }

    arcutil() {
        let util = this.getAllCommandArgs(1);
        switch (util) {
            case "reload":
                window.location.reload();
                break;
            case "kill":
                window.close();
                break;
            default:
                ArcTermUI.clearScreen();
                ArcTermUI.outputColor(
                    `[__]          _          _   _ _   [_] _ <br>` +
                    `[\\ \\]        /_\\  _ _ __| | | | |_[(_)] |<br>` +
                    `[ > >___]   / _ \\| '_/ _| |_| |  _| | |<br>` +
                    `[/_/(___)] /_/ \\_\\_| \\__|\\___/ \\__|_|_|`,
                    ``, `var(--blue)`, true
                );
                ArcTermUI.outputColor(`<br>[ArcUtil] is only ment for development purposes`, ``, `var(--blue)`, true);
                ArcTermUI.outputColor(`<br>Please note that the wrong ArcUtil commands<Br>can make you [lose all unsaved changes in opened documents]`, ``, `var(--red)`, true);
                ArcTermUI.outputColor(`<br>[ArcTerm] commands:`, ``, `var(--blue)`, true);
                ArcTermUI.outputColor(`<br>[reload]     Immediately reloads the session`, ``, `var(--blue)`, true);
                ArcTermUI.outputColor(`[kill]       immediately kills the ArcOS process`, ``, `var(--blue)`, true);
                break;
        }

        ArcTermUI.prompt();
    }
}

const cmdToken = true;
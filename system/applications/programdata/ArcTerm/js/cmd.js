/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class ArcTermCommands {
    default() {
        new ArcTermUserInterface().outputColor(`[Error]: "${globalCommandList[0]}" was not recognized.`, ``, "var(--red)");
    }

    echo() {
        let str = "";
        for (let i = 1; i < globalCommandList.length; i++) {
            str += `${globalCommandList[i]} `;
        }
        new ArcTermUserInterface().output(str);
        new ArcTermUserInterface().prompt();
    }

    ver() {
        /* new ArcTermUserInterface().outputColor(`[███████████]`,`var(--color)`,`var(--blue)`);
        new ArcTermUserInterface().outputColor(`[█]██[████████]`,`var(--color)`,`var(--blue)`);
        new ArcTermUserInterface().outputColor(`[███]██[██████]`,`var(--color)`,`var(--blue)`);
        new ArcTermUserInterface().outputColor(`[█]██[████]███[█]`,`var(--color)`,`var(--blue)`);
        new ArcTermUserInterface().outputColor(`[███████████]`,`var(--color)`,`var(--blue)`); */
        new ArcTermUserInterface().outputColor(`You are currently running ArcOS [${version}].`, ``, `var(--blue)`);
        new ArcTermUserInterface().prompt();
    }

    prompt() {
        if (globalCommandList[1] === "on") {
            displayPrompt = true;
        } else if (globalCommandList[1] === "off") {
            displayPrompt = false;
        } else {
            new ArcTermUserInterface().outputColor(`Environment Variable [displayPrompt] is set to [${displayPrompt}]`, ``, `var(--blue)`)
        }
        new ArcTermUserInterface().prompt();
    }

    error() {
        console.error("Indeterminate Error: Testing Purposes");
        new ArcTermUserInterface().prompt();
    }

    set() {
        const evr = globalCommandList[1];
        let str = "";

        for (let i = 2; i < globalCommandList.length; i++) {
            str += `${globalCommandList[i]} `;
        }
        str = str.trim();
        let doesContain = false;
        for (let i = 0; i < environmentVariables.length; i++) {
            if (JSON.stringify(environmentVariables[i]).startsWith(`{"${evr}":"`)) {
                doesContain = true;
                environmentVariables[i] = JSON.parse(`{"${evr}":"${str}"}`);
                break;
            }
        }
        if (!doesContain) {
            environmentVariables.push(JSON.parse(`{"${evr}":"${str}"}`));
        }
        console.log(environmentVariables);
        new ArcTermUserInterface().prompt();
    }

    cls() {
        new ArcTermUserInterface().clearScreen();
        new ArcTermUserInterface().prompt();
    }

    restart() {
        new PowerLogic().restart();
    }

    shutdown() {
        new PowerLogic().shutdown();
    }

    logoff() {
        new PowerLogic().logoff();
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
                new ArcTermUserInterface().output(`Failed to open directory.\nReason: "${directory}" could not be found`);
                new ArcTermUserInterface().prompt();
            } else {
                new ArcTermUserInterface().outputColor(`Contents of [${directory}]`, ``, `var(--blue)`);
                for (let i = 0; i < files.length; i++) {
                    if (this.isDir(`${directory}/${files[i]}`)) {
                        foldList += `<span class="material-icons folder">folder</span> [${files[i]}/]<br>`;
                    } else {
                        fileList += `<span class="material-icons file">description</span> ${files[i]}<br>`;
                    }
                }
                const final = `${foldList}${fileList}`;
                new ArcTermUserInterface().outputColor(final, ``, `var(--blue)`);
                new ArcTermUserInterface().prompt();
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
                new ArcTermUserInterface().output(`Unable to change the directory.\nReason:"${newPath}" could not be found.`)
            }
        } else {
            currentDir = newPath;
        }
        new ArcTermUserInterface().prompt();
    }

    cdParentDir() {
        const prevPath = currentDir;
        const newPath = path.dirname(prevPath).split(path.sep).pop();
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
                new ArcTermUserInterface().output(`Unable to read file.\nReason: "${file}" could not be found.`);
                new ArcTermUserInterface().prompt();
            } else {
                new ArcTermUserInterface().outputColor(`Reading file: [${file}]<br><br><hr>`, ``, `var(--blue)`);
                new ArcTermUserInterface().outputHTML(data);
                new ArcTermUserInterface().outputHTML(`<br><hr>`);
                new ArcTermUserInterface().prompt();
            }
        });
    }

    colors() {
        new ArcTermUserInterface().outputColor(`(01) Black&nbsp; : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `black`);
        new ArcTermUserInterface().outputColor(`(02) White &nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, 'white');
        new ArcTermUserInterface().outputColor(`(03) Normal : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, ``);
        new ArcTermUserInterface().outputColor(`(04) Gray&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--gray)`);
        new ArcTermUserInterface().outputColor(`(05) Red&nbsp;&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--red)`);
        new ArcTermUserInterface().outputColor(`(06) Green&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--green)`);
        new ArcTermUserInterface().outputColor(`(07) Yellow : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--yellow)`);
        new ArcTermUserInterface().outputColor(`(08) Blue&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--blue)`);
        new ArcTermUserInterface().outputColor(`(09) Purple : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--purple)`);
        new ArcTermUserInterface().outputColor(`(0A) Aqua&nbsp;&nbsp;&nbsp;: [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--aqua)`);
        new ArcTermUserInterface().outputColor(`(0B) Orange : [The quick brown fox jumped over the lazy dog. 0123456789]`, ``, `var(--orange)`);
        new ArcTermUserInterface().prompt();
    }

    intro() {
        new ArcTermUserInterface().outputColor(`ArcOS version 2.0 [${version}]`, "", 'var(--purple)');
        new ArcTermUserInterface().outputColor(`Copyright © [TechWorldInc] ${new Date().getFullYear()}.`, "", 'var(--blue)');
        new ArcTermUserInterface().outputColor("<br>");
        new ArcTermUserInterface().outputColor("Welcome to [ArcTerm], the terminal of [ArcOS].", "", 'var(--green)');
        new ArcTermUserInterface().outputColor("You can type [help] for a list of commands.","","var(--yellow)");
        new ArcTermUserInterface().prompt();
    }

    ls() {
        new ArcTermUserInterface().outputColor("Showing contents of [localStorage]<br><br>", ``, `var(--blue)`)
        for (let i = 0; i < localStorage.length; i++) {
            new ArcTermUserInterface().outputColor(`[${localStorage.key(i)}]: ${localStorage.getItem(localStorage.key(i))}`, ``, `var(--yellow)`);
        }
        new ArcTermUserInterface().prompt();
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
        new ArcTermUserInterface().outputColor("Contents of [history] list:<br><br>", ``, `var(--blue)`);
        for (let i = 0; i < hist.length; i++) {
            new ArcTermUserInterface().outputColor(`[${hist[i]}]`, ``, `var(--yellow)`);
        }
        new ArcTermUserInterface().prompt();
    }

    rand() {
        const nr = parseInt(this.getAllCommandArgs(1, true));
        if (nr) {
            new ArcTermUserInterface().outputColor(`Min: [0], Max: [${nr}], Output: [${Math.floor(Math.random() * nr)}]`, ``, `var(--yellow)`);
        } else {
            new ArcTermUserInterface().outputColor(`[Error]: Number specified invalid!`);
        }
        new ArcTermUserInterface().prompt();
    }

    setls() {
        const item = globalCommandList[1];
        const valu = this.getAllCommandArgs(2);

        if (item && valu) {
            localStorage.setItem(item, valu);
            new ArcTermUserInterface().outputColor(`localStorage item [${item}] set to [${valu}].`, ``, `var(--yellow)`);
        } else {
            new ArcTermUserInterface().outputColor(`[Error]: Arguments specified invalid!`);
        }
        new ArcTermUserInterface().prompt();
    }

    remls() {
        const item = globalCommandList[1];
        if (item) {
            localStorage.removeItem(item);
            new ArcTermUserInterface().outputColor(`localStorage item [${item}] removed.`, ``, `var(--yellow)`);
        } else {
            new ArcTermUserInterface().outputColor(`[Error]: item specified invalid!`);
        }
        new ArcTermUserInterface().prompt();
    }

    exit() {
        new ArcTermUserInterface().outputColor("[█] Now stopping ArcTerm . . .", "", 'var(--green)');
        document.getElementById(inputId).setAttribute("disabled", "");
        closewindow(document.getElementById("ArcTerm"));
        initiateArcTerm();
    }
}

const cmdToken = true;
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */

// eslint-disable-next-line 


// eslint-disable-next-line no-unused-vars
class ArcTermUserInterface {
    executeProgram(instructions = []) {
        for (let i = 0; i < instructions.length; i++) {
            this.evaluateCommand(instructions[i], true);
        }
    }

    clearScreen() {
        document.getElementById("ArcTermBody").innerHTML = "";
    }

    output(str, color = "") {
        const elmnt = document.createElement("p");
        elmnt.innerText = str;
        elmnt.style.color = color;
        document.getElementById("ArcTermBody").append(elmnt);
    }

    outputHTML(str, color = "") {
        const elmnt = document.createElement("p");
        elmnt.innerHTML = str;
        elmnt.style.color = color;
        document.getElementById("ArcTermBody").append(elmnt);
    }

    evaluateCommand(override = "") {
        let command = "";
        if (override) {
            command = override;
        } else {
            command = document.getElementById(inputId).value;
        }

        if (!hist.includes(command)) hist.push(command);
        const commandList = command.split(" ");
        globalCommandList = commandList;
        console.log(
            `%c[SUCCESS] ui.evaluateCommand: Evaluating first argv: "${commandList[0]}", argvlist is "${commandList}"`,
            "color:lime"
        );
        new ArcTermUserInterface().output("\n");
        const cmd = new ArcTermCommands();
        switch (commandList[0].toLowerCase()) {
            case "echo":
                cmd.echo();
                break;
            case "ver":
                cmd.ver();
                break;
            case "prompt":
                cmd.prompt();
                break;
            case "error":
                cmd.error();
                break;
            case "cls":
                cmd.cls();
                break;
            case "set":
                cmd.set();
                break;
            case "restart":
                cmd.restart();
                break;
            case "shutdown":
                cmd.shutdown();
                break;
            case "logoff":
                cmd.logoff();
                break;
            case "dir":
                cmd.dir();
                break;
            case "cd":
                cmd.cd();
                break;
            case "rf":
                cmd.rf();
                break;
            case "colors":
                cmd.colors();
                break;
            case "intro":
                cmd.intro();
                break;
            case "ls":
                cmd.ls();
                break;
            case "help":
                cmd.help();
                break;
            case "history":
                cmd.history();
                break;
            case "rand":
                cmd.rand();
                break;
            case "setls":
                cmd.setls();
                break;
            case "remls":
                cmd.remls();
                break;
            case "exit":
                cmd.exit();
                break;
            case "":
                new ArcTermUserInterface().prompt();
                break;
            default:
                cmd.default();
                new ArcTermUserInterface().prompt();
                break;
        }
    }

    prompt() {

        const dvdiv = document.createElement("p");
        const cddir = document.createTextNode(currentDir);
        const prmpt = document.createTextNode("$ ");
        const brek = document.createElement("br");
        const brek2 = document.createElement("br");
        const input = document.createElement("input");
        const cdhos = document.createElement("span");

        cdhos.style.opacity = "0.5";
        cdhos.append(cddir)
        console.log(`%c[VARDEFS] ui.prompt: dvdiv = ${dvdiv}, prmpt = ${prmpt}, input = ${input}`, 'color:yellow');

        this.focusToInput();

        try {
            document.getElementById(inputId).setAttribute("disabled", "");
            console.log(`%c[SUCCESS] ui.prompt: set attribute "disabled" to enabled for "${inputId}"`, "color:lime");
        } catch (e) { console.log(`%c[FAILURE] ui.prompt: couldn't set attribute "disabled" to enabled for "${inputId}"`, "color:red"); }

        input.id = `input${Math.floor(Math.random() * 0x32767)}`;
        inputId = input.id;
        input.setAttribute("spellcheck", "false");

        if (displayPrompt) {
            dvdiv.append(brek2);
            dvdiv.append(cdhos);
            dvdiv.append(brek);
            dvdiv.append(prmpt);
        }

        dvdiv.append(input);

        document.getElementById("ArcTermBody").append(dvdiv);

        console.log(`%c[SUCCESS] ui.prompt: Appended input with id "${input.id}" to "ArcTermBody"`, "color:lime");
    }

    focusToInput() {
        try {
            document.getElementById(inputId).focus();
        } catch (e) { /** */ }
    }

    defineDOMHooks() {
        document.addEventListener("click", () => {
            new ArcTermUserInterface().focusToInput();
        });

        document.addEventListener("keydown", (e) => {
            console.log(e.key);
            if (e.key === "Enter") {
                new ArcTermUserInterface().evaluateCommand();
            }
            if (e.key === "ArrowUp") {
                if (hist.length !== 0) {
                    if (histReturnInt === 0) {
                        histReturnInt = hist.length - 1
                    } else {
                        histReturnInt -= 1;
                    }
                    document.getElementById(inputId).value = hist[histReturnInt];
                    document.getElementById(inputId).focus();
                }
            }
            if (e.key === "Escape") {
                document.getElementById(inputId).value = "";
            }
            if (e.key === "=" && e.ctrlKey) {
                zoomLevel += 5;
                document.body.style.zoom = `${zoomLevel}%`;
            }
            if (e.key === "-" && e.ctrlKey) {
                zoomLevel -= 5;
                document.body.style.zoom = `${zoomLevel}%`;
            }
        });

        console.error = (e) => {
            new ArcTermUserInterface().output(`[ERROR_INTERNAL] ${e}`, "var(--red)");
        }

        window.onerror = (e) => {
            new ArcTermUserInterface().output(`[ERROR_JSDOMEXC] ${e}`, "var(--red)");
        }
    }

    outputColor(text, pri = "", sec = "var(--red)") {
        const x = text.split(/(\[[^\]]*\])/);
        let out = "";
        for (let i = 0; i < x.length; i++) {
            const str = x[i].replace("[", "").replace("]", "")
            if (x[i].startsWith("[") && x[i].endsWith("]")) {
                out += `<span style="color:${sec}">${str}</span>`;
            } else {
                out += `<span style="color:${pri}">${str}</span>`;
            }
        }
        this.outputHTML(out);
    }

    applyTheme(theme) {
        if (theme) {
            fs.exists(path.join(__dirname, theme), (exists) => {
                if (exists) {
                    document.getElementById("themeLoader").href = theme;
                    localStorage.setItem("theme", theme);
                } else {
                    this.outputColor("[Error]: The configured theme could not be found. Fallback has been applied.<br><br>", ``, `var(--red)`);
                }
            });
        }
    }
    evaluateScripts() {
        let cmdValid = false,
            envValid = false,
            etcValid = false;

        try { cmdValid = cmdToken; } catch { cmdValid = false; }
        try { envValid = envToken; } catch { envValid = false; }
        try { etcValid = etcToken; } catch { etcValid = false; }

        console.log(cmdValid, envValid, etcValid);
        return ([cmdValid, envValid, etcValid]);
    }
}

function initiateArcTerm() {
    document.getElementById("ArcTermBody").innerHTML = "";
    let evaulationList = new ArcTermUserInterface().evaluateScripts(),
        continueExec = true;
    for (var i = 0; i < evaulationList.length; i++) {
        if (!evaulationList[i]) {
            new ArcTermUserInterface().outputColor(`[Error]: Script at index [${i}] not loaded!`);
            continueExec = false;
        }
    }

    setTimeout(() => {
        new ArcTermCommands().intro();
    }, 100);

    setInterval(() => {
        if (focusedWindow == "ArcTerm") {
            new ArcTermUserInterface().focusToInput();

        }
    }, 100)

    document.addEventListener("keydown", (e) => {
        let key = e.key.toLowerCase();

        if (key == "enter") {
            if (focusedWindow == "ArcTerm") {
                new ArcTermUserInterface().evaluateCommand();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        }
    })

};
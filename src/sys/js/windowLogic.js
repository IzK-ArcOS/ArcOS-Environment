ConsoleNotifier.startModule("ArcOS.System.windowLogic");
class WindowLogic {
    closewindow(window) {
        ConsoleNotifier.notifyStartService("closewindow: closing " + window.id);

        if (window) {
            window.style.opacity = '0';

            setTimeout(() => {
                window.style.visibility = "hidden";
                window.style.display = "none";
                window.style.left = "60px";
                window.style.top = "60px";

                if (!noResize.includes(window.id)) {
                    window.style.width = "fit-content";
                    window.style.height = "fit-content";
                }

                window.style.top = '50%';
                window.style.left = '50%';

                this.unMaximizeWindow(window);
            }, 300);

            for (let i = 0; i < activeapps.length; i++) {
                if (window.id == activeapps[i]) activeapps.splice(i, 1);
            }
        } else {
            notificationLogic.notificationService('Error closing window', "ArcOS was unable to close the window.<br><br>Please check the name and try again.");
        }

        this.updateTaskBar();
    }


    openWindow(win) {
        ConsoleNotifier.notifyStartService("openWindow: opening " + win);
        win = document.getElementById(win);
        if (win) {
            if (!activeapps.includes(win.id)) {
                if (win.id === "ArcTerm") initiateArcTerm(document.getElementById("ArcTermBody"));
                win.style.visibility = "visible";
                win.style.display = "";
                setTimeout(() => {
                    win.style.opacity = "1";
                    win.children[0].style.opacity = "1";
                }, 250);
                activeapps.push(win.id);
            } else {
                if (win.style.opacity == "0" && win.style.visibility == "hidden" && win.style.display == "none") {
                    win.style.visibility = "visible";
                    win.style.display = "";
                    setTimeout(() => {
                        win.style.opacity = "1";
                        win.children[0].style.opacity = "1";
                    }, 50);
                } else {
                    if (win.style.zIndex < maxamount + 1) {
                        this.bringToFront(win);
                        win.children[0].style.opacity = "1";
                    } else {
                        minimizeWindow(win.id);
                    }
                }
            }
            this.updateTaskBar();
            setTimeout(() => {
                this.bringToFront(win);
                this.updateTaskBar();
            }, 250);

            const sM = document.getElementById("startMenu");

            if (sM) sM.style.opacity = '0';

            setTimeout(() => { if (sM) sM.style.visibility = 'hidden'; }, 200);
            setTimeout(() => { if (sM) sM.style.display = 'none'; }, 400);
        } else {
            errorLogic.sendError("ArcOS Program Manager", "The requested applcation couldn't be opened: Cannot read propoerty 'id' of null.");
        }
    }

    minimizeWindow(window) {
        setTimeout(() => {
            ConsoleNotifier.notifyStartService("minimizeWindow: " + window);
            window = document.getElementById(window);
            window.style.opacity = '0';
            setTimeout(() => {
                window.style.visibility = "hidden";
                window.style.display = "none";
            }, 300);
        }, 50);
    }

    updateTaskBar() {
        let userData = getCurrentUserData();
        let temp = document.createElement("span");
        let taskbar = document.getElementById("taskbarButtons");

        for (let i = 0; i < activeapps.length; i++) {
            let button = document.createElement("button"),
                textSpan = document.createElement("span"),
                textSpanContent = document.createTextNode(userData.noTaskbarButtonLabels ? "" : activeapps[i]),
                image = document.createElement("img");

            button.id = activeapps[i];
            button.className = "taskbarButton";
            button.setAttribute("onclick", `windowLogic.openWindow("${activeapps[i]}");`);
            button.title = activeapps[i];

            image.src = `./../img/${(activeapps[i].includes("(") && activeapps[i].endsWith(")")) ? "errormessage" : activeapps[i].toLowerCase()}.svg`;
            image.style.width = "20px";
            image.style.height = "20px";
            image.style.verticalAlign = "middle";

            textSpan.append(textSpanContent);
            textSpan.style.marginLeft = !userData.noTaskbarButtonLabels ? "10px" : "";

            button.append(image);
            button.append(textSpan);

            temp.append(button);
        }

        if (temp.innerHTML != taskbar.innerHTML) {
            taskbar.innerHTML = temp.innerHTML;
        }
    }

    bringToFront(window) {
        if (window && window instanceof HTMLElement) {
            maxamount += 1;
            window.style.zIndex = maxamount;
            focusedWindow = window.id;
        }
    }

    async loadWindow(appFile, userImport = 0, register = 1) {
        ConsoleNotifier.notifyLoadApp(appFile);

        let x = fetch(appFile).then(response => response.text()).then(text => {
            document.getElementById("temp").innerHTML = text;

            if (document.getElementById("temp").childNodes[0].id) {
                const tB = document.getElementById("temp").childNodes[0].getElementsByTagName("p")[0];

                if (tB && tB.className == "titleText") {
                    let image = document.createElement("img");

                    image.style.height = "15px"
                    image.src = `./../img/${document.getElementById("temp").childNodes[0].id}.svg`;
                    image.style.marginRight = "5px"
                    image.style.verticalAlign = "middle"
                    tB.insertAdjacentElement("afterbegin", image);
                }

                document.getElementById("windowStore").insertAdjacentHTML("afterbegin", document.getElementById("temp").innerHTML);

                for (let i = 0; i < document.getElementsByClassName("window").length; i++) {
                    dragLogic.dragElement(document.getElementsByClassName("window")[i], document.getElementsByClassName("windowTitle")[i]);
                }

                if (userImport == 0) {
                    this.openWindow(document.getElementById("windowStore").childNodes[0].id);
                }

                if (register == 1) {
                    loadedApps.push(document.getElementById("windowStore").childNodes[0].id);
                }

                populateStartMenuAppList("startMenuAppList");
            } else {
                errorLogic.sendError("System Error", "The app file specified does not contain a valid application. Please check the name and try again.<br>File: " + appFile);
            }
        }).catch((e) => { errorLogic.sendError("System Error", "The system cannot find the application specified.<br>Please check the name and try again<br><br>File: " + appFile + "<br><br>" + e); });
    }

    updateTitlebar(e) {
        let titlebars = document.querySelectorAll("div.windowTitle"),
            windows = document.querySelectorAll("div.window");

        for (let i = 0; i < titlebars.length; i++) {
            titlebars[i].style.opacity = "0.5";

            let isTitlebar = !!(e.path.includes(titlebars[i]));
            let isWindow = !!(e.path.includes(windows[i]));

            if (isTitlebar) {
                titlebars[i].style.opacity = "1";
            } else if (isWindow) {
                windows[i].children[0].style.opacity = "1";
            }
        }
    }

    /*setInterval(() => {
        updateTitlebar();
    }, 10);*/

    closeAllWindows() {
        for (let i = 0; i < document.getElementsByClassName("window").length; i++) {
            closewindow(document.getElementsByClassName("window")[i]);
            activeapps = [];
        }
    }

    maximizeWindow(win) {
        ConsoleNotifier.notifyStartService("maximizeWindow: " + win.id)
        setTimeout(() => {
            this.bringToFront(win);
        }, 100);
        let currentWidth = win.style.minWidth,
            currentHeight = win.style.minHeight,
            currentX = win.style.left,
            currentY = win.style.top;
        win.style.minWidth = "100%";
        win.style.minHeight = "calc(100% - 65px)";
        win.style.borderRadius = "0px";
        win.style.border = "none";
        win.style.top = "0";
        win.style.left = "0";
        win.style.resize = "none";
        win.style.transform = "none";
        win.classList.add("maximized");
        setTimeout(() => {
            win.style.transition = "top 1000000000s, left 1000000000s";
        }, 50);
        localStorage.setItem(win.id + "_windowData", `{"width":"${currentWidth}","height":"${currentHeight}","posX":"${currentX}","posY":"${currentY}"}`)
    }

    unMaximizeWindow(win) {
        ConsoleNotifier.notifyStartService("unMaximizeWindow: " + win.id)
        setTimeout(() => {
            this.bringToFront(win);
        }, 100);
        if (localStorage.getItem(win.id + "_windowData") != null) {
            let windowData = JSON.parse(localStorage.getItem(win.id + "_windowData"));
            win.style.minWidth = windowData.width;
            win.style.minHeight = windowData.height;
            win.style.top = windowData.posY;
            win.style.left = windowData.posX;
            win.style.borderRadius = "";
            win.style.border = "";
            win.style.position = "";
            win.style.transition = "";
            win.style.resize = "";
            win.style.transform = "";
            win.classList.remove("maximized");
            localStorage.removeItem(win.id + "_windowData")
        }
    }

    toggleMaximizedState(win) {
        if (localStorage.getItem(win.id + "_windowData") != null) {
            this.unMaximizeWindow(win);
        } else {
            this.maximizeWindow(win)
        }
        this.bringToFront(win);
    }

    deleteWindowData() {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes("_windowData")) {
                console.log(localStorage.key(i));
                console.log(localStorage.getItem(localStorage.key(i)))
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }

    loadJSFile(file) {
        let x = document.createElement("script");
        x.async = true;
        x.src = file;

        document.body.append(x);
    }
}

let windowLogic = new WindowLogic();
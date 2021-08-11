new consoleNotifier().startModule("ArcOS.System.windowLogic");

function closewindow(window) {
    new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.closewindow: " + window.id);
    try {

        try {
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
                unMaximizeWindow(window);
            }, 300);
        } catch (e) { }
        for (let i = 0; i < activeapps.length; i++) { if (window.id == activeapps[i]) { activeapps.splice(i, 1); } }
        updateTaskBar();
    } catch {
        try {
            try {
                window = document.getElementById(window)
                new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.closewindow: " + window.id + " * ALT *");

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
                    unMaximizeWindow(window);
                }, 300);
            } catch (e) { }
            for (let i = 0; i < activeapps.length; i++) { if (window.id == activeapps[i]) { activeapps.splice(i, 1); } }
            updateTaskBar();

        } catch {
            new NotificationLogic().notificationService('Error closing window', "ArcOS was unable to close the window.<br><br>Please check the name and try again.");
        }
    }
}


function openWindow(win) {
    win = document.getElementById(win);
    if (win) {
        if (!activeapps.includes(win.id)) {
            if (win.id === "ArcTerm") initiateArcTerm();
            win.style.visibility = "visible";
            win.style.display = "";
            setTimeout(() => {
                win.style.opacity = "1";
            }, 250);
            activeapps.push(win.id);
        } else {
            if (win.style.opacity == "0" && win.style.visibility == "hidden" && win.style.display == "none") {
                win.style.visibility = "visible";
                win.style.display = "";
                setTimeout(() => {
                    win.style.opacity = "1";
                }, 50);
            } else {
                if (win.style.zIndex < maxamount + 1) {
                    bringToFront(win);
                } else {
                    minimizeWindow(win.id);
                }
            }
        }
        updateTaskBar();
        setTimeout(() => {
            bringToFront(win);
            updateTitlebar();
        }, 250);
        try {
            document.getElementById('startMenu').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('startMenu').style.visibility = 'hidden';
                setTimeout(() => {
                    document.getElementById('startMenu').style.display = 'none';
                }, 200);
            }, 200);
        } catch { }
    } else {
        new ErrorLogic().sendError("ArcOS Program Manager", "The requested applcation couldn't be opened: Cannot read propoerty 'id' of null.");
    }
}

function minimizeWindow(window) {
    new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.minimizeWindow: " + window);
    window = document.getElementById(window);
    window.style.opacity = '0';
    setTimeout(() => {
        window.style.visibility = "hidden";
        window.style.display = "none";
    }, 300);
}

function updateTaskBar() {
    try {
        new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.updateTaskbar");
        let str = "";
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        if (!userData.noTaskbarButtonLabels) {
            activeapps.forEach(element => {
                if (element.includes("(") && element.endsWith(")")) {
                    str += "<button class=\"taskbarButton\" onclick='openWindow(\"" + element + "\")' title=\"" + element + "\"><span style=\"vertical-align:middle;\"><img src=\"./system/images/errorMessage.svg\" style=\"width:20px;height:20px;vertical-align:middle;\">&nbsp;&nbsp;<span style=\"vertical-align:middle;\">" + element + "</span></button> ";
                } else {
                    str += "<button class=\"taskbarButton\" onclick='openWindow(\"" + element + "\")' title=\"" + element + "\"><img src=\"./system/images/" + element + ".svg\" style=\"width:20px;height:20px;vertical-align:middle;\">&nbsp;&nbsp;<span style=\"vertical-align:middle;\">" + element + "</span></button> ";
                }

            });
        } else {
            activeapps.forEach(element => {
                if (element.includes("(") && element.endsWith(")")) {
                    str += "<button class=\"taskbarButton\" onclick='openWindow(\"" + element + "\")' title=\"" + element + "\"><img src=\"./system/images/errorMessage.svg\" style=\"width:20px;height:20px;vertical-align:middle;\"></button> ";
                } else {
                    str += "<button class=\"taskbarButton\" onclick='openWindow(\"" + element + "\")' title=\"" + element + "\"><img src=\"./system/images/" + element + ".svg\" style=\"width:20px;height:20px;vertical-align:middle;\"></button> ";
                }

            });
        }

        document.getElementById("taskbarButtons").innerHTML = str;
    } catch { new NotificationLogic().notificationService("Error", "Unable to update taskbar, is <code>userInterface</code> loaded?") }

}

function bringToFront(window) {
    try {
        maxamount += 1;
        window.style.zIndex = maxamount;
        focusedWindow = window.id;
    } catch (e) { }
}

function loadWindow(appFile, fromKernel = 0, register = 1, fromAddApp = 0) {
    new consoleNotifier().notifyLoadApp(appFile);
    let x = fetch(appFile).then(response => response.text()).then(text => {
        document.getElementById("temp").innerHTML = text;
        if (document.getElementById("temp").childNodes[0].id != undefined || document.getElementById("temp").childNodes[0].id != null) {
            document.getElementById("windowStore").insertAdjacentHTML("afterbegin", text);

            for (let i = 0; i < document.getElementsByClassName("window").length; i++) {
                new DragLogic().dragElement(document.getElementsByClassName("window")[i], document.getElementsByClassName("windowTitle")[i]);
            }
            if (fromKernel == 0) { openWindow(document.getElementById("windowStore").childNodes[0].id); }
            if (fromAddApp == 1) {
                new NotificationLogic().notificationService(
                    "Import App",
                    "The app has been loaded, but needs to be started from " +
                    "<B>Execute Command</B> with the following command:" +
                    "<br><code>openWindow(\"" + document.getElementById("windowStore").childNodes[0].id + "\");</code><br><br>" +
                    "<button onclick=\"openWindow('" + document.getElementById("windowStore").childNodes[0].id + "');\">Open loaded app</button>");
            }
            if (register == 1) {
                loadedApps.push(document.getElementById("windowStore").childNodes[0].id);
            }
            populateStartMenuAppList("startMenuAppList");
        } else {
            new ErrorLogic().sendError("System Error", "The app file specified does not contain a valid application. Please check the name and try again.<br>File: " + appFile);
        }

    }).catch(function (e) { new ErrorLogic().sendError("System Error", "The system cannot find the application specified.<br>Please check the name and try again<br><br>File: " + appFile + "<br><br>" + e); });
}

function updateTitlebar() {
    try {
        let x = activeapps;
        for (let i = 0; i < x.length; i++) {
            setTimeout(() => {
                if (focusedWindow != "Shut Down ArcOS") {
                    if (activeapps.includes("Shut Down ArcOS")) {
                        closewindow(document.getElementById("Shut Down ArcOS"));
                    }
                }
            }, 250);
            if (focusedWindow == x[i] && !excludeTitlebarChange.includes(x[i])) {
                try { document.getElementById(x[i]).children[0].style.backgroundColor = "transparent"; } catch { }
                try { document.getElementById(x[i]).children[0].style.opacity = "1"; } catch { }
            } else {
                if (excludeTitlebarChange.includes(x[i])) {
                    try { document.getElementById(x[i]).children[0].style.backgroundColor = "transparent"; } catch { }
                    try { document.getElementById(x[i]).children[0].style.opacity = "1"; } catch { }
                } else {
                    try { document.getElementById(x[i]).children[0].style.backgroundColor = "transparent"; } catch { }
                    try { document.getElementById(x[i]).children[0].style.opacity = "0.5"; } catch { }
                }

            }
        }
    } catch { }
}

/*setInterval(() => {
    updateTitlebar();
}, 10);*/

function closeAllWindows() {
    for (let i = 0; i < document.getElementsByClassName("window").length; i++) {
        closewindow(document.getElementsByClassName("window")[i]);
        activeapps = [];
    }
}

function maximizeWindow(win) {
    new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.maximizeWindow: " + win.id)
    setTimeout(() => {
        bringToFront(win);
    }, 100);
    let currentWidth = win.style.minWidth,
        currentHeight = win.style.minHeight,
        currentX = win.style.left,
        currentY = win.style.top;
    win.style.minWidth = "100%";
    win.style.minHeight = "calc(100% - 35px)";
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

function unMaximizeWindow(win) {
    new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.unMaximizeWindow: " + win.id)
    setTimeout(() => {
        bringToFront(win);
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

function toggleMaximizedState(win) {
    new consoleNotifier().notifyStartService("ArcOS.System.windowLogic.toggleMaximizedState: " + win.id)
    if (localStorage.getItem(win.id + "_windowData") != null) {
        unMaximizeWindow(win);
    } else {
        maximizeWindow(win)
    }
    bringToFront(win);
}

function deleteWindowData() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("_windowData")) {
            console.log(localStorage.key(i));
            console.log(localStorage.getItem(localStorage.key(i)))
            localStorage.removeItem(localStorage.key(i));
        }
    }
}
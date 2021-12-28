ConsoleNotifier.startModule("ArcOS.System.toolbarLogic");

function setToolbarTrigger() {
    document.getElementById("toolbarHoverTrigger").addEventListener("mouseover", () => {
        if (enableToolbar == true) {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTriggerTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.remove("retracted")
            }, 1000);
            document.getElementById("toolbar", 0).classList.remove("retracted");
        } else {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbar").addEventListener("mouseover", () => {
        if (enableToolbar == true) {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.remove("retracted")
            }, 1000);
        } else {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbar").addEventListener("mouseleave", () => {
        if (enableToolbar == true) {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        } else {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbarHoverTrigger").addEventListener("mouseleave", () => {
        if (enableToolbar == true) {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTriggerTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        } else {
            clearTimeout(toolbarTimeout)
            clearTimeout(toolbarTriggerTimeout)
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    });

    setInterval(() => {
        let { BrowserWindow } = require("electron").remote,
            toolbar = document.getElementById("toolbar"),
            fullscreen;

        if (BrowserWindow.getFocusedWindow()) {
            fullscreen = BrowserWindow.getFocusedWindow().fullScreen || false;
        } else {
            fullscreen = false;
        }

        if (!fullscreen) {
            toolbar.style.display = "none";
        } else {
            toolbar.style.display = "";
        }
    }, 100);
}

function toggleFullscreenMode() {

    ConsoleNotifier.notifyStartService("toggleFullscreenMode");

    let { BrowserWindow } = require("electron").remote;
    if (BrowserWindow.getFocusedWindow().fullScreen == true) {
        BrowserWindow.getFocusedWindow().fullScreen = false;
    } else {
        BrowserWindow.getFocusedWindow().fullScreen = true;
    }
}

/*function setToolbarMode() {
    let checked = document.getElementById("enableToolbarSwitch").checked;
    if (checked == true) {
        enableToolbar = true;
        localStorage.setItem(args.get("username") + "_enableToolbar", 1);
    } else {
        enableToolbar = false;
        localStorage.setItem(args.get("username") + "_enableToolbar", 0);
        clearTimeout(toolbarTimeout)
        clearTimeout(toolbarTriggerTimeout)
        toolbarTimeout = setTimeout(() => {
            document.getElementById("toolbar").classList.add("retracted")
        }, 1000);
    }
}*/
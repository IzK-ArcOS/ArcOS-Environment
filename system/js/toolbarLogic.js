try { new consoleNotifier().startModule("ArcOS.System.toolbarLogic"); } catch (e) { };

function setToolbarTrigger() {
    document.getElementById("toolbarHoverTrigger").addEventListener("mouseover", () => {
        if (enableToolbar == true) {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTriggerTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.remove("retracted")
            }, 1000);
            document.getElementById("toolbar", 0).classList.remove("retracted");
        } else {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbar").addEventListener("mouseover", () => {
        if (enableToolbar == true) {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.remove("retracted")
            }, 1000);
        } else {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbar").addEventListener("mouseleave", () => {
        if (enableToolbar == true) {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        } else {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })

    document.getElementById("toolbarHoverTrigger").addEventListener("mouseleave", () => {
        if (enableToolbar == true) {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTriggerTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        } else {
            try { clearTimeout(toolbarTimeout) } catch { }
            try { clearTimeout(toolbarTriggerTimeout) } catch { }
            toolbarTimeout = setTimeout(() => {
                document.getElementById("toolbar", 0).classList.add("retracted")
            }, 1000);
        }
    })
}

function toggleFullscreenMode() {
    let { BrowserWindow } = require("electron").remote;
    if (BrowserWindow.getFocusedWindow().fullScreen == true) {
        BrowserWindow.getFocusedWindow().fullScreen = false;
    } else {
        BrowserWindow.getFocusedWindow().fullScreen = true;
    }
}

function setToolbarMode() {
    let checked = document.getElementById("enableToolbarSwitch").checked;
    if (checked == true) {
        enableToolbar = true;
        localStorage.setItem(args.get("username") + "_enableToolbar", 1);
    } else {
        enableToolbar = false;
        localStorage.setItem(args.get("username") + "_enableToolbar", 0);
        try { clearTimeout(toolbarTimeout) } catch { }
        try { clearTimeout(toolbarTriggerTimeout) } catch { }
        toolbarTimeout = setTimeout(() => {
            document.getElementById("toolbar").classList.add("retracted")
        }, 1000);
    }
}
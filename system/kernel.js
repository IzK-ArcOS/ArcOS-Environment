////////////////////////////////////////////////////////////////////////
// The below variable, "start", specifies at what page ArcOS starts. //
// This variable can have one of the following values:              //
// 0 - Start at the bootscreen (main.html)                         //
// 1 - Start at the login (login.html)                            //
// 2 - Start at the ArcOS Desktop (ArcOS.html)                   //
//////////////////////////////////////////////////////////////////
let start = 0;

let win;
let { app, BrowserWindow } = require('electron')

if (!app.requestSingleInstanceLock()) {
    app.quit();
} else {

    app.on("ready", () => {
        let { app, globalShortcut } = require('electron')

        globalShortcut.register("Alt+Enter", () => {
            if (BrowserWindow.getFocusedWindow().fullScreen == true) {
                BrowserWindow.getFocusedWindow().fullScreen = false;
            } else {
                BrowserWindow.getFocusedWindow().fullScreen = true;
            }
        })

        globalShortcut.register('Control+Shift+I', () => {
            win.toggleDevTools();
        })
        globalShortcut.register("F4", () => {
            return false;
        })

        globalShortcut.register("Control+Alt+Shift+R", () => {
            win.loadFile("main.html")
        })
        win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: true,
            minWidth: 1000,
            minHeight: 700,
            fullscreen: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                devTools: true
            },
            backgroundColor: "#000",
        })

        win.removeMenu();

        loadStartPage();

        win.on("maximize", () => {
            win.unmaximize();
            setTimeout(() => {
                win.fullScreen = true;
            }, 50);
        })
    });


    function loadStartPage() {
        switch (start) {
            case 0:
                win.loadFile("main.html");
                break;
            case 1:
                win.loadFile("login.html");
                break;
            case 2:
                win.loadFile("arcos.html");
                break;
        }
    }
}
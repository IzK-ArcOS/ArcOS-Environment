console.info("%cWebOSv3", "color:dodgerblue;font-size:36px;text-align:middle")
console.info("%cWelcome to the ArcOSv1 console! Be careful, if you modify the wrong things you can (temporarily) break the OS.", "font-size:16px")


class consoleNotifier {
    notifyStartService(name, forControl = "") {
        if (!forControl) {
            console.info(`%cSTATUS: Started ${name}`, "color:#00ff00");
        } else {
            console.info(`%cSTATUS: Started ${name} for ${forControl}`, "color:#ffff00");
        }
    }

    notifyLoadApp(app, mod = "System.windowLogic.loadWindow") {
        console.info(`%cStarted ${mod}: Loading .app file from ${app}`, "color: #00ffff");
    }

    notifyStopService(name) {
        console.info(`%Stopped ${name}...`, "color:#00ff00");
    }

    notifyLoadModule(mod, from = "System.windowLogic.loadWindow") {
        console.info(`${from}: Loading module from "${mod}"`);
    }

    startModule(mod) {
        console.warn(`Initiated module: ${mod}`);
    }
}
new consoleNotifier().startModule("System.consoleNotifier");

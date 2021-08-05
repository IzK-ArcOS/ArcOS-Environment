console.warn = (e, c) => {
    if (e != "%cElectron Security Warning (Insecure Content-Security-Policy)") {
        console.info(`%c${e}`, 'color:orange')
    }
        
}

console.info(
    "%c                     ____   _____\n" +
    "    /\\             / __ \\ / ____|\n" +
    "   /  \\   _ __ ___| |  | | (___  \n" +
    "  / /\\ \\ | '__/ __| |  | |\\___ \\\n " +
    "/ /  \\ \\| | | (__| |__| |____) |\n" +
    "/_/    \\_\\_|  \\___|\\____/|_____/\n" +
    "                                    ", "color:deepskyblue;");


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
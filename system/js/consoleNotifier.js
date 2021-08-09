console.warn = (e, c) => {
    if (e != "%cElectron Security Warning (Insecure Content-Security-Policy)") {
        console.info(`%c${e}`, 'color:#fe8019;');
    }

}

window.onerror = function (e, c) {
    console.info(`%c${e}`, 'color:#fb4934;');
}

console.error = (e, c) => {
    console.info(`%c${e}`, 'color:#fb4934;');
}

console.info(
    "%c                    ____   _____\n" +
    "    /\\             / __ \\ / ____|\n" +
    "   /  \\   _ __ ___| |  | | (___  \n" +
    "  / /\\ \\ | '__/ __| |  | |\\___ \\\n " +
    "/ /  \\ \\| | | (__| |__| |____) |\n" +
    "/_/    \\_\\_|  \\___|\\____/|_____/\n" +
    "                                    ", "color:#83a598  ;");


class consoleNotifier {
    notifyStartService(name, forControl = "") {
        if (!forControl) {
            console.info(`%cSTATUS: Started ${name}`, "color:#b8bb26");
        } else {
            console.info(`%cSTATUS: Started ${name} for ${forControl}`, "color:#fabd2f");
        }
    }

    notifyLoadApp(app, mod = "System.windowLogic.loadWindow") {
        console.info(`%cStarted ${mod}: Loading .app file from ${app}`, "color: #d3869b");
    }

    notifyStopService(name) {
        console.info(`%Stopped ${name}...`, "color:#b8bb26");
    }

    notifyLoadModule(mod, from = "System.windowLogic.loadWindow") {
        console.info(`${from}: Loading module from "${mod}"`);
    }

    startModule(mod) {
        console.warn(`Initiated module: ${mod}`);
    }
}
new consoleNotifier().startModule("System.consoleNotifier");
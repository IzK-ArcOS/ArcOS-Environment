/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 28th 2022,
 * and was finished at 2:25PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

console.info(
    "%c                    ____   _____\n" +
    "    /\\             / __ \\ / ____|\n" +
    "   /  \\   _ __ ___| |  | | (___  \n" +
    "  / /\\ \\ | '__/ __| |  | |\\___ \\\n " +
    "/ /  \\ \\| | | (__| |__| |____) |\n" +
    "/_/    \\_\\_|  \\___|\\____/|_____/\n" +
    "                                    ", "color:#83a598  ;");

let loadedModules = [];

class consoleNotifier {
    cInf(str, ...css) {
        console.info(str, ...css);
    }

    getTimeData() {
        const t = new Date();
        const h = t.getHours().toString().padStart(2, "0");
        const m = t.getMinutes().toString().padStart(2, "0");
        const s = t.getSeconds().toString().padStart(2, "0");
        const ms = t.getMilliseconds().toString().padStart(3, "0");

        return { h, m, s, ms };
    }

    notifyStartService(name, forControl = "") {
        const { h, m, s, ms } = this.getTimeData();

        this.cInf(
            `%c${h}:${m}:${s}.${ms}%cSTATUS%c Started ${name} ${forControl ? `for ${forControl}` : ``}`,
            this.timeStampCSS,
            `${this.statusTxtCSS}background-color:#83a598;`,
            "color: #83a598"
        );
    }

    notifyLoadApp(app, mod = "windowLogic.loadWindow") {
        const { h, m, s, ms } = this.getTimeData();

        this.cInf(
            `%c${h}:${m}:${s}.${ms}%c${mod}%c Importing ${app}`,
            this.timeStampCSS,
            `${this.statusTxtCSS}background-color:#d3869b;`,
            "color: #d3869b"
        );
    }

    registerMod(mod) {
        const { h, m, s, ms } = this.getTimeData();

        if (!loadedModules.includes(mod)) {
            loadedModules.push(mod);

            this.cInf(
                `%c${h}:${m}:${s}.${ms}%cJS%c Module registered: ${mod}`,
                this.timeStampCSS,
                `${this.statusTxtCSS}background-color:#fabd2f;`,
                "color: #fabd2f"
            );
        }
    }

    init() {
        console.warn = (e, c) => {
            if (e != "%cElectron Security Warning (Insecure Content-Security-Policy)") {
                const { h, m, s, ms } = ConsoleNotifier.getTimeData()
                console.info(`%c${h}:${m}:${s}.${ms}%c${e}`, ConsoleNotifier.timeStampCSS, 'color:#fe8019;');
            }

        }

        window.onerror = function (e, c) {
            const { h, m, s, ms } = ConsoleNotifier.getTimeData();

            console.info(`%c${h}:${m}:${s}.${ms}%cERR%c${e}`, ConsoleNotifier.timeStampCSS, ConsoleNotifier.errorCSS, 'color:#fb4934;');
        }

        console.error = (e, c) => {
            const { h, m, s, ms } = ConsoleNotifier.getTimeData();

            console.info(`%c${h}:${m}:${s}.${ms}%cERR%c${e}`, ConsoleNotifier.timeStampCSS, ConsoleNotifier.errorCSS, 'color:#fb4934;');
        }
    }

    timeStampCSS = "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px";
    statusTxtCSS = "color: #000;padding:2.5px 5px;border-radius:2.5px;";
    errorCSS = "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#800;margin-right:10px";
}

const ConsoleNotifier = new consoleNotifier();

ConsoleNotifier.init();

ConsoleNotifier.registerMod("ArcOS.System.consoleNotifier");
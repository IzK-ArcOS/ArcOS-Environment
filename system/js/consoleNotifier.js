console.warn = (e, c) => {
    if (e != "%cElectron Security Warning (Insecure Content-Security-Policy)") {
        let today = new Date();
        let hour = today.getHours().toString().padStart(2,"0");
        let minute = today.getMinutes().toString().padStart(2,"0");
        let second = today.getSeconds().toString().padStart(2,"0");
        let milisecond = today.getMilliseconds().toString().padStart(3,"0");
        console.info(`%c${hour}:${minute}:${second}.${milisecond}%c${e}`,"color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",'color:#fe8019;');
    }

}

window.onerror = function(e, c) {
    let today = new Date();
    let hour = today.getHours().toString().padStart(2,"0");
    let minute = today.getMinutes().toString().padStart(2,"0");
    let second = today.getSeconds().toString().padStart(2,"0");
    let milisecond = today.getMilliseconds().toString().padStart(3,"0");
    console.info(`%c${hour}:${minute}:${second}.${milisecond}%cERR%c${e}`,"color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px","color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#800;margin-right:10px",'color:#fb4934;');
}

console.error = (e, c) => {
    let today = new Date();
    let hour = today.getHours().toString().padStart(2,"0");
    let minute = today.getMinutes().toString().padStart(2,"0");
    let second = today.getSeconds().toString().padStart(2,"0");
    let milisecond = today.getMilliseconds().toString().padStart(3,"0");
    console.info(`%c${hour}:${minute}:${second}.${milisecond}%cERR%c${e}`,"color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px","color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#800;margin-right:10px",'color:#fb4934;');
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
        let today = new Date();
        let hour = today.getHours().toString().padStart(2,"0");
        let minute = today.getMinutes().toString().padStart(2,"0");
        let second = today.getSeconds().toString().padStart(2,"0");
        let milisecond = today.getMilliseconds().toString().padStart(3,"0");
        if (!forControl) {
            console.info(`%c${hour}:${minute}:${second}.${milisecond}%cSTATUS%c Started ${name}`,
            "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
                "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#83a598;",
                "color: #83a598"
            );
        } else {
            
            console.info(`%c${hour}:${minute}:${second}.${milisecond}%cSTATUS%c Started ${name} for ${forControl}`,
            "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
                "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#83a598;",
                "color: #83a598"
            );
        }
    }

    notifyLoadApp(app, mod = "loadWindow") {
        let today = new Date();
        let hour = today.getHours().toString().padStart(2,"0");
        let minute = today.getMinutes().toString().padStart(2,"0");
        let second = today.getSeconds().toString().padStart(2,"0");
        let milisecond = today.getMilliseconds().toString().padStart(3,"0");
        console.info(
            `%c${hour}:${minute}:${second}.${milisecond}%c${mod}%c Importing ${app}`,
            "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
            "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#d3869b;",
            "color: #d3869b"
        );
    }
    startModule(mod) {
        let today = new Date();
        let hour = today.getHours().toString().padStart(2,"0");
        let minute = today.getMinutes().toString().padStart(2,"0");
        let second = today.getSeconds().toString().padStart(2,"0");
        let milisecond = today.getMilliseconds().toString().padStart(3,"0");
        console.info(
            `%c${hour}:${minute}:${second}.${milisecond}%cJS%c ${mod}`,
            "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
            "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#fabd2f;",
            "color: #fabd2f"
        );
    }
}
new consoleNotifier().startModule("ArcOS.System.consoleNotifier");
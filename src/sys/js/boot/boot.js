onload = function () {
    ConsoleNotifier.notifyStartService("ArcOS.Boot")
    document.body.style.opacity = "1"
    if (localStorage.getItem("WebOSVersion") && localStorage.getItem("FTSFinished") && localStorage.length) {
        ConsoleNotifier.notifyStartService("ArcOS.Boot: configuring boot flags for FTS")
        localStorage.setItem("FTSFinished", "true");
    }
    if (localStorage.getItem("WebOSVersion") !== version && localStorage.getItem("safeMode") !== "1") {
        document.getElementById("statusText").innerHTML = localStorage.length ? ("Updating to " + version) : ("Preparing ArcOS");
        localStorage.setItem("WebOSVersion", version);
    }
    setTimeout(() => {
        ConsoleNotifier.notifyStartService("ArcOS.Boot: loading done, preparing for redirect")
        document.body.style.opacity = "0"
        setTimeout(() => {
            ConsoleNotifier.notifyStartService("ArcOS.Boot: redirect started")
            document.body.innerHTML = "";
            setTimeout(() => {
                ConsoleNotifier.notifyStartService("ArcOS.Boot: redirecting to login")
                window.location.href = "login.html";
            }, 1000);
        }, 2000);
    }, 8000);

    document.addEventListener("keydown", (e) => {
        if (e.key.toLocaleLowerCase() == "f8") {
            ConsoleNotifier.notifyStartService("ArcOS.Boot: F8 pressed, entering Safe Mode")
            document.getElementById("statusText").innerHTML = "Please Wait";
            localStorage.setItem("safeMode", "1");
        }
    })

    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
            ConsoleNotifier.notifyStartService("ArcOS.Boot: Ctrl+Shift+E pressed, clearing LocalStorage")
            localStorage.clear();
            document.getElementById("statusText").innerHTML = "Resetting ArcOS"
        }

        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            window.location.href = "arcterm.html";
        }
    });
}
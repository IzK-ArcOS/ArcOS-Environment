new consoleNotifier().startModule("ArcOS.System.powerLogic");

class PowerLogic {

    shutdown() {
        if (ArcTermOnly) window.close();
        new consoleNotifier().notifyStartService("PowerLogic.shutdown");

        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'shutdown.html?username=' + args.get("username"); }, 1000);
    }

    logoff() {
        if (ArcTermOnly) window.location.href = "login.html";
        new consoleNotifier().notifyStartService("PowerLogic.logoff");

        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'logoff.html?username=' + args.get("username"); }, 1000);
    }

    restart() {
        if (ArcTermOnly) window.location.href = "main.html";
        new consoleNotifier().notifyStartService("PowerLogic.restart");

        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'restart.html?username=' + args.get("username"); }, 1000);
    }


    fts() {
        if (ArcTermOnly) window.location.href = "firsttimesetup.html";
        new consoleNotifier().notifyStartService("PowerLogic.fts");

        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'firsttimesetup.html'; }, 1000);
    }

    lock() {    
        let userData = getCurrentUserData();

        if (userData.pswd) {
            document.getElementById("lockScreenUsername").innerText = args.get("username");
            document.getElementsByClassName("lockScreen")[0].classList.remove("hidden");
            lockScreenActive = true;
            new consoleNotifier().notifyStartService("powerLogic.lock: locked ArcOS Desktop")
        } else {
            errorLogic.sendError("Lock Not Available", "In order for you to be able to lock your desktop, you must have a password. Go to settings to set a password, and then try again.")
        }
    }

    async unlock() {
        let userData = getCurrentUserData();
        let ntrdPswd = document.getElementById("lockScreenPasswordInputField").value;

        if (await verifyPassword(args.get("username"), ntrdPswd)) {
            new consoleNotifier().notifyStartService("powerLogic.unlock: unlocked ArcOS Desktop")
            document.getElementById("lockScreenPasswordInputField").value = "";
            document.getElementsByClassName("lockScreen")[0].classList.add("hidden");
            lockScreenActive = false;
        } else {
            document.getElementById("lockScreenPasswordInputField").style.backgroundColor = "#ff000044";
            setTimeout(() => {
                document.getElementById("lockScreenPasswordInputField").style.backgroundColor = "";
            }, 2000);
        }
    }
}

let powerLogic = new PowerLogic();
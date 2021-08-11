new consoleNotifier().startModule("ArcOS.System.powerLogic");

class PowerLogic {

    shutdown() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'shutdown.html?username=' + args.get("username"); }, 1000);
    }

    logoff() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'logoff.html?username=' + args.get("username"); }, 1000);
    }

    restart() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'restart.html?username=' + args.get("username"); }, 1000);
    }


    fts() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'firsttimesetup.html'; }, 1000);
    }

    lock() {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));

        if (userData.pswd) {
            document.getElementById("lockScreenUsername").innerText = args.get("username");
            document.getElementsByClassName("lockScreen")[0].classList.remove("hidden");
            lockScreenActive = true;
        } else {
            new ErrorLogic().sendError("Lock Not Available","In order for you to be able to lock your desktop, you must have a password. Go to settings to set a password, and then try again.")
        }
    }

    unlock() {
        let userData = JSON.parse(localStorage.getItem(args.get("username")));
        let reqPswrd = userData.pswd;
        let ntrdPswd = document.getElementById("lockScreenPasswordInputField").value;

        if (reqPswrd == ntrdPswd) {
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

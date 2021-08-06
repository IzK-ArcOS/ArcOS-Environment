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
        setTimeout(() => { window.location.href = 'logoff.html?username=' +  args.get("username"); }, 1000);
    }
    
    restart() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'restart.html?username=' +  args.get("username"); }, 1000);
    }
    
    
    fts() {
        document.getElementsByClassName("block")[0].style.visibility = "visible";
        document.getElementsByClassName("block")[0].style.opacity = "1";
        setTimeout(() => { window.location.href = 'firsttimesetup.html'; }, 1000);
    }

}

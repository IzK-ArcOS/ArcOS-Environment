new consoleNotifier().startModule("ArcOS.System.startMenuLogic");

function toggleStart() {

    new consoleNotifier().notifyStartService("toggleStart");

    try {
        if (document.getElementById('startMenu').style.visibility === 'visible') {
            hideStart();
        } else {
            showStart();
        }
    } catch {
        new ErrorLogic().bsod("window.addEventListener: START_NOT_LOADED", "The startMenu is not loaded.");
    }

}

window.addEventListener('mousedown', function(event) {
    if (!lockScreenActive) {
        try {
            strt = document.getElementById('startMenu');
            startbutton = document.getElementById('startButton');
            if (!strt.contains(event.target) && !strt.contains(event.target.parentNode) && event.target.id != "startButton" && !startbutton.contains(event.target) && !startbutton.contains(event.target.parentNode)) {
                if (strt.style.visibility === 'visible') {
                    document.getElementById('startMenu').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('startMenu').style.visibility = 'hidden';
                        document.getElementById('startMenu').style.display = 'none';
                    }, 200);
                }
            }
        } catch {
            new ErrorLogic().bsod("window.addEventListener: START_NOT_LOADED", "The startMenu is not loaded.");
        }
    }
});

function populateStartMenuAppList(appListId) {

    //new consoleNotifier().notifyStartService("populateStartMenuAppList");

    let div = document.getElementById(appListId);
    div.innerHTML = "";
    for (let i = 0; i < loadedApps.length; i++) {
        div.innerHTML += "<button class=\"transparent fullWidth textAlignLeft\" onclick=\"new WindowLogic().openWindow('" + loadedApps[i] + "')\"><img src=\"./system/images/" + loadedApps[i] + ".svg\" style=\"height:15px;vertical-align:middle\">&nbsp;&nbsp;" + loadedApps[i] + "</button>";
    }
}

function hideStart() {
    document.getElementById('startMenu').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('startMenu').style.visibility = 'hidden';
        document.getElementById('startMenu').style.display = 'none';
    }, 200);
}

function showStart() {
    document.getElementById('startMenu').style.display = 'block';
    setTimeout(() => {
        document.getElementById('startMenu').style.opacity = '0'
        document.getElementById('startMenu').style.visibility = 'visible';
        document.getElementById('startMenu').style.opacity = '1';
    }, 200);
}
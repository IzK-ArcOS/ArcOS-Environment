function toggleStart() {
    ConsoleNotifier.notifyStartService("toggleStart");

    const sM = document.getElementById("startMenu");

    if (sM) {
        if (sM.style.visibility === 'visible') {
            hideStart();
        } else {
            showStart();
        }
    } else {
        errorLogic.bsod("window.addEventListener: START_NOT_LOADED", "The startMenu is not loaded.");
    }
}

window.addEventListener('mousedown', function (e) {
    if (!lockScreenActive) {
        const sM = document.getElementById("startMenu");
        const sB = document.getElementById("startButton");
        if (sM && sB) {
            if (
                !sM.contains(e.target) &&
                !sM.contains(e.target.parentNode) &&
                e.target.id != sB.id &&
                !sB.contains(e.target) &&
                !sB.contains(e.target.parentNode)
            ) {
                if (sM.style.visibility === 'visible') {
                    document.getElementById('startMenu').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('startMenu').style.visibility = 'hidden';
                        document.getElementById('startMenu').style.display = 'none';
                    }, 200);
                }
            }
        } else {
            errorLogic.bsod("window.addEventListener: START_NOT_LOADED", "The startMenu is not loaded.");
        }
    }
});

function populateStartMenuAppList(appListId) {
    let div = document.getElementById(appListId);
    div.innerHTML = "";
    for (let i = 0; i < loadedApps.length; i++) {
        div.innerHTML += "<button class=\"transparent fullWidth textAlignLeft\" onclick=\"windowLogic.openWindow('" + loadedApps[i] + "')\"><img src=\"./../img/" + loadedApps[i].toLowerCase() + ".svg\" style=\"height:15px;vertical-align:middle\">&nbsp;&nbsp;" + loadedApps[i] + "</button>";
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

hideStart();

ConsoleNotifier.registerMod("ArcOS.System.soundLogic");

function playSystemSound(sound) {
    ConsoleNotifier.notifyStartService("playSystemSound");

    let userData = getCurrentUserData();

    if (localStorage.getItem("safeMode") != 1) {
        if (userData.muted == 0) {
            let audio = new Audio(sound);
    
            audio.volume = globalVolume;
            audio.play();
        }
    }
}

function changeVolumeState() {
    ConsoleNotifier.notifyStartService("changeVolumeState");

    let checked = document.getElementById("volumeControlEnableSoundSwitch").checked;

    console.log(checked);

    if (checked == true) {
        let userData = getCurrentUserData();
        userData.muted = 1;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
    } else {
        let userData = getCurrentUserData();
        userData.muted = 0;
        localStorage.setItem(args.get("username"), JSON.stringify(userData));
    }
}
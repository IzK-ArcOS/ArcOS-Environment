new consoleNotifier().startModule("ArcOS.System.soundLogic");

function playSystemSound(sound) {
    if (localStorage.getItem("safeMode") != 1) {
        if (localStorage.getItem(args.get("username") + "_muted") == 0) {
            let audio = new Audio(sound);
            audio.volume = globalVolume;
            audio.play();
        }
    }
}

function changeVolumeState() {
    let checked = document.getElementById("volumeControlEnableSoundSwitch").checked;
    if (checked == true) {
        localStorage.setItem(args.get("username") + "_muted", 1)
    } else {
        localStorage.setItem(args.get("username") + "_muted", 0);
    }
}
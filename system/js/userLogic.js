new consoleNotifier().startModule("ArcOS.System.userLogic");

function createUserData(user) {
    localStorage.setItem(user, JSON.stringify(userTemplate));
    return `Userdata of "${user}" has been created.`;
}

function deleteUserData(user, notify = 1) {
    if (user && localStorage.getItem(user)) {
        localStorage.removeItem(user);
    }

    return `Userdata of "${user}" has been deleted.`;
}

function resetUserData(user) {
    if (localStorage.getItem(user)) {
        localStorage.setItem(user, JSON.stringify(userTemplate));
    }

    return `Userdata of "${user}" has been reset.`;
}

function changeUserDataName(oldname, newname) {
    if (oldname && newname) {
        if (localStorage.getITem(oldname)) {
            let userData = JSON.parse(localStorage.getItem(oldname));

            localStorage.setItem(newname, JSON.stringify(userData));
        }
    }

    return `Userdata of "${oldname}" has been renamed to "${newname}".`;
}

function toggleUserData(user) {
    if (localStorage.getItem(user) && JSON.parse(localStorage.getItem(user))) {
        let userData = JSON.parse(localStorage.getItem(user));

        userData.enabled = !userData.enabled;

        localStorage.setItem(user, JSON.stringify(userData));
        return `Userdata access of "${user}" has been toggled to "${localStorage.getItem(userData.enabled)}".`;

    }

}

function setUserProfilePicture(user, x) {
    if (user && localStorage.getItem(user) && x) {
        let userData = JSON.parse(localStorage.getItem(user));

        userData.profilePicture = x;

        localStorage.setItem(user, JSON.stringify(userData));
    }
    return `Profile picture of "${user}" has been set to "${x}".`;
}

function startUserDataUpdateCycle() {
    setInterval(() => {
        localStorage.setItem("userAmount", 0);
        localStorage.removeItem("userList");
        let tempUsrList = [];
        if (localStorage.getItem("userList")) {
            tempUsrList = localStorage.getItem("userList").split(',');
        }
        for (let i = 0; i < localStorage.length; i++) {
            try {
                let userData = JSON.parse(localStorage.getItem(localStorage.key(i)));

                if (
                    userData.enabled == 1 &&
                    userData.theme
                ) {
                    localStorage.setItem("userAmount", parseInt(localStorage.getItem("userAmount")) + 1);
                    tempUsrList.push(localStorage.key(i));
                }
            }
            catch { }
            localStorage.setItem("userList", tempUsrList);
        }
    }, 500);
}

function convertUserAccount(user) {
    let template = userTemplate,
        original = [],
        converted = [],
        out = `{"enabled":${localStorage.getItem(user)},`;

    for (let key in template) {
        converted.push(key);
        original.push(key);
    };

    for (let i = 1; i < converted.length; i++) {
        if (localStorage.getItem(`${user}_${converted[i]}`)) {
            converted[i] = localStorage.getItem(`${user}_${converted[i]}`);

            if (converted[i] != original[i]) {
                console.log(converted[i], isBoolOrInt(converted[i]));

                if (isBoolOrInt(converted[i].toString())) {
                    out += `"${original[i]}":${converted[i]}`;
                } else {
                    out += `"${original[i]}":"${converted[i]}"`;
                }

                if (i != converted.length - 1) out += ","
            }

            localStorage.removeItem(`${user}_${original[i]}`);
        }
    }

    if (out.endsWith(",")) {
        out = out.substring(0, out.length - 1);
    }

    out += "}";

    let userData = JSON.parse(out);
    if (!userData.profilePicture) {
        userData.profilePicture = null;
    }

    out = JSON.stringify(userData);

    localStorage.setItem(user, out);
}

function isBoolOrInt(str) {
    let isBool = (str.valueOf() === "true" || str.valueOf() === "false");
    let isInt = isNumeric(str);
    return (isBool || isInt);
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function hotSwapUserAccount(username) {
    if (localStorage.getItem(username)) {
        let userData = JSON.parse(localStorage.getItem(username));
        
        if (!userData.pswd) {
            args.set("username", username);
            setTimeout(() => {
                new OnloadLogic().loadTheme();
                new OnloadLogic().loadTaskbarPos();
                new PersonalizationLogic().setTitlebarButtonLocations(false, false)
                new GeneralLogic().updateDesktopIcons();
                new PersonalizationLogic().setAnimations(false);
                openSettingsPane("home", document.getElementsByClassName("controlPanelSidebar")[0]);
                initiateArcTerm();
                notifications = [];
                closeAllWindows();
                setTimeout(() => {    
                    new ErrorLogic().sendError("ArcOS User Accounts",`The account was successfully switched to "${username}".`);
                }, 100);
            }, 100);            
        } else {
            new ErrorLogic().sendError("Unable to switch",`ArcOS can't switch to the "${username}" account because it has a password. To use this account, log in to it using the ArcOS Login.`);
        }
    }
}

const userTemplate = {
    enabled: 1,
    dispWelcome: 1,
    enableAnimations: true,
    globalVolume: 1,
    muted: 0,
    noTaskbarButtonLabels: true,
    showDesktopIcons: 1,
    taskbarpos: "bottom",
    theme: "darkrounded",
    titlebarButtonsLeft: false,
    profilePicture: null,
};
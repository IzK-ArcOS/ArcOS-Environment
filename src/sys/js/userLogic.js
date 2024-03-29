const argon2 = require("argon2");

ConsoleNotifier.registerMod("ArcOS.System.userLogic");

function createUserData(user, override = false, notify = false) {
    ConsoleNotifier.notifyStartService("createUserData");

    if (user) {
        if (isAdmin(args.get("username")) || override) {
            localStorage.setItem(user, JSON.stringify(userTemplate));
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" was created successfully.`
                );
            }
            return `Userdata of "${user}" has been created.`;
        } else {
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" could not be created.<br><br>Reason: you do not have admin rights.`
                );
            }
            return `Userdata of "${user}" could not be created: logged in user is not admin.`;
        }
    } else {
        if (notify) {
            errorLogic.sendError(
                "User Accounts",
                `User account of "${user}" could not be created.<br><br>Reason: username cannot be empty.`
            );
        }
    }
}

function deleteUserData(user, override = false, notify = false) {
    ConsoleNotifier.notifyStartService("deleteUserData");

    if (user) {
        if (isAdmin(args.get("username")) || override) {
            if (user && localStorage.getItem(user)) {
                localStorage.removeItem(user);
            }
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" was deleted successfully.`
                );
            }
            return `Userdata of "${user}" has been deleted.`;
        } else {
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" could not be deleted.<br><br>Reason: you do not have admin rights.`
                );
            }
            return `Userdata of "${user}" could not be deleted: logged in user is not admin.`;
        }
    } else {
        if (notify) {
            errorLogic.sendError(
                "User Accounts",
                `User account of "${user}" could not be deleted.<br><br>Reason: username cannot be empty.`
            );
        }
    }
}

function resetUserData(user, override = false, notify = false) {
    ConsoleNotifier.notifyStartService("resetUserData");

    if (user) {
        if (isAdmin(args.get("username")) || override) {
            if (localStorage.getItem(user)) {
                localStorage.setItem(user, JSON.stringify(userTemplate));
            }
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" was reset successfully.`
                );
            }
            return `Userdata of "${user}" has been reset.`;
        } else {
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" could not be reset.<br><br>Reason: you do not have admin rights.`
                );
            }
            return `Userdata of "${user}" could not be reset: logged in user is not admin`;
        }
    } else {
        if (notify) {
            errorLogic.sendError(
                "User Accounts",
                `User account of "${user}" could not be reset.<br><br>Reason: username cannot be empty.`
            );
        }
    }
}

function changeUserDataName(
    oldname,
    newname,
    override = false,
    notify = false
) {
    ConsoleNotifier.notifyStartService("changeUserDataName");
    if (oldname && newname) {
        if (
            isAdmin(args.get("username")) ||
            oldname == args.get("username") ||
            override
        ) {
            if (oldname && newname) {
                if (localStorage.getItem(oldname)) {
                    let userData = JSON.parse(localStorage.getItem(oldname));
                    args.set("username", newname);
                    localStorage.setItem(newname, JSON.stringify(userData));
                    localStorage.removeItem(oldname);
                }
            }
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${oldname}" was successfully renamed to "${newname}".`
                );
            }
            return `Userdata of "${oldname}" has been renamed to "${newname}".`;
        } else {
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" could not be renamed.<br><br>Reason: you do not have admin rights.`
                );
            }
            return `Userdata of "${oldname}" could not be renamed: logged in user is not admin`;
        }
    } else {
        if (notify) {
            errorLogic.sendError(
                "User Accounts",
                `User account of "${oldname}" could not be renamed.<br><br>Reason: <code>oldname</code> or <code>newname</code> is empty.`
            );
        }
    }
}

function toggleUserData(user, override = false, notify = false) {
    ConsoleNotifier.notifyStartService("toggleUserData");
    if (isAdmin(args.get("username")) || override) {
        if (
            localStorage.getItem(user) &&
            JSON.parse(localStorage.getItem(user))
        ) {
            let userData = JSON.parse(localStorage.getItem(user));

            userData.enabled = !userData.enabled;

            localStorage.setItem(user, JSON.stringify(userData));
            if (notify) {
                errorLogic.sendError(
                    "User Accounts",
                    `User account of "${user}" was toggled successfully.`
                );
            }
            return `Userdata access of "${user}" has been toggled to "${localStorage.getItem(
                userData.enabled
            )}".`;
        }
    } else {
        if (notify) {
            errorLogic.sendError(
                "User Accounts",
                `User account of "${user}" could not be toggled.<br><br>Reason: you do not have admin rights.`
            );
        }
        return `Userdata of "${user}" could not be toggled: logged in user is not admin`;
    }
}

function setUserProfilePicture(user, x) {
    ConsoleNotifier.notifyStartService("setUserProfilePicture");

    if (user && localStorage.getItem(user) && x) {
        let userData = JSON.parse(localStorage.getItem(user));

        userData.profilePicture = x;

        localStorage.setItem(user, JSON.stringify(userData));
    }
    return `Profile picture of "${user}" has been set to "${x}".`;
}

function startUserDataUpdateCycle() {
    ConsoleNotifier.notifyStartService("startUserDataUpdateCycle");

    setInterval(() => {
        localStorage.setItem("userAmount", 0);
        localStorage.removeItem("userList");
        let tempUsrList = [];
        if (localStorage.getItem("userList")) {
            tempUsrList = localStorage.getItem("userList").split(",");
        }
        for (let i = 0; i < localStorage.length; i++) {
            let userData = {};
            if (isUser(localStorage.key(i)))
                userData = JSON.parse(
                    localStorage.getItem(localStorage.key(i))
                );

            if (userData.enabled == 1 && userData.theme) {
                localStorage.setItem(
                    "userAmount",
                    parseInt(localStorage.getItem("userAmount")) + 1
                );
                tempUsrList.push(localStorage.key(i));
            }

            localStorage.setItem("userList", tempUsrList);
        }
    }, 500);
}

function convertUserAccount(user) {
    ConsoleNotifier.notifyStartService("convertUserAccount");

    let template = userTemplate,
        original = [],
        converted = [],
        out = `{"enabled":${localStorage.getItem(user)},`;

    for (let key in template) {
        converted.push(key);
        original.push(key);
    }

    for (let i = 1; i < converted.length; i++) {
        if (localStorage.getItem(`${user}_${converted[i]}`)) {
            converted[i] = localStorage.getItem(`${user}_${converted[i]}`);

            if (converted[i] != original[i]) {
                if (isBoolOrInt(converted[i].toString())) {
                    out += `"${original[i]}":${converted[i]}`;
                } else {
                    out += `"${original[i]}":"${converted[i]}"`;
                }

                if (i != converted.length - 1) out += ",";
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
    ConsoleNotifier.notifyStartService("isBoolOrInt");

    let isBool = str.valueOf() === "true" || str.valueOf() === "false";
    let isInt = isNumeric(str);
    return isBool || isInt;
}

function isNumeric(str) {
    ConsoleNotifier.notifyStartService("isNumeric");

    if (typeof str != "string") return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

function hotSwapUserAccount(username) {
    ConsoleNotifier.notifyStartService("hotSwapUserAccount");

    if (localStorage.getItem(username)) {
        let userData = JSON.parse(localStorage.getItem(username));

        if (!userData.pswd) {
            args.set("username", username);
            setTimeout(() => {
                onloadLogic.loadTheme();
                onloadLogic.loadTaskbarPos();
                personalizationLogic.setTitlebarButtonLocations(false, false);
                personalizationLogic.setAnimations(false);
                onloadLogic.setStartMenuSize();
                onloadLogic.setTaskbarButtonLocation();

                openSettingsPane(
                    "home",
                    document.getElementsByClassName("controlPanelSidebar")[0]
                );
                initiateArcTerm(ArcTermOutputDiv);

                notifications = [];
                oldNotificationsList = [];
                notificationList = [];

                windowLogic.closeAllWindows();

                setTimeout(() => {
                    errorLogic.sendError(
                        "ArcOS User Accounts",
                        `The account was successfully switched to "${username}".`
                    );
                }, 100);
            }, 100);
        } else {
            errorLogic.sendError(
                "Unable to switch",
                `ArcOS can't switch to the "${username}" account because it has a password. To use this account, log in to it using the ArcOS Login.`
            );
        }
    }
}

async function verifyPassword(user, password) {
    ConsoleNotifier.notifyStartService("verifyPassword");

    let userData = JSON.parse(localStorage.getItem(user));
    let reqpswd = userData.pswd;

    if (reqpswd) {
        return await argon2.verify(reqpswd, password);
    }
    return false;
}

async function encryptPassword(password) {
    ConsoleNotifier.notifyStartService("encryptPassword");

    return await argon2.hash(password, {
        type: argon2.argon2i,
        memoryCost: 2 ** 16,
        timeCost: 6,
        hashLength: 32,
    });
}

async function setPassword(user, password, method = "password") {
    if (localStorage.getItem(user)) {
        let userData = JSON.parse(localStorage.getItem(user));

        userData.authMethod = method;

        switch (method) {
            case "password":
                userData.pswd = await encryptPassword(password);
                ConsoleNotifier.notifyStartService("setPassword: password set");
                break;
            case "pincode":
                let valid = true;
                const digits = password.split("");

                for (let i=0;i<digits.length;i++) {
                    if (parseInt(digits[i]) != NaN) {
                        continue;
                    }

                    valid = false;
                    break;
                }

                if (valid) {
                    ConsoleNotifier.notifyStartService("setPassword: pincode set");
                    userData.pinLength = password.length;
                    userData.pswd = encryptPassword(password);
                } else {
                    ConsoleNotifier.notifyStartService("setPassword: pincode not set: paramaters incorrect");
                }
                break;
            default:
                break;
        }

        userData.pswd = await encryptPassword(password);

        localStorage.setItem(user, JSON.stringify(userData));
    }
}

async function convertPassword(user) {
    ConsoleNotifier.notifyStartService("convertPassword");

    let userData = JSON.parse(localStorage.getItem(user));

    if (userData) {
        let password = userData.pswd;

        if (password && !password.toString().startsWith("$argon2i$v=")) {
            let newPswd = await encryptPassword(password);

            userData.pswd = newPswd;

            localStorage.setItem(user, JSON.stringify(userData));
        }
    }
}

function isUser(user) {
    user = localStorage.getItem(user);
    try {
        let json = JSON.parse(user);
        return !!json && (json.enabled == 1 || json.enabled == 0);
    } catch (e) {
        return false;
    }
}

function isOldUser(user) {
    if (
        localStorage.getItem(user + "_theme") &&
        localStorage.getItem(user + "_taskbarpos")
    ) {
        return true;
    }
    return false;
}

function setAdmin(user, admin = false) {
    if (localStorage.getItem(user)) {
        let userData = JSON.parse(localStorage.getItem(user));

        userData.isAdmin = !!admin;

        localStorage.setItem(user, JSON.stringify(userData));
    }
}

function isAdmin(user) {
    if (localStorage.getItem(user)) {
        return !!JSON.parse(localStorage.getItem(user)).isAdmin;
    }
    return false;
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
    isAdmin: false,
    smallStart: false,
    centeredTaskbarButtons: false,
    customThemeColor: "",
    wallpaper: "theme",
    authMethod: "password",
    pinLength: 0,
};

function getCurrentUserData() {
    if (isUser(args.get("username"))) {
        return JSON.parse(localStorage.getItem(args.get("username")));
    } else {
        return userTemplate;
    }
}

function processNewUsername() {
    onloadLogic.showBlock();
    setTimeout(() => {
        window.location.href = `arcos.html?username=${args.get("username")}`;
    }, 1000);
}

new consoleNotifier().startModule("ArcOS.System.errorLogic");

class ErrorLogic {
    bsod(title, message) {
        if (localStorage.getItem("safeMode") != 1) {
            localStorage.setItem("BSODTitle", title);
            localStorage.setItem("BSODMessage", message);
            window.location.href = "bsod.html";
        } else {
            this.sendError(title || "undefined", message || "undefined");
        }
    }

    sendError(title, message, safemodeOverride = 0) {
        this.createNewError(title, message, safemodeOverride);
    }

    createNewError(title, message, safemodeOverride = 0) {
        if (localStorage.getItem("safeMode") != 1 || safemodeOverride == 1) {
            document.getElementById("windowStore").insertAdjacentHTML('beforeend', document.getElementById("errorMessageTemplate").innerHTML);
            let ErrID = Math.floor(Math.random() * 3276700);
            let windowId = title + " (" + ErrID + ")";
            let titleTextId = ErrID + "errorMessageBoxTitle " + title;
            let titleBarId = ErrID + "errorMessageBoxWindowTitle " + title;
            let messageId = ErrID + " " + title + " " + "errorMessageMsg"
            document.getElementById("errorMessageBox").id = windowId;
            document.getElementById("errorMessageBoxTitle").id = titleTextId
            document.getElementById(titleTextId).innerHTML = title;
            document.getElementById("errorMessageBoxWindowTitle").id = titleBarId;
            document.getElementById("errorMessageMsg").id = messageId;
            document.getElementById(messageId).innerHTML = message;
            new DragLogic().dragElement(document.getElementById(windowId), document.getElementById(titleBarId));
            openWindow(windowId);
            playSystemSound("./system/sounds/error.mp3");
            setTimeout(() => {
                bringToFront(document.getElementById(windowId));
            }, 50);
            errorMessageCount += 1;
            if (errorMessageCount >= 200) {
                bsod("ErrorLogic.createNewError: ERRMSG_OVERFLOW", "The system error counter overflowed.");
            }
        } else {
            new NotificationLogic().notificationService(title, message);
        }

    }
}

window.onerror = function errorVisualizer(errorMsg, url, lineNumber) {
    new NotificationLogic().notificationService("ArcOS Exception", "ArcOS has encountered an internal exception:<br><br>" + errorMsg, 3000);
}

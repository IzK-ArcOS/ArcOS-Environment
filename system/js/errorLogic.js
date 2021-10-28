ConsoleNotifier.startModule("ArcOS.System.errorLogic");

class ErrorLogic {
    bsod(title, message) {

        ConsoleNotifier.notifyStartService("ErrorLogic.bsod");

        if (localStorage.getItem("safeMode") != 1) {
            localStorage.setItem("BSODTitle", title);
            localStorage.setItem("BSODMessage", message);
            window.location.href = "bsod.html";
        } else {
            this.sendError(title || "undefined", message || "undefined");
        }
    }

    sendError(title, message, safemodeOverride = 0) {

        ConsoleNotifier.notifyStartService("ErrorLogic.sendError")

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
            dragLogic.dragElement(document.getElementById(windowId), document.getElementById(titleBarId));
            windowLogic.openWindow(windowId);
            playSystemSound("./system/sounds/error.mp3");
            setTimeout(() => {
                windowLogic.bringToFront(document.getElementById(windowId));
            }, 50);
            errorMessageCount += 1;
            if (errorMessageCount >= 200) {
                this.bsod("ErrorLogic.createNewError: ERRMSG_OVERFLOW", "The system error counter overflowed.");
            }
        } else {
            notificationLogic.notificationService(title, message);
        }

    }

    createNewConfirmation(title, message, action) {
        document.getElementById("windowStore").insertAdjacentHTML('beforeend', document.getElementById("confirmationTemplate").innerHTML);
        setTimeout(() => {
            let confirmationId = Math.floor(Math.random() * 3276700);
            let windowId = `${title} (${confirmationId})`;
            let titleTextId = `${confirmationId}confirmationTitle ${title}`;
            let titleBarId = `${confirmationId}confirmationWindowTitle ${title}`;
            let messageId = `${confirmationId} ${title} confirmationMessageMsg`;
            let buttonId = `${confirmationId} ${title} confirmationMessageButton`
            document.getElementById("confirmationMessageBox").id = windowId;
            document.getElementById("confirmationMessageBoxTitle").id = titleTextId;
            document.getElementById(titleTextId).innerHTML = title;
            document.getElementById("confirmationMessageBoxWindowTitle").id = titleBarId;
            document.getElementById("confirmationMessageMsg").id = messageId;
            document.getElementById(messageId).innerHTML = message;
            document.getElementById("confirmationMessageButton").id = buttonId;
            document.getElementById(buttonId).setAttribute("onclick", action.toString() + `;windowLogic.closewindow(document.getElementById("${windowId}"))`);
            dragLogic.dragElement(document.getElementById(windowId), document.getElementById(titleBarId));
            windowLogic.openWindow(windowId);
            playSystemSound("./system/sounds/error.mp3");
            setTimeout(() => {
                windowLogic.bringToFront(document.getElementById(windowId));
            }, 50);
            errorMessageCount += 1;
            if (errorMessageCount >= 200) {
                this.bsod("ErrorLogic.createNewConfirmation: ERRMSG_OVERFLOW", "The system error counter overflowed.")
            }
        }, 100);
    }
}

window.onerror = function errorVisualizer(errorMsg, url, lineNumber) {
    //notificationLogic.notificationService("ArcOS Exception", "ArcOS has encountered an internal exception:<br><br>" + errorMsg, 3000);
}

let errorLogic = new ErrorLogic();
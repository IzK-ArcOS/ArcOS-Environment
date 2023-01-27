/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 28th 2022,
 * and was finished at 2:59PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

ConsoleNotifier.registerMod("ArcOS.System.errorLogic");

class ErrorLogic {
    bsod(title, message) {
        ConsoleNotifier.notifyStartService("ErrorLogic.bsod");

        if (localStorage.getItem("safeMode") != 1) {
            localStorage.setItem("BSODTitle", title);
            localStorage.setItem("BSODMessage", message);

            location.href = "bsod.html";
            return;
        }

        this.sendError(title || "undefined", message || "undefined");
    }

    sendError(title, message, safemodeOverride = false) {
        ConsoleNotifier.notifyStartService("ErrorLogic.sendError")

        this.createNewError(title, message, safemodeOverride);
    }

    createNewError(title, message, safemodeOverride = 0) {
        if (localStorage.getItem("safeMode") != 1 || safemodeOverride) {
            const windowStore = document.getElementById("windowStore");
            const errMsgTempl = document.getElementById("errorMessageTemplate");

            if (!windowStore || !errMsgTempl) return;

            windowStore.insertAdjacentHTML('beforeend', errMsgTempl.innerHTML);

            const ErrID = Math.floor(Math.random() * 3276700);
            const windowId = `${title} (${ErrID})`;
            const titleTextId = `${ErrID}errorMessageTitle ${title}`;
            const titleBarId = `${ErrID}errorMessageBoxWindowTitle ${title}`
            const messageId = `${ErrID} ${title} errorMessageMsg`;

            const msgBox = document.getElementById("errorMessageBox");
            const msgBoxTitle = document.getElementById("errorMessageBoxTitle");

            const windowTitle = document.getElementById("errorMessageBoxWindowTitle");
            const errMsgMsg = document.getElementById("errorMessageMsg");

            if (!msgBox || !msgBoxTitle || !windowTitle || !errMsgMsg) return;

            msgBox.id = windowId;
            msgBoxTitle.id = titleTextId
            msgBoxTitle.innerHTML = title;
            windowTitle.id = titleBarId;
            errMsgMsg.id = messageId;
            errMsgMsg.innerHTML = message;

            const window = document.getElementById(windowId);

            dragLogic.dragElement(window, windowTitle);
            windowLogic.openWindow(windowId);

            playSystemSound("../audio/error.mp3");

            setTimeout(() => windowLogic.bringToFront(window), 50);
        } else {
            notificationLogic.notificationService(title, message);
        }
    }
}

window.onerror = function errorVisualizer(errorMsg, url, lineNumber) {
    notificationLogic.notificationService("ArcOS Exception", "ArcOS has encountered an internal exception:<br><br>" + errorMsg, 3000);
}

let errorLogic = new ErrorLogic();
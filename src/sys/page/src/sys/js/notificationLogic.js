ConsoleNotifier.startModule("ArcOS.System.notificationLogic");

class NotificationLogic {
    notificationService(title, message, closeDelay) {
        ConsoleNotifier.notifyStartService("NotificationLogic.notificationService")

        clearTimeout(tmo);

        if (title) {
            if (message) {
                let notificationService = document.getElementById("notificationService");
                let notificationMessage = document.getElementById("notificationMessage");
                let notificationTitle = document.getElementById("notificationTitle");
                let userData = getCurrentUserData();

                notificationMessage.innerHTML = message;
                notificationTitle.innerHTML = title;

                if (userData.enableAnimations) {
                    notificationService.classList.add("animation-appear");
                } else {
                    notificationService.style.opacity = '0';
                    notificationService.style.visibility = 'visible';
                    notificationService.style.opacity = '1';
                }

                playSystemSound("../audio/notification.mp3");

                notificationList.push({ title, message })
            } else {
                errorLogic.sendError('Notification Error', "The notification message is invalid and the notification can't start.<br>Please check the command and try again.")
            }
        } else {
            errorLogic.sendError('Notification Error', "The notification title is invalid and the notification can't start.<br>Please check the command and try again.")
        }
        if (closeDelay) tmo = setTimeout(() => {
            this.closeNotification();
        }, closeDelay);

    }

    closeNotification() {
        ConsoleNotifier.notifyStartService("NotificationLogic.closeNotification")

        let notificationService = document.getElementById("notificationService");

        notificationService.classList.remove("animation-appear");
        notificationService.classList.add("animation-disappear");

        setTimeout(() => {
            notificationService.classList.remove("animation-appear");
            notificationService.classList.remove("animation-disappear");
        }, 1000);
    }

    startNotificationCenterPopulator() {
        ConsoleNotifier.notifyStartService("NotificationLogic.startNotificationCenterPopulator")

        setInterval(() => {
            const notificationCenterInline = document.getElementById("notificationCenterInline");
            let newNotificationInnerHMTL = "";

            if (notificationCenterInline) {
                if (notificationList.length > 0) {
                    for (let i = 0; i < notificationList.length; i++) {
                        newNotificationInnerHMTL += `<div class="notificationCenterItem"><b>${notificationList[i].title}<button onclick="notificationList.splice(${i},1);" class="title close"><span class="material-icons">close</span></button></b><br><p>${notificationList[i].message}</p></div><hr><br>`;
                    }

                    if (notificationCenterInline.innerHTML != newNotificationInnerHMTL) notificationCenterInline.innerHTML = newNotificationInnerHMTL;

                } else {
                    document.getElementById("notificationCenterInline").innerHTML = "<center><p style='color:var(--windowColor);'>You have no new notifications</p></center>";
                }
            }
        }, 50);
    }

    toggleNotificationCenter() {

        ConsoleNotifier.notifyStartService("NotificationLogic.toggleNotificationCenter")

        let nc = document.getElementById("notificationCenter");
        if (nc.classList.contains("retracted")) {
            nc.classList.remove("retracted");
        } else {
            nc.classList.add("retracted");
        }
    }
}

let notificationLogic = new NotificationLogic();
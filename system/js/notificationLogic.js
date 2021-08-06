new consoleNotifier().startModule("ArcOS.System.notificationLogic");

class NotificationLogic {
    notificationService(title, message, closeDelay) {
        clearTimeout(tmo);
        if (title) {
            if (message) {
                document.getElementById('notificationMessage').innerHTML = message;
                document.getElementById('notificationService').style.opacity = '0'
                document.getElementById('notificationService').style.visibility = 'visible';
                document.getElementById('notificationService').style.opacity = '1';
                document.getElementById('notificationTitle').innerHTML = title;
                playSystemSound("./system/sounds/notification.mp3");
                notificationList.push({ title, message })
            } else {
                new ErrorLogic().sendError('Notification Error', "The notification message is invalid and the notification can't start.<br>Please check the command and try again.")
            }
        } else {
            new ErrorLogic().sendError('Notification Error', "The notification title is invalid and the notification can't start.<br>Please check the command and try again.")
        }
        if (closeDelay) {
            tmo = setTimeout(() => {
                this.closeNotification();
            }, closeDelay);
        }
    }
    
    closeNotification() {
        document.getElementById('notificationService').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('notificationService').style.visibility = 'hidden';
            document.getElementById('notificationTitle').innerHTML = 'Notification Title';
            document.getElementById('notificationMessage').innerHTML = 'Notification Message';
        }, 200);
    }
    
    startNotificationCenterPopulator() {
        setInterval(() => {
            let newNotificationInnerHMTL = "";
            if (notificationList.length > 0) {
                for (let i = 0; i < notificationList.length; i++) {
                    newNotificationInnerHMTL += `<div class="notificationCenterItem"><b>${notificationList[i].title}<button onclick="notificationList.splice(${i},1);" class="title close">✖</button></b><br><p>${notificationList[i].message}</p></div><hr><br>`;
                }
                if (document.getElementById("notificationCenterInline").innerHTML != newNotificationInnerHMTL) {
                    document.getElementById("notificationCenterInline").innerHTML = newNotificationInnerHMTL;
                }
            } else {
                document.getElementById("notificationCenterInline").innerHTML = "<center><p style='color:let(--windowColor);'>You have no new notifications</p></center>";
            }
    
        }, 50);
    }
    
    toggleNotificationCenter() {
        let nc = document.getElementById("notificationCenter");
        if (nc.classList.contains("retracted")) {
            nc.classList.remove("retracted");
        } else {
            nc.classList.add("retracted");
        }
    }
}

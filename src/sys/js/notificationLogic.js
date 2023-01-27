ConsoleNotifier.registerMod("ArcOS.System.notificationLogic");

class NotificationLogic {
    notificationService(title, message, closeDelay) {
        ConsoleNotifier.notifyStartService("NotificationLogic.notificationService")

        const userData = getCurrentUserData();

        clearTimeout(tmo);

        if (!title || !message) {
            errorLogic.sendError('Notification Error', "The notification title or message is invalid and the notification can't start.<br>Please check the command and try again.");

            return;
        }

        const notificationService = document.getElementById("notificationService");
        const notificationMessage = document.getElementById("notificationMessage");
        const notificationTitle = document.getElementById("notificationTitle");

        notificationMessage.innerText = message;
        notificationTitle.innerText = title;

        if (userData.enableAnimations) {
            notificationService.classList.add("animation-appear");
        } else {
            notificationService.style.visibility = 'visible';
            notificationService.style.opacity = '1';
        }

        playSystemSound("../audio/notification.mp3");

        notificationList.push({ title, message })

        if (closeDelay) tmo = setTimeout(() => {
            this.closeNotification();
        }, closeDelay);
    }

    closeNotification() {
        ConsoleNotifier.notifyStartService("NotificationLogic.closeNotification")

        const notificationService = document.getElementById("notificationService");

        notificationService.classList.remove("animation-appear");
        notificationService.classList.add("animation-disappear");

        setTimeout(() => {
            notificationService.classList.remove("animation-appear");
            notificationService.classList.remove("animation-disappear");
        }, 1000);
    }

    notificationsInInline = 0;

    startNotificationCenterPopulator() {
        ConsoleNotifier.notifyStartService("NotificationLogic.startNotificationCenterPopulator")

        setInterval(() => {
            const notificationCenterInline = document.getElementById("notificationCenterInline");

            if (notificationCenterInline) {
                const temp = document.createElement("div");

                for (let i = 0; i < notificationList.length; i++) {
                    const div = document.createElement("div");
                    const b1 = document.createElement("b");
                    const br1 = document.createElement("br");
                    const br2 = document.createElement("br");
                    const hr1 = document.createElement("hr");
                    const msgP = document.createElement("p");
                    const buttonClose = document.createElement("button");
                    const buttonIcon = document.createElement("span");
                    const titleNode = document.createTextNode(notificationList[i].title);

                    div.classList.add("notificationCenterItem");
                    buttonClose.className = "title close";
                    buttonIcon.classList.add("material-icons");

                    buttonIcon.innerText = "close";
                    buttonClose.appendChild(buttonIcon);
                    buttonIcon.addEventListener("click", () => {
                        if (notificationList.length > i - 1) {
                            notificationList.splice(i, 1);
                        }
                    });

                    b1.append(titleNode, buttonClose);
                    msgP.innerText = notificationList[i].message;

                    div.append(b1, br1, msgP, hr1, br2);

                    temp.append(div);
                }

                if (this.notificationsInInline != notificationList.length) {
                    this.notificationsInInline = notificationList.length;
                    console.log("Syncing...");
                    notificationCenterInline.innerHTML = "";

                    for (let j=0;j<temp.childNodes.length;j++) {
                        notificationCenterInline.appendChild(temp.childNodes[j]);
                    }

                } else {
                    console.log("Synced!");
                }

                console.log(temp.children.length, notificationList.length,notificationCenterInline.children.length);

                /* if (!notificationList.length) {
                    notificationCenterInline.innerHTML = "";
                    
                    const center = document.createElement("center");
                    const p = document.createElement("p");

                    p.innerText = "You have no notifications.";
                    p.style = "color: var(--windowColor);";

                    center.append(p);

                    notificationCenterInline.append(center);
                } */
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
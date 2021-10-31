ConsoleNotifier.startModule("ArcOS.System.contextMenuLogic");

class ContextMenuLogic {

    hideMenu() {
        if (!lockScreenActive) {
            let contextMenu = document.getElementById("contextMenu");

            contextMenu.style.display = 'none';
            contextMenu.style.opacity = "0";
            contextMenu.style.visibility = "hidden";
        }
    }

    rightClick(e) {
        if (!lockScreenActive) {
            let contextMenu = document.getElementById("contextMenu"),
                username = args.get("username"),
                desktopIcons = document.getElementById("desktopIcons"),
                wallpaper = document.getElementsByClassName("wallpaper")[0],
                body = document.body,
                windowStore = document.getElementById("windowStore"),
                desktopIconButtons = document.querySelectorAll("button.icon");
            if (
                e.path.includes(desktopIcons) ||
                e.path.includes(wallpaper) ||
                e.path.includes(body) ||
                e.target == wallpaper ||
                e.target == desktopIcons ||
                e.target == body
            ) {
                contextMenu.style.display = 'block';
                contextMenu.style.opacity = '1';
                contextMenu.style.visibility = "visible";
                contextMenu.style.display = 'block';
                contextMenu.style.left = e.pageX + "px";
                contextMenu.style.top = e.pageY + "px";
            } else {
                contextMenuLogic.hideMenu();
            }
            e.preventDefault();
        }
    }

    showContextMenu(x, y) {
        let contextMenu = document.getElementById("contextMenu");
        contextMenu.style.display = 'block';
        contextMenu.style.opacity = '1';
        contextMenu.style.visibility = "visible";
        contextMenu.style.display = 'block';
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
    }

    overrideRightClick(e) {
        let rightClickTargets = e.path;
        let contextMenu = document.getElementById("contextMenu");
        let rightClickValid = false;
        let rightClickType = "";
        let rightClickSource = [];
        let rightClickWindowId = "";

        for (let i = 0; i < rightClickTargets.length; i++) {
            if (rightClickTargets[i].className == "windowTitle") {
                rightClickValid = true;
                rightClickType = "titlebar";
                rightClickWindowId = rightClickTargets[i].parentNode.id;
                rightClickSource = titlebarContextMenuJson;
                break;
            } else if (rightClickTargets[i].className == "desktopicons") {
                rightClickValid = true;
                rightClickType = "desktop";
                rightClickSource = desktopContextMenuJson;
                break;
            }
        }

        if (rightClickValid) {
            contextMenu.innerHTML = "";

            let ul = document.createElement("ul");

            for (let i = 0; i < rightClickSource.length; i++) {
                let item = rightClickSource[i];

                if (item.type == "action") {

                    let title = item.title.replace("{WINDOW_ID}", rightClickWindowId);
                    let onclick = item.action.replace("{WINDOW_NODE}", `document.getElementById('${rightClickWindowId}')`).replace("{WINDOW_ID}", rightClickWindowId);
                    let li = document.createElement("li");

                    li.innerText = title;
                    li.setAttribute("onclick", onclick);

                    ul.append(li);

                } else if (item.type == "separator") {

                    let hr = document.createElement("hr");

                    ul.append(hr);

                } else if (item.type == "disabled_text") {

                    let title = item.title.replace("{WINDOW_ID}", rightClickWindowId);
                    let li = document.createElement("li");

                    li.innerText = title;
                    li.style.opacity = "0.5";

                    ul.append(li);
                }
            }

            contextMenu.append(ul);
            contextMenuLogic.showContextMenu(e.pageX, e.pageY);
        }
    }
}

let titlebarContextMenuJson = [
    {
        title: "{WINDOW_ID}",
        type: "disabled_text"
    },
    {
        type: "separator"
    },
    {
        title: "Minimize",
        action: "windowLogic.minimizeWindow('{WINDOW_ID}');",
        type: "action"
    },
    {
        title: "Maximize",
        action: "windowLogic.toggleMaximizedState({WINDOW_NODE})",
        type: "action"
    },
    {
        type: "separator"
    },
    {
        title: "Close Window",
        action: "windowLogic.closewindow({WINDOW_NODE})",
        type: "action"
    }
]

let desktopContextMenuJson = [
    {
        title: "Shut Down",
        action: "powerLogic.shutDown()",
        type: "action"
    },
    {
        type: "separator"
    },
    {
        title: "ArcTerm",
        action: "windowLogic.openWindow('ArcTerm');",
        type: "action"
    },
    {
        type: "separator"
    },
    {
        title: "Settings",
        action: "openSettingsPane('home',document.getElementsByClassName('controlPanelSidebar')[0]);windowLogic.openWindow('Settings');",
        type: "action"
    },
    {
        type: "separator"
    },
    {
        title: "Personalization",
        action: "openSettingsPane('personalize',document.getElementsByClassName('controlPanelSidebar')[1]);windowLogic.openWindow('Settings');",
        type: "action"
    },
    {
        title: "Import App",
        action: "openSettingsPane('addapp',document.getElementsByClassName('controlPanelSidebar')[2]);windowLogic.openWindow('Settings');",
        type: "action"
    },
    {
        title: "User Settings",
        action: "openSettingsPane('user',document.getElementsByClassName('controlPanelSidebar')[3]);windowLogic.openWindow('Settings');",
        type: "action"
    },
    {
        title: "About",
        action: "openSettingsPane('about',document.getElementsByClassName('controlPanelSidebar')[4]);windowLogic.openWindow('Settings');",
        type: "action"
    },
    {
        title: "Updates",
        action: "openSettingsPane('updates',document.getElementsByClassName('controlPanelSidebar')[5]);windowLogic.openWindow('Settings');",
        type: "action"
    },

]

let contextMenuLogic = new ContextMenuLogic();

document.onclick = contextMenuLogic.hideMenu;
document.oncontextmenu = contextMenuLogic.overrideRightClick;
/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 28th 2022,
 * and was finished at 3:20PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

ConsoleNotifier.registerMod("ArcOS.System.contextMenuLogic");
class ContextMenuLogic {
    hideMenu() {
        if (!lockScreenActive) {
            const contextMenu = document.getElementById("contextMenu");

            contextMenu.style.display = 'none';
            contextMenu.style.opacity = "0";
            contextMenu.style.visibility = "hidden";
        }
    }

    rightClick(e) {
        if (!lockScreenActive) {
            const contextMenu = document.getElementById("contextMenu");
            const desktopIcons = document.getElementById("desktopIcons");
            const wallpaper = document.getElementsByClassName("wallpaper")[0];
            const body = document.body;

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
        const contextMenu = document.getElementById("contextMenu");

        contextMenu.style.display = 'block';
        contextMenu.style.opacity = '1';
        contextMenu.style.visibility = "visible";
        contextMenu.style.display = 'block';
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
    }

    overrideRightClick(e) {
        const rightClickTargets = e.path;
        const contextMenu = document.getElementById("contextMenu");

        let valid = false;
        let source = [];
        let windowId = "";

        for (let i = 0; i < rightClickTargets.length; i++) {
            const target = rightClickTargets[i];

            if (!target) continue;

            const clName = target.className;

            if (ContextMenuStore.has(clName)) {
                valid = true;
                windowId = target.parentNode.id;
                source = ContextMenuStore.get(clName);

                break;
            }
        }

        if (valid) {
            contextMenu.innerText = "";

            const ul = document.createElement("ul");

            for (let i = 0; i < source.length; i++) {
                const item = source[i];

                if (item.type == "action") {
                    const title = item.title.replace("{WINDOW_ID}", windowId);
                    const onclick = item.action.replace("{WINDOW_NODE}", `document.getElementById('${windowId}')`).replace("{WINDOW_ID}", windowId);
                    const li = document.createElement("li");

                    li.innerText = title;
                    li.setAttribute("onclick", onclick);

                    ul.append(li);
                } else if (item.type == "separator") {
                    const hr = document.createElement("hr");

                    ul.append(hr);
                } else if (item.type == "disabled_text") {
                    const title = item.title.replace("{WINDOW_ID}", windowId);
                    const li = document.createElement("li");

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

const ContextMenuStore = new Map([
    ["windowTitle", [
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
    ]],
    ["desktopicons", [
        {
            title: "Shut Down",
            action: "powerLogic.shutdown()",
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
        }
    ]],
    ["taskbarButton", [
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
    ]]
])

let contextMenuLogic = new ContextMenuLogic();

document.onclick = contextMenuLogic.hideMenu;
document.oncontextmenu = contextMenuLogic.overrideRightClick;
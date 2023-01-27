async function switchControlPanelPage(pageFile) {
    let controlPanelContent = document.getElementById("controlPanelContent");
    fs.readFile(pageFile, "utf8", (error, data) => {
        if (error) {
            errorLogic.sendError(
                `Unable to open settings applet`,
                `The settings applet specified is invalid. Please check the path to the applet and try again.<br><br>Details: ` +
                error
            );
        } else {
            controlPanelContent.classList.add("slide-out-right");
            setTimeout(
                () => {
                    controlPanelContent.innerHTML = data;

                    const pAS = document.getElementById(
                        "preferencesAnimationsSwitch"
                    );
                    const pTBLS = document.getElementById(
                        "preferencesTaskbarButtonLabelsSwitch"
                    );
                    const pTBS = document.getElementById(
                        "preferencesTitlebarButtonsSwitch"
                    );
                    const pSSS = document.getElementById(
                        "preferencesSmallStartSwitch"
                    );
                    const pCTBS = document.getElementById(
                        "preferencesCenteredTaskbarButtonsSwitch"
                    );
                    let userData = getCurrentUserData();

                    if (pAS) pAS.checked = userData.enableAnimations;
                    if (pTBLS) pTBLS.checked = !userData.noTaskbarButtonLabels;
                    if (pTBS) pTBS.checked = userData.titlebarButtonsLeft;
                    if (pSSS) pSSS.checked = userData.smallStart;
                    if (pCTBS) pCTBS.checked = userData.centeredTaskbarButtons;

                    onloadLogic.setStartMenuSize();
                    onloadLogic.setTaskbarButtonLocation();

                    controlPanelContent.classList.remove("slide-out-right");
                },
                getCurrentUserData().enableAnimations ? 700 : 0
            );
        }
    });
}

async function openSettingsPane(name, buttonNode) {
    for (
        let i = 0;
        i < document.getElementsByClassName(`controlPanelSidebar`).length;
        i++
    ) {
        document
            .getElementsByClassName(`controlPanelSidebar`)
        [i].classList.remove(`active`);
    }
    switch (name) {
        case `home`:
            switchControlPanelPage(
                path.join(__dirname, `../apps/newSettings/inline/home.inline`)
            );
            break;
        case `user`:
            switchControlPanelPage(
                path.join(__dirname, `../apps/newSettings/inline/user.inline`)
            );
            break;
        case `personalize`:
            if (localStorage.getItem("safeMode") == "1") {
                errorLogic.sendError(
                    "ArcOS Safe Mode",
                    "Access is denied to <b>Personalization</b> because Safe Mode is a temporary account."
                );
                return;
            }
            switchControlPanelPage(
                path.join(
                    __dirname,
                    `../apps/newSettings/inline/personalize.inline`
                )
            );
            break;
        case `addapp`:
            switchControlPanelPage(
                path.join(__dirname, `../apps/newSettings/inline/addapp.inline`)
            );
            break;
        case `profpicsel`:
            if (localStorage.getItem("safeMode") == "1") {
                errorLogic.sendError(
                    "ArcOS Safe Mode",
                    "Access is denied to <b>Change Profile Picture</b> because Safe Mode is a temporary account."
                );
                return;
            }
            switchControlPanelPage(
                path.join(
                    __dirname,
                    `../apps/newSettings/inline/profilePictureSelector.inline`
                )
            );
            break;
        case `manusers`:
            if (localStorage.getItem("safeMode") == "1") {
                errorLogic.sendError(
                    "ArcOS Safe Mode",
                    "Operation not permitted: Safe Mode is not an authorized user"
                );
                return;
            }
            switchControlPanelPage(
                path.join(
                    __dirname,
                    `../apps/newSettings/inline/manageOtherUsers.inline`
                )
            );
            break;
        case `manacc`:
            if (localStorage.getItem("safeMode") == "1") {
                errorLogic.sendError(
                    "ArcOS Safe Mode",
                    "Access is denied to <b>Manage Profile</b> because Safe Mode is a temporary account."
                );
                return;
            }
            switchControlPanelPage(
                path.join(
                    __dirname,
                    `../apps/newSettings/inline/manageProfile.inline`
                )
            );
            break;
        case `about`:
            switchControlPanelPage(
                path.join(__dirname, `../apps/newSettings/inline/about.inline`)
            );
            break;
        case "updates":
            /* if (process.platform == "win32") {
                await switchControlPanelPage(path.join(__dirname, '../apps/settings/inline/noupdates.inline'));
            } else {
                await switchControlPanelPage(path.join(__dirname, '../apps/settings/inline/updates.inline'));
            } */
            await switchControlPanelPage(
                path.join(__dirname, "../apps/settings/inline/noupdates.inline")
            );
            break;
    }

    if (buttonNode) buttonNode.classList.add(`active`);
}

openSettingsPane(
    "home",
    document.getElementsByClassName("controlPanelSidebar")[0]
);

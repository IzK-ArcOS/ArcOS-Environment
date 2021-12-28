async function switchControlPanelPage(pageFile) {
    let controlPanelContent = document.getElementById("controlPanelContent");
    fs.readFile(pageFile, 'utf8', (error, data) => {
        if (error) {
            errorLogic.sendError(`Unable to open settings applet`, `The settings applet specified is invalid. Please check the path to the applet and try again.<br><br>Details: ` + error)
        } else {
            controlPanelContent.classList.add("slide-out-right");
            setTimeout(() => {
                controlPanelContent.innerHTML = data;

                const pAS = document.getElementById("preferencesAnimationsSwitch");
                const pTBLS = document.getElementById("preferencesTaskbarButtonLabelsSwitch");
                const pTBS = document.getElementById("preferencesTitlebarButtonsSwitch");
                const pSSS = document.getElementById("preferencesSmallStartSwitch");
                const pCTBS = document.getElementById("preferencesCenteredTaskbarButtonsSwitch");
                let userData = getCurrentUserData();

                if (pAS) pAS.checked = userData.enableAnimations;
                if (pTBLS) pTBLS.checked = !userData.noTaskbarButtonLabels;
                if (pTBS) pTBS.checked = userData.titlebarButtonsLeft;
                if (pSSS) pSSS.checked = userData.smallStart;
                if (pCTBS) pCTBS.checked = userData.centeredTaskbarButtons;

                onloadLogic.setStartMenuSize();
                onloadLogic.setTaskbarButtonLocation();

                controlPanelContent.classList.remove("slide-out-right");
            }, getCurrentUserData().enableAnimations ? 700 : 0);

        }
    })
}

async function openSettingsPane(name, buttonNode) {
    for (let i = 0; i < document.getElementsByClassName(`controlPanelSidebar`).length; i++) {
        document.getElementsByClassName(`controlPanelSidebar`)[i].classList.remove(`active`);
    }
    switch (name) {
        case `home`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/home.inline`));
            break;
        case `user`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/user.inline`));
            break;
        case `personalize`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/personalize.inline`));
            break;
        case `addapp`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/addapp.inline`));
            break;
        case `profpicsel`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/profilePictureSelector.inline`));
            break;
        case `manusers`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/manageOtherUsers.inline`));
            break;
        case `manacc`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/manageProfile.inline`));
            break;
        case `about`:
            switchControlPanelPage(path.join(__dirname, `../apps/res/settings/inline/about.inline`));
            break;
        case 'updates':
            if (process.platform == "win32") {
                await switchControlPanelPage(path.join(__dirname, '../apps/res/settings/inline/noupdates.inline'));
            } else {
                await switchControlPanelPage(path.join(__dirname, '../apps/res/settings/inline/updates.inline'));
            }
            break;
    }

    if (buttonNode) buttonNode.classList.add(`active`);
}
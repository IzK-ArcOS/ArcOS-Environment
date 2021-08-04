function switchControlPanelPage(pageFile) {
    fs.readFile(pageFile, 'utf8', (error, data) => {
        if (error) {
            new ErrorLogic().sendError("Unable to open settings applet", "The settings applet specified is invalid. Please check the path to the applet and try again.<br><br>Details: " + error)
        } else {
            document.getElementById("controlPanelContent").innerHTML = data;
        }
    })
}

function openSettingsPane(name, buttonNode) {
    for (let i = 0; i < document.getElementsByClassName("controlPanelSidebar").length; i++) {
        document.getElementsByClassName("controlPanelSidebar")[i].classList.remove("active");
    }
    switch (name) {
        case "home":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/home.inline");
            break;
        case "user":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/user.inline");
            break;
        case "personalize":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/personalize.inline");
            break;
        case "addapp":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/addapp.inline");
            break;
        case "profpicsel":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/profilepictureselector.inline");
            break;
        case "manusers":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/manageotherusers.inline");
            break;
        case "manacc":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/manageprofile.inline");
            break;
        case "about":
            switchControlPanelPage("./resources/app/system/applications/programdata/settings/inline/about.inline");
            break;
    }
    try { buttonNode.classList.add("active"); } catch {}
}
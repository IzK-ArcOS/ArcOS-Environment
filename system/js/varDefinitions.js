new consoleNotifier().startModule("ArcOS.System.varDefinitions");
//Define global variables used by the rest of ArcOS.System//
let args = new URLSearchParams(window.location.search),
    screenWidth = screen.width,
    screenHeight = screen.height,
    activeapps = [],
    isMaximized = [],
    applications = [],
    appString = "",
    focusedWindow = "",
    newUsername = "",
    toolbarTimeout = "",
    toolbarTriggerTimeout = "",
    maxamount = 0,
    enableToolbar = true,
    tmo,
    startMenuElements = [
        document.getElementById('startMenu'),
        document.getElementById('startButton'),
        document.getElementById('startMenuRightPane'),
        document.getElementById('startMenuLeftPane'),
    ],
    noResize = [
        'Execute Command',
        'Welcome!',
        "Error Message",
        "Wallpaper Settings",
        "Calculator",
        "Change Password"
    ],
    excludeTitlebarChange = [
        "desktopIcons",
        "taskbar",
        "startMenu",
        "notificationCenter"
    ],
    allowExit = true,
    path = require("path"),
    fs = require("fs"),
    request = require("request"),
    fileExtensions = [
        { ext: "svg", description: "Scalable Vector Image File" },
        { ext: "png", description: "Portable Network Graphics File" },
        { ext: "jpg", description: "JPEG Image File" },
        { ext: "gif", description: "GIF Image File" },
        { ext: "webp", description: "WebP Image File" },
        { ext: "bmp", description: "Bitmap Image File" },
        { ext: "txt", description: "Text File" },
        { ext: "inf", description: "Information File" },
        { ext: "ini", description: "Initialization File" },
        { ext: "js", description: "Javascript File" },
        { ext: "html", description: "HTML Page File" },
        { ext: "css", description: "CSS File" },
        { ext: "vbs", description: "VBS File" },
        { ext: "md", description: "Markdown File" },
        { ext: "htm", description: "HTML Page File" },
        { ext: "ecs", description: "Execute Command Shortcut" },
        { ext: "mp3", description: "MPEG Audio File" },
        { ext: "wav", description: "WAV Audio File" },
        { ext: "flac", description: "FLAC Audio File" },
    ],
    fileExplorerCurrentDir = "",
    fileExplorerIsDir = false,
    fileExplorerFolderIndexNumbers = [],
    appManagerProgramListTemp = [],
    errorMessageCount = 0,
    questionTitles = [],
    oldProfilePicture = "",
    version = "r15",
    loadedApps = [],
    globalVolume,
    notificationList = [],
    oldNotificationList = [],
    mediaPlayerInterval = null,
    lockScreenActive = false;


try {
    globalVolume = getCurrentUserData().globalVolume
} catch {
    globalVolume = 0;
}
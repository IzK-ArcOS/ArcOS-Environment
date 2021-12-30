/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
let ArcTermversion = "0.2-alpha",
    inputId = "",
    hist = [],
    histReturnInt = 0,
    displayPrompt = true,
    environmentVariables = [],
    globalCommandList = [],
    currentDir = "/",
    inputLengthSubtractor = 0,
    readDirOut = "",
    userInterfaceClass = ArcTermUI,
    commandsClass = new ArcTermCommands(),
    zoomLevel = 100,
    electronRemote = require("electron").remote,
    envToken = true;
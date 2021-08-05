const { platform } = require("os");

function fileExplorerOpenDir(dirName) {
    let newDirName = new GeneralLogic().replaceAllCharsInStr(dirName, "%27", "'");
    dirName = newDirName;
    let dirsstr = "<button class=\"folder\" onclick=\"fileExplorerParentDir()\"><img src=\"./system/images/folder.svg\" style=\"height:15px;vertical-align:top;\">&nbsp;&nbsp;Parent Directory</button>";
    let filestr = "";
    let compile = "";
    fs.readdir(dirName, { encoding: "ascii" }, function (err, files) {
        if (files == undefined || err) {
            new ErrorLogic().sendError("File Manager", "File Manager failed to open the folder. Please check the path and try again.<br><br>Path: " + dirName);
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            if (isDir(dirName + "/" + files[i])) {
                files[i] = new GeneralLogic().replaceAllCharsInStr(files[i], "%27", "'");
                //if (!new GeneralLogic().countOccurrences(files[i], "'") >= 1) {
                dirsstr += `<button class=\"folder\" onclick=\"fileExplorerOpenDir(new GeneralLogic().replaceAllCharsInStr(\`` + dirName + "/" + files[i] + `\`,\`%27\`,\`1\`));\"><img src=\"./system/images/folder.svg\" style=\"height:15px;vertical-align:top;\">&nbsp;&nbsp;` + files[i] + `</button>`
                //}
            } else {
                files[i] = new GeneralLogic().replaceAllCharsInStr(files[i], "%27", "'");
                //if (!files[i].includes("%27")) {
                filestr += `<button class=\"folder\" onclick=\"fileExplorerOpenFile(new GeneralLogic().replaceAllCharsInStr(\`` + dirName + "/" + files[i] + `\`,\`%27\`,\`1\`));\"><img src=\"./system/images/file.svg\" style=\"height:15px;vertical-align:top;\">&nbsp;&nbsp;` + files[i] + `</button>`;
                //}
            }
        }
        compile = (dirsstr + filestr);
        fileExplorerCurrentDir = dirName + "/"
        document.getElementById("fileExplorerMainFrameOut").innerHTML = compile;
        document.getElementById("fileExplorerMainFrameOut").scrollIntoView();
        document.getElementById("fileExplorerAddressBar").value = dirName;
    });


}

function isDir(path) {
    fs = require("fs");
    try {
        let stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

function fileExplorerOpenFile(file) {
    let split = file.split("");
    for (let i = 0; i < split.length; i++) {
        file = file.replace("%27", "'");
    }
    switch (evauluateFileType(file)) {
        case "txt":
        case "inf":
        case "html":
        case "js":
        case "css":
            openWithNotepad(file);
            break;
        case "jpg":
        case "png":
        case "svg":
        case "gif":
        case "webp":
        case "bmp":
            openImage(file);
            break;
        case "ecs":
            executeECS(file);
            break;
        default:
            openWith(file);
    }

}

function evauluateFileType(file) {
    file = file.toLowerCase();
    for (let i = 0; i < fileExtensions.length; i++) {
        if (file.endsWith(fileExtensions[i].ext)) {
            return fileExtensions[i].ext;
        }
    }
}

async function getDriveLetters() {
    const drivelist = require('drivelist');

    const drives = await drivelist.list();
    for (let i=0;i<drives.length;i++) {
        for (let j=0;j<drives[i].mountpoints.length;j++) {
            console.log(drives[i].mountpoints[j]);
        }
        
    }
}

function fileExplorerParentDir() {
    let prevPath = fileExplorerCurrentDir;
    let newPath = path.dirname(prevPath).split(path.sep).pop();
    if (prevPath == newPath) {
        getDriveLetters();
        document.getElementById("fileExplorerAddressBar").value = "";
    } else {
        fileExplorerOpenDir(newPath);

    }
}

function createFile(filePath) {

    fs.writeFile(filePath, "", function (err) {
        if (err) {
            new ErrorLogic().sendError("File Manager - unable to create file", "File Manager was unable to save the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
        closewindow("File Manager - Create File");
    });

}

function deleteFile(filePath) {

    fs.unlink(filePath, function (err) {
        if (err) {
            new ErrorLogic().sendError("File Manager - unable to delete file", "File Manager was unable to delete the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
        closewindow("File Manager - Delete File");
    });
}

function renameFile(path, file, name) {

    fs.rename(path + "/" + file, path + "/" + name, function (err) {
        if (err) {
            new ErrorLogic().sendError("File Manager - unable to rename file", "File Manager was unable to rename the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            closewindow("File Manager - Rename File");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
    });
}

function deleteFolder(folderPath) {
    fs.rmdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            new ErrorLogic().sendError("File Manager - unable to delete folder", "File Manager was unable to rename the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            closewindow("File Manager - Delete Folder");
            new ErrorLogic().sendError("File Manager - Folder deleted", "File Manager successfully deleted the requested folder.<br><br>Folder path:" + folderPath);
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }

    });
}

function renameFolder(folderPath, newName) {
    const fs = require("fs")

    const currPath = folderPath
    const newPath = newName

    fs.rename(currPath, newPath, function (err) {
        if (err) {
            new ErrorLogic().sendError("File Manager - unable to rename folder", "File Manager was unable to rename the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            closewindow("File Manager - rename Folder");
            new ErrorLogic().sendError("File Manager - Folder renamed", "File Manager successfully deleted the requested folder.<br><br>Folder path:" + folderPath);
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }

    })
}

function createFolder(folderName) {

    let dir = folderName;

    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir);
        } catch {
            new ErrorLogic().sendError("File Manager - unable to create folder", "File Manager was unable to create the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
    }
}

function openWithNotepad(file) {
    let path = file;
    notepadLoadedFile = path;

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            new NotificationLogic().notificationService("arcos Notepad", "There was an error loading \"" + document.getElementById("notepadLoadFileInput").value + "\". The file might not exist or you don't have the permission to access it. Please verify the name and try again.");
            document.getElementById("notepadTextField").value = "";
        } else {

            new consoleNotifier().notifyStartService("arcos.System.programdata.notepad.notepadFileLogic.loadNotepad: " + document.getElementById("notepadLoadFileInput").value)
            for (let i = 0; i < 200; i++) {

                document.getElementById("notepadTextField").value = data;
            }

            setTimeout(() => {
                closewindow(document.getElementById("Load Notepad"))
            }, 100);
        }
    });
    setTimeout(() => {
        openWindow("arcos Notepad");
    }, 100);
}

function executeECS(filepath) {
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            new NotificationLogic().notificationService("Execute Command Shortcut", "The ECS file is invalid. No commands were executed.");
        } else {
            eval(data);
        }
    });
}
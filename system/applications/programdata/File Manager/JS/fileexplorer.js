const { platform } = require("os");

function fileExplorerOpenDir(dirName) {

    dirName = new GeneralLogic().replaceAllCharsInStr(dirName,"\\","/");

    fs.readdir(dirName, { encoding: "ascii" }, function (err, files) {

        if (files == undefined || err) {
            new ErrorLogic().sendError("File Manager", "File Manager failed to open the folder. Please check the path and try again.<br><br>Path: " + dirName);
            return false;
        }

        document.getElementById("fileExplorerMainFrameOut").innerHTML = "";

        let filespan = document.createElement("span"),
            foldspan = document.createElement("span");

        for (let i = 0; i < files.length; i++) {

            let button = document.createElement("button"),
                image = document.createElement("img"),
                text = document.createTextNode(files[i]);

            
            image.style.height = "15px";
            image.style.verticalAlign = "top";

            button.className = "folder";
            
            button.append(image);
            button.append(text);

            if (isDir(dirName + "/" + files[i])) {
                image.src = "./system/images/folder.svg";
                foldspan.append(button);
                button.setAttribute(`onclick`, `fileExplorerOpenDir("${dirName + "/" + files[i]}")`);
            } else {
                image.src = "./system/images/file.svg";
                filespan.append(button);
                button.setAttribute(`onclick`, `fileExplorerOpenFile("${dirName + "/" + files[i]}")`);
            }
        }

        document.getElementById("fileExplorerMainFrameOut").append(foldspan);
        document.getElementById("fileExplorerMainFrameOut").append(filespan);

        fileExplorerCurrentDir = dirName;

        document.getElementById("fileExplorerAddressBar").value = fileExplorerCurrentDir;

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
        case "mp3":
        case "wav":
            openAudioFile(file);
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

    document.getElementById("fileExplorerMainFrameOut").innerHTML = "";
    for (let i = 0; i < drives.length; i++) {

        for (let j = 0; j < drives[i].mountpoints.length; j++) {

            let button = document.createElement("button"),
                buttonText = document.createTextNode("  " + drives[i].mountpoints[j].path),
                image = document.createElement("img");

            image.src = "./system/images/hdd.svg";
            image.style.height = "30px";
            image.style.verticalAlign = "middle";

            button.className = "folder big";
            button.id = drives[i].mountpoints[j].path;
            button.setAttribute("onclick", `fileExplorerOpenDir("${drives[i].mountpoints[j].path.replace("\\","/")}");`);

            button.append(image);
            button.append(buttonText);

            document.getElementById("fileExplorerMainFrameOut").append(button);

        }
    }
}

function fileExplorerParentDir() {
    fileExplorerCurrentDir = new GeneralLogic().replaceAllCharsInStr(path.resolve(fileExplorerCurrentDir, '..'),"\\","/");
    fileExplorerOpenDir(fileExplorerCurrentDir);
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
            new NotificationLogic().notificationService("ArcOS Notepad", "There was an error loading \"" + document.getElementById("notepadLoadFileInput").value + "\". The file might not exist or you don't have the permission to access it. Please verify the name and try again.");
            document.getElementById("notepadTextField").value = "";
        } else {

            new consoleNotifier().notifyStartService("ArcOS.System.programdata.notepad.notepadFileLogic.loadNotepad: " + document.getElementById("notepadLoadFileInput").value)
            for (let i = 0; i < 200; i++) {

                document.getElementById("notepadTextField").value = data;
            }

            setTimeout(() => {
                closewindow(document.getElementById("Load Notepad"))
            }, 100);
        }
    });
    setTimeout(() => {
        openWindow("ArcOS Notepad");
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
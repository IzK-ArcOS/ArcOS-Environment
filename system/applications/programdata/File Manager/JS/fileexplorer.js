const { platform } = require("os");

function fileExplorerOpenDir(dirName) {

    dirName = generalLogic.replaceAllCharsInStr(dirName, "\\", "/");

    fs.readdir(dirName, { encoding: "ascii" }, function(err, files) {

        if (files == undefined || err) {
            errorLogic.sendError("File Manager", "File Manager failed to open the folder. Please check the path and try again.<br><br>Path: " + dirName);
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
            image.style.marginRight = "7px";

            button.className = "folder";

            button.append(image);
            button.append(text);

            if (isDir(dirName + "/" + files[i])) {
                image.src = "./system/images/folder.svg";

                foldspan.append(button);
                button.setAttribute(`onclick`, `fileExplorerOpenDir("${dirName + "/" + files[i]}")`);
            } else {
                let extension = files[i].split(".")[files[i].split(".").length - 1];
                switch (extension) {
                    case "txt":
                    case "inf":
                    case "html":
                    case "js":
                    case "css":
                        image.src = "./system/images/Notepad.svg";
                        break;
                    case "jpg":
                    case "png":
                    case "svg":
                    case "gif":
                    case "webp":
                    case "bmp":
                        image.src = "./system/images/Image Viewer.svg";
                        break;
                    case "ecs":
                        image.src = "./system/images/execute command.svg";
                        break;
                    case "mp3":
                    case "wav":
                    case "flac":
                        image.src = "./system/images/Music Player.svg";
                        break;
                    default:
                        image.src = "./system/images/file.svg";
                }
                filespan.append(button);
                button.setAttribute(`onclick`, `fileExplorerOpenFile("${dirName + "/" + files[i]}")`);
            }
        }

        document.getElementById("fileExplorerMainFrameOut").append(foldspan);
        document.getElementById("fileExplorerMainFrameOut").append(filespan);

        fileExplorerCurrentDir = generalLogic.replaceAllCharsInStr(dirName, "//", "/");

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
        case "flac":
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

    fileExplorerCurrentDir = "";
    document.getElementById("fileExplorerAddressBar").value = "";

    document.getElementById("fileExplorerMainFrameOut").innerHTML = "";

    let header = document.createElement("h4"),
        headerText = document.createTextNode("Drives on your computer");

    header.append(headerText);
    header.style.marginBottom = "10px"

    document.getElementById("fileExplorerMainFrameOut").append(header);

    drives.sort();

    for (let i = 0; i < drives.length; i++) {


        for (let j = 0; j < drives[i].mountpoints.length; j++) {

            let button = document.createElement("button"),
                buttonText = document.createTextNode("  " + drives[i].mountpoints[j].path),
                image = document.createElement("img"),
                sizeAlloc = document.createElement("p"),
                sizeAllocText = document.createTextNode(formatBytes(drives[i].size));

            image.src = "./system/images/hdd.svg";
            image.style.height = "30px";
            image.style.verticalAlign = "middle";
            image.style.marginRight = "5px";

            sizeAlloc.append(sizeAllocText);
            sizeAlloc.style.opacity = "0.5";
            sizeAlloc.style.float = "right";
            sizeAlloc.style.verticalAlign = "middle";
            sizeAlloc.style.marginBottom = "2px";
            sizeAlloc.style.marginTop = "5px";

            button.className = "folder big";
            button.id = drives[i].mountpoints[j].path;
            button.setAttribute("onclick", `fileExplorerOpenDir("${drives[i].mountpoints[j].path.replace("\\", "/")}");`);

            button.append(image);
            button.append(buttonText);
            button.append(sizeAlloc);


            canWrite(drives[i].mountpoints[j].path, function(err, isWritable) {
                if (isWritable)
                    document.getElementById("fileExplorerMainFrameOut").append(button);
            });
        }
    }
}

function fileExplorerParentDir() {
    let newDir = generalLogic.replaceAllCharsInStr(path.resolve(fileExplorerCurrentDir, '..'), "\\", "/");
    if (fileExplorerCurrentDir != newDir) {
        fileExplorerCurrentDir = newDir
        fileExplorerOpenDir(fileExplorerCurrentDir);
    } else {
        fileExplorerCurrentDir = "";
        document.getElementById("fileExplorerAddressBar").value = fileExplorerCurrentDir;
        getDriveLetters();
    }
}

function createFile(filePath) {

    fs.writeFile(filePath, "", function(err) {
        if (err) {
            errorLogic.sendError("File Manager - unable to create file", "File Manager was unable to save the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
        windowLogic.closewindow("File Manager - Create File");
    });

}

function deleteFile(filePath) {

    fs.unlink(filePath, function(err) {
        if (err) {
            errorLogic.sendError("File Manager - unable to delete file", "File Manager was unable to delete the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
        windowLogic.closewindow("File Manager - Delete File");
    });
}

function renameFile(path, file, name) {

    fs.rename(path + "/" + file, path + "/" + name, function(err) {
        if (err) {
            errorLogic.sendError("File Manager - unable to rename file", "File Manager was unable to rename the requested file. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            windowLogic.closewindow("File Manager - Rename File");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
    });
}

function deleteFolder(folderPath) {
    fs.rmdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            errorLogic.sendError("File Manager - unable to delete folder", "File Manager was unable to rename the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            windowLogic.closewindow("File Manager - Delete Folder");
            errorLogic.sendError("File Manager - Folder deleted", "File Manager successfully deleted the requested folder.<br><br>Folder path:" + folderPath);
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

    fs.rename(currPath, newPath, function(err) {
        if (err) {
            errorLogic.sendError("File Manager - unable to rename folder", "File Manager was unable to rename the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        } else {
            windowLogic.closewindow("File Manager - rename Folder");
            errorLogic.sendError("File Manager - Folder renamed", "File Manager successfully deleted the requested folder.<br><br>Folder path:" + folderPath);
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
            errorLogic.sendError("File Manager - unable to create folder", "File Manager was unable to create the requested folder. You might not have permission to do so. Please check that the name is valid and try again.");
        }
        if (fileExplorerCurrentDir != "") {
            fileExplorerOpenDir(fileExplorerCurrentDir);
        }
    }
}

function openWithNotepad(file) {
    let path = file;
    notepadLoadedFile = path;

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            notificationLogic.notificationService("ArcOS Notepad", "There was an error loading \"" + document.getElementById("notepadLoadFileInput").value + "\". The file might not exist or you don't have the permission to access it. Please verify the name and try again.");
            document.getElementById("notepadTextField").value = "";
        } else {

            ConsoleNotifier.notifyStartService("ArcOS.System.programdata.notepad.notepadFileLogic.loadNotepad: " + document.getElementById("notepadLoadFileInput").value)
            for (let i = 0; i < 200; i++) {

                document.getElementById("notepadTextField").value = data;
            }

            setTimeout(() => {
                windowLogic.closewindow(document.getElementById("Load Notepad"))
            }, 100);
        }
    });
    setTimeout(() => {
        windowLogic.openWindow("ArcOS Notepad");
    }, 100);
}

function executeECS(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            notificationLogic.notificationService("Execute Command Shortcut", "The ECS file is invalid. No commands were executed.");
        } else {
            eval(data);
        }
    });
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function formatBytes(bytes) {

    let l = 0,
        n = parseInt(bytes, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function canWrite(path, callback) {
    fs.access(path, fs.R_OK, function(err) {
        callback(null, !err);
    });
}
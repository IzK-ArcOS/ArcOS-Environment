let notepadLoadedFile = "";

function notepadSaveFile() {
    if (notepadLoadedFile == "") {
        openWindow("Save Notepad");
        if (activeapps.includes("Save Notepad")) {
            document.getElementById("notepadSaveFileInput").addEventListener("keyup", () => {
                document.getElementById("notepadSaveFilePathDisplay").innerHTML = document.getElementById("notepadSaveFileInput").value;
            })
            setTimeout(() => {
                bringToFront(document.getElementById("Save Notepad"))
            }, 100);
        }
    } else {
        let fs = require('fs');
        fs.writeFile(notepadLoadedFile, document.getElementById("notepadTextField").value, function(err) {
            if (err) {
                new NotificationLogic().notificationService("There was an error writing \"" + document.getElementById("notepadLoadFileInput") + "\". You might not have permission. Please verify the name and try again.");
            }
            console.log("The file was saved!");
        });
    }
}

function notepadLoadFile() {
    openWindow("Load Notepad");
    if (activeapps.includes("Load Notepad")) {
        document.getElementById("notepadLoadFileInput").addEventListener("keyup", () => {
            document.getElementById("notepadLoadFilePathDisplay").innerHTML = document.getElementById("notepadLoadFileInput").value;
        })
        setTimeout(() => {
            bringToFront(document.getElementById("Load Notepad"))
        }, 100);
    }
}

function loadNotepad() {
    setTimeout(() => {
        let path = __dirname + "\\system\\applications\\programdata\\notepad\\save\\" + document.getElementById("notepadLoadFileInput").value;
        notepadLoadedFile = path;
        let fs = require('fs');
        fs.readFile(path, 'utf8', function(err, data) {
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
    }, 100);
}

function saveNotepad() {
    let path = __dirname + "\\system\\applications\\programdata\\notepad\\save\\" + document.getElementById("notepadSaveFileInput").value;
    notepadLoadedFile = path;

    let fs = require("fs");
    fs.writeFile(path, document.getElementById("notepadTextField").value, function(err) {
        if (err) {
            new NotificationLogic().notificationService("ArcOS Notepad", "There was an error writing \"" + document.getElementById("notepadLoadFileInput").value + "\". You might not have permission. Please verify the name and try again.");
        } else {
            setTimeout(() => {
                closewindow(document.getElementById("Save Notepad"));
            }, 100);
        }
    });

}

function notepadNewFile() {
    notepadLoadedFile = "";
    document.getElementById("notepadTextField").value = "";
}

function deleteNotepad() {
    let path = __dirname + "\\system\\applications\\programdata\\notepad\\save\\" + document.getElementById("notepadDeleteFileInput").value;
    let fs = require("fs");
    fs.unlink(path, function(err) {
        if (err) {
            new NotificationLogic().notificationService("ArcOS Notepad", "There was an error deleting \"" + document.getElementById("notepadDeleteFileInput").value + "\". You might not have permission. Please verify the name and try again.");
        }
    })
    notepadNewFile();
    closewindow("Delete Notepad");
}

function notepadDeleteFile() {
    openWindow("Delete Notepad");
    if (activeapps.includes("Delete Notepad")) {
        document.getElementById("notepadDeleteFileInput").addEventListener("keyup", () => {
            document.getElementById("notepadDeleteFilePathDisplay").innerHTML = document.getElementById("notepadDeleteFileInput").value;
        })
        setTimeout(() => {
            bringToFront(document.getElementById("Delete Notepad"));
        }, 100);
    }
}
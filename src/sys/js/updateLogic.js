const mergedirs = require("merge-dirs");
const extract = require('extract-zip');
const { app } = require("electron").remote;
ConsoleNotifier.startModule("ArcOS.System.updateLogic");

class UpdateLogic {

    async checkForUpdates() {
        if (process.platform === "win32") {
            let dir = path.join(app.getPath('userData'), 'updates');
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir);

        }
        ConsoleNotifier.notifyStartService("UpdateLogic.checkForUpdates: Checking for updates...");

        let latestVersionNumber = parseInt(await this.getVersionNumber());
        let versionNumber = parseInt(version.replace("r", ""));

        if (latestVersionNumber > versionNumber) {
            ConsoleNotifier.notifyStartService(`UpdateLogic.checkForUpdates: A new version is available: r${latestVersionNumber}`);

            document.getElementById("updateStatus").innerText = "Updating ArcOS...";

            await this.downloadFile(
                "https://github.com/TWI-ArcOS/ArcOS-Environment/archive/refs/heads/main.zip",
                path.join(process.platform === "win32" ? path.resolve(path.join(app.getPath('userData'), 'updates'), '..') : path.resolve(__dirname, '..'), "update.zip")
            );
        } else {
            document.getElementById("updateStatus").innerText = "ArcOS is up to date.";

            ConsoleNotifier.notifyStartService(`UpdateLogic.checkForUpdates: Latest version already installed.`);
        }
    }

    async getVersionNumber() {
        return await fetch("https://raw.githubusercontent.com/TWI-ArcOS/ArcOS-Environment/main/VERSION").then(response => response.text()).then(text => {
            return text;
        }).catch(() => {
            return "";
        });
    }

    async downloadFile(file_url, targetPath) {
        let progressBar = document.getElementById("updateProgressBar");
        let destinationDisplay = document.getElementById("updateDestinationDisplay");
        let fileSizeDisplay = document.getElementById("updateFileSizeDisplay");

        if (progressBar && destinationDisplay && fileSizeDisplay) {
            destinationDisplay.innerText = targetPath;

            let received_bytes = 0;
            let total_bytes = 0;
            let req = request({
                method: 'GET',
                uri: file_url
            });
            let out = fs.createWriteStream(targetPath);

            req.pipe(out);
            req.on('response', function (data) { total_bytes = parseInt(data.headers['content-length']); });
            req.on('data', function (chunk) { received_bytes += chunk.length; updateLogic.showProgress(received_bytes, total_bytes); });
            req.on('end', function () {
                const uS = document.getElementById("updateStatus");

                if (uS) uS.innerText = "Updates downloaded, extracting...";

                extract(
                    targetPath, {
                    dir: process.platform === "win32" ? path.resolve(path.join(app.getPath('userData'), 'updates'), '..') : path.resolve(__dirname, '..')
                }, () => {
                    if (uS) uS.innerText = "Extracted, moving to system directory...";

                    updateLogic.moveUpdateFiles();

                    if (uS) uS.innerText = "Updates downloaded! restarting in 10 seconds...";

                    notificationLogic.notificationService("ArcOS Updater", "ArcOS has installed the updates, and it will restart in 10 seconds.");

                    setTimeout(() => {
                        powerLogic.restart();
                    }, 10000);
                });
            });
        } else {
            errorLogic.sendError("Unable to update", "The update application is not loaded. Please restart and try again.")
        }
    }

    async moveUpdateFiles() {
        const oldPath = path.join(process.platform === "win32" ? path.resolve(path.join(app.getPath('userData'), 'updates'), '..') : path.resolve(__dirname, '..'), 'ArcOS-Environment-main' + path.sep);
        const newPath = path.join(__dirname, path.sep);

        mergedirs.default(oldPath, newPath, 'overwrite');
    }

    showProgress(received, total) {
        document.getElementById("updateStatus").innerText = "Downloading updates...";
        let progressBar = document.getElementById("updateProgressBar");
        let fileSizeDisplay = document.getElementById("updateFileSizeDisplay");
        let progress = Math.floor((received * 100) / total);
        let totalFormat = formatBytes(total);
        let receivedFormat = formatBytes(received);

        if (total) {
            progressBar.setAttribute("max", total);
            progressBar.setAttribute("value", received);
            fileSizeDisplay.innerText = `${receivedFormat} of ${totalFormat} (${progress}%)`;
        } else {
            progressBar.removeAttribute("value");
            progressBar.setAttribute("max", 0);
            fileSizeDisplay.innerText = `${receivedFormat} (total filesize indeterminate)`;
        }
    }
}

const updateLogic = new UpdateLogic();
new consoleNotifier().startModule("ArcOS.System.updateLogic");

class UpdateLogic {

    async checkForUpdates() {
        new consoleNotifier().notifyStartService("UpdateLogic.checkForUpdates: Checking for updates...");

        let latestVersionNumber = parseInt(await this.getVersionNumber());
        let versionNumber = parseInt(version.replace("r", ""));

        if (latestVersionNumber > versionNumber) {
            new consoleNotifier().notifyStartService(`UpdateLogic.checkForUpdates: A new version is available: r${latestVersionNumber}`);

            document.getElementById("updateStatus").innerText = "Updating ArcOS...";
            this.downloadFile(
                "https://github.com/TWI-ArcOS/ArcOS-Environment/archive/refs/heads/main.zip",
                path.join(path.resolve(__dirname, '..'), "update.zip")
            );
        } else {
            document.getElementById("updateStatus").innerText = "ArcOS is up to date.";
            new consoleNotifier().notifyStartService(`UpdateLogic.checkForUpdates: Latest version already installed.`);
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
                const extract = require('extract-zip')
                try {
                    extract(targetPath, {
                        dir: path.join(path.resolve(__dirname, ".."))
                    });
                    updateLogic.moveUpdateFiles();
                    document.getElementById("updateStatus").innerText = "Updates downloaded! restarting in 10 seconds...";
                    notificationLogic.notificationService("ArcOS Updater","ArcOS has installed the updates, and it will restart in 10 seconds.");
                    setTimeout(() => {
                        powerLogic.restart();
                    }, 10000);
                } catch (err) { }
            });
        } else {
            errorLogic.sendError("Unable to update", "The update application is not loaded. Please restart and try again.")
        }
    }

    async moveUpdateFiles() {

        let oldPath = path.join(path.resolve(__dirname, '..'), 'ArcOS-Environment-main/');
        let newPath = path.join(__dirname, "/");
        let mergedirs = require("merge-dirs");

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
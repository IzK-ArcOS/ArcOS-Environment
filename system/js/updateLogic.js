new consoleNotifier().startModule("ArcOS.System.updateLogic");

class UpdateLogic {

    async checkForUpdates() {
        new consoleNotifier().notifyStartService("UpdateLogic.checkForUpdates: Checking for updates...");
        let releases = await this.getReleases();
        let releaseTags = [];
        let versionNumber = parseInt(version.replace("r",""));

        for (let i=0;i<releases.length;i++) {
            releaseTags.push(releases[i].tag_name);
        }

        let latestReleaseNumber = parseInt(releaseTags[0].replace("v1r",""));

        if (latestReleaseNumber > versionNumber) {
            new consoleNotifier().notifyStartService(`UpdateLogic.checkForUpdates: A new version is available: r${latestReleaseNumber}`);
            notificationLogic.notificationService("ArcOS Updater",`There is a new version of ArcOS available for download: <b>ArcOS r${latestReleaseNumber}</b>.<br><br>You are currently running <b>ArcOS r${versionNumber}</b>. It is recommended that you update for the best experience.`);
        } else {
            new consoleNotifier().notifyStartService(`UpdateLogic.checkForUpdates: Latest version already installed.`);
            console.log("You are running the latest version of ArcOS!")
        }
    }

    async getReleases() {
        return await fetch("https://api.github.com/repos/TWI-ArcOS/ArcOS-Releases/releases").then(response => response.json()).then(json => {
            return json;
        }).catch(() => {
            return {};
        });
    }

}

const updateLogic = new UpdateLogic();
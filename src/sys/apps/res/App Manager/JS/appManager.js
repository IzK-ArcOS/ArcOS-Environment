function populateAppManager() {
    setInterval(() => {
        const appManagerProcessNames = document.getElementById("appManagerProcessNames");
        const appManagerProcessKillButtons = document.getElementById("appManagerProcessKillButtons");
        if (appManagerProcessKillButtons && appManagerProcessNames) {
            let processList = activeapps;
            let processListCompiled = "";
            let processKillCompiled = "";
            for (let i = 0; i < processList.length; i++) {
                processKillCompiled += `<a onclick='windowLogic.closewindow(document.getElementById(\"` + processList[i] + `\"));'>Close App</a><br>`;
                processListCompiled += processList[i] + "<br>";
            }
            if (document.getElementById("appManagerProcessNames").innerHTML != processListCompiled) {
                document.getElementById("appManagerProcessNames").innerHTML = processListCompiled;
                document.getElementById("appManagerProcessKillButtons").innerHTML = processKillCompiled;
            }
        }
    }, 500);
}
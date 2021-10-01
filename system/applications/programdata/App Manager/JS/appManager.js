function populateAppManager() {
    setInterval(() => {
        try {
            let processList = activeapps;
            let processListCompiled = "";
            let processKillCompiled = "";
            for (let i = 0; i < processList.length; i++) {
                processKillCompiled += `<a onclick='new WindowLogic().closewindow(document.getElementById(\"` + processList[i] + `\"));'>Close App</a><br>`;
                processListCompiled += processList[i] + "<br>";
            }
            if (document.getElementById("appManagerProcessNames").innerHTML != processListCompiled) {
                document.getElementById("appManagerProcessNames").innerHTML = processListCompiled;
                document.getElementById("appManagerProcessKillButtons").innerHTML = processKillCompiled;
            }
        } catch {}
    }, 500);
}
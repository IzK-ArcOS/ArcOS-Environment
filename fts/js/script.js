onload = function() {
    setPage("home");
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 1000);
    closeExecuteCommand();
    window.addEventListener("keydown", (e) => {
        if (e.shiftKey && e.key.toLowerCase() === 'f10') {
            openExecuteCommand();
        }
    });
}

function setPage(idOfContent) {
    document.getElementById("inliner").innerHTML =
        document.getElementById(idOfContent).innerHTML;
    console.log(`[FTS] Setting page to "${idOfContent}"`);
}

function createUserAccount() {
    let username = document.getElementById("usernameInputField").value;
    console.log(`[FTS] Attempting to create user account "${username}"`);
    if (username != "") {
        console.log(`[FTS] ... Attempt succeeded.`);
        createUserData(username);
        setPage("finish");
    } else {
        console.log(`[FTS] ... Attempt failed.`);
        setPage("invalidAccount")
    }
}

function gotoLogin(setupFinished = false) {
    console.log(`[FTS] Restarting, Setup Finished: ${setupFinished}`);
    if (setupFinished) {
        localStorage.setItem("FTSFinished", "true");
    }
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "main.html";
    }, 3000);
}

function closeExecuteCommand() {
    document.getElementById("comExec").style.visibility = "hidden";
    document.getElementById("comExec").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("comExec").style.display = "none";
    }, 300);
}

function openExecuteCommand() {
    document.getElementById("comExec").style.display = "";
    setTimeout(() => {
        document.getElementById("comExec").style.visibility = "visible";
        document.getElementById("comExec").style.opacity = "1";
    }, 300);
}

function execCom() {
    let com = document.getElementById("comExecInp").value;
    let out = eval(com)
    if (out != undefined) {
        out = out.toString();
        if (!out.includes("undefined") || !out.includes(undefined) || !out.includes("null") || !out.includes(null))
            document.getElementById('executeCommandOutput').innerText += out + '\n';
    }
}

console.log = (e, c) => {
    try {
        document.getElementById("executeCommandOutput").innerText += e + "\n";
    } catch {}
}

window.onerror = (e) => {
    try {
        document.getElementById("executeCommandOutput").innerText += e + "\n";
    } catch {}
}
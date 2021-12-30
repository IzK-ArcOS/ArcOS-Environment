let username = "";

onload = function () {
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 500);
    setPage("home");
    setTimeout(() => {
        document.getElementsByClassName("block")[0].style.opacity = "0";
    }, 3000);
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
    username = document.getElementById("usernameInputField").value;
    console.log(`[FTS] Attempting to create user account "${username}"`);
    if (username != "") {
        console.log(`[FTS] ... Attempt succeeded.`);
        createUserData(username, true);
        setAdmin(username, true);
        setPage("passwordSetup");
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

function setUserPassword() {
    let password = document.getElementById("passwordInputField").value,
        confrm = document.getElementById("passwordConfirmInputField").value;

    if (password == confrm) {
        if (password && confrm) {
            setPassword(username, password);
        }
        setPage('finish');
    } else {
        setPage('noPswdMatch');
    }
}

console.log = (e, c) => {
    const executeCommandOutput = document.getElementById("executeCommandOutput");

    if (executeCommandOutput) document.getElementById("executeCommandOutput").innerText += e + "\n";
}

window.onerror = (e) => {
    const executeCommandOutput = document.getElementById("executeCommandOutput");

    if (executeCommandOutput) document.getElementById("executeCommandOutput").innerText += e + "\n";
}

const args = new URLSearchParams(window.location.search);
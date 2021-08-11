let username;
let userSelectorActive = false;
let loginTimeout;
let page;
let userData;
onload = function () {

    if (this.localStorage.getItem("safeMode") != "1") {
        localStorage.setItem("userAmount", 0);
        localStorage.removeItem("userList");

        let tempUsrList = [];

        if (localStorage.getItem("userList")) {
            tempUsrList = localStorage.getItem("userList").split(',');
        }

        for (let i = 0; i < localStorage.length; i++) {
            try {
                let userData = JSON.parse(localStorage.getItem(localStorage.key(i)));

                if (
                    userData.enabled == 1 &&
                    userData.theme
                ) {
                    localStorage.setItem("userAmount", parseInt(localStorage.getItem("userAmount")) + 1);
                    tempUsrList.push(localStorage.key(i));
                }
            }
            catch { }
            localStorage.setItem("userList", tempUsrList);
        }

        userSelector();

        document.addEventListener("keydown", e => {
            switch (e.key.toLowerCase()) {
                case "enter":
                    enterKeyHit();
                    break;
                case "escape":
                    if (page != 1) { cancelLogin(); };
                    break;
            }
        });

        setTimeout(() => {
            startUserDataUpdateCycle();
            setToolbarTrigger();
        }, 100);

    } else {

        document.body.style.opacity = "1";

        switchPage(6);

        document.getElementById("content").className = "content";
        document.getElementById("username").innerHTML = "ArcOS Safe Mode";
        document.getElementsByClassName("blur")[0].classList.remove("hidden");

        let userPicPath = "";

        if (!userData.profilePicture) {
            userPicPath = "./system/images/user.png";
        } else {
            userPicPath = "./system/images/profilePictures/" + userData.profilePicture + ".png";
        }

        document.getElementById("profilePicture").src = userPicPath;

        clearInterval(coverInterval);

        document.getElementsByClassName("lockScreen")[0].style.display = "none";

        loginTimeout = setTimeout(() => {
            localStorage.setItem("username", "ArcOS Safe Mode");

            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.href = "arcos.html?username=ArcOS Safe Mode";
            }, 1000);

        }, 6000);
    }

    startLockscreenInterval();
}

function userSelector() {

    startUserDataUpdateCycle();

    if (localStorage.getItem("userAmount") != "0") {

        setTimeout(() => {
            document.body.style.opacity = "1";
        }, 1000);

        userSelectorActive = true;

        switchPage(1);

        document.getElementById("content").classList.remove("content");
        document.getElementById("content").classList.add("userSelector");
        document.getElementsByClassName("blur")[0].classList.add("hidden");

        populateUserSelector();

    } else {

        window.location.href = "firsttimesetup.html";

    }

}

function switchPage(x) {

    page = x;

    document.getElementById("content").innerHTML = document.getElementById("page" + x).innerHTML;

}

function enterKeyHit() {

    switch (page) {
        case 2:
            continueLoginAs(document.getElementById('passwordInputField').value);
            break;
        case 3:
            createFirstUser();
            break;
        case 6:
            cancelLogin();
            break;
        case 7:
            loginAs(username);
            break;
    }

}

function loginAs(user) {

    username = user;
    userData = JSON.parse(localStorage.getItem(username));

    if (localStorage.getItem("userList").split(",").includes(user)) {

        if (localStorage.getItem(username) != "0" || localStorage.getItem(username) != 0) {

            if (userData.pswd) {

                switchPage(2);

                document.getElementById("content").className = "content";
                document.getElementById("username").innerHTML = user;
                document.getElementsByClassName("blur")[0].classList.remove("hidden");

                let userPicPath;

                if (!userData.profilePicture) {
                    userPicPath = "./system/images/user.png";
                } else {
                    userPicPath = "./system/images/profilePictures/" + userData.profilePicture + ".png";
                }

                document.getElementById("profilePicture").src = userPicPath;

            } else {

                switchPage(6);

                document.getElementById("content").className = "content";
                document.getElementById("username").innerHTML = username;
                document.getElementsByClassName("blur")[0].classList.remove("hidden");

                let userPicPath = "";

                if (!userData.profilePicture) {
                    userPicPath = "./system/images/user.png";
                } else {
                    userPicPath = "./system/images/profilePictures/" + userData.profilePicture + ".png";
                }

                document.getElementById("profilePicture").src = userPicPath;

                document.getElementsByClassName("lockScreen")[0].style.display = "none";

                clearInterval(coverInterval);

                loginTimeout = setTimeout(() => {

                    localStorage.setItem("username", username);

                    document.body.style.opacity = "0";

                    setTimeout(() => {
                        window.location.href = "arcos.html?username=" + username;
                    }, 1000);

                }, 6000);
            }
        }
    }
}

function continueLoginAs(pswd) {

    let input = pswd;

    pswd = pswd.value;

    let pass = userData.pswd;

    if (pass == pswd) {

        switchPage(6);

        document.getElementById("content").className = "content";
        document.getElementById("username").innerHTML = username;
        document.getElementsByClassName("blur")[0].classList.remove("hidden");

        let userPicPath;

        if (!userData.profilePicture) {
            userPicPath = "./system/images/user.png";
        } else {
            userPicPath = "./system/images/profilePictures/" + userData.profilePicture + ".png";
        }

        document.getElementById("profilePicture").src = userPicPath;

        clearInterval(coverInterval);

        document.getElementsByClassName("lockScreen")[0].style.display = "none";

        loginTimeout = setTimeout(() => {

            localStorage.setItem("username", username);

            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.href = "arcos.html?username=" + username;
            }, 1000);

        }, 6000);

    } else {

        input.style.backgroundColor = "#ff000055";
        input.setAttribute("disabled", "")

        setTimeout(() => {

            input.style.backgroundColor = "";
            input.value = "";
            input.removeAttribute("disabled")

        }, 2000);

    }
}

function populateUserSelector() {

    try {

        document.getElementById("userSelectorInner").innerHTML = "";

        let users = localStorage.getItem("userList").split(",");

        for (let i = 0; i < users.length; i++) {

            if (localStorage.getItem(users[i])) {

                let userPicPath;

                userData = JSON.parse(localStorage.getItem(users[i]));

                if (!userData.profilePicture) {

                    userPicPath = "./system/images/user.png";

                } else {

                    userPicPath = "./system/images/profilePictures/" + userData.profilePicture + ".png";

                }

                document.getElementById("userSelectorInner").innerHTML += "<button class=\"user\" onclick=\"loginAs(`" + users[i] + "`);\"><img src=\"" + userPicPath + "\"><br><p>" + users[i] + "</p> </button>"

                userData = "";
            }
        }
    } catch (e) {

        throw e;

    }

}

function cancelLogin() {

    startLockscreenInterval();

    document.getElementsByClassName("lockScreen")[0].style.display = "";

    clearTimeout(loginTimeout);

    userSelector();
}

function createFirstUser() {

    let username = document.getElementById("firstUsernameInputField").value;

    createUserData(username);

    setTimeout(() => {

        userSelector();

        populateUserSelector();

        setTimeout(() => {
            window.location.reload();
        }, 100);

    }, 100);
}

function startLockscreenInterval() {

    console.log("Started Lockscreen Interval");

    setInterval(() => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let second = today.getSeconds();

        document.getElementById("lockScreenTime").innerHTML = `${checkTime(hour)}:${checkTime(minute)}:${checkTime(second)}`;

        today = `${mm}/${dd}/${yyyy}`;
        document.getElementById("lockScreenDate").innerHTML = today;

    }, 100);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}

function revealLogin() {
    document.getElementsByClassName("lockScreen")[0].classList.add('revealed');
    coverTimeout = setTimeout(() => {
        hideLogin();
    }, 30000);
    lockScreenVisible = false;
    console.log("Lockscreen hidden.")
}
let lockScreenVisible = true;

function hideLogin() {
    document.getElementsByClassName("lockScreen")[0].classList.remove('revealed');
    lockScreenVisible = true;
    console.log("Lockscreen visible.")
}

window.addEventListener("click", () => {
    clearInterval(coverInterval);
    coverInterval = setInterval(() => {
        if (!lockScreenVisible) {
            hideLogin();
        }
    }, 30000);
    console.log("Cover Timeout Reset.")
})

let coverInterval = setInterval(() => {
    if (!lockScreenVisible) {
        hideLogin();
    }
}, 30000);
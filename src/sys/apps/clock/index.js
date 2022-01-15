function clockSwitchPage(index, buttonIndex = 0) {
    if (clockPages[`${index}`] && clockCurrentPage != index) {
        clockCurrentPage = index;

        let pageData = clockPages[`${index}`];
        let target = document.getElementById("clockOutput");
        let sideBarButtons = document.querySelectorAll("div.clockSidebar button");
        let selectedClass = "selected";
        let windowTitle = document.getElementById("clockTitlebarStatus");

        fs.readFile(path.join(__dirname, `../apps/clock/inline/${pageData.file}`), (err, data) => {
            if (!err && data) {
                for (let i = 0; i < sideBarButtons.length; i++) {
                    sideBarButtons[i].classList.remove(selectedClass);
                }

                target.innerHTML = data;

                sideBarButtons[buttonIndex].classList.add(selectedClass);
            } else {
                errorLogic.sendError("Clock Error", "Unable to switch the clock page, the file was not found or is invalid.");
            }
        });

        windowTitle.innerText = ` - ${pageData.name}`;
    }
}

let clockPages = {
    home: {
        file: "home.inline",
        name: "Home"
    },
    timer: {
        file: "timer.inline",
        name: "Timer"
    },
    stopwatch: {
        file: "stopwatch.inline",
        name: "Stopwatch"
    },
    clock: {
        file: "clock.inline",
        name: "Clock"
    }
}

let clockCurrentPage = '';

setInterval(() => {
    if (clockCurrentPage) {
        switch (clockCurrentPage) {
            case "clock":
                updateClockPage();
        }
    }
}, 100);

function updateClockPage() {
    let clockPageTimeDisp = document.getElementById("clockPageTimeDisp");
    let clockPageDateDisp = document.getElementById("clockPageDateDisp");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hour = today.getHours().toString();
    let minute = today.getMinutes().toString();
    let second = today.getSeconds().toString();

    clockPageTimeDisp.innerText = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
    clockPageDateDisp.innerText = `${mm}/${dd}/${yyyy}`;
}

clockSwitchPage("home", 0);
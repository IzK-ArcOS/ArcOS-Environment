function clockSwitchPage(index) {
    if (pages[`${index}`]) {
        let pageData = pages[`${index}`];
        let target = document.getElementById("clockOutput");

        fs.readFile(path.join(__dirname, `system/applications/programdata/Clock/inline/${pageData.file}`), (err, data) => {
            if (!err && data) {
                target.innerHTML = data;
            } else {
                errorLogic.sendError("Clock Error", "Unable to switch the clock page, the file was not found or is invalid.");
            }
        })
    }
}

let pages = {
    home: {
        file: "home.inline",
        name: "Home Page"
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
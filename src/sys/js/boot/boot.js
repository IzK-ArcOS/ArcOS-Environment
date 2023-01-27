/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 24th 2022,
 * and was finished at 2:58PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

onload = function () {
    const body = document.body;
    const CN = ConsoleNotifier;
    const statusText = document.getElementById('statusText');
    const LS = this.localStorage;

    const nameSpace = "ArcOS.Boot";

    CN.notifyStartService(nameSpace);

    body.style.opacity = "1"

    function loadDoneTimeout() {
        CN.notifyStartService(`${nameSpace}: loading done, preparing for redirect`);

        body.style.opacity = "0"
    }

    function redirectStartTimeout() {
        CN.notifyStartService(`${nameSpace}: redirect started`)

        body.innerText = "";
    }

    function redirectTimeout() {
        CN.notifyStartService(`${nameSpace}: redirecting to login`)

        location.href = "login.html";
    }

    setTimeout(loadDoneTimeout, 8000);
    setTimeout(redirectStartTimeout, 10000);
    setTimeout(redirectTimeout, 11000);

    // Event Listener for SafeMode, ArcTerm and Reset
    document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        const shift = e.shiftKey;
        const ctrl = e.ctrlKey;

        // SafeMode
        if (key == "f8") {
            CN.notifyStartService(`${nameSpace}: F8 pressed, entering Safe Mode`);

            statusText.innerText = "Please Wait";

            LS.setItem("safeMode", "1");
        }

        // Reset
        if (ctrl && shift && key == 'e') {
            CN.notifyStartService(`${nameSpace}: Ctrl+Shift+E pressed, clearing LocalStorage`);

            LS.clear();

            statusText.innerText = "Resetting ArcOS"
        }

        // ArcTerm
        if (ctrl && shift && key == 'a') {
            location.href = "arcterm.html";
        }
    })
}
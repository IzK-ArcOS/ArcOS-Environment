<div class="window" id="Clock" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Clock<span id="clockTitlebarStatus"></span></p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close"><span class="material-icons">close</span></button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title"><span class="material-icons">minimize</span></button>
    </div>
    <div class="body">
        <div class="clockSidebar">
            <button onclick="clockSwitchPage('home',0)"><span class="material-icons">home</span>Home</button><br>
            <hr>
            <button onclick="clockSwitchPage('timer',1)"><span class="material-icons">hourglass_bottom</span>Timer</button><br>
            <button onclick="clockSwitchPage('stopwatch',2)"><span class="material-icons">timer</span>Stopwatch</button><br>
            <button onclick="clockSwitchPage('clock',3)"><span class="material-icons">schedule</span>Clock</button>
        </div>
        <div class="clockMainPage" id="clockOutput">
            <div class="centeredFixed"><i style="opacity: 0.5;">ERR_NO_LOADED_FILE</i></div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/clock.css">
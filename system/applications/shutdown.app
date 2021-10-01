<div class="window" id="Shut Down ArcOS" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle">
        <center>
            <h3>Shutdown ArcOS</h3>
        </center>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <center>
            <button onclick="powerLogic.shutdown();" class="transparent shutdownOption">
                <span class="material-icons">power_settings_new</span><br>
                Shut down
            </button>
            <button onclick="powerLogic.logoff();" class="transparent shutdownOption">
                <span class="material-icons">logout</span><br>
                Logoff
            </button>
            <button onclick="powerLogic.restart();" class="transparent shutdownOption">
                <span class="material-icons">refresh</span><br>
                Restart
            </button><br><br>
            <button onclick="windowLogic.closewindow(this.parentNode.parentNode.parentNode);" class="transparent">
                Cancel
            </button>
        </center>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/shutdown.css">
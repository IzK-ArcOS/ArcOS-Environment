<div class="window" id="Shut Down ArcOS" onclick="bringToFront(this);">
    <div class="windowTitle" style="background-color: transparent;">
        <center>
            <h3 style="margin:30px 0;">Shutdown ArcOS</h3>
        </center>
    </div>
    <div class="body" onclick="bringToFront(parentNode);">
        <center>
            <button onclick="new PowerLogic().shutdown();" class="transparent">
                <span class="material-icons" style="font-size:60px;">power_settings_new</span><br>
                Shut down
            </button>
            <button onclick="new PowerLogic().logoff();" class="transparent">
                <span class="material-icons" style="font-size:60px;">logout</span><br>
                Logoff
            </button>
            <button onclick="new PowerLogic().restart();" class="transparent">
                <span class="material-icons" style="font-size:60px;">refresh</span><br>
                Restart
            </button><br><br>
            <button onclick="closewindow(this.parentNode.parentNode.parentNode);" class="transparent">
                Cancel
            </button>
        </center>
    </div>
</div>
<style>
    .window[id*='Shut Down ArcOS'] {
        min-width: 320px;
        max-width: 320px;
        min-height: 245px;
        max-height: 245px;
    }
    
    .window[id*='Shut Down ArcOS']>.body>center>h3 {
        padding: 0px;
        margin: 10px;
    }
    
    .window[id*='Shut Down ArcOS']>.windowTitle>center>h3 {
        padding: 0px;
        margin: 10px;
    }
    
    .window[id*='Shut Down ArcOS']>.body {
        padding: 0px;
    }
    
    .window[id*='Shut Down ArcOS']>.windowTitle {
        padding: 0px;
    }
</style>
<div class="window" id="ArcTerm" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);" ondblclick="windowLogic.toggleMaximizedState(this.parentNode);">
        <p class="titleText">ArcTerm</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="windowLogic.toggleMaximizedState(this.parentNode.parentNode);" class="title">🗖</button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div onclick="windowLogic.bringToFront(parentNode);" class="ArcTermBodyOutline">
        <div id="ArcTermBody" class="ArcTermBody">

        </div>
    </div>
</div>

<link rel="stylesheet" href="./system/applications/ArcTerm.css">
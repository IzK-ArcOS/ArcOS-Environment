<div class="window" id="ArcTerm" onclick="new WindowLogic().bringToFront(this);" style="/*resize:none;*/width:fit-content;height:fit-content;min-width:unset;min-height:unset;min-width:794px;min-height:537px;">
    <div class="windowTitle" onclick="new WindowLogic().bringToFront(parentNode);" ondblclick="new WindowLogic().toggleMaximizedState(this.parentNode);">
        <p class="titleText">ArcTerm</p>
        <button onclick="new WindowLogic().closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="new WindowLogic().toggleMaximizedState(this.parentNode.parentNode);" class="title">🗖</button>
        <button onclick="new WindowLogic().minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div onclick="new WindowLogic().bringToFront(parentNode);" style="padding:0px;width:100%;max-width:100%;height:calc(100% - 30px);max-height:calc(100% - 30px);position:absolute;top:30px">
        <div id="ArcTermBody" class="ArcTermBody">

        </div>
    </div>
</div>
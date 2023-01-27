/**
 * ~= ArcOS June 2022 mass rewrite =~
 * 
 * This file had pass 1 of rewriting on June 28th 2022,
 * and was finished at 2:46PM that day.
 * 
 * - Izaak Kuipers @ ArcOS
*/

ConsoleNotifier.registerMod("ArcOS.System.dragLogic");

class DragLogic {
    dragElement(elmnt, titlebar) {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;

        if (titlebar) {
            titlebar.onmousedown = dragMouseDown;
            titlebar.ontouchstart = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
            elmnt.ontouchstart = dragMouseDown;
        }

        function dragMouseDown(e) {
            windowLogic.bringToFront(elmnt);
            
            e = e || window.event;
            e.preventDefault();
            
            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
            document.ontouchend = closeDragElement;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchmove = null;
            document.ontouchend = null;
        }
    }
}

let dragLogic = new DragLogic();
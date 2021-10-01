<div class="window" id="Calculator" onclick="windowLogic.bringToFront(this);">
    <div class="windowTitle" onclick="windowLogic.bringToFront(parentNode);">
        <p class="titleText">Calculator</p>
        <button onclick="windowLogic.closewindow(this.parentNode.parentNode);" class="title close">✖</button>
        <button onclick="windowLogic.minimizeWindow(this.parentNode.parentNode.id);" class="title">🗕</button>
    </div>
    <div class="body" onclick="windowLogic.bringToFront(parentNode);">
        <table>
            <tr>
                <td colspan="3"><input readonly="true" id="calculatorOutput" class="bright" /></td>
                <td><button id="calculatorc" onclick="calculatorClear()">C</button> </td>
            </tr>
            <tr>
                <td><button id="calculator1" onclick="calculatorDisplay('1')">1</button> </td>
                <td><button id="calculator2" onclick="calculatorDisplay('2')">2</button> </td>
                <td><button id="calculator3" onclick="calculatorDisplay('3')">3</button></td>
                <td><button id="calculator/" onclick="calculatorDisplay('/')">/</button></td>
            </tr>
            <tr>
                <td><button id="calculator4" onclick="calculatorDisplay('4')">4</button></td>
                <td><button id="calculator5" onclick="calculatorDisplay('5')">5</button></td>
                <td><button id="calculator6" onclick="calculatorDisplay('6')">6</button></td>
                <td><button id="calculator-" onclick="calculatorDisplay('-')">-</button></td>
            </tr>
            <tr>
                <td><button id="calculator7" onclick="calculatorDisplay('7')">7</button></td>
                <td><button id="calculator8" onclick="calculatorDisplay('8')">8</button></td>
                <td><button id="calculator9" onclick="calculatorDisplay('9')">9</button></td>
                <td><button id="calculator+" onclick="calculatorDisplay('+')">+</button></td>
            </tr>
            <tr>
                <td><button id="calculator." onclick="calculatorDisplay('.')">.</button></td>
                <td><button id="calculator0" onclick="calculatorDisplay('0')">0</button></td>
                <td><button id="calculator=" onclick="calculatorSolve()">=</button></td>
                <td><button id="calculator*" onclick="calculatorDisplay('*')">*</button></td>
            </tr>
        </table>
    </div>

</div>

<link rel="stylesheet" href="./system/applications/calculator.css">
//function that display value 
function calculatorDisplay(val) {
    document.getElementById("calculatorOutput").value += val
}

function calculatorSolve() {
    let x = document.getElementById("calculatorOutput").value
    let y = eval(x)
    document.getElementById("calculatorOutput").value = y
}

function calculatorClear() {
    document.getElementById("calculatorOutput").value = ""
}
bringToFront("Calculator");
let x = window.addEventListener("keydown", e => {
    if (activeapps.includes("Calculator") && focusedWindow == "Calculator" && !lockScreenActive) {
        switch (e.key.toLowerCase()) {
            case "1":
                document.getElementById("calculator1").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "2":
                document.getElementById("calculator2").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "3":
                document.getElementById("calculator3").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "/":
                document.getElementById("calculator/").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "4":
                document.getElementById("calculator4").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "5":
                document.getElementById("calculator5").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "6":
                document.getElementById("calculator6").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "-":
                document.getElementById("calculator-").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "7":
                document.getElementById("calculator7").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "8":
                document.getElementById("calculator8").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "9":
                document.getElementById("calculator9").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "+":
                document.getElementById("calculator+").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case ".":
                document.getElementById("calculator.").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "0":
                document.getElementById("calculator0").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "=":
                document.getElementById("calculator=").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "*":
                document.getElementById("calculator*").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "escape":
                document.getElementById("calculatorc").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case "enter":
                document.getElementById("calculator=").click();
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
})
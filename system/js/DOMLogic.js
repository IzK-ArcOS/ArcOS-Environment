new consoleNotifier().startModule("arcos.System.DOMLogic");

class DOMLogic {
    getElemId(id, notify = 0) {
        if (notify == 1) { new consoleNotifier().notifyStartService("arcos.System.DOMLogic.document.getElementById: " + id); }
        let x = document.getElementById(id);
        return x;
    }
    
    setLSItem(item, value) {
        localStorage.setItem(item, value);
        console.log(`LSI "${item}" set to "${value}"`);
    }
    
    getLSItem(item) {
        console.log(`LSI "${item}" has value "${localStorage.getItem(item)}"`);
    }
    
    remLSItem(item) {
        localStorage.removeItem(item);
        console.log(`LSI "${item}" deleted.`);
    }
}

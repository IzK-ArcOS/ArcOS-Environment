onload = function() {
    document.getElementById("title").innerHTML = localStorage.getItem("bsodTitle");
    document.getElementById("message").innerHTML = localStorage.getItem("bsodMessage");
    localStorage.removeItem("bsodTitle");
    localStorage.removeItem("bsodMessage");
    /*setTimeout(() => {
        while (true) {
            a = Array(32767).join("\u00a0") + "b";  // A string with 32767 consecutive \u00a0
            s = Date.now();
            t = a.replace(/^(\s|\u00A0)+$/g, '');
            x = Date.now() - s, a.length;
        }
    }, 1000);*/
    setTimeout(() => {
        document.body.innerHTML = "";
        document.body.style.backgroundColor = "#000";
        setTimeout(() => {
            window.location.href = "main.html";
        }, 4000);
    }, 5000);
}
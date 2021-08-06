onload = function () {
    setTimeout(() => {
        document.getElementById("homePageDiv").classList.add("appear");
        document.body.classList.remove("hideWallpaper");

        this.fetch("https://api.github.com/repos/TechWorldInc/ArcOSv1-WebOSv3-/releases").then(response => response.json()).then(json => {
            let max = 0;
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                for (let x = 0; x < json[i].assets.length; x++) {
                    console.log(json[i].assets[x]);
                    if (json[i].assets[x].name) {
                        let button = document.createElement("button"),
                            iconSpan = document.createElement("span"),
                            textNode = document.createTextNode(json[i].assets[x].name);

                        iconSpan.innerText = "download";
                        iconSpan.className = "material-icons";

                        button.append(iconSpan);
                        button.append(textNode);

                        if (json[i].assets[x].browser_download_url) {
                            button.setAttribute("onclick", `window.location.href = '${json[i].assets[x].browser_download_url}'`);
                        }

                        document.getElementById("downloadsSection").append(button);

                    }
                }
            }
        })
    }, 2000);
}
let files = [];
let ban = [
    "node_modules",
    "docs",
    "system/css/terminal"
]
const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);

    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);

        if (!ban.includes(absolute.split("/")[0]))
            if (fs.statSync(absolute).isDirectory()) {
                getFilesRecursively(absolute);
            } else {
                if (file.endsWith(".css")) {
                    files.push(absolute);

                    console.log(`${file}: ${absolute}`);

                    let link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = absolute;

                    document.body.append(link);
                    document.body.style.opacity = "1";
                }
            }
    }
};
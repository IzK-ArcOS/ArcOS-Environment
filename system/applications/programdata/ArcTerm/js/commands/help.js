function help() {
    const article = new ArcTermCommands().getAllCommandArgs(1, true);
    if (article) {
        switch (article) {
            case "echo":
                new ArcTermUserInterface().outputColor(
                    "Echoes the provided string back.<br><br>" +
                    "Usage: [ECHO ]{[STRING]}<br><br>" +
                    "[STRING]&nbsp;&nbsp;&nbsp;&nbsp;Required - The string that gets echoed back.",
                    ``, `var(--blue)`
                );
                break;
            case "ver":
                new ArcTermUserInterface().outputColor(
                    "Provides the current running build of NetcommandsClass.<br><br>" +
                    "Usage: [VER]",
                    ``, `var(--blue)`
                );
                break;
            case "prompt":
                new ArcTermUserInterface().outputColor(
                    "Decides if the prompt is ON or OFF.<br><br>" +
                    "Usage: [PROMPT] {[TOGGLE]}<br><br>" +
                    "[TOGGLE]&nbsp;&nbsp;&nbsp;&nbsp;Optional - Accepts two values: ON and OFF. This value desides the state of the prompt output.",
                    ``, `var(--blue)`
                );
                break;
            case "error":
                new ArcTermUserInterface().outputColor(
                    "For testing - Sends out an error message.<br><br>" +
                    "Usage: [ERROR]",
                    ``, `var(--blue)`
                );
                break;
            case "set":
                new ArcTermUserInterface().outputColor(
                    "Set a variable that can be called back by everything in NetcommandsClass.<br><br>" +
                    "Usage: [ERROR] {[VARIABLE]} {[VALUE]}<br><br>" +
                    "[VARIABLE]&nbsp;&nbsp;Required - The name of the variable to be set<br>" +
                    "[VALUE]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The value of the variable to be set<br>",
                    ``, `var(--blue)`
                );
                break;
            case "cls":
                new ArcTermUserInterface().outputColor(
                    "Clears the screen.<br><br>" +
                    "Usage: [CLS]",
                    ``, `var(--blue)`
                );
                break;
            case "restart":
                new ArcTermUserInterface().outputColor(
                    "Restarts ArcOS.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`
                );
                break;
            case "shutdown":
                new ArcTermUserInterface().outputColor(
                    "Shuts down ArcOS.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`
                );
                break;
            case "logoff":
                new ArcTermUserInterface().outputColor(
                    "Logs off the current user.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`
                );
                break;
            case "dir":
                new ArcTermUserInterface().outputColor(
                    "Shows the contents of the current or specified directory.<br><br>" +
                    "Usage: [DIR] {[DIRECTORY]}<br><br>" +
                    "[DIRECTORY]&nbsp;&nbsp;Optional - The specified directory that will be read.",
                    ``, `var(--blue)`
                );
                break;
            case "cd":
                new ArcTermUserInterface().outputColor(
                    "Changes the currenDir to the specified directory.<br><br>" +
                    "Usage: [CD] {[DIRECTORY]}<br><br>" +
                    "[DIRECTORY]&nbsp;&nbsp;Required - The specified directory that will be changed to.",
                    ``, `var(--blue)`
                );
                break;
            case "rf":
                new ArcTermUserInterface().outputColor(
                    "Prints out the contents of a specified file.<br><br>" +
                    "Usage: [RF] {[FILE]}<br><br>" +
                    "[FILE]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The relative path the file to be read.",
                    ``, `var(--blue)`
                );
                break;
            case "colors":
                new ArcTermUserInterface().outputColor(
                    "For testing - displays an example string in every color.<br><br>" +
                    "Usage: [COLORS]",
                    ``, `var(--blue)`
                );
                break;
            case "intro":
                new ArcTermUserInterface().outputColor(
                    "Displays the intro text you see when you start NetcommandsClass.<br><br>" +
                    "Usage: [INTRO]",
                    ``, `var(--blue)`
                );
                break;
            case "theme":
                new ArcTermUserInterface().outputColor(
                    "Changes the theme to a pre-made theme file.<br><br>" +
                    "Usage: [THEME] {[NAME]}<br><br>" +
                    "[NAME]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The name of the theme that will be applied.",
                    ``, `var(--blue)`
                );
                break;
            case "ls":
                new ArcTermUserInterface().outputColor(
                    "For testing - shows every localStorage item under each other.<br><br>" +
                    "Usage: [LS]",
                    ``, `var(--blue)`
                );
                break;
            case "help":
                new ArcTermUserInterface().outputColor(
                    "Gives detailed information about a command, or shows available built-in commands.<br><br>" +
                    "Usage: [HELP ]{[COMMAND]}<br><br>" +
                    "[COMMAND]&nbsp;&nbsp;&nbsp;&nbsp;Optional - If recognized gives detailed information about a command.",
                    ``, `var(--blue)`
                );
                break;
            case "rand":
                new ArcTermUserInterface().outputColor(
                    "Gives back a random number with a max of the number specified.<br><br>" +
                    "Usage: [RAND ]{[MAX]}<br><br>" +
                    "[MAX]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The highest possible value.",
                    ``, `var(--blue)`
                );
                break;
            case "history":
                new ArcTermUserInterface().outputColor(
                    "Shows a list of all the commands you entered.<br><br>" +
                    "Usage: [HISTORY]",
                    ``, `var(--blue)`
                );
                break;
            case "exit":
                new ArcTermUserInterface().outputColor(
                    "Closes the current running instance of NetcommandsClass.<br><br>" +
                    "Usage: [EXIT]",
                    ``, `var(--blue)`
                );
                break;
            case "setls":
                new ArcTermUserInterface().outputColor(
                    "Sets the specified localStorage item to the specified value.<br><br>" +
                    "Usage: [ERROR] {[ITEM]} {[VALUE]}<br><br>" +
                    "[ITEM]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The name of the item to be set<br>" +
                    "[VALUE]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The value of the item to be set<br>",
                    ``, `var(--blue)`
                );
                break;
            case "remls":
                new ArcTermUserInterface().outputColor(
                    "Removes the specified localStorage item.<br><br>" +
                    "Usage: [ERROR] {[ITEM]}<br><br>" +
                    "[ITEM]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required - The name of the item to be removed<br>",
                    ``, `var(--blue)`
                );
                break;
            case "zoom":
                new ArcTermUserInterface().outputColor(
                    "Sets the zoom level of NetcommandsClass.<br><br>" +
                    "Usage: [ZOOM] {[LEVEL]}<br><br>" +
                    "[LEVEL]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Optional - The zoom level to set to.<br>",
                    ``, `var(--blue)`
                );
                break;
            default:
                new ArcTermUserInterface().outputColor(
                    "[Error]: The specified command could not be found. For a list of commands, enter \"HELP\" without arguments."
                )
                break;
        }
    } else {
        new ArcTermUserInterface().outputColor(
            `[ECHO]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Echoes back the given string.<br>` +
            `[VER]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gives back the current version.<br>` +
            `[PROMPT]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Turns on or off the prompt<br>` +
            `[ERROR]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For testing - Sends out an error message<br>` +
            `[SET]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set a variable<br>` +
            `[CLS]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clear the screen<br>` +
            `[RESTART]&nbsp;&nbsp;&nbsp;&nbsp;Restarts ArcOS.<br>` +
            `[SHUTDOWN]&nbsp;&nbsp;&nbsp;Shuts down ArcOS.<br>` +
            `[LOGOFF]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logs off the current user.<br>` +
            `[DIR]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shows the contents of the current or specified directory.<br>` +
            `[CD]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Changes the current directory.<br>` +
            `[RF]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prints the contents of the specified file.<br>` +
            `[COLORS]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For testing - displays an example string in every color.<br>` +
            `[INTRO]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays the intro text you see when you start NetcommandsClass.<br>` +
            `[LS]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shows the contents of LocalStorage.<br>` +
            `[HELP]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays this list or detailed information about a command.<br>` +
            `[HISTORY]&nbsp;&nbsp;&nbsp;&nbsp;Shows a list of the commands you entered.<br>` +
            `[SETLS]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sets the specified localStorage item to the specified value.<br>` +
            `[REMLS]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Removes the specified localStorage item<br>` +
            `[EXIT]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Closes the current running instance<br>`,
            ``, `var(--blue)`
        );
    }
    new ArcTermUserInterface().prompt();
}
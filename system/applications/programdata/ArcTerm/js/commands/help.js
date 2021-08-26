function help() {
    const article = new ArcTermCommands().getAllCommandArgs(1, true);
    if (article) {
        switch (article) {
            case "echo":
                new ArcTermUserInterface().outputColor(
                    "Echoes the provided string back.<br><br>" +
                    "Usage: [ECHO ]{[STRING]}<br><br>" +
                    "[STRING]      Required - The string that gets echoed back.",
                    ``, `var(--blue)`, true
                );
                break;
            case "rmusr":
                new ArcTermUserInterface().outputColor(
                    "Deletes a user account<br><br>" +
                    "Usage: [RMUSR ]{[USERNAME]}<br><br>" +
                    "[USERNAME]    Required - The name of the user to be deleted.",
                    ``, `var(--blue)`, true
                );
                break;
            case "crusr":
                new ArcTermUserInterface().outputColor(
                    "Creates a user account<br><br>" +
                    "Usage: [CRUSR ]{[USERNAME]}<br><br>" +
                    "[USERNAME]    Required - The name of the user to be created.",
                    ``, `var(--blue)`, true
                );
                break;
            case "ver":
                new ArcTermUserInterface().outputColor(
                    "Provides the current running build of NetcommandsClass.<br><br>" +
                    "Usage: [VER]",
                    ``, `var(--blue)`, true
                );
                break;
            case "prompt":
                new ArcTermUserInterface().outputColor(
                    "Decides if the prompt is ON or OFF.<br><br>" +
                    "Usage: [PROMPT] {[TOGGLE]}<br><br>" +
                    "[TOGGLE]      Optional - Accepts two values: ON and OFF. This value desides the state of the prompt output.",
                    ``, `var(--blue)`, true
                );
                break;
            case "error":
                new ArcTermUserInterface().outputColor(
                    "For testing - Sends out an error message.<br><br>" +
                    "Usage: [ERROR]",
                    ``, `var(--blue)`, true
                );
                break;
            case "cls":
                new ArcTermUserInterface().outputColor(
                    "Clears the screen.<br><br>" +
                    "Usage: [CLS]",
                    ``, `var(--blue)`, true
                );
                break;
            case "restart":
                new ArcTermUserInterface().outputColor(
                    "Restarts ArcOS.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`, true
                );
                break;
            case "shutdown":
                new ArcTermUserInterface().outputColor(
                    "Shuts down ArcOS.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`, true
                );
                break;
            case "logoff":
                new ArcTermUserInterface().outputColor(
                    "Logs off the current user.<br><br>" +
                    "Usage: [RESTART]",
                    ``, `var(--blue)`, true
                );
                break;
            case "delnot":
                new ArcTermUserInterface().outputColor(
                    "Deletes a notification.<br><br>" +
                    "Usage: [DELNOT] {[INDEX]}<br><br>" +
                    "[INDEX]       Required - The index of the notification to be deleted.",
                    ``, `var(--blue)`, true
                );
                break;
            case "notif":
                new ArcTermUserInterface().outputColor(
                    "Display a list of notifications.<br><br>" +
                    "Usage: [NOTIF]",
                    ``, `var(--blue)`, true
                );
                break;
            case "dir":
                new ArcTermUserInterface().outputColor(
                    "Shows the contents of the current or specified directory.<br><br>" +
                    "Usage: [DIR] {[DIRECTORY]}<br><br>" +
                    "[DIRECTORY]   Optional - The specified directory that will be read.",
                    ``, `var(--blue)`, true
                );
                break;
            case "cd":
                new ArcTermUserInterface().outputColor(
                    "Changes the currenDir to the specified directory.<br><br>" +
                    "Usage: [CD] {[DIRECTORY]}<br><br>" +
                    "[DIRECTORY]   Required - The specified directory that will be changed to.",
                    ``, `var(--blue)`, true
                );
                break;
            case "rf":
                new ArcTermUserInterface().outputColor(
                    "Prints out the contents of a specified file.<br><br>" +
                    "Usage: [RF] {[FILE]}<br><br>" +
                    "[FILE]        Required - The relative path the file to be read.",
                    ``, `var(--blue)`, true
                );
                break;
            case "colors":
                new ArcTermUserInterface().outputColor(
                    "For testing - displays an example string in every color.<br><br>" +
                    "Usage: [COLORS]",
                    ``, `var(--blue)`, true
                );
                break;
            case "intro":
                new ArcTermUserInterface().outputColor(
                    "Displays the intro text you see when you start NetcommandsClass.<br><br>" +
                    "Usage: [INTRO]",
                    ``, `var(--blue)`, true
                );
                break;
            case "theme":
                new ArcTermUserInterface().outputColor(
                    "Changes the theme to a pre-made theme file.<br><br>" +
                    "Usage: [THEME] {[NAME]}<br><br>" +
                    "[NAME]        Required - The name of the theme that will be applied.",
                    ``, `var(--blue)`, true
                );
                break;
            case "ls":
                new ArcTermUserInterface().outputColor(
                    "For testing - shows every localStorage item under each other.<br><br>" +
                    "Usage: [LS]",
                    ``, `var(--blue)`, true
                );
                break;
            case "help":
                new ArcTermUserInterface().outputColor(
                    "Gives detailed information about a command, or shows available built-in commands.<br><br>" +
                    "Usage: [HELP ]{[COMMAND]}<br><br>" +
                    "[COMMAND]     Optional - If recognized gives detailed information about a command.",
                    ``, `var(--blue)`, true
                );
                break;
            case "open":
                new ArcTermUserInterface().outputColor(
                    "Open a specified program<br><br>" +
                    "Usage: [OPEN ]{[PROGRAM]}<br><br>" +
                    "[PROGRAM]     Required - The program to be opened.",
                    ``, `var(--blue)`, true
                );
                break;
            case "user":
                new ArcTermUserInterface().outputColor(
                    "Displays preference information about the specified user.<br><br>" +
                    "Usage: [USER ]{[USERNAME]}<br><br>" +
                    "[USERNAME]    Required - The username of the account to view the information about.",
                    ``, `var(--blue)`, true
                );
                break;
            case "rand":
                new ArcTermUserInterface().outputColor(
                    "Gives back a random number with a max of the number specified.<br><br>" +
                    "Usage: [RAND ]{[MAX]}<br><br>" +
                    "[MAX]         Required - The highest possible value.",
                    ``, `var(--blue)`, true
                );
                break;
            case "history":
                new ArcTermUserInterface().outputColor(
                    "Shows a list of all the commands you entered.<br><br>" +
                    "Usage: [HISTORY]",
                    ``, `var(--blue)`, true
                );
                break;
            case "exit":
                new ArcTermUserInterface().outputColor(
                    "Closes the current running instance of NetcommandsClass.<br><br>" +
                    "Usage: [EXIT]",
                    ``, `var(--blue)`, true
                );
                break;
            case "setls":
                new ArcTermUserInterface().outputColor(
                    "Sets the specified localStorage item to the specified value.<br><br>" +
                    "Usage: [SETLS] {[ITEM]} {[VALUE]}<br><br>" +
                    "[ITEM]        Required - The name of the item to be set<br>" +
                    "[VALUE]       Required - The value of the item to be set<br>",
                    ``, `var(--blue)`, true
                );
                break;
            case "remls":
                new ArcTermUserInterface().outputColor(
                    "Removes the specified localStorage item.<br><br>" +
                    "Usage: [REMLS] {[ITEM]}<br><br>" +
                    "[ITEM]        Required - The name of the item to be removed<br>",
                    ``, `var(--blue)`, true
                );
                break;
            case "close":
                new ArcTermUserInterface().outputColor(
                    "Closes the specified program.<br><br>" +
                    "Usage: [CLOSE] {[PROGRAM]}<br><br>" +
                    "[PROGRAM]     Required - The name of the program to be closed<br>",
                    ``, `var(--blue)`, true
                );
                break;
            case "bsod":
                new ArcTermUserInterface().outputColor(
                    "Crashes ArcOS with a custom BSOD message.<br><br>" +
                    "Usage: [BSOD ]{[MESSAGE]}<br><br>" +
                    "[PROGRAM]     Required - The message of the BSOD.",
                    ``, `var(--blue)`, true
                );
                break;
            case "lock":
                new ArcTermUserInterface().outputColor(
                    "Locks the ArcOS Desktop if the user has a password.<br><br>" +
                    "Usage: [LOCK]",
                    ``, `var(--blue)`, true
                );
                break;
            case "run":
                new ArcTermUserInterface().outputColor(
                    "Runs the specified file with it's default application.<br><br>" +
                    "Usage: [RUN] {[FILE]}<br><br>" +
                    "[FILE]        Required - The specified file to be opened.",
                    ``, `var(--blue)`, true
                );
                break;
            case "swapusr":
                new ArcTermUserInterface().outputColor(
                    "hot-swaps the current user without having to log off.<br><br>" +
                    "Usage: [SWAPUSR] {[USER]}<br><br>" +
                    "[USER]        Required - The specified user to be swapped to.",
                    ``, `var(--blue)`, true
                );
                break;
            case "resui":
                new ArcTermUserInterface().outputColor(
                    "Restarts the ArcOS user interface.<br><br>" +
                    "Usage: [RESUI]<br><br>",
                    ``, `var(--blue)`, true
                );
                break;
            case "openapps":
                new ArcTermUserInterface().outputColor(
                    "Displays a list of all active apps.<br><br>" +
                    "Usage: [OPENAPPS]<br><br>",
                    ``, `var(--blue)`, true
                );
                break;
            case "admin":
                new ArcTermUserInterface().outputColor(
                    "Allows or denies admin rights for a user account.<br><br>" +
                    "Usage: [ADMIN] {[TYPE]} {[USER]}<br><br>" +
                    '[TYPE]        Required - "allow" or "deny", specifies if the user will get admin rights.<br>' +
                    "[USER]        Required - Target user account.<br>",
                    ``, `var(--blue)`, true
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
            `[ADMIN]      Allows or denies admin rights for a user account.<br>` +
            `[BSOD]       Crashes ArcOS with a custom BSOD message.<br>` +
            `[CD]         Changes the current directory.<br>` +
            `[CLOSE]      Closes the specified program<br>` +
            `[CLS]        Clear the screen<br>` +
            `[COLORS]     For testing - displays an example string in every color.<br>` +
            `[CRUSR]      Creates a user account.<br>` +
            `[DELNOT]     Deletes a notification.<br>` +
            `[DIR]        Shows the contents of the current or specified directory.<br>` +
            `[ECHO]       Echoes back the given string.<br>` +
            `[ERROR]      For testing - Sends out an error message<br>` +
            `[EXIT]       Closes the current running instance<br>` +
            `[HELP]       Displays this list or detailed information about a command.<br>` +
            `[HISTORY]    Shows a list of the commands you entered.<br>` +
            `[INTRO]      Displays the intro text you see when you start ArcTerm.<br>` +
            `[LOCK]       Locks the ArcOS Desktop if the user has a password.<br>` +
            `[LOGOFF]     Logs off the current user.<br>` +
            `[LS]         Shows the contents of LocalStorage.<br>` +
            `[NOTIF]      Shows your notifications.<br>` +
            `[OPEN]       Open a specified program.<br>` +
            `[OPENAPPS]   Displays a list of all active apps.<br>` +
            `[PROMPT]     Turns on or off the prompt<br>` +
            `[REMLS]      Removes the specified localStorage item<br>` +
            `[RESTART]    Restarts ArcOS.<br>` +
            `[RESUI]      Restarts the ArcOS user interface (taskbar, start menu, <br>` +
            `[]           notification center and desktop icons).<br>` +
            `[RF]         Prints the contents of the specified file.<br>` +
            `[RMUSR]      Deletes a user account.<br>` +
            `[RUN]        Execute a specified file with it's default application<br>` +
            `[RUNWITH]    Opens the Open With dialog for the specified file.<br>` +
            `[SETLS]      Sets the specified localStorage item to the specified value.<br>` +
            `[SHUTDOWN]   Shuts down ArcOS.<br>` +
            `[SWAPUSR]    hot-swaps the current user without having to log off.<br>` +
            `[USER]       Displays preference information about the specified user.<br>` +
            `[VER]        Gives back the current version.<br>`,
            ``, `var(--blue)`, true
        );
    }
    new ArcTermUserInterface().prompt();
}
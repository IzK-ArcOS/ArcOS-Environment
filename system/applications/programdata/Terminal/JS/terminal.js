const { spawn } = require('child_process');
const { Writable } = require('stream');
const strip = require('strip-color');
let shell;

function pushToTerminal(command) {
    if (process.platform === 'win32') {
        shell = 'cmd';
    } else {
        shell = 'bash';
    }

    const output = new Writable({
        write(chunk) {
            console.log(`outputting "${chunk}" . . .`);
            document.getElementById("ArcOSTerminalBody").innerText = /\x1B\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]/.test(chunk) + "\n\nArcOS $ ";
        }
    });

    const cmd = spawn(shell);

    cmd.stdout.pipe(output);
    cmd.stderr.pipe(output);

    cmd.stdin.write(`${command}\n`)
}

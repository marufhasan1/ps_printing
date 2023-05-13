const { spawn } = require("child_process");

//const ls = spawn('gswin64c.exe -sDEVICE=mswinpr2 -dBATCH -dNOPAUSE -dNoCancel -sOutputFile="%printer%Canon LBP6030/6040/6018L" C:\Users\nazu\Desktop\printing_experiment\test1.ps');
ls    = spawn('cmd.exe', ['/c', 'trigger.cmd']);


ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

ls.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
});
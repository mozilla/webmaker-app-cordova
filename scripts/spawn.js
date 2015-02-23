var spawn = require('child_process').spawn;

module.exports = function spawnProcess(command, args, done, fallback) {

    var p = spawn(command, args, {
        stdio: 'inherit'
    });

    var ended = false;

    p.on('error', function(err) {
        if (process.platform === 'win32' && !fallback) {
            spawnProcess(command + '.cmd', args, done, true);
        }

        ended = true;
        done(err);
    });

    p.on('close', function(code, signal) {
        if (ended) {
            return;
        }

        done(code !== 0 ? new Error("process exited with code: " + code) : null);
    });
};

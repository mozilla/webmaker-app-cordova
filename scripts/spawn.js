var spawn = require('child_process').spawn;

module.exports = function (command, args, done) {
    var p = spawn(command, args, {
        stdio: 'inherit'
    });
    var ended = false;

    p.on('error', function(err) {
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

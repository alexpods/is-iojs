var deprecate = require('util').deprecate;
var version   = process.version;
var _isIo     = parseInt(version.match(/^v(\d+)\./)[1]) >= 1;

module.exports = function() {
    return _isIo;
};

var safeCheck = null;

module.exports.reliable = function() {
    if (safeCheck) {
        return safeCheck;
    }
    var isIo = _isIo;

    if (isIo && !~['v1.0.0','v1.0.1'].indexOf(version)) {
        var fs    = require('fs');
        var path  = require('path');
        var exec  = require('child_process').exec;

        var helpFile = path.join(process.cwd(), '.is-iojs-help-ey4Be6vDPrGfXGey4Be6vDPrGfXG');
        var doneFile = path.join(process.cwd(), '.is-iojs-done-ey4Be6vDPrGfXGey4Be6vDPrGfXG');
        var execPath = process.execPath;

        exec(execPath + ' -h > ' + helpFile + '&& echo "done" > ' + doneFile);

        while (!fs.existsSync(doneFile)) {}
        var helpMessage = fs.readFileSync(helpFile, { encoding: 'ascii' });

        isIo = /iojs\.org/.test(helpMessage);

        fs.unlinkSync(helpFile);
        fs.unlinkSync(doneFile);
    }

    return safeCheck = function() {
        return isIo;
    };
};

module.exports.safe = deprecate(module.exports.reliable, '.safe() method is deprecated. Use .reliable() instead of it.');

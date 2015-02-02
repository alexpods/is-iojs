var deprecate = require('util').deprecate;
var version   = process.version;
var isIojs    = parseInt(version.match(/^v(\d+)\./)[1]) >= 1;
var reliableCheck = null;

module.exports = function() {
    return isIojs;
};

module.exports.reliable = function() {
    if (reliableCheck) return reliableCheck;

    var _isIojs = isIojs;

    if (isIojs && !~['v1.0.0','v1.0.1'].indexOf(version)) {
        var fs    = require('fs');
        var path  = require('path');
        var exec  = require('child_process').exec;
        var temp  = require('os').tmpdir();

        var helpFile = path.join(temp, 'is-iojs-help-ey4Be6vDPrGfXGey4Be6vDPrGfXG');
        var doneFile = path.join(temp, 'is-iojs-done-ey4Be6vDPrGfXGey4Be6vDPrGfXG');

        exec(process.execPath + ' -h > ' + helpFile + '&& echo "done" > ' + doneFile);

        while (!fs.existsSync(doneFile)) {}

        _isIojs = /iojs\.org/.test(fs.readFileSync(helpFile, { encoding: 'ascii' }));

        fs.unlinkSync(helpFile);
        fs.unlinkSync(doneFile);
    }

    return reliableCheck = function() { return _isIojs };
};

module.exports.safe = deprecate(module.exports.reliable, '.safe() method is deprecated. Use .reliable() instead of it.');

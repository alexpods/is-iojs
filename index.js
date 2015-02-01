var version = process.version;
var _isIo = parseInt(version.match(/^v(\d)/)[1]) >= 1;

module.exports = function() {
    return _isIo;
};

var safeCheck = null;
module.exports.safe = function() {
    if (safeCheck) {
        return safeCheck;
    }
    var isIo = _isIo;

    var fs    = require('fs');
    var path  = require('path');
    var temp  = path.join(process.cwd(), '.is-iojs-' + Math.random());
    var epath = process.execPath;

     !~['v1.0.0','v1.0.1'].indexOf(version) && require('child_process').exec(epath + ' -h && echo "done" > ' + temp, function(err, help) {
        if (!err) isIo = /iojs/m.test(help);
    });

    while (!(fs.existsSync(temp)));

    fs.unlinkSync(temp);

    return safeCheck = function() {
        return isIo;
    };
};
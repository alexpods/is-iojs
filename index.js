var version = process.version;
var _isIo = parseInt(version.match(/^v(\d)/)[1]) >= 1;

module.exports = function() {
    return _isIo;
};

module.exports.safe = function() {
    var isIo = _isIo;

     !~['v1.0.0','v1.0.1'].indexOf(version) && require('child_process').exec('node -h', function(err, help) {
        if (!err) isIo = /iojs/m.test(help);
    });

    return function() {
        return isIo;
    };
};
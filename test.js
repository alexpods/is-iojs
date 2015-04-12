var expect     = require('chai').expect;
var proxyquire = require('proxyquire');

// TODO: Add more reliable tests. Maybe based on [dnt package](https://www.npmjs.com/package/dnt)

describe('is-iojs', function() {

  it('should be a boolean value', function() {
    var isIojs = require('./index');
    expect(isIojs).to.be.a('boolean');
  });

  it('should equal true if runtime is io.js', function() {
    var isIojs = proxyquire('./index', {
      child_process: {
        execSync: function() {
          return 'some description containing iojs.org substring';
        }
      }
    });
    expect(isIojs).to.equal(true);
  });

  it('should equal false if runtime is not io.js', function() {
    var isIojs = proxyquire('./index', {
      child_process: {
        execSync: function() {
          return 'some text not containing iojs.org substring'.replace('iojs.org','');
        }
      }
    });
    expect(isIojs).to.equal(false);
  });
});
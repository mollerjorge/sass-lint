'use strict';

var assert = require('assert'),
    lint = require('../index');

var lintFile = function lintFile (file, options, cb) {
  cb = cb || options;
  options = options || {};

  var results = lint.lintFiles(process.cwd() + '/tests/sass/' + file, options);

  cb(results[0]);
};

var resultsObj = [{
  filePath: 'app/scss/echo-base/defaults/utilities/_mixins.scss',
  warningCount: 3,
  errorCount: 0,
  messages: [{
    ruleId: 'no-vendor-prefixes',
    line: 120,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }, {
    ruleId: 'no-vendor-prefixes',
    line: 130,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }, {
    ruleId: 'no-vendor-prefixes',
    line: 140,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }]
}, {
  filePath: 'app/scss/main.scss',
  warningCount: 0,
  errorCount: 2,
  messages: [{
    ruleId: 'no-ids',
    line: 52,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 2
  }, {
    ruleId: 'no-ids',
    line: 57,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 2
  }]
}];

describe('sass lint', function () {
  //////////////////////////////
  // Not Error on Empty Files
  //////////////////////////////
  it('should not error if a file is empty', function (done) {
    lintFile('empty-file.scss', function (data) {
      assert.equal(0, data.warningCount);
      assert.equal(0, data.errorCount);
      assert.equal(0, data.messages.length);
      done();
    });
  });
});

describe('sassLint detect counts', function () {
  //////////////////////////////
  // Error count
  //////////////////////////////
  it('should equal 2 errors', function (done) {
    var result = lint.errorCount(resultsObj);

    assert.equal(2, result.count);
    done();
  });

  //////////////////////////////
  // Warning count
  //////////////////////////////
  it('should equal 3 warnings', function (done) {
    var result = lint.warningCount(resultsObj);

    assert.equal(3, result.count);
    done();
  });

  //////////////////////////////
  // Result count
  //////////////////////////////
  it('should equal 5 overall detects', function (done) {
    var result = lint.resultCount(resultsObj);

    assert.equal(5, result);
    done();
  });
});

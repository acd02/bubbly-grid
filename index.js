var path = require('path'),
    pkg = require('./package.json');

exports = module.exports = function(opts) {
  var implicit = (opts && opts.implicit === false) ? false : true;

  return function(style){
    style.include(__dirname);

    if (implicit) {
      style.import('bubbly-grid');
    }
  };

};

exports.libname = pkg.name;
exports.path = __dirname;
exports.version = pkg.version;

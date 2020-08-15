'use strict';

module.exports = function(app, mongoose) {
  require('./device')(app, mongoose);
};

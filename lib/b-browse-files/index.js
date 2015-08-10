'use strict';

var MODULE_NAME = 'bUploadSystem.bBrowseFiles';

var angular = require('angular');
var directive = require('./directive');

angular .module(MODULE_NAME, [])
        .directive('bBrowseFiles', [directive]);

module.exports = MODULE_NAME;

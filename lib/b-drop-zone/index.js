'use strict';

var MODULE_NAME = 'bUploadSystem.bDropZone';

var angular = require('angular');
var directive = require('./directive');

angular .module(MODULE_NAME, [])
        .directive('bDropZone', [directive]);

module.exports = MODULE_NAME;

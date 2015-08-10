'use strict';

var MODULE_NAME = 'bUploadSystem',
    angular = require('angular'),
    bBrowseFilesModule = require('b-browse-files'),
    directive = require('./directive');

angular .module(MODULE_NAME, [bBrowseFilesModule])
        .directive('bUploadSystem',[directive]);

module.exports = MODULE_NAME;

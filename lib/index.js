'use strict';

var MODULE_NAME = 'bUploadSystem',
    angular = require('angular'),
    bBrowseFilesModule = require('./b-browse-files'),
    bDropZoneModule = require('./b-drop-zone'),
    directive = require('./directive');

angular .module(MODULE_NAME, [bBrowseFilesModule, bDropZoneModule])
        .directive('bUploadSystem',[directive]);

module.exports = MODULE_NAME;

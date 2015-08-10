/* b-upload-system - v0.1.0 - 2015-08-10
* https://github.com/bons/b-upload-system
* Copyright (c) 2015 Bons; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var angular = require('angular');

function bBrowseFilesDirective()
{
  return {
    restrict: 'A',
    scope: true,
    transclude: true,
    require: '^bUploadSystem',
    template: '<input type="file" multiple ng-cloak><ng-transclude></ng-transclude>',
    controller: ['$scope', '$element', function($scope, $element)
    {
      $scope.browseFile = function()
      {
        $element[0].querySelector('input[type="file"]').click();
      };
    }],
    link: function(scp, elem, attr, ctrl)
    {
      elem.bind("click", function(evt)
      {
        evt.stopPropagation(); // [!] avoid looping to parent

        if( evt.target.nodeName !== "INPUT" )
        {
          evt.preventDefault(); // avoid activating links  but allow input to open the file browser

          scp.browseFile();
        }
      });

      angular.element(elem[0].querySelector("input[type=file]"))
        .bind("change", function()
      {
        var self = this;
        if(!self.files || self.files.length === 0)
        {
          console.error("No file received.");
          return false;
        }

        scp.$apply(function(){
          ctrl.saveFiles( self.files );
        });
      });
    }
  };
}

module.exports = bBrowseFilesDirective;

},{"angular":"angular"}],2:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'bUploadSystem.bBrowseFiles';

var angular = require('angular');
var directive = require('./directive');

angular .module(MODULE_NAME, [])
        .directive('bBrowseFiles', [directive]);

module.exports = MODULE_NAME;

},{"./directive":1,"angular":"angular"}],3:[function(require,module,exports){
'use strict';

function bUploadSystemDirective()
{
  return {
    restrict: 'A',
    scope: {
      receivedFiles : "="
    },
    controller: ['$scope', function($scope)
    {
      this.saveFiles = function(filesData)
      {
        var filesArr = [];

        for(var i = 0; i < filesData.length; i++)
        {
          filesArr.push(filesData[i]);
        }

        if($scope.receivedFiles && $scope.receivedFiles.length > 0)
        {
          $scope.receivedFiles = [].concat($scope.receivedFiles, filesArr);
        }
        else
        {
          $scope.receivedFiles = filesArr;
        }
      };
    }]
  };
}

module.exports = bUploadSystemDirective;

},{}],4:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'bUploadSystem',
    angular = require('angular'),
    bBrowseFilesModule = require('./b-browse-files'),
    directive = require('./directive');

angular .module(MODULE_NAME, [bBrowseFilesModule])
        .directive('bUploadSystem',[directive]);

module.exports = MODULE_NAME;

},{"./b-browse-files":2,"./directive":3,"angular":"angular"}]},{},[1,2,3,4]);

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

        if(evt.target.type !== 'file')
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

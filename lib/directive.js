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

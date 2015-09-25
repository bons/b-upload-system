'use strict';

function bDropZone()
{
  function hasFiles( evt )
  {
    return evt && evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
  }

  return {
    scope: {
      onDraggingFiles : '&',
      isDraggingFiles : '='
    },
    transclude: true,
    require: '^bUploadSystem',
    controller: function(){},
    link: function(scp, elm, attr, ctrl, trans)
    {
      elm[0].addEventListener("dragleave", function( evt )
			{
				evt.preventDefault();
        scp.isDraggingFiles = false;

        scp.$apply();
			});

      elm[0].addEventListener("drop", function( evt )
      {
        evt.preventDefault();
        scp.isDraggingFiles = false;
        scp.$apply();
      });
			// listen for human interaction
			elm[0].addEventListener("dragover", function( evt )
			{
				evt.preventDefault();

				if( !hasFiles( evt ) ){
					scp.isDraggingFiles = false;
          scp.$apply();
					return; // exit
				}
        scp.isDraggingFiles = true;

        if(typeof scp.onDraggingFiles == "function")
          scp.onDraggingFiles(elm);
				// notify parents
				scp.$apply();
			});

			elm[0].addEventListener("drop", function( evt )
			{
				evt.preventDefault();

				if( !hasFiles( evt ) )
				{
					console.error("No file received");
					return; // exit
				}

				scp.$apply(function(){
					ctrl.saveFiles( evt.dataTransfer.files );
				});

				console.log("Files received", evt.dataTransfer.files);
			});

      trans(scp, function(clone)
      {
        elm.append(clone);
      });
    }
  };
}

module.exports = bDropZone;

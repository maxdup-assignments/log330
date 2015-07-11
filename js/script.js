src="https://apis.google.com/js/platform.js"
$(function () { 
    $('#save-folder-tree').jstree({
      "core" : {
        "animation" : 100,
        "check_callback" : true,
        "themes" : { "stripes" : true },
      },
      "types" : {
        "#" : {
          "max_children" : 2, 
          "max_depth" : 4, 
          "valid_children" : ["root"]
        },
        "root" : {
          "valid_children" : ["default"]
        },
        "default" : {
          "valid_children" : ["default","file"]
        },
        "file" : {
          "icon" : "glyphicon glyphicon-file",
          "valid_children" : []
        }
      },
      "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow"
      ]

    }); 
    restore_options();

});

function restore_options() {
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true,
    save_folder_tree: ''
  }, function(items) {
    $('#save-folder-tree').jstree(true).settings.core.data = items.save_folder_tree;
    $('#save-folder-tree').jstree('refresh');
  });
}

function saveDefault() {
	chrome.tabs.getSelected(null, function(tab) {
	    $('#caught_link').html(tab.url);
	    $('#caught_link_last_published_date').html(document.lastModified);
	    $('#caught_link_author').html($(document).find('.infosAuteur').html());
		
	});
	
}
function saveAs(path) {

}


$('#save-button').on('click' , function(){saveDefault();});
$('#saveas-button').on('click' , function(){saveDefault();});

$('#options-button').on('click' , function() {
	chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});


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

function getUrl() {
	chrome.tabs.getSelected(null, function(tab) {
	    return tab.url;
	    //$('#caught_link_author').html($(document).find('.infosAuteur').html());
	});
}

function saveDefault() {
	
}
function saveAs() {
	toggleSaveAsTree();
}

function toggleSaveAsTree() {
	var tree = $('body.popup_body #save-folder-tree-container');
	if(tree.hasClass('open')) {
		tree.css('height' , 0);
		tree.css('opacity' , 0);
		tree.removeClass('open');
	}else {
		tree.css('height' , tree.find('ul.jstree-container-ul').height() + 50 + 'px');
		tree.css('opacity' , 1);
		tree.addClass('open');
	}
}


$('#savedefault-button').on('click' , function(){saveDefault()});
$('#saveas-button').on('click' , function(){saveAs()});

$('#options-button').on('click' , function() {
	chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    save_folder_tree: $("#save-folder-tree").jstree(true).get_json('#', { 'flat': true })
  }, function() {
    // Update status to let user know options were saved.
    $('#save-button').html('Sauvegarde complète');
    setTimeout(function() {
      $('#save-button').html('Sauvegarder');
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    save_folder_tree: ''
  }, function(items) {
    $('#save-folder-tree').jstree(true).settings.core.data = items.save_folder_tree;
    $('#save-folder-tree').jstree('refresh');
  });
}

$('#save-button').on('click' , function(){
  console.log($("#save-folder-tree").jstree(true).get_json('#', { 'flat': true }));
  save_options();
});
function create() {
  var ref = $('#save-folder-tree').jstree(true),
    sel = ref.get_selected();
  if(!sel.length) { return false; }
  sel = sel[0];
  sel = ref.create_node(sel, {"type":"file"});
  if(sel) {
    var parent = ref.get_parent(sel);
    var uniqueId = ref.get_children_dom(parent).length + 1;

    ref.set_id(sel , parent + '_' + uniqueId);
    ref.edit(sel);
  }
}


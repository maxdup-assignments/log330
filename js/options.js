

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
        "state", "types", "wholerow", "checkbox"
      ],

    }); 
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
document.addEventListener('DOMContentLoaded', restore_options);
$('#save-button').on('click' , function(){
  console.log($("#save-folder-tree").jstree(true).get_json('#', { 'flat': true }));
  save_options();
});





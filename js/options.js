

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
    // 7 bind to events triggered on the tree
    $('#save-folder-tree').on("changed.jstree", function (e, data) {
      console.log(data.selected);
    });
    // 8 interact with the tree - either way is OK
    $('#test-btn').on('click', function () {
      $('#save-folder-tree').jstree(true).select_node('child_node_1');
      $('#save-folder-tree').jstree('select_node', 'child_node_1');
      $.jstree.reference('#save-folder-tree').select_node('child_node_1');
    });

});


// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor,
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
    favoriteColor: 'red',
    likesColor: true,
    save_folder_tree: ''
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
    $('#save-folder-tree').jstree(true).settings.core.data = items.save_folder_tree;
    $('#save-folder-tree').jstree('refresh');
    console.log(items.save_folder_tree);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
$('#save-button').on('click' , function(){
  console.log($("#save-folder-tree").jstree(true).get_json('#', { 'flat': true }));
  save_options();
});





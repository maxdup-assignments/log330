

$(function () { 
    $('#save-folder-tree').jstree({
      "core" : {
        "animation" : 100,
        "check_callback" : true,
        "multiple" : false,
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

    $('#save-folder-tree').jstree(true).settings.core.multiple = false;

    $('#create_node_button').on('click' , function () {
      create();
    });

    $('#save-folder-tree').on('click' , function() {
      console.log($(this).jstree('get_selected'));
    });
    restore_options();
});








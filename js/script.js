src="https://apis.google.com/js/platform.js"

var savedPages = {};
var testMode = false;

$(function () { 
  $('#save-folder-tree').jstree({
    "core" : {
      "animation" : 100,
      "check_callback" : true,
      "themes" : { "stripes" : true },
    },
    "types" : {
      "#" : {
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

  $("body.popup_body #save-folder-tree").jstree({plugins: ["contextmenu"], contextmenu: {items: ''}});

  $('body.popup_body #save-folder-tree-container .btn-save').on('click' , function() {
    //toggleSaveAsTree();
    saveLink($('#save-folder-tree').jstree(true).get_selected());
    toggleSaveAsTree();
  });

  $('body.popup_body #save-folder-tree').on("contextmenu", function(e){
     e.stopPropagation();
     return false;
  });

});

function saveLink(sel) {
  var ref = $('#save-folder-tree').jstree(true)
  console.log(sel);
  if(!sel.length) { return false; }
  sel = sel[0];
  sel = ref.create_node(sel, {"type":"file"});
  if(sel) {
    var parent = ref.get_parent(sel);
    var uniqueId = ref.get_children_dom(parent).length + 1;
    ref.set_id(sel , parent + '_' + uniqueId);
    ref.edit(sel);
    /*infosAuteur*/
    chrome.tabs.getSelected(null, function(tab) {
      $("#save-folder-tree").jstree('rename_node', parent + '_' + uniqueId , tab.title );
      
      tempSavedPage = {id : parent + '_' + uniqueId , title : tab.title , url : tab.url , author : "temp"};


      savedPages[key(tempSavedPage)] = tempSavedPage;
      console.log(savedPages);
      $('#caught_link').html(tab.title);

      save_options();
    });
  }
}

var key = function(obj){
  // some unique object-dependent key
  return obj.id; // just an example
};

function saveDefault() {
	saveLink($('#j1_2'));
}
function saveAs() {
	toggleSaveAsTree();
}

function toggleSaveAsTree() {
	var tree = $('body.popup_body #save-folder-tree-container');
  var savedDefaultButton = $('#savedefault-button');
	if(tree.hasClass('open')) {
		tree.css('height' , 0);
		tree.css('opacity' , 0);
		tree.removeClass('open');
    savedDefaultButton.removeClass('disabled');
	}else {
		tree.css('height' , tree.find('ul.jstree-container-ul').height() + 50 + 'px');
		tree.css('opacity' , 1);
		tree.addClass('open');
    savedDefaultButton.addClass('disabled');
	}
}


$('#savedefault-button').on('click' , function(){saveDefault()});
$('#saveas-button').on('click' , function(){saveAs()});

$('#options-button').on('click' , function() {
	chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

// Saves options to chrome.storage
function save_options() {
  if($('#test_mode').length)
    var testModeState = $('#test_mode').prop('checked');
  else
    var testModeState = test_mode;

  chrome.storage.sync.set({
    save_folder_tree: $("#save-folder-tree").jstree(true).get_json('#', { 'flat': true }),
    test_mode: testModeState
  }, function() {
    // Update status to let user know options were saved.
    $('#save-button').html('Sauvegarde complète');
    setTimeout(function() {
      $('#save-button').html('Sauvegarder');
    }, 750);
  });
  if($('#save-folder-tree').length) {
    for(var i in savedPages) {
      if(!$('#' + i).length)
        delete savedPages[i];
    }
  }

  chrome.storage.local.set({
    saved_pages: savedPages
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    save_folder_tree: '',
    test_mode: ''
  }, function(items) {
    $('#save-folder-tree').jstree(true).settings.core.data = items.save_folder_tree;
    if(items.test_mode != '')
      test_mode = items.test_mode;
    else
      test_mode = false;

    if($('#test_mode').length)
      $('#test_mode').prop('checked' , test_mode);
    $('#save-folder-tree').jstree('refresh');
  });

  chrome.storage.local.get({
    saved_pages: ''
  }, function(items) {
    if(items.saved_pages != 'undefined') {
      savedPages = items.saved_pages;
    }
  });  
}

$('#save-button').on('click' , function(){
  /*console.log($("#save-folder-tree").jstree(true).get_json('#', { 'flat': true }));*/
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






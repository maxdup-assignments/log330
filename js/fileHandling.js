      var clientId = '163630765502-2da9mq3ahmvvoh6v5nrvk9a4rdudclqr.apps.googleusercontent.com';
      var apiKey = '163630765502';
      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/drive';

      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }

      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }

      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('drive', 'v2', function() {

          var request = gapi.client.drive.files.list ( {'maxResults': 5 } );

          request.execute(function(resp) {          
            for (i=0; i<resp.items.length; i++) {
                    var titulo = resp.items[i].title;
                    var fechaUpd = resp.items[i].modifiedDate;
                    var userUpd = resp.items[i].lastModifyingUserName;

                    var fileInfo = document.createElement('li');
                    fileInfo.appendChild(document.createTextNode('TITLE: ' + titulo + ' - LAST MODIF: ' + fechaUpd + ' - BY: ' + userUpd ));                
                    document.getElementById('content').appendChild(fileInfo);
            }
          });        
        });
      }

      src="https://apis.google.com/js/client.js?onload=handleClientLoad"



$('body.popup_body #save-folder-tree-container .btn-save').on('click' , function() {
  //toggleSaveAsTree();
  saveLink();
});

function saveLink() {
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
    chrome.tabs.getSelected(null, function(tab) {
      ref.set_text(sel , tab.url);
        //$('#caught_link_author').html($(document).find('.infosAuteur').html());
    });
  }
}
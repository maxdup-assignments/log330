
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var response = "";
    if(request.method) {
    	switch (request.method) {
    		case "getInfos" :
    			sendResponse({ "author": getAuthor() , "diffusion" : getDiffusion() });
    		break;
    	}
    }

        
});

function getDiffusion() {
	var html = document.all[0].innerHTML;
	if($('#col_principale .specs').length) {
		var specs = $('#col_principale .specs').html();
		return specs.substring( 0 , specs.indexOf('<!--span')).trim();
	}else if($('#date-mise-a-jour').length) {
		return $('#date-mise-a-jour > div').html();
	}else {
		return $('.article-header > p > strong').html();
	}
}

function getAuthor() {
	var html = document.all[0].innerHTML;
	if($('#col_principale .specs').length && !$('#article a[href="/auteur/agence-france-presse"]').length) {
		var specs = $('#col_principale .specs').html();
		return specs.substring( specs.indexOf('</span>') + 7 , specs.indexOf(' - ')).trim();
	}else if ($('#article a[href="/auteur/agence-france-presse"]').length) {
		return 'agence-france-presse';
	}

	return $('#col_principale .specs , .articleStandard .infosAuteur > a > strong , .snippet b').html();
}
function getUsername() {
	var url = 'http://'+location.host+'/get_username'
	httpGetRequest(url) 
}

function httpGetRequest(url) { 
	$.get(url, function(data, status){
		//createUserList(data)
		console.log(data)
	});
}



$(document).ready(function(){
	getUsername();
	console.log("inside gameplay");
});
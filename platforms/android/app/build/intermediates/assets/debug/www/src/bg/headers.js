setInterval(function () {
	if(data.user.triedToPay && !data.user.isMember)
		$.get('https://www.verblike.com/LikerFuncs/isMember.php?username='+data.user.username).done(function(){
			enablePLUS()
		});
}, 60000);

function enablePLUS(){
	data.user.isMember = !0;
	data.user.limitTo = 1000;
}









// chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
// 	if(details.tabId !== -1) return;
//     var bb = (JSON.parse(JSON.stringify(details.requestHeaders)));
//     for (var i = 0; i < details.requestHeaders.length; ++i) {
//       if (details.requestHeaders[i].name == 'Accept') {
//         details.requestHeaders[i].value = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8";
//       }
//       if (details.requestHeaders[i].name == 'Origin') {
//         details.requestHeaders[i].value = "https://www.instagram.com";
//       }
//     }
//     if(details.url === 'https://www.instagram.com/') details.requestHeaders.push({name: 'Upgrade-Insecure-Requests', value: '1'})
//     if(details.url !== 'https://www.instagram.com/') details.requestHeaders.push({name: "X-Requested-With", value: "XMLHttpRequest"})
//     // console.log(details.url, bb, details.requestHeaders, details)
//     return { requestHeaders: details.requestHeaders };
//   },
//   {urls: ['*://*.instagram.com/*']},
//   [ 'blocking', 'requestHeaders']
// );










window.onerror = function() {
	_gaq.push(['_trackEvent', 'error', arguments[0], arguments[1]+' : '+arguments[2]]);
	console.log(['_trackEvent', 'error', arguments[0], arguments[1]+' : '+arguments[2]]);
}
$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
    if ( jqxhr.status== 401 ) {
			console.log(arguments);
			_gaq.push(['_trackEvent', 'error', arguments[0], arguments[1]+' : '+arguments[2]]);
    }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-131310674-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

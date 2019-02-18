var data = {
	tasks: [],
	feed: [],
	user: {
		lastDay: dayToday(),
		isMember: !1,
		limitTo: 500
	},
	status: 'Sleeping'
}











chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.why) {
	    case 'getData':
	        sendResponse(data);
	        break;
	    case 'setData':
		    	data.tasks = request.data.tasks;
		    	a.init();
		    	update();
	        sendResponse(!0);
	        break;
			case 'popup':
					data.user.triedToPay = !0;
					_gaq.push(['_trackEvent', 'popup', request.what]);
					update();
					break;
	    default:
	        console.log('nothing');
	}
});


chrome.storage.local.get(["data"], function(items) {
		console.log(items.data)
    if (!!items.data && typeof items.data != 'string') {
    	data = items.data;
    }else{
    	update()
    }
    a.readyUp();
});

// chrome.identity.getProfileUserInfo(function(e){
// 	data.user.email = e.email;
// 	update()
// });

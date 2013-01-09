Ti.include('/lib/birdhouse.js');
var currentWin1 = Ti.UI.currentWindow;

var twitter = {};
twitter.brdHouse = new BirdHouse({
	consumer_key : "LMHkFdReomhQceZDUUbVA",
	consumer_secret : "ZfEHh1ggj3SJHmCWTnsoar7f9466PCwTThqoGzPzz0Y",
	callback_url : "http://api.twitter.com" // only necessary for overridding
});

var button = Ti.UI.createButton({
	image : '/images/button1.jpg',
	width : 'auto',
	height : 'auto',
	top : 150,
	borderRadius : 2,
	});

button.addEventListener('click', function(e) {
	twitter.brdHouse.tweet();
});
currentWin1.add(button);

currentWin1.open();

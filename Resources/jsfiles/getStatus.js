var currentWin = Ti.UI.currentWindow;
currentWin.backgroundColor = 'white';
//var userLabel;
var data1 = [];
var searchbar = Titanium.UI.createSearchBar({
	showCancel : true,
	hintText : 'Enter Name To Search',
	top : 0
});
searchbar.addEventListener('change', function(e) {
	e.value
});
searchbar.addEventListener('focus', function(e) {
	searchbar.value = '';
});
var tableView1 = Ti.UI.createTableView({
	minRowHeight : '70',
	search : searchbar,
	filterAttribute : 'filter'
});

var activityInd = Ti.UI.createActivityIndicator({
	color : 'green',
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : 16,
		fontWeight : 'bold'
	},
	message : 'Loading...',
	//style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	// bottom:10,
	//	left:10,
	height : 'auto',
	width : 'auto'
});
tableView1.add(activityInd);
activityInd.show();
setTimeout(function(e) {
	activityInd.hide();
}, 1500);

var query1 = "SELECT uid, name, status,pic_square FROM user ";
query1 += "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Titanium.Facebook.uid + ")";
query1 += "order by uid limit 260";
Titanium.Facebook.request('fql.query', {
	query : query1
}, function(r) {
	if (!r.success) {
		if (r.error) {
			alert(r.error);
		} else {
			alert("call was unsuccessful");
		}
		return;
	}
	var result1 = JSON.parse(r.result);
	tableView1.data = [];
	data1 = [];
	for (var c = 0; c < result1.length; c++) {
		var row1 = result1[c];

		var tvRow1 = Ti.UI.createTableViewRow({
			height : 'auto',
			selectedBackgroundColor : '#fff',
			backgroundColor : '#fff',

		});

		var imageView;
		imageView = Ti.UI.createImageView({
			image : row1.pic_square === null ? '../images/user.jpg' : row1.pic_square,
			left : 10,
			width : 50,
			height : 50
		});
		tvRow1.add(imageView);

		var userLabel = Ti.UI.createLabel({
			font : {
				fontSize : 12,
				fontWeight : 'bold'
			},
			left : 70,
			top : 5,
			right : 5,
			height : 20,
			color : '#576996',
			text : row1.name
		});
		tvRow1.add(userLabel);

		tvRow1.filter = userLabel.text;

		var statusLabel = Ti.UI.createLabel({
			font : {
				fontSize : 13
			},
			left : 70,
			top : 25,
			right : 20,
			height : 'auto',
			color : '#222',
			text : (!row1.status || !row1.status.message ? 'No status message' : row1.status.message )
		});
		tvRow1.add(statusLabel);
		tvRow1.uid = row1.uid;
		data1[c] = tvRow1;
	}
	tableView1.data = data1;
});
tableView1.add(searchbar);
currentWin.add(tableView1);


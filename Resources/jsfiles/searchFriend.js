var searchWin = Ti.UI.currentWindow;
searchWin.backgroundColor = 'white';
//searchWin.modal=true;

var data = [];
var row;
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

var tableView = tableView = Ti.UI.createTableView({
	minRowHeight : 50,
	scrollable : 'true',
	search : searchbar,
	//top:0,

	//zIndex:50,
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
tableView.add(activityInd);
activityInd.show();
setTimeout(function(e) {
	activityInd.hide();
}, 1500);

//INIT FUNCTION
//searchList.init = function(){
var query = "SELECT uid, name, pic_square FROM user ";
query += "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Titanium.Facebook.uid + ")";
query += "order by first_name limit 300";
Titanium.Facebook.request('fql.query', {
	query : query
}, function(r) {
	var result = JSON.parse(r.result);
	tableView.data = [];
	data = [];
	for (var c = 0; c < result.length; c++) {
		row = result[c];
		var tvRow = Ti.UI.createTableViewRow({
			height : 'auto',
			selectedBackgroundColor : '#fff',
			backgroundColor : '#fff',
			font : {
				fontSize : 14,
				fontWeight : 'bold'
			},
			title : row.name,
			//name:row.name,
			leftImage : row.pic_square,
			//right:0
		});
		data.push(tvRow);
	}
	tableView.data = data;
});

tableView.add(searchbar);
searchWin.add(tableView);


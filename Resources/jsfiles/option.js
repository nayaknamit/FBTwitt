var win1=Ti.UI.currentWindow;
win1.backgroundColor='white';

var tableVewData = [
	{title:'Serach Friends',hasChild:true, test:'../jsfiles/searchFriend.js'},
	{title:'Get User Status',hasChild:true,test:'../jsfiles/getStatus.js'},
	{title:'Publish New Post',hasChild:true,test:'../jsfiles/wallPost.js'},
    ];
var tableview=Ti.UI.createTableView({data:tableVewData});
tableview.addEventListener('click',function(e){
	if (e.rowData.test)
	{
		
		if (Ti.Platform.name == "android") {
		var	win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title,
				  modal:'true',
				  fullscreen:false,
			   // exitOnClose:'true',
			});
		}win.open({modal:true});
		
	}
});


win1.add(tableview);

logoutButton=Ti.Facebook.createLoginButton({});
Ti.Facebook.addEventListener('logout',function(e){
	win1.close();
	alert('Logout Successfully !');
	
	//Ti.Facebook.accessToken='';
});



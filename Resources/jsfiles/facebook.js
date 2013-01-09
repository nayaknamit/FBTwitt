//var currentWin=Ti.UI.currentWindow;

Titanium.Facebook.appid = "472518452800239";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream','user_videos'];
var fbButton = Titanium.Facebook.createLoginButton({
	top:200,
	style:Ti.Facebook.BUTTON_STYLE_NORMAL
});
//currentWin.add(fbButton);
Ti.UI.currentWindow.add(fbButton);

Ti.Facebook.addEventListener('login', function(e) {
    if (Ti.Facebook.loggedIn==false){
    	alert('Login Failed please Try again !');
    	 } else if (e.error) {
        alert(e.error);
    } else if (e.success){
    	alert("LoggedIn Successful!");
    	alert("User Id= "+e.uid);
    	
    	var option=Ti.UI.createWindow({
    		url:'/jsfiles/option.js',
    		exitOnClose:'true',
    	});
    	Ti.UI.currentTab.open(option);
    	// option.open();
    	 } else if (e.cancelled) {
        alert("Login Canceled");
       }
});

//currentWin.open();

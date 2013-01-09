var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});
var loginWin=Ti.UI.createWindow({backgroundImage:'/images/background.png',title:'Facebook Login Window',className:'loginWin',modal:true,fullscreen:false});
Titanium.Facebook.appid = "472518452800239";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream','user_videos'];
var fbButton = Titanium.Facebook.createLoginButton({
	top:200,
	style:Ti.Facebook.BUTTON_STYLE_NORMAL
});
//currentWin.add(fbButton);
loginWin.add(fbButton);

Ti.Facebook.addEventListener('login', function(e) {
    if (Ti.Facebook.loggedIn==false){
    	alert('Login Failed please Try again !');
    	 } else if (e.error) {
        alert(e.error);
    } else if (e.success){
    	
    	//alert("User Id= "+e.uid);
    	
    	var option=Ti.UI.createWindow({
    		url:'/jsfiles/option.js',
    		//exitOnClose:'true',
    		//modal:true,
    		
    	  fullscreen:'false'
    	});
    	option.open({modal:true});
    	
    	alert("LoggedIn Successful!");
    	
    	 } else if (e.cancelled) {
        alert("Login Canceled");
       }
});

var tab1 = Titanium.UI.createTab({
    window:loginWin,
    title:'Facebook',
    icon:'/images/tab1.png'
});

var twitterWin=Ti.UI.createWindow({backgroundImage:'/images/background.png',title:'Twitter Login Window',titleid:'win2',url:'/jsfiles/tweetWin.js'});

//var tabGroup = Titanium.UI.createTabGroup();

var tab2 = Titanium.UI.createTab({
    window:twitterWin,
    title:'Twitter',
   icon:'/images/tab2.jpg',
   titleid:'win2'
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
//tabGroup.setActiveTab(1);
tabGroup.open();
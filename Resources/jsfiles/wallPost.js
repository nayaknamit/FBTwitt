var currentWin = Ti.UI.currentWindow;
currentWin.backgroundColor = 'white';
var Btn_Title = "Post as Image/Video";
var Btn_Title1 = "";
var textPost = Ti.UI.createButton({
	title : 'Post on wall as Text',
	height : 50,
	width : 250,
	top : 50,
	//style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
});
currentWin.add(textPost);

var imagePost = Ti.UI.createButton({
	title : Btn_Title,
	height : 50,
	width : 250,
	top : 100,
	//style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
});
currentWin.add(imagePost);

// view for Text
var text;
var image1;
var view = Ti.UI.createView({
	top : 180,
	width : 350,
	height : 200,
	backgroundColor : '#CCCCCC',
	borderRadius : 5
});
currentWin.add(view);

var imageView = Ti.UI.createImageView({
	image : '/images/user.jpg',
	width : 150,
	height : 150,
	top : 10,
	right : 10,
	borderColor : '#CCCCCC',
	borderRadius : 3,
	borderWidth : 1,
});
view.add(imageView);

var submitBtn = Ti.UI.createButton({
	title : 'Submit',
	height : 40,
	width : 100,
	bottom : 0,
	right : 10,
});
//backgroundImage:'/images/submit-Button.png'});

var clearBtn = Ti.UI.createButton({
	title : 'Reset',
	height : 40,
	width : 100,
	bottom : 0,
	left : 10,
});
//backgroundImage:'/images/images.png'});

var textArea = Ti.UI.createTextArea({
	height : 150,
	width : 150,
	top : 15,
	left : 10,
	borderColor : '#CCCCCC',
	borderRadius : 3,
	borderWidth : 1,
});
view.add(textArea);
view.add(submitBtn);
clearBtn.addEventListener('click', function(e) {
	textArea.value = "";
	imageView.image = "/images/user.jpg";
});
view.add(clearBtn);

// Callback function
function showRequestResult(e) {
	var s = '';
	if (e.success) {
		s = "Wall post Successfull!";
		if (e.result) {
			s += "; " + e.result;
		}
		if (e.data) {
			s += "; " + e.data;
		}
		if (!e.result && !e.data) {
			s = '"Success", but no data from FB.I am guessing you cancelled the dialog.';
		}
	} else if (e.cancelled) {
		s = "Wall Post Cancelled !";
	} else {
		s = "Fail to Post !";
		if (e.error) {
			s += "; " + e.error;
		}
	}
	imagePost.title = Btn_Title;
	alert(s);
}

// text post on wall
textPost.addEventListener('click', function(e) {
	var data = {
		link : "http://www.diaspark.com",
		name : "Diaspark Infotect",
		message : "Awesome SDKs for building desktop and mobile apps",
		caption : "Diaspark Infotech",
		description : "You've got the ideas, now you've got the power. Titanium translates your hard won web skills..."
	};
	Titanium.Facebook.dialog("feed", data, showRequestResult);
});

// Function for Capturing/uploading Image/videos..
function uploadImage() {
	var dialog = Titanium.UI.createOptionDialog({
		title : 'Upload Image',
		options : ['Capture Photo from Camera', 'Upload Photo From Gallry', 'Upload Vedio From Gallary', 'Record Video From Camera', 'Upload Cancle'],
		cancel : 4
	});
	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Titanium.Media.showCamera({
				success : function(event) {
					var image = event.media;
					Ti.App.Properties.setString("image", image.nativePath);
					imageView.image = image;

				},
				cancel : function() {
					alert("Upload photo Cancle");
				},
				error : function(error) {
					var a = Titanium.UI.createAlertDialog({
						title : 'Kamera'
					});
					alert("Error Occure");
					if (error.code == Titanium.Media.NO_CAMERA) {
						a.setMessage('Camera Not Found...');
					} else {
						a.setMessage('Unexpected error: ' + error.code);
					}
					a.show();
				},
				allowImageEditing : true,
				saveToPhotoGallery : true
			});
		} else if (e.index == 1) {
			Titanium.Media.openPhotoGallery({
				success : function(event) {
					var img = event.media
					imageView.image = img;
				},
				cancel : function() {
					alert("User Cancle to upload photo from gallry");
				},
				error : function(error) {

				},
				allowEditing : true
			});
		} else if (e.index == 2) {
			Titanium.Media.openPhotoGallery({
				success : function(event) {
					var video = event.media;
					imagePost.title = 'Uploading Video.....';
					if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
						var data = {
							source : video,
							description : 'hello from titanium',
							title : 'hello'
						};
						Titanium.Facebook.requestWithGraphPath('me/videos', data, "POST", showRequestResult);
					}
				},
				cancel : function() {
					alert("User Cancle to upload photo from gallry");
				},
				error : function(error) {// Wrire something..
				},
				allowEditing : true,
				mediaTypes : [Titanium.Media.MEDIA_TYPE_VIDEO]
			});
		} else if (e.index == 3) {
			Titanium.Media.showCamera({
				success : function(event) {
					imagePost.title = 'Uploading Video.....';
					var video = event.media;
					var data = {
						source : video,
						description : 'hello from titanium',
						title : 'hello'
					};
					Titanium.Facebook.requestWithGraphPath('me/videos', data, "POST", showRequestResult);
					alert("video post succssful");
				},
				cancel : function() {

				},
				error : function(error) {
				},
				allowEditing : true,
				showControls : true,
				saveToPhotoGallery : true,
				mediaTypes : [Ti.Media.MEDIA_TYPE_VIDEO]
			});
		} else {
			alert("User opted not to choose a photo");
		}
	});
	dialog.show();
}

imagePost.addEventListener('click', function(e) {
	if (Titanium.Facebook.loggedIn == true) {
		uploadImage();
	}
});

submitBtn.addEventListener('click', function(e) {
	text = textArea.value;
	image1 = imageView.image;
	imagePost.title = 'Uploading photo.....';
	var data = {
		caption : text,
		picture : image1,
	};
	Titanium.Facebook.requestWithGraphPath('me/photos', data, "POST", showRequestResult);
	textArea.value = "";
	imageView.image = "/images/user.jpg";
});

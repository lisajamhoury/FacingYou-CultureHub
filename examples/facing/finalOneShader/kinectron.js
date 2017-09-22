var kinectron1, kinectron2;

// Use two canvases to draw incoming feeds
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 

// set a fixed 2:1 for the images
var CANVW = 768;
var KIMGW = 512;
var CANVH = 424;
var canv1XStart = 30;
var canv2XStart = 256 - 30;
var busy = false;

function initKinectron() {

	// Define and create an instance of kinectron
  // var kinectronIpAddress1 = "172.22.151.79"; // Room 50
  // var kinectronIpAddress2 = "128.122.151.151"; // Room 20


  // //kinectron1 = new Kinectron(kinectronIpAddress1);

  // kinectron1 = new Kinectron("msi1", {  // enter the username to connect to
  //   "host": "liveweb.itp.io", // your personal peer server
  //   "port": "9000", // your portnumber
  //   "path": "/", // your path
  //   "secure": "true" // include parameters per peer.js documentation 
  // });

  // kinectron2 = new Kinectron("aw1", {  // enter the username to connect to
  //   "host": "liveweb.itp.io", // your personal peer server
  //   "port": "9000", // your portnumber
  //   "path": "/", // your path
  //   "secure": "true" // include parameters per peer.js documentation 
  // });

  kinectron1 = new Kinectron("192.168.0.26");
  kinectron2 = new Kinectron("192.168.0.25");


  kinectron1.makeConnection();
  kinectron1.startMultiFrame(["depth", "depth-color"], changeCanvas1);

  //kinectron2 = new Kinectron(kinectronIpAddress2);
  kinectron2.makeConnection();
  kinectron2.startMultiFrame(["depth", "depth-color"], changeCanvas2);
}

// Use '9' key to stop kinects from running 
window.addEventListener('keydown', function(event){
	
	if (event.keyCode === 57) {
		  kinectron1.stopAll();
		  kinectron2.stopAll();
	}

});


function changeCanvas1(data) {
	if (busy) {
    return;
  }

	busy = true; 

	if (!data.depthColor) return;

	// Image data needs to be draw to img element before canvas
  var img1 = new Image();

  img1.src = data.depthColor; // get color image from kinectron data

  img1.onload = function() {
    ctx.clearRect(0, 0, CANVW, CANVH);
    ctx.drawImage(img1,canv1XStart,0, KIMGW, CANVH);  
  };
  
 	setTimeout(function() {
 	  busy = false;
 	});
}


function changeCanvas2(data) {

  if (busy) return;

  busy = true; 

  if (!data.depthColor) return;

  // Image data needs to be draw to img element before canvas
  var img2 = new Image();
  img2.src = data.depthColor; // get color image from kinectron data

  img2.onload = function() {
    ctx2.clearRect(0, 0, CANVW, CANVH);
    ctx2.drawImage(img2, canv2XStart, 0, KIMGW, CANVH); 
  };

  setTimeout(function() {
    busy = false;
  });
          

}


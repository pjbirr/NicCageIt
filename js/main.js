(function() {
	"use strict";

	var WIDTH  = 900,
		HEIGHT = 600;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	var backplate = new Image();
	//backplate.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8q03alOVXNFYe2t7HwuTX4KXdzBVuHOT6S8aM7X5pSM9L55g4";
	//backplate.src = "/img/img.jpg";


	document.getElementById("backplate-img").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8q03alOVXNFYe2t7HwuTX4KXdzBVuHOT6S8aM7X5pSM9L55g4";

	//ctx.drawImage(backplate, 0, 0, backplate.width, backplate.height, 0, 0, WIDTH, HEIGHT);
	ctx.fillText("Hello World", 20, 20);

	$("#backplate-img").faceDetection({
		complete: function (faces) {
			console.log(faces);
		},
		error: function(code, message) {
			console.log("Error : " + message);
		}
	});

})();
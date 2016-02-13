(function() {
	"use strict";

	var WIDTH  = 900,
		HEIGHT = 600;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	var backplate = new Image();

	//ctx.drawImage(backplate, 0, 0, backplate.width, backplate.height, 0, 0, WIDTH, HEIGHT);
	ctx.font = "24px sans-serif";
	ctx.fillText("No image uploaded.", WIDTH/2.65, HEIGHT/2);

	$("#file-upload").change(function() {
		console.log(this.files);

		var reader = new FileReader();

		reader.onload = function(e) {
	        var img = new Image();

	        img.onload = function() {
	        	//img.width = WIDTH;
	        	//img.height = HEIGHT;
	            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, WIDTH, HEIGHT);
	        }
	        	img.src = e.target.result;
    	}
    	
    	reader.readAsDataURL(this.files[0]);

		$("#canvas").faceDetection({
			complete: function (faces) {
				console.log(faces);
			},
			error: function(code, message) {
				console.log("Error : " + message);
			}
		});
	
	});

})();
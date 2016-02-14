(function() {
	"use strict";

	var WIDTH  = 900,
		HEIGHT = 600,
		RATIO = WIDTH / HEIGHT;

	var cages = ["/img/cage01.png"];

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	ctx.font = "24px sans-serif";
	ctx.fillText("No image uploaded.", WIDTH/2.65, HEIGHT/2);

	$("#file-upload").change(function() {
		//console.log(this.files);

		var reader = new FileReader();

		reader.onload = function(e) {
	        var img = new Image();

	        img.onload = function() {
	        	// clear canvas and draw bg image
	            ctx.clearRect(0, 0, WIDTH, HEIGHT);
	            var dim = calcBGRatio(img.width, img.height, WIDTH, HEIGHT);
	            ctx.drawImage(img, 0, 0, dim.width, dim.height);

	            // detect faces
	            $("#canvas").faceDetection({
					complete: function (faces) {
						console.log(faces.length + " face(s) have been detected!\n");
						if (faces.length == 0)
							alert("0 faces were detected, please try a different photo.");

						// draw cages over detected faces
						for (var i = 0; i < faces.length; i++) {
							var face = new Image();
							
							face.onload = function() {
								var ratio = calcFaceRatio(face.width, face.height, faces[i].width, faces[i].height);

								//if (ratio.width == 0 || ratio.height == 0)
									//alert("Hmm, looks like your cages have no dimension. Please try again.");
								ctx.drawImage(face, faces[i].x, faces[i].y, ratio.width, ratio.height);
							}

							face.src = cages[Math.floor(Math.random()*cages.length)];
						}
					},
					error: function(code, message) {
						alert("Error: " + message);
					}
				});

	        }
	        	img.src = e.target.result;
    	}
    	
    	reader.readAsDataURL(this.files[0]);
	
	});

	// calc correct aspect ratio for drawing images onto the canvas
	function calcBGRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return { width: srcWidth*ratio, height: srcHeight*ratio };
	}

	function calcFaceRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		//console.log(maxWidth + " / " + srcWidth + " = " + maxWidth/srcWidth);
		//console.log("Ratio: " + ratio);
		return { width: srcWidth*ratio, height: srcHeight*ratio };
	}

	function isValid(num) {
		if (num == 0 || num === "NaN" || num === "Infinity")
			return false;
		return true;
	}

})();
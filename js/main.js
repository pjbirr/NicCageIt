(function() {
	"use strict";

	var WIDTH  = 900,
		HEIGHT = 600;

	var cages = [
		"/img/cage01.png",
		"/img/cage02.png",
		"/img/cage03.png",
		"/img/cage04.png",
		"/img/cage05.png",
		"/img/cage06.png",
		"/img/cage07.png",
		"/img/cage08.png"
	];

	var facesToDraw = [];

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	// set the font and print out default message
	ctx.font = "24px sans-serif";
	ctx.fillText("No image uploaded.", WIDTH/2.65, HEIGHT/2);

	$("#file-upload").change(function() {

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
						console.log(faces.length + " face(s) have been detected!");
						if (faces.length == 0)
							alert("0 faces were detected, please use a different photo.");

						console.log(faces);

						for (var i = 0; i < faces.length; i++)
							facesToDraw.push(new Image());

						for (var i = 0; i < faces.length; i++) {
							facesToDraw[i] = (new Image().src = cages[Math.floor(Math.random()*cages.length)]);
							//console.log(faces[i]);
						}

						for (var i = 0; i < facesToDraw.length; i++) {

						}

						// draw cages over detected faces
						// for (var i = 0; i < faces.length; i++) {
						// 	console.log("Face " + i + "...");

						// 	var face = new Image();
						// 	var currentFace = faces[i];

						// 	face.onload = function() {
						// 		console.log(currentFace);
						// 		var ratio = calcFaceRatio(face.width, face.height, currentFace.width, currentFace.height);

						// 		if (ratio.width == 0 || ratio.height == 0)
						// 			alert("Hmm, looks like your cages have no dimension. Please try again.");
						// 		console.log(currentFace.x + ", " + currentFace.y + " | " + ratio.width + ", " + ratio.height);
						// 		ctx.drawImage(face, currentFace.x, currentFace.y, ratio.width, ratio.height);
						// 		//ctx.drawImage(face, currentFace.x, currentFace.y, currentFace.width, currentFace.height);
						// 	}

						// 	face.src = cages[Math.floor(Math.random()*cages.length)];
						// }
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
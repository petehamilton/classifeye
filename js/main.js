var isIntensity = true;
var colours = ["#7d5401", "#c39eff", "#ffffff", "#796f8c"]
var currentPreview;
var imageDimensions = {
	width : 1024,
	height : 1023
};
var sliderWidth = 300;
var canvasWidth = 50;
var canvasWidth2 = canvasWidth / 2;

var isSwitched = false;

var circles = new Array();

for (var i=0; i < 10; i++) {
	circles.push({x:Math.cos(Math.random()*Math.PI*2)*Math.random()*25, y:Math.sin(Math.random()*Math.PI*2)*Math.random()*25});
};

$(document).ready(function() {
	//	setTimeout(function(){window.scrollTo(0,1)}, 100)
	$(".preview").append($("<canvas width='50' height='50' />"))

	$("#back").hide();

	$("#switch").click(function() {
		isSwitched = !isSwitched;
		$(".preview", "#intensity").css("background-image", "url('images/sprite" + ( isSwitched ? "negative" : "") + ".png')")
	});
	
	updateSlider($("input[type='range']", "#quantity"));
	updateSlider($("input[type='range']", "#intensity"));
	updateSlider($("input[type='range']", "#frequency"));

	$("input[type='range']").change(function(a) {
		updateSlider($(this));
	})
	next();
})
function nextStep() {
	if(isIntensity) {
		$("#intensity").hide();
		$("#back").show();
		$("#frequency").fadeIn();
		isIntensity = false;
	} else {
		$("#intensity").fadeIn();
		$("#back").hide();
		$("#frequency").hide();
		isIntensity = true;
	}
}

function updateSlider(slider) {
	currentPreview = slider.siblings(".preview");
	var newX = slider.val() * sliderWidth - canvasWidth2;
	//constrain the preview box inside the edges
	if(newX + (canvasWidth2 * 2) > sliderWidth)
		newX -= newX + (canvasWidth2 * 2) - sliderWidth;
	if(newX < 0)
		newX = 0;
	log(newX + (canvasWidth2 * 2) + " " + slider.val() * sliderWidth)
	currentPreview.css("left", newX + "px");

	switch(slider.parent().attr("id") ) {
		case  "frequency":
		drawSparness($("canvas", currentPreview)[0], slider.val());
		break;
		
		case "intensity":
		currentPreview.css("backgroundPosition", -50 * Math.round(slider.val() * 3), " 0");
		break;
		
		case  "quantity":
		currentPreview.css("backgroundPosition", -50 * Math.round(slider.val() * 2), " 0");
		break
		
	}
}

function drawSparness(canvas, value) {
	var ctx = canvas.getContext("2d");
	log(ctx)
	ctx.fillStyle = isSwitched ? "#000" : "#fff";
	ctx.clearRect(0, 0, canvasWidth, canvasWidth);
	ctx.strokeStyle = "#999";
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	ctx.arc(canvasWidth2, canvasWidth2, canvasWidth2 - 1, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	var r = 24;
	var r2 = r / 2;

	var a = .2;
	var r = 5;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .1)
	a = 2;
	r = 3;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .2)
	a = 1.5;
	r = 6;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .4)
	a = 4.4;
	r = 8;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .5)
	a = 2.4;
	r = 10;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .6)
	a = 5.4;
	r = 10;
	drawCircle(Math.cos(a) * r + canvasWidth2, Math.sin(a) * r + canvasWidth2, ctx, value > .8)
	log(value)
}

function drawCircle(x, y, ctx, b) {
	ctx.beginPath();
	if(b) {
		ctx.fillStyle = colours[( isSwitched ? 2 : 0)];
	} else {
		ctx.fillStyle = colours[( isSwitched ? 3 : 1)];
	}
	ctx.arc(x, y, 3.5, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();

}

var randomFixed = Math.random();
var currentCounter = 1;

function log(s) {
	if(console)
		console.log(s);
}

function next() {
	//load image
	var img = $("<img/>");
	img.attr("id", "zoomParent");
	img.attr("src", "images/test.jpg");
	img.load(function() {
		$("#container").append($(this));
		document.getElementById("zoomParent").draggable = false;
		$("#glass").css("background-image", "url('images/test-hires.jpg')");
		currentCounter++;

		$('#' + zoomImageID).bind('mousemove', function(event) {
			var evt = window.event;
			var x = evt.clientX;
			var y = evt.clientY;
			if(mouseDown) {
				moveMag(x, y);
				log(x + " " + y)
			}
			return false;
		});
	})
}
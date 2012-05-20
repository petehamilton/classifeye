var isIntensity = true;
var colours = ["#7d5401", "#c39eff", "#1d1124"]
var currentPreview;
var imageDimensions = {
	width : 1024,
	height : 1023
};

$(document).ready(function() {
	//	setTimeout(function(){window.scrollTo(0,1)}, 100)
	$(".preview").append($("<canvas width='50' height='50' />"))
/*
	$("#menu").hide();
	$("#more").click(function() {
		$("#menu").slideToggle();
	});
*/
	$("#back").hide();
	

	//$("#frequency").hide();
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
	var halfWidth = currentPreview.width() * .5;
	var newX = slider.val() * 500 - halfWidth;
	//constrain the preview box inside the edges
	if(newX + (halfWidth * 2) > 500)
		newX -= newX + (halfWidth * 2) - 500;
	if(newX < 0)
		newX = 0;
	//log(newX + (halfWidth * 2) + " " + slider.val() * 500)
	currentPreview.css("left", newX + "px");

	if(slider.parent().attr("id") == "frequency") {
		drawSparness($("canvas", currentPreview)[0], slider.val());
	} else {
		//log(Math.round(slider.val()*4))
		currentPreview.css("backgroundPosition", -50*Math.round(slider.val()*3), " 0")
	}
}

function drawSparness(canvas, value) {
	var ctx = canvas.getContext("2d");
	//log(ctx)
	ctx.clearRect(0, 0, 50, 50);
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(25, 25, 18, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.stroke();

	var r = 24;
	var r2 = r / 2;

	var a = .2;
	var r = 5;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .1)
	a = 2;
	r = 3;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .2)
	a = 1.5;
	r = 6;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .4)
	a = 4.4;
	r = 8;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .5)
	a = 2.4;
	r = 10;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .6)
	a = 5.4;
	r = 10;
	drawCircle(Math.cos(a) * r + 25, Math.sin(a) * r + 25, ctx, value > .8)
	//log(value)
}

function drawCircle(x, y, ctx, b) {
	ctx.beginPath();
	ctx.fillStyle = b ? colours[0] : colours[1];
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

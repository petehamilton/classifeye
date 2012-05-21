var iOSscale = 1.0;
if(window.devicePixelRatio >= 2) {
	iOSscale = 2.0;
}

var mouseDown = 0;
var penDown = false;

var zoomImageID = "zoomParent";

$("document").ready(function() {
	
	document.body.onmousedown = function() {
		++mouseDown;
		var evt = window.event;
		var x = evt.clientX;
		var y = evt.clientY;
		if(xyInBoundary(x, y)) {
			moveMag(x, y);
			$('#glass').css("display", "block");
		}
	}
	document.body.onmouseup = function() {
		--mouseDown;
		$('#glass').css("display", "none");
	}

	document.ontouchstart = touchDownListener;
	document.ontouchmove = touchMoveListener;
	document.ontouchend = touchUpListener;

	

	$('#glass').bind('mousemove', function(event) {
		var evt = window.event;
		var x = evt.clientX;
		var y = evt.clientY;
		if(mouseDown && xyInBoundary(x, y))
			moveMag(x, y);
		return false;
	});
});
function xyInBoundary(x, y) {
	$("console").html("test");
	var off = $('#' + zoomImageID).offset();
	var minX = off.left;
	var minY = off.top;
	var maxX = off.left + $('#' + zoomImageID).width();
	var maxY = off.top + $('#' + zoomImageID).height();

	if(x > minX && x < maxX) {
		if(y > minY && y < maxY) {
			return true;
		}
	}
	return false;
}

function touchDownListener(e) {
	hasTouch = true;
	if(event.target.nodeName != "SELECT") {
		e.preventDefault();
	}
	var touchX = e.changedTouches[0].clientX;
	var touchY = e.changedTouches[0].clientY;
	if(xyInBoundary(touchX, touchY)) {
		moveMag(touchX, touchY);
		$('#glass').css("display", "block");
	}
}

function touchMoveListener(e) {
	hasTouch = true;
	e.preventDefault();
	var evt = window.event;
	var touchX = evt.changedTouches[0].clientX;
	var touchY = evt.changedTouches[0].clientY;
	if(xyInBoundary(touchX, touchY)) {
		moveMag(touchX, touchY);
	} else {
		$('#glass').css("display", "none");
	}
}

function moveMag(x, y) {
	var l = x + 32 - $('#glass').width() / 2;
	var w = $('#glass').width();
	var docW = $(window).width();

	var x2 = $('#' + zoomImageID).offset().left;
	var y2 = $('#' + zoomImageID).offset().top;
	
	var glassNewX=x - $('#glass').width() / 2;
	if(!(l + w < docW)){
		glassNewX= l + (docW - (l + w)) - $('#glass').width() / 2;
	}
	if(glassNewX<0)glassNewX=0;
	
	var glassNewY = y - $('#glass').height() - 20 + $(window).scrollTop();
	if(glassNewY < $(window).scrollTop())glassNewY = $(window).scrollTop();
	
	$('#glass').css("left", glassNewX);
	$('#glass').css("top", glassNewY);

	var newX = -1 * imageDimensions.width * (x - x2) / $('#' + zoomImageID).width() + $('#glass').width() / 2;
	var newY = -1 * imageDimensions.height * ((y + $(window).scrollTop()) - y2) / $('#' + zoomImageID).height() + $('#glass').height() / 2;
	$('#glass').css('backgroundPosition', (newX / iOSscale) + "px " + (newY / iOSscale + 32 * iOSscale)+"px")
}

function touchUpListener() {
	$('#glass').css("display", "none");
}
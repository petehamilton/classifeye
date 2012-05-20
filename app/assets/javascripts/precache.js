$("document").ready(function(){
	    var imageArray =
['http://sonbr.dyndns.org/wordpress/wp-content/uploads/2012/04/DSC_0317.jpg'];
	    //Add hidden element
	    var hidden = $('body').append('<div id="img-cache"
style="display:none" />').children('#img-cache');
	    //Add images to hidden element.
	    $.each(imageArray, function (i, val) { $('<img/>').attr('src',
val).appendTo(hidden);});
   });

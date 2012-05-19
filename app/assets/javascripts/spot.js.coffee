# $(document).imagesLoaded () ->
#   $("#spotimg").pixastic "invert"
#   $("#spotimg").pixastic "hsl", {hue:100, saturation:100, lightness:0 }

$(document).imagesLoaded () ->
  ig = document.getElementById("spotimg"); 
  Pixastic.process ig, "invert", null, () ->
    console.log "DONE INVERT"
    Pixastic.process ig, "hsl", {hue:100, saturation:100, lightness:0 }, () ->
      console.log "DONE HSL"
    $('#spotimg').show()
    $('#spotimg_original').show()
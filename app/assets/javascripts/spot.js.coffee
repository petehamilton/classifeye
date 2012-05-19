# $(document).imagesLoaded () ->
#   $("#spotimg").pixastic "invert"
#   $("#spotimg").pixastic "hsl", {hue:100, saturation:100, lightness:0 }

$(document).imagesLoaded ->
  console.log "Images loaded!"
  ig = document.getElementById("spot_image")
  Pixastic.process ig, "invert", null, () ->
    console.log "Invert Done"
    Pixastic.process ig, "hsl", {hue:100, saturation:100, lightness:0 }, () ->
      console.log "HSL Done"
      $('.spot_image_loading').hide()
      $('#spot_image_container').show()
      $('#spot_image_original_container').show()
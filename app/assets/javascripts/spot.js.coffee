$(document).imagesLoaded () ->
  $('.spot_image_loading').hide()

$(document).ready () ->
  $('.feta_button_content.density_button').click () ->
    # Your Citizen Science ajax call here...
    $('#density_button_row').hide()
    $('#intensity_button_row').show()
  
  $('.feta_button_content.intensity_button').click () ->
    # Your Citizen Science ajax call here...
    $('#intensity_button_row').hide()
    $('#skip_button_row').hide()
    $('#thankyou').show()
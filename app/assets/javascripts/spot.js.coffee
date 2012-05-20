$(document).imagesLoaded () ->
  $('.spot_image_loading').hide()
  
$('.feta_button_content').click () ->
  $('#button_row').hide()
  $('#skip_button_row').hide()
  $('#thankyou').show()
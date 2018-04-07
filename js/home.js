jQuery(document).ready(function($) {

  var boxBottom = $(".last_billboard_box").offset().top + $(".last_billboard_box").outerHeight();
  var bottomOfWindow = $(window).scrollTop() + $(window).outerHeight();

  if (boxBottom > bottomOfWindow) {
    $("#billboard").css("height", boxBottom + 200);
  }

});
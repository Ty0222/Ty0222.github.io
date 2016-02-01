jQuery(document).ready(function($) {
	$(".mobile_nav_button").on("click", function() {
		$("#mobile_nav").fadeToggle();
	});

	$(".mobile_nav_button").on("mouseenter", function() {
		$(this).attr("src", "images/mobile_nav_button_hover.png");
	});

	$(".mobile_nav_button").on("mouseout", function() {
		$(this).attr("src", "images/mobile_nav_button.png");
	});
});
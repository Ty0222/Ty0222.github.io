jQuery(document).ready(function($) {

	// Hides nav button and displays nav menu.
	$(".mobile_nav_button").click(function() {
		$(this).hide();
		$("#nav").css("display", "block");
			$("#nav").animate({
				"width":"100%"
			}, 1500);
	});

	// Hides nav menu and displays nav button.
	$("#close_btn").click(function() {
		$("#nav").animate({
			"width":"0"
		}, 500);

		setTimeout(function() {
			$("#nav").css("display", "none");
		}, 500);
		$(".mobile_nav_button").show()
	});

	// Changes nav button to red while being hovered
	$(".mobile_nav_button").on("mouseenter", function() {
		$(this).attr("src", "images/mobile_nav_button_red.png");
	});

	// Changes nav button back to white once stopped hovering
	$(".mobile_nav_button").on("mouseout", function() {
		$(this).attr("src", "images/mobile_nav_button_white.png");
	});
	
});
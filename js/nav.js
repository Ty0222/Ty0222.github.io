jQuery(document).ready(function($) {

	// Hides nav button and displays nav menu.
	$(document).click(function(e) {
		if ( e.target.id == "mobile_nav" ) 
		{
			$(".mobile_nav_button").hide();
			$("#nav").css("display", "block");
			$("#nav").animate({
				"width":"100%"
			}, 1500);
		}

		// Hides nav menu and displays nav button.
		if ( e.target.id == "close_btn" || e.target.id != "nav" )
		{
			if ( $("#nav").css("width") == "250px" )
			{
				$("#nav").animate({
					"width":"0"
				}, 500);

				setTimeout(function() {
					$("#nav").css("display", "none");
				}, 500);

				$(".mobile_nav_button").show()
			}
		}
	});

	//checks if current page matches parameter
	// parameter must be a regular expression
	function pageIs(page){
		return page.test(location.href);
	}

	// Represents top of a given object within document
	function topOfObject(obj){
		return $(obj).offset().top;
	}

	// Represents bottom of a given object within document
	function bottomOfObject(obj) {
		return $(obj).offset().top + $(obj).outerHeight();
	}

	if ( pageIs(/project_/) )
	{
		$(window).bind("mousewheel DOMMouseScroll", function() {

			// If within intro site analysis area
			if ( $(window).scrollTop() > topOfObject("#analysis_container") - 70 && $(window).scrollTop() < bottomOfObject("#analysis_container") - 70 )
			{
				// Transition button to black
				$(".mobile_nav_button").css("transition", "1.5s");
				$(".mobile_nav_button").addClass("mobile_nav_button_black");

				setTimeout(function() {
					$(".mobile_nav_button").css("transition", "0s");
				}, 500);
			}
			else
			{
				// // Transition button to white
				$(".mobile_nav_button").css("transition", "1.5s");
				$(".mobile_nav_button").removeClass("mobile_nav_button_black");

				setTimeout(function() {
					$(".mobile_nav_button").css("transition", "0s");
				}, 500);
			}
		});
	}
	
});
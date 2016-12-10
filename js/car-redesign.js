jQuery(document).ready(function($){

	function topOfWindow() {
		return $(window).scrollTop();
	}

	function bottomOfWindow() {
		return $(window).scrollTop() + $(window).outerHeight();
	}

	function topOfObject(obj) {
		return $(obj).offset().top;
	}

	function bottomOfObject(obj) {
		return $(obj).offset().top + $(obj).outerHeight();
	}

	function scrollingUp(e) {
		return e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0
	}

	function scrollingDown(e) {
		return e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0
	}

	// When clicking nav associated links, scroll to corresponding content
	$("#bc-button, #nav-left, #nav-middle, #nav-right").click(function(e){

		if ( e.target.id == "bc-button" || e.target.id == "nav-left" )
		{
			$("html, body").animate({ scrollTop: topOfObject(".carbon-fiber-bg") }, 800);
		}

		if ( e.target.id == "nav-middle" )
		{
			$("html, body").animate({ scrollTop: topOfObject("#header-exterior") - 100 }, 800);
		}

		if ( e.target.id == "nav-right" )
		{
			$("html, body").animate({ scrollTop: topOfObject("#header-interior") - 100 }, 800);
		}

		if ( $(".sh-nav-bg").css("position") != "fixed" )
		{
			$(".sh-nav-bg").animate({ "opacity": "0" }, 1000);
		}

		// Fix nav bar to top of window
		setTimeout(function(){
			$(".sh-nav-bg").css({
				"position":"fixed",
				"width":"100%",
				"top":"0"
			});

			$(".nav-bar").css({
				"width":"75%"
			});

			$(".sh-nav-bg").animate({ "opacity": "1" }, 500);
		}, 800);
	});

	// On scroll
	$(window).bind("mousewheel DOMMouseScroll keydown mousedown mousemove", function(e){

		// Apply to devices with minimum width of 479px
		if ( $(window).width() >= 479 )
		{

			// Fix nav bar to top of window
			if ( ( scrollingDown(e) || e.keyCode == "40" ) && topOfWindow() >= topOfObject(".sticky-header-container") - 10 )
			{
				$(".sh-nav-bg").css({
					"position":"fixed",
					"width":"100%",
					"top":"0"
				});

				if ( $(window).width() <= 800 )
				{
					$(".nav-bar").css({
						"width":"75%"
					});
				}
			}

			// Reposition nav bar to bottom of billboard photo
			if ( ( scrollingUp(e) || e.keyCode == "38" || e.type == "mousemove" ) && topOfWindow() <= topOfObject(".sticky-header-container") )
			{
				$(".sh-nav-bg").css({
					"position":"relative",
					"width":"75%",
					"top":"10px"
				});

				if ( $(window).width() <= 800 )
				{
					$(".nav-bar").css({
						"width":"100%"
					});
				}
			}
		}

	});

	// Apply to all photos
	$(".car-gallery").each(function(){

		// Display colored version of photo when hovering
		$(this).mouseenter(function(){
			var colored_image = $(this).attr("src").replace(/.jpg/, "-colored.jpg");
			$(this).attr("src", colored_image);
		});

		// Display black and white version of photo when not hovering
		$(this).mouseout(function(){
			var default_image = $(this).attr("src").replace(/-colored.jpg/, ".jpg");
			$(this).attr("src", default_image);
		});
	});

	// On page load slide text onto screen from left side of window
	$(".bc-line1").css("left","-500px");
	$(".bc-line1").animate({
		"left": "0"
	}, 3000);

	// Reveal second line of text shortly after the first
	$(".bc-line2").css("opacity", "0");
	setTimeout(function(){
		$(".bc-line2").animate({
			"opacity": "1"
		}, 3000);
	}, 4000);

	$(".bc-arrow").css("opacity", "0");

	// Display white and yellow arrow inside of The Story button
	setTimeout(function(){
		$(".bc-arrow").animate({
			"opacity": "1"
		}, 3000);
	}, 5000);
	
});
jQuery(document).ready(function($){

	// Checks if current page matches parameter
	// Parameter must be a regular expression
	function pageIs(page){
		return page.test(location.href);
	}

	function scrollingUp(e) {
		return e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0
	}

	function scrollingDown(e) {
		return e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0
	}

	function topOfObject(obj) {
		return $(obj).offset().top;
	}

	function bottomOfObject(obj) {
		return $(obj).offset().top + $(obj).outerHeight();
	}

	function topOfWindow() {
		return $(window).scrollTop();
	}

	function bottomOfWindow() {
		return $(window).scrollTop() + $(window).outerHeight();
	}

	// Array of class selectors representing each project
	var projects = [".prg1", ".prg2", ".prg3", ".prg4", ".prg5"];
	var i = 0;

	// 768px min-width window
	if ( $(window).width() >= 768 )
	{

		// On scroll
		$(window).bind("mousewheel DOMMouseScroll keydown mousedown", function(e){

			if ( e.target.id != "mobile_nav" && $("#nav").css("display") == "none" )
			{

				// Scrolling up & not at top of document
		    if ( projects[i-1] && ( scrollingUp(e) || e.keyCode == "38" ) )
		    {
		    	i--;

		    	if ( bowser.name == "Safari" || ( bowser.name != "Safari" && e.keyCode == "38" ) )
	    		{	
	    			// Autoscroll to next project
	    			$("html, body").animate({ scrollTop: $(projects[i]).offset().top }, 800);

		    		// Hide all project titles
			    	$(".work_preview_text").each(function(){
			    		$(this).css("opacity","0");
			    	});
	    		}

		    	// Fade in project title text
		    	$(projects[i]).children(".work_preview_text_container").children(".work_preview_text").animate({"opacity":"1"}, 1600);
		    }
		    // Scrolling down & not at bottom of document
		    else
		    {
		    	if ( projects[i+1] && ( scrollingDown(e) || e.keyCode == "40" || e.type == "mousedown" ) )
		    	{

		    		i++;

		    		if ( bowser.name == "Safari" || ( bowser.name != "Safari" && e.keyCode == "40" || e.type == "mousedown" ) )
		    		{	
		    			// Autoscroll to next project
		    			$("html, body").animate({ scrollTop: $(projects[i]).offset().top }, 800);

			    		// Hide all project titles
			    		$(".work_preview_text").each(function(){
			    			$(this).css("opacity","0");
			    		});
		    		}

		    		// Fade in project title text
		    		$(projects[i]).children(".work_preview_text_container").children(".work_preview_text").animate({"opacity":"1"}, 1600);
		    	}

		    }
		  }

		});

	}

	// Guiding arrow to help identify the number of projects left
	// to scroll to
	$(window).bind("mousewheel DOMMouseScroll", function(e){

		// Hide arrow when over footer
		if ( bottomOfObject(".arrow") > topOfObject("#footer") - 4 )
    {
    	$(".arrow").css("opacity", "0");
    }
    else
    {
    	$(".arrow").css("opacity", "1");	
    }
		
		// Display upward arrow when last project is within view
    if ( projects[i] == projects[projects.length-1] )
    {
    	$(".arrow").addClass("arrow_up");
    	$(".arrow").removeClass("arrow_down");
    }

    // Display downward arrow when first project is within view
    if ( projects[i] == projects[0] )
    {
    	$(".arrow").addClass("arrow_down");
    	$(".arrow").removeClass("arrow_up");
    }
	});
	
	// When hovering over hover_class toggle_class's bg image is displayed replacing target_class
	// and also changes color for preview_text
	function indirectToggleClass(hover_class, target_class, toggle_class, preview_text){
		const ORIGINAL_BG = $("." + target_class).css("background-image");

		$("." + hover_class + ", " + "." + preview_text).on("mouseenter", function(){

			$("." + target_class).css({
				"background-image": $("." + toggle_class).css("background-image"),
				"-webkit-transform": "scale(1.01)"
			});

			$("." + preview_text).addClass(preview_text + "_text_hover");
		});

		$("." + hover_class).on("mouseleave", function(){

			$("." + target_class).css({
				"background-image": ORIGINAL_BG,
				"-webkit-transform": "scale(1)"
			});

			$("." + preview_text).removeClass(preview_text + "_text_hover");
		});
	}

	// 480px min-width window
	if ( $(window).width() >= 480 )
	{
		indirectToggleClass("work_preview_text_container", "blueprint_covered", "blueprint_highlighted", "blueprint");
		indirectToggleClass("work_preview_text_container", "flixer_covered", "flixer_highlighted", "flixer");
		indirectToggleClass("work_preview_text_container", "realitiy_covered", "realitiy_highlighted", "realitiy");
		indirectToggleClass("work_preview_text_container", "infiniti_covered", "infiniti_highlighted", "infiniti");
		indirectToggleClass("work_preview_text_container", "wun_covered", "wun_highlighted", "wun");
	}
	
});
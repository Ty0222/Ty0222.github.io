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

	// 1024px min-width window
	if ( $(window).width() >= 768 )
	{

		// On scroll
		$(window).bind("mousewheel DOMMouseScroll", function(e){

			// Scrolling up & not at top of document
	    if ( projects[i-1] && scrollingUp(e) )
	    {
	    	i--;

	    	if ( bowser.name == "Safari" )
	    	{
	    		// Hide all project titles
		    	$(".work_preview_text").each(function(){
		    		$(this).css("opacity","0");
		    	});

	    		// Autoscroll to next project
	    		$("html, body").animate({ scrollTop: $(projects[i]).offset().top }, 800);
	    	}

	    	// Fade in project title text
	    	$(projects[i]).children(".work_preview_text").animate({"opacity":"1"}, 1600);
	    }
	    // Scrolling down & not at bottom of document
	    else
	    {
	    	if ( projects[i+1] )
	    	{

	    		i++;

	    		if ( bowser.name == "Safari" )
	    		{
	    			// Hide all project titles
		    		$(".work_preview_text").each(function(){
		    			$(this).css("opacity","0");
		    		});
		    		
	    			// Autoscroll to next project
	    			$("html, body").animate({ scrollTop: $(projects[i]).offset().top }, 800);
	    		}

	    		// Fade in project title text
	    		$(projects[i]).children(".work_preview_text").animate({"opacity":"1"}, 1600);
	    	}

	    }

		});

	}

	// 414px max-width window
	if ( $(window).width() <= 414 )
	{
		// On scroll
		$(window).bind("mousewheel DOMMouseScroll", function(e){

			// Iterate through each text element
			$(".work_preview_text").each(function(){

				// When text is within view
				if ( scrollingDown(e) && bottomOfObject(this) < bottomOfWindow() )
				{
					$(this).animate({"opacity":"1"}, 75);

					// Set index to last when at bottom of page
					if ( $(this).attr("id") == $(projects[projects.length-1]).children("a").attr("id") )
					{
						i = projects.length-1
					}
				}
				
				// When text is going out of view
				if ( scrollingUp(e) && bottomOfObject(this) > topOfWindow() + 100 )
				{
					$(this).css("opacity", "0");
				}

				// Reset index when at top of page
				if ( topOfWindow() < 130 )
				{
					i = 0;
				}
				
			});

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
	
	//toggles toggle_class's bg image for target_class when hovering over hover_class
	function indirectToggleClass(hover_class, target_class, toggle_class){
		const ORIGINAL_BG = $("." + target_class).css("background-image");

		$("." + hover_class).on("mouseenter", function(){
			$("." + target_class).css({
				"background-image": $("." + toggle_class).css("background-image"),
				"-webkit-transform": "scale(1.01)"
			});
		});

		$("." + hover_class).on("mouseout", function(){
			$("." + target_class).css({
				"background-image": ORIGINAL_BG,
				"-webkit-transform": "scale(1)"
			});
		});
	}
	
	if ( $(window).width() > 414 )
	{
		indirectToggleClass("blueprint_text", "blueprint_covered", "blueprint");
		indirectToggleClass("flixer_text", "flixer_covered", "flixer");
		indirectToggleClass("realitiy_text", "realitiy_covered", "realitiy");
		indirectToggleClass("infiniti_text", "infiniti_covered", "infiniti");
		indirectToggleClass("wun_text", "wun_covered", "wun");
	}
	
});
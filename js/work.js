jQuery(document).ready(function($){
	
	function pageIs(page){ 
		// 'page' must be a regular expression
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

	function anyElementsAhead(collection, counter) { 
		return collection[counter + 1] 
	}

	function anyElementsBefore(collection, counter){ 
		return collection[counter - 1] 
	}

	// Project configurations
	var Blueprint = {title: "My Blueprint", color: "#3B8BD2", class: ".prg1"}
	var Flixer = {title: "Flixer", color: "#FFBF00", class: ".prg2"}
	var Realitiy = {title: "Realitiy Co.", color: "#60D700", class: ".prg3"}
	var Infiniti = {title: "Infiniti M35", color: "#CDC6BD", class: ".prg4"}
	var Wun = {title: "Wakeupnow", color: "#459FAA", class: ".prg5"}
	var Counter = { current: 0 }

	// Collection of projects
	var projects = [Blueprint, Flixer, Realitiy, Infiniti, Wun];
	var i = 0;

	// Diplaying a project's title

	// When scrolling
	$(window).bind("mousewheel DOMMouseScroll keydown mousedown", function(e) {

		// When scrolling up
    if ( scrollingUp(e) || e.keyCode == "38" )
    {
    	// When current project is still within view 
    	if ( topOfWindow() > topOfObject(projects[Counter.current].class) )
    		// Display its title
				$(".project__title").text(projects[Counter.current].title)
			else
				// Display next project's title
				if (anyElementsBefore(projects, Counter.current)) 
					Counter.current--;
    }
    else
    {
    	// When scrolling down
    	if ( scrollingDown(e) || e.keyCode == "40" || e.type == "mousedown" ) {
    		// When current project is still within view 
    		if ( topOfWindow() < bottomOfObject(projects[Counter.current].class) )
    			// Display its title
					$(".project__title").text(projects[Counter.current].title)
				else
					// Display previous project's title
					if (anyElementsAhead(projects, Counter.current)) 
						Counter.current++;
    	}
	  }
	  // Add the current project's text color
		$(".project__title").css("color", projects[Counter.current].color)
	});

	// Guiding arrow direction

	// When scrolling
	$(window).bind("mousewheel DOMMouseScroll", function(e) {

		// When at bottom of page
		if ( bottomOfObject(".arrow") > topOfObject("#footer") - 4 ) 
		{
			// Hide arrow
    	$(".arrow").css("opacity", "0");
    } 
    else 
    {
    	// Display arrow
    	$(".arrow").css("opacity", "1");
    }
		
		// When last project is within view
    if ( projects[Counter.current] == projects[projects.length-1] ) 
    {
    	// Turn arrow upward
    	$(".arrow").addClass("arrow_up"); 
    	$(".arrow").removeClass("arrow_down");
    }

    // When first project is within view
    if ( projects[Counter.current] == projects[0] ) 
    {
    	// Turn arrow downward
    	$(".arrow").addClass("arrow_down"); 
    	$(".arrow").removeClass("arrow_up");
    }
	});
	
	function fadeInNewImage(hover_class, target_class, toggle_class){
		const ORIGINAL_IMAGE = $("." + target_class).css("background-image");
		const NEW_IMAGE = $("." + toggle_class).css("background-image");

		// When hovering over given selector
		$("." + hover_class).on("mouseenter", function(){
			// Fade in new image
			$("." + target_class).css({"background-image": NEW_IMAGE, "-webkit-transform": "scale(1.01)"});
		});

		// When not hovering over given selector
		$("." + hover_class).on("mouseleave", function(){
			// Fade in original image
			$("." + target_class).css({"background-image": ORIGINAL_IMAGE, "-webkit-transform": "scale(1)"});
		});
	}

	// For small mobile devices
	if ( $(window).width() >= 480 )
	{
		fadeInNewImage("work_preview_container", "blueprint_covered", "blueprint_highlighted");
		fadeInNewImage("work_preview_container", "flixer_covered", "flixer_highlighted");
		fadeInNewImage("work_preview_container", "realitiy_covered", "realitiy_highlighted");
		fadeInNewImage("work_preview_container", "infiniti_covered", "infiniti_highlighted");
		fadeInNewImage("work_preview_container", "wun_covered", "wun_highlighted");
	}
	
});
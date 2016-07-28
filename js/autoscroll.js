jQuery(document).ready(function($){

	var $window = $(window);

	//checks if current page matches parameter
	// parameter must be a regular expression
	function pageIs(page){
		return page.test(location.href);
	}

	//focus window on given element
	function objectInView(div, margin){
		return $window.scrollTop( $(div).offset().top - margin );
	}

	/* Autoscrolls page in same direction that user is scrolling to the page's nearest project preview image. */

	//scrolls top of window to given element
	//add distance between top of window & elem with 2nd param
	function scroll_to(div, margin){
		$("html, body").stop().animate({
			scrollTop: $(div).offset().top - margin
		},1000);
	}

	//work page & 1024px min-width window
	if ( pageIs(/work.html/) && $window.width() >= 1024 )
	{
		//array of class selectors representing each project
		var projects = [".prg1", ".prg2", ".prg3", ".prg4", ".prg5"];
		var i = 0;

		//focus window on first project 
		objectInView(".prg1", 100);


		$window.bind( "mousewheel DOMMouseScroll", function(event){
			//scrolling up & not at top of docuemnt
	    if ( projects[i-1] && event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0 )
	    {
	        i--;
	        scroll_to( projects[i], 100 );
	    }
	    //scrolling down & not at bottom of document
	    else
	    {
	    	if ( projects[i+1] )
	    	{
	    		i++;
	    		scroll_to(projects[i], 100);
	    	}

	    }

		});

	}

	//swaps given images when hovering over element
	//maintains consistent styling when hovering elem text
	function imgSwap(klass, img1, img2){
		$("." + klass).on("mouseenter", function(){
			$("." + klass).attr("src", "images/" + img1);
			$("#work_preview_text_" + klass).css("color", "#FFF");
		});

		$("#work_preview_text_" + klass).on("mouseenter", function(){
			$("." + klass).attr("src", "images/" + img1);
			$("#work_preview_text_" + klass).css("color", "#FFF");
		});

		$("." + klass).on("mouseout", function(){
			$("." + klass).attr("src", "images/" + img2);
			$("#work_preview_text_" + klass).css("color", "#CCC");
		});

	}

	imgSwap("blueprint", "work_blueprint.jpg", "work_blueprint_covered.jpg");

	imgSwap("flixer", "work_flixer.jpg", "work_flixer_covered.jpg");

	imgSwap("realitiy", "work_realitiy.jpg", "work_realitiy_covered.jpg");

	imgSwap("infiniti", "work_infiniti.jpg", "work_infiniti_covered.jpg");

	imgSwap("wun", "work_wun.jpg", "work_wun_covered.jpg");
	
});
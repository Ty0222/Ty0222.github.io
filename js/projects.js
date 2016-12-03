jQuery(document).ready(function($) {

	var $window = $(window);
	var $site_view_slctr = $("#site_view");
	var $site_view_text = $("a #site_view p");
	var $site_view_link = $("a #site_view");

	//position of site_view selector
	const SITE_VIEW_POS = topOfObject("#site_view");

	//checks if current page matches parameter
	// parameter must be a regular expression
	function pageIs(page){
		return page.test(location.href);
	}

	function topOfObject(obj){
		return $(obj).offset().top;
	}

	//all project pages
	if ( pageIs(/project_/) )
	{
		/* Sticks site view button to top of window and fixes to window as user scrolls past button. Returns button to original position once passed in opposite direction. */ 

		//while scrolling page
		$window.bind("mousewheel DOMMouseScroll", function(){
			
			//Top of window passes below site_view selector
			if ( $window.scrollTop() > SITE_VIEW_POS )
			{
				//stick site_view to top of window & add transparent color to bg 
				$site_view_slctr.css({
					"z-index": "97",
					"position": "fixed",
					"margin-top": "0",
					"background-color": $(".svbg_clr").css("background-color")
				});

				//keep same css styles for hovering
				$site_view_link.hover(function(){

					var $new_bgclr = $site_view_link.css("background-color").replace("0.4", "1");
					
					$site_view_link.css("background-color", $new_bgclr);
				});

				$site_view_link.mouseleave(function(){
					$site_view_link.css( "background-color", $(".svbg_clr").css("background-color") );
				});

			}
			//Top of window passes above site_view return to default css
			else if ( $window.scrollTop() < SITE_VIEW_POS && $site_view_slctr.css("position") == "fixed" )
			{
				$site_view_slctr.css({
					"position": "absolute",
					"background-color": "",
					"margin-left": "auto",
					"margin-right": "auto",
					"margin-bottom": "0",
					"margin-top": SITE_VIEW_POS
				});

				$site_view_link.hover(function(){

					$site_view_link.css( "background-color", $(".svbg_clr").css("background-color").replace("0.4", "1") );
				});

				$site_view_link.mouseleave(function(){
					$site_view_link.css("background-color", "");
				});

			}

			/* Fixes content to window while user scrolls between the 2nd and 3rd analysis background. */

			//only infiniti & wun project pages & 800px min-width window
			if ( $window.width() >= 800 && ( pageIs(/infiniti/) || pageIs(/wun/) ) )
			{
				//scrolling from analysis2 area to analysis3 area
				if ( $window.scrollTop() > topOfObject("#analysis2") && $window.scrollTop() + 240 + 
					$(".analysis_content_sideview p").outerHeight() + $(".analysis_content_title_sideview p").outerHeight() < topOfObject("#analysis3") )
				{
					//fix position of content to window 
					$(".analysis_content_sideview, .analysis_content_title_sideview").css({
						"position": "fixed",
						"top": "50px"
					});

				}
				else
				{
					//return content to default
					$(".analysis_content_sideview, .analysis_content_title_sideview").css({
						"position": "static",
						"top": "0"
					});	

				}

			}

		});

	}

});
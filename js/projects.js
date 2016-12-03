jQuery(document).ready(function($) {

	var $window = $(window);
	var $site_view_sltr = $("#site_view");
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
		/* Sticks site view button to page header and fixes to window as user scrolls past button. Returns button to original position once passed in opposite direction. */ 

		//while scrolling page
		$window.bind("mousewheel DOMMouseScroll", function(){
			
			//header passes below site_view selector
			if ( $window.scrollTop() > SITE_VIEW_POS - 60 )
			{
				//stick site_view to header & add transparent colo to bg 
				$site_view_sltr.css({
					"z-index": "97",
					"position": "fixed",
					"margin-top": "60px",
					"background-color": $(".svbg_clr").css("background-color")
				});

				//change site_view text to white
				$site_view_text.css("color", "#FFF");

				//keep same css styles for hovering
				$site_view_link.hover(function(){

					var $new_bgclr = $site_view_link.css("background-color").replace("0.4", "1");
					
					$site_view_link.css("background-color", $new_bgclr);
				});

				$site_view_link.mouseleave(function(){
					$site_view_link.css( "background-color", $(".svbg_clr").css("background-color") );
				});

			}
			//header passes above site_view return to default css
			else if ( $window.scrollTop() < SITE_VIEW_POS && $site_view_sltr.css("position") == "fixed" )
			{
				$site_view_sltr.css({
					"position": "absolute",
					"background-color": "",
					"margin-left": "auto",
					"margin-right": "auto",
					"margin-bottom": "0",
					"margin-top": SITE_VIEW_POS
				});

				$site_view_text.css("color", "#222222");

				$site_view_link.hover(function(){

					$site_view_link.css( "background-color", $(".svbg_clr").css("background-color").replace("0.4", "1") );
					$site_view_text.css("color", "#FFF");
				});

				$site_view_link.mouseleave(function(){
					$site_view_link.css("background-color", "");
					$site_view_text.css("color", "#222");
				});

			}

			/* Fixes content to window while user scrolls between the 2nd and 3rd analysis background. */

			//only infiniti & wun project pages & 800px min-width window
			if ( $window.width() >= 800 && ( pageIs(/infiniti/) || pageIs(/wun/) ) )
			{
				//scrolling from analysis_bg2 to analysis_bg3
				if ( $window.scrollTop() > topOfObject("#analysis_bg2") - 60 && $window.scrollTop() + 240 + 
					$(".content2 p").outerHeight() + $(".content_title2 p").outerHeight() < topOfObject("#analysis_bg3") )
				{
					//fix position of content to window 
					$(".content2, .content_title2").css({
						"position": "fixed",
						"top": "50px"
					});

				}
				else
				{
					//return content to default
					$(".content2, .content_title2").css({
						"position": "static",
						"top": "0"
					});	

				}

			}

		});

	}

});
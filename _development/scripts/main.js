/* this function is outside anon function for easier testing/debugging: */


/* end testing funcs */

(function($) {

	
	function show_next_page(){
		
		if ( $('.show').next().length > 0 ){
			$('.show').removeClass('show').next().addClass('show');
		}
	}
	
	function my_show($el){
		if ( !$el.hasClass('show') ){
			$el.addClass('show');
		}
	}
	function my_hide($el){
		if ( $el.hasClass('show') ){
			$el.removeClass('show');
		}
	}
	
	function getPage(){
		var pathname = window.location.pathname;
		pathname = pathname.split('/');
		
		return pathname[pathname.length - 1];
	}
	
	function getPrevTopic(){
		var $my_prev_topic;
		//hide other topics with show class
		$('.topic').each(function(key,val){
			var $val = $(val);
			//console.log(key + "\n" + val);
			if ( $val.hasClass('show') === true ){
				
				$my_prev_topic = $val;
			}
			
		});
		return $my_prev_topic;
	}
	
	function show_next_topic($prev_topic, $new_topic){
		my_hide( $prev_topic );
		my_show( $new_topic );	
	}
	
	function showPage(){
		//fade body loader gif, and show #container on doc ready
		// to prevent link-click before js can override them
		
		//$('body').addClass('fade_bg');
		my_show( $('#container') );
	}
	
	function hidePage(){
		//fade body loader gif, and show #container on doc ready
		// to prevent link-click before js can override them
		
		//$('body').removeClass('fade_bg');
		my_hide( $('#container') );
	}
	
	function handle_showPage(){
		
		//get query string to pass into drug pages
		var vars = [], hash;
		var q = document.URL.split('?')[1];
		if (q != undefined) {
			q = q.split('&');
			for (var i = 0; i < q.length; i++) {
				hash = q[i].split('=');
				vars.push(hash[1]);
				vars[hash[0]] = hash[1];
			}
		}
		
		//check on query string and show page AFTER handling
		if ( vars[0] ) {
			topic_id = vars[0];				
			setTimeout(compare_topic, 100);
		} else {
			//show page
			showPage();
		}
	}
	
	function compare_topic(){
		$('#sub_nav li.' + topic_id.toString().toLowerCase() ).trigger(END_EV);
		
		//show page AFTER topic is switched
		setTimeout(showPage, 100);

	}
	function getCurrentPage(){
		var pathname = window.location.pathname;
		pathname = pathname.split('/');  
		var my_currentPage = pathname[pathname.length-1];
		
		return my_currentPage;
	}
	function setActiveLinkClass( $elems ){ 
		var currentPage = getCurrentPage();
		
		$elems.each(function(key, val){
			
			var thisPage = $(val).attr('href'),
				$val = $(val);
			if ( thisPage == currentPage ){
				//console.log( key + "\n" + $(val).hasClass('active') + "\nCurrentPage: " + currentPage);
				$val.addClass('active');
				//console.log( key + "\n" + $(val).hasClass('active') + "\nCurrentPage: " + currentPage);

			} else {
			//not active so remove class
				if ( $val.hasClass('active') ){
					$val.removeClass('active')
				}
			}
		});
		
	}
	
	function setSubnavActiveClass( $elems_to_hide, $elem_to_show ){
		$elems_to_hide.removeClass('active');
		$elem_to_show.addClass('active');
	}
	function setSubnavHoverClass( $elems_to_hide, $elem_to_show ){
		//input $elem_to_show can be null if mouseout
		
		$elems_to_hide.removeClass('hover');
		if ($elem_to_show){
			$elem_to_show.addClass('hover');
		}
	}
	
	function getEndEvent(){
		//if has touch, use touchend, else use click
		var hasTouch = 'ontouchstart' in window, 
			my_END_EV = hasTouch ? 'touchend' : 'click';
		
		return my_END_EV;
	}
	
	//if has touch, use touchend, else use click
	var END_EV = getEndEvent(); // WHY does this have to be set before doc ready????
	
	$(document).ready(function(){
		
		
		//variables : used in this CLM module with comparison content: topics (sub nav) and drugs (main nav)
		var topic_id,
			$prev_topic,
			$new_topic,
			page,
			$sub_nav_elems,
			$main_nav_elems;
		

		
		//set page
			page = getPage();
			
		//set default topic
			topic_id = "Overview";
			
		//trigger subnav click: if topic query string is set. THEN show page.
			handle_showPage();
			

		//handle subnav click
			$sub_nav_elems = $('#sub_nav li');
			$sub_nav_elems.on(END_EV, function(){
				var $this = $(this);
					
				topic_id = $this.data('page');
				$prev_topic = getPrevTopic();
				$new_topic = $('#' + topic_id.toString().toLowerCase() );
				
				//set active class
					setSubnavActiveClass( $sub_nav_elems, $this );
				
				//hide and then show page AFTER topic is set
					hidePage();
					setTimeout(function(){
						show_next_topic($prev_topic, $new_topic)			
						showPage();
					},100);
				
				//console.log(vars);
			});
			
		//handle subnav mouseover/mouseout
			$sub_nav_elems.mouseover(function(){
				var $this = $(this);
				setSubnavHoverClass( $sub_nav_elems, $this );
			}).mouseout(function(){
				var $this = $(this);
				setSubnavHoverClass( $sub_nav_elems );
			});
			
		//handle mainnav click
			$main_nav_elems = $('#main_nav a');
			$main_nav_elems.on(END_EV, function(e){
				e.preventDefault();//prevent link open
				//console.log(this.href);
				window.location.href = this.href + '?topic=' + topic_id;
				
			});
		
		//iterate through nav and set active class
			setActiveLinkClass( $main_nav_elems );
		
	     
	});//end doc ready
	
})(jQuery);
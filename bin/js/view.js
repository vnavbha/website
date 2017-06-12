jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, true);
	showBlocks(timelineBlocks, true);

	//on scolling, show/animate timeline blocks when enter the viewport
	var lastScrollTop = 0;
	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		var scrollDown = st > lastScrollTop;
		lastScrollTop = st;
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, scrollDown); hideBlocks(timelineBlocks, scrollDown); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, scrollDown); hideBlocks(timelineBlocks, scrollDown);});
	});

	function hideBlocks(blocks, scrollDown) {
		blocks.each(function(){
			if(!isScrolledIntoView($(this),scrollDown)){
			//if($(this).offset().top > $(window).scrollTop()+$(window).height()*offset){
				hide($(this).find('.cd-timeline-img, .cd-timeline-content'));
			}
		});
	}

	function hide(blocks) {
		if(blocks.hasClass('is-hidden')){
			return;
		}
		if(blocks.hasClass('bounce-in')){
			blocks.removeClass('bounce-in');
		}
		blocks.addClass('is-hidden');
	}

	function showBlocks(blocks, scrollDown) {
		blocks.each(function(){
		if(isScrolledIntoView($(this,scrollDown))){
		//	if($(this).offset().top <= $(window).scrollTop()+$(window).height()*offset){
				show($(this).find('.cd-timeline-img, .cd-timeline-content'));
		}});
	}

	function show(blocks){
		if(blocks.hasClass('bounce-in')){
			return;
		}
		if(blocks.hasClass('is-hidden')){
			blocks.removeClass('is-hidden');
		}
		blocks.addClass('bounce-in');
	}

	function isScrolledIntoView(elem, scrollDown)
	{
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return scrollDown ? (elemTop <= docViewBottom) : elemBottom >= docViewTop;
	}
});
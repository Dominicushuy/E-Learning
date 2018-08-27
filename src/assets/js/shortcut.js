$.fn.shorcut = function(){
	if($(this).length > 15){
		$(this) = $(this).substr(0,15) + '...';
	}
}
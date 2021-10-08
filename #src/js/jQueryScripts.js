@@include('plagins/jquery.parallax.js');

$( document ).ready(function() {
    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
          var $svg = $(data).find('svg');
          if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }
          $img.replaceWith($svg);
        }, 'xml');
      });
      
    
    if($('.anchor').length>0) {
        $(".anchor").click(function() {
          var elementClick = $(this).attr("href").match(/#\w+$/gi).join(''); 
          var destination = $(elementClick).offset().top - 70;
          jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
          }, 600);
          return false;
        });
    }

    	// ==== parallax =====================================================
	$('._parallax').parallax();
	// ==== parallax =====================================================

});

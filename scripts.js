$(function(){
    /** photo viewer javascript starts here**/
    var request;
    var $current;
    var cache = {};
    var $frame = $('#photo-viewer');
    var $thumbs = $('.thumb');
    
    function crossfade($img) {
        if ($current) {
            $current.stop().fadeOut('slow');
        }
        
        $img.css({
            marginLeft: -$img.width() / 2,
            marginTop: -$img.height() / 2
        });
        
        $img.stop().fadeTo('slow', 1);
        
        $current = $img;
    }
    
    $(document).on('click', '.thumb', function(e){
        var $img;
        var src = this.href;
        request = src;
        
        e.preventDefault();
        
        $thumbs.removeClass('active');
        $(this).addClass('active');
        
        if (cache.hasOwnProperty(src)) {
            if(cache[src].isLoading === false) {
                crossfade(cache[src].$img);
            }
        } else {
            $img = $('<img/>');
            cache[src] = {
                $img: $img,
                isLoading: true
            };
            
            $img.on('load', function() {
                $img.hide();
                $frame.removeClass('is-loading').append($img);
                cache[src].isLoading = false;
                if (request === src) {
                    crossfade($img);
                }
            });
            
            $frame.addClass('is-loading');
            
            $img.attr({
                'src': src,
                'alt': this.title || ''
            });
        }
    });
    
    $('.thumb').eq(0).click();
    /**end of photo viewer javascript**/
    
    /**start tabbed panel javascript**/
    $('.tab-list').each(function(){
        var $this = $(this);
        var $tab = $this.find('li.active');
        var $link = $tab.find('a');
        var $panel = $($link.attr('href'));
        
        $this.on('click', '.tab-control', function(e){
            e.preventDefault();
            var $link = $(this);
            var id = this.hash;
            
            if (id && !$link.is('.active')) {
                $panel.removeClass('active');
                $tab.removeClass('active');
                
                $panel = $(id).addClass('active');
                $tab = $link.parent().addClass('active');
            }
        });
    });
    /**end of tabbed panel javascript**/
});

$(function(){
    $(window).on('load', function(){

        var showSlideNum = 5;
        var timing = 0;
        $('.slider ul')
        .on({
            'init': function(event, slick){
                event.target.parentNode.style.opacity = '1';

                if( isTouchDevice() !== true ){
                    var showSlides = slick.$slides.context.querySelectorAll('.slick-active');
                    setLastSlideClass( showSlides );

                    // コントロールの調整
                    $(document).on('mouseenter', '.slide-first', function(e){
                         var arrows = $(this).parents('.slick-slider').find('.slick-arrow');
                         arrows[0].classList.add('offset');
                    }).on('mouseleave', '.slide-first', function(e){
                         var arrows = $(this).parents('.slick-slider').find('.slick-arrow');
                         arrows[0].classList.remove('offset');
                    });
                    $(document).on('mouseenter', '.slide-last', function(e){
                         var arrows = $(this).parents('.slick-slider').find('.slick-arrow');
                         arrows[1].classList.add('offset');
                    }).on('mouseleave', '.slide-last', function(e){
                         var arrows = $(this).parents('.slick-slider').find('.slick-arrow');
                         arrows[1].classList.remove('offset');                   
                    });
                }

                var pointeron  = ( isTouchDevice() ) ? 'touchstart' : 'mousedown';
                var pointeroff = ( isTouchDevice() ) ? 'touchend'   : 'mouseup';

                $('.slick-arrow').on( pointeron,  function(){ this.classList.add('on'); });
                $('.slick-arrow').on( pointeroff, function(){ this.classList.remove('on'); });
            }
            ,'beforeChange': function(event, slick, currentSlide, nextSlide){
                if( isTouchDevice() !== true ){
                    var showSlides = slick.$slides.context.querySelectorAll('.slick-active');
                    removeLastSlideClass( showSlides );
                }
            }
            ,'afterChange': function(event, slick, currentSlide){
                if( isTouchDevice() !== true ){
                    var showSlides = slick.$slides.context.querySelectorAll('.slick-active');
                    setLastSlideClass( showSlides );
                }
                // SPの際、最後までスライドしたらバインド
                if( isTouchDevice() ){
                    toggleLocation( slick );
                }

            }
            ,'breakpoint' : function(event, slick, breakpoint){
                if( isTouchDevice() !== true ){
                    if( breakpoint === 640 )
                    {
                        var first = slick.$slides.context.querySelector('.slide-first');
                        var last  = slick.$slides.context.querySelector('.slide-last');

                        first.classList.remove('slide-first');
                        last.classList.remove('slide-last');

                    }else{
                        var showSlides = slick.$slides.context.querySelectorAll('.slick-active');
                        setLastSlideClass( showSlides );
                    }
                }

            }
        })
        .slick({
             slidesToShow: showSlideNum,
             slidesToScroll: 1,
             infinite: true,
             autoplay: true,
             prevArrow:'<div class="prev_wrap"><span class="prev">prev</span></div>',
             nextArrow:'<div class="next_wrap"><span class="next">next</span></div>',
             responsive : [
                 {
                     breakpoint:640,
                     settings:{
                         //variableWidth:true,
                         autoplay: false,
                         slidesToShow:1,
                         arrow : false,
                         centerMode: true,
                         infinite: false,
                     }
                 }
             ],
        });

        function setLastSlideClass( slides )
        {
            if( slides.length > 0 && slides.length === showSlideNum ) {
                slides[0].classList.add('slide-first');
                slides[4].classList.add('slide-last');
            }
        }
        function removeLastSlideClass( slides )
        {
            if( slides.length > 0 && slides.length === showSlideNum ) {
                slides[0].classList.remove('slide-first');
                slides[4].classList.remove('slide-last');
            }
        }



    });

//    // カレントクラス以外の要素はhrefを無効化
//    function setEventCurrentLink( elem ){
//        var eLink  = elem.target.querySelectorAll('a');
//        var eArray = Array.prototype.slice.call(eLink, 0);
//
//        eArray.forEach( function( obj, idx ){
//           obj.addEventListener( 'click', function(e){
//               var winW  = window.matchMedia('(max-width: 660px)').matches;
//               if(winW){
//                   if( obj.parentNode.classList.contains('slick-current') === false ){
//                       e.preventDefault();
//                       return false;
//                   }
//               }
//           });
//       });
//    }
//
    function toggleLocation( current ){
       if( current.$nextArrow[0].classList.contains('slick-disabled') )
        {
            var url = current.$slider[0].getAttribute('data-url');
            current.$nextArrow[0].onclick = function(){
                window.location.href = url;
            }
        }
        else
        {
            current.$nextArrow[0].onclick = null;
        }
    }
});

$(function () {

    var $win = $(window);

    // header
    var $header = $('header');
    if ($header[0].classList.contains('contents') === false) {
        $win.on('scroll load', function () {
            var s = document.documentElement.scrollTop || document.body.scrollTop;
            var m = 80;

            if (s > m) {
                $header[0].classList.add('contents');
                $header.find('#logo img').attr('src', '/img/logo_black.png');
            } else {
                $header.find('#logo img').attr('src', '/img/logo.png');
                $header[0].classList.remove('contents');
            }

        });
    }
    // pagetop
    $("#page_top").hide();
    $(window).on("scroll", function () {

        if ($(this).scrollTop() > 100) {
            $('#page_top').fadeIn("slow");
        } else {
            $('#page_top').fadeOut("slow");
        }



        scrollHeight = $(document).height();

        scrollPosition = $(window).height() + $(window).scrollTop();

        footHeight = $("footer").innerHeight();


        if (scrollHeight - scrollPosition <= footHeight) {

            $("#page_top").css({
                "position": "absolute",
                "bottom": footHeight + 60
            });
        } else {
            $("#page_top").css({
                "position": "fixed",
                "bottom": "20px"
            });
        }
    });

    $('#page_top a').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    /* photo-modal */
    $(".modal-trigger a").on('click', function () {
        $("#mdl-photo").attr('src', $(this).attr("href"));
        $("#mdl-photo-caption").text($(this).attr("title"));
        $("#photo-modal").fadeIn();

        return false;
    });
    $("#photo-modal").on('click', function () {
        $("#photo-modal").fadeOut();
    });

    $(".view_terms #view").on('click', function () {
        $(".terms_contents").show();
    });

    /* gallery-modal */
    $(".btn-gallery").on('click', function () {
        getImageSize($('#gallery-case figure img'));
        $("#gallery-case").fadeIn();

        var objimg = $(this).children('img').attr('src');
        $("#gallery-img").attr('src', objimg);
    });
    $("#gallery-case .close").click(function () {
        $("#gallery-case").fadeOut(function () {
            $(this).find('figure img').removeClass('land port');
        });
    });
    $("#gallery-case li img").on('click', function () {
        var objImg = $(this);

        $("#gallery-case figure").stop(true, true).animate({
            opacity: "0"
        }, 500, function () {
            $("#gallery-case figure img").attr("src", objImg.attr("src"));
            getImageSize($("#gallery-case figure img"));
        });
        $("#gallery-case figure").stop(true, true).animate({ opacity: "1" }, 3000);
    });


    var $movies_navi = $('.movies_navi nav'),
        $sub_menu = $('.movies_navi .sub_menu');

    var $active = $movies_navi.find('>ul>li.active');
    $active.prev('.separater').addClass('offset');
    $active.next('.separater').addClass('offset');


    if (isTouchDevice()) {
        $movies_navi.on('click', function (e) {
            e.stopPropagation();
        });

        $movies_navi.find('> ul > li').on('click', function (e) {
            e.stopPropagation();
            $sub_menu.hide();

            $movies_navi.find('.separater').removeClass('offset');
            if (this.classList.contains('on')) {
                $(this).children('.sub_menu').hide();

                this.classList.remove('on');
            } else {
                $(this).children('.sub_menu').show();
                $('> ul > li', $movies_navi).removeClass('on');
                this.classList.add('on');
                $(this).prev('.separater').addClass('offset');
                $(this).next('.separater').addClass('offset');
            }
        });
        $sub_menu.find('li').on({
            'touchstart': function (e) {
                e.stopPropagation();
                this.classList.add('on');
            },
            'touchend': function (e) {
                e.stopPropagation();
                this.classList.remove('on');
            }
        });
        $('#container').on('click', function (e) {
            $('>ul>li', $movies_navi).removeClass('on');
            $sub_menu.hide();
        });
    } else {
        $('>ul>li', $movies_navi).on({
            'mouseenter': function (e) {
                $(this).next('.separater').addClass('offset');
                $(this).prev('.separater').addClass('offset');

                $(this).children('.sub_menu').stop(true, true).fadeIn("fast");
                $(this).addClass('on');
            },
            'mouseleave': function (e) {
                $(this).children('.sub_menu').stop(true, true).fadeOut("fast");

                $(this).prev('.separater').removeClass('offset');
                $(this).next('.separater').removeClass('offset');

                this.classList.remove('on');
            }
        });
        $sub_menu.find('li').on({
            'mouseenter': function (e) {
                e.stopPropagation();
                this.classList.add('on');
            },
            'mouseleave': function (e) {
                e.stopPropagation();
                this.classList.remove('on');
            }
        });
    }

});


$(function () {
    var pointon = (isTouchDevice()) ? 'touchstart' : 'mousedown';
    var pointoff = (isTouchDevice()) ? 'touchend' : 'mouseup';

    var $menu = $('#menu'),
        $win = $(window),
        scrlpos;

    $menu.on('click touchstart touchmove touchend', function (e) {
        e.stopPropagation();
    });

    $win.on('load resize orientationchange', function () {

        WindowHeight = window.innerHeight;
        $('.main_menu, .movie_genre', $menu).css('height', WindowHeight);
    });


    $menu.find('.pc_hamburger').on(pointon, function () {
        if ($menu.hasClass('open')) {
            $menu.removeClass('open');
            $menu.find('.titles').removeClass('open');
            $('.menu_bg').fadeOut('fast');
        } else {
            $('.menu_bg').fadeIn('fast');
            $menu.addClass('open');
        }
    });


    if (isTouchDevice()) {
        $menu.find('.titles').on({
            'click': function (e) {
                $menu.find('.titles').removeClass('open');
                this.classList.add('open');
            }
        });
    } else {
        $menu.find('.titles').on({
            'mouseenter': function (e) {
                this.classList.add('open');
            },
            'mouseleave': function () {
                this.classList.remove('open');
            }
        });
    }



    $('.menu_bg').on(pointoff, function () {
        var $this = $(this);

        $menu.removeClass('open');
        $menu.find('.open').removeClass('open');



        setTimeout(function () {
            $this.fadeOut('fast');
        }, 100);
    });

    if (isTouchDevice()) {
        $menu.find('.highlight, a').on({
            'touchstart': function (e) {
                this.classList.add('on');
            },
            'touchend': function (e) {
                this.classList.remove('on');
            }
        });
    }
    else {
        $menu.find('.highlight, a').on({
            'mouseenter': function (e) {
                this.classList.add('on');
            },
            'mouseleave': function (e) {
                this.classList.remove('on');
            }
        });
    }


});


function isTouchDevice() {

    var ua = navigator.userAgent;
    var device;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
        device = 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        device = 'tab';
    } else {
        device = 'pc';
    }

    var result = false;
    if (window.ontouchstart === null && device !== 'pc') {
        result = true;
    }
    return result;
}

function fnAjax(param) {
    if ($ === jQuery) {
        var d = $.Deferred();
        $.ajax({
            type: 'POST',
            async: true,
            url: param['url'],
            data: param['data'],
            scriptCharset: "utf-8",
            dataType: 'text'
        })
            .done(function (data) {
                console.log('ajax success.');
                d.resolve(data);
            })
            .fail(function (data) {
                console.log('ajax fail.');
                d.reject(data);
            })
            .always(function () {
                console.log('ajax complete.');
            });
        return d.promise();
    }
}

function getImageSize(target) {
    target.removeClass('land port');

    img = new Image();
    img.src = target.attr('src');
    var target_h = img.height,
        target_w = img.width;

    console.log(target_w + ', ' + target_h);

    if (target_w >= target_h) {
        target.addClass('land');
    } else if (target_w < target_h) {
        target.addClass('port');
    }

}

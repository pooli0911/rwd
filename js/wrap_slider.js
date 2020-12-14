; (function ($) {
    var defaults = {
        img_path: '/img/',
        bg_slider: [],
        duration: 7000,
    };
    $.fn.bgSlider = function (options) {
        var self = this;

        var param = {};
        param.settings = $.extend({}, defaults, options);

        var img_cnt = param.settings.bg_slider.length;

        var titleWrap = document.createElement('div');
        titleWrap.classList.add('main_img');
        //titleWrap.insertAdjacentHTML( 'afterBegin', '<a><h2></h2></a><div class="link"></div>' );
        self[0].insertAdjacentElement('afterEnd', titleWrap);

        var loop_id,
            fade_id;

        if (img_cnt > 0) {
            var i = 0;
            var $slides = $(self).find('.slides');

            var $controls = $(self).find('.bg_contorols');

            for (var j = 0; j < img_cnt; j++) {
                $controls.append('<li><div class="gauge"><span class="bar"></span></div></li>');
            }

            var li = Array.prototype.slice.call($controls[0].querySelectorAll('li'), 0);
            li.forEach(function (el, idx) {
                el.addEventListener('click', function () {
                    console.log(i);
                    console.log(idx);
                    if (i !== idx + 1) {
                        clearTimeout(loop_id);
                        clearTimeout(fade_id);

                        i = idx;
                        bgLoop();
                    }
                }, false);
            });

            function bgLoop() {
                if (i === 1) {
                    var allTitles = getAllTitles();

                    $slides[0].classList.add('all_titles');
                    $slides[0].textContent = '';
                    $slides[0].appendChild(allTitles);
                } else {
                    if ($slides[0].classList.contains('all_titles')) {
                        $slides[0].classList.remove('all_titles');
                    }
                    var file_name = (window.innerWidth < 640) ? 'sp.' + param.settings.bg_slider[i] : param.settings.bg_slider[i];
                    //$slides[0].setAttribute( 'style', 'background-image : url(' + param.settings.img_path + file_name + ')' );
                    $slides[0].innerHTML = '<img src="' + param.settings.img_path + file_name + '" >';
                }

                $slides.find('img').imagesLoaded(function () {

                    $slides[0].style.opacity = '100';

                    li.forEach(function (elem, index) {
                        var bar = elem.querySelector('.bar');
                        if (i === index) {
                            bar.style.transitionDuration = param.settings.duration / 1000 + 's';
                            setTimeout(function () {
                                elem.classList.add('active');
                            }, 100);
                        } else {
                            elem.classList.remove('active');
                            bar.style.transitionDuration = '0s';
                        }
                    });

                    changeTitle(titleWrap, i);

                    fade_id = setTimeout(function () {
                        $slides[0].style.opacity = '0';
                    }, param.settings.duration - 700);

                    i++;
                    if (i === img_cnt) i = 0;

                    loop_id = setTimeout(bgLoop, param.settings.duration);
                });
            }
            bgLoop();


            function changeTitle(wrap, idx) {
                wrap.textContent = '';
                wrap.setAttribute('data-type', idx);
                //var h2    = wrap.querySelector('h2'); 
                //var link  = wrap.querySelector('.link'); 
                switch (idx) {
                    case 0: // shin godzilla
                        //h2.innerText = 'GODZILLA';
                        //link.innerHTML = '<a href="/movies/godzilla.html"><img src="/img/top_link_godzilla_wh.png" alt="Gozilla Movies"></a>';
                        wrap.insertAdjacentHTML('afterBegin', '<a href="/movies/godzilla.html"><h2>Godzilla</h2></a><div class="link"></div>');
                        break;
                    case 1: // all titles
                        ///h2.innerText = '';
                        ///link.textContent = '';
                        if ($('#lang').val() === '_zh') {
                            wrap.insertAdjacentHTML('afterBegin', '<a href="/movies/"><h2>&#20840;&#37096;&#20316;&#21697;</h2></a><div class="link"></div>');
                        }
                        else {
                            wrap.insertAdjacentHTML('afterBegin', '<a href="/movies/"><h2>All titles</h2></a><div class="link"></div>');
                        }
                        break;
                    case 2: // godzilla
                        //h2.innerText = 'GODZILLA';
                        //link.innerHTML = '<a href="/movies/godzilla.html"><img src="/img/top_link_godzilla_bk.png" alt="Gozilla Movies"></a>';
                        wrap.insertAdjacentHTML('afterBegin', '<a href="/movies/godzilla.html"><h2>Godzilla</h2></a><div class="link"></div>');
                        break;
                }
            }


        }

        function getAllTitles() {
            var frame = document.createElement('div');
            frame.setAttribute('class', 'all_titles_frame');
            var reflect = document.createElement('div');
            reflect.setAttribute('class', 'reflect');
            reflect.setAttribute('id', 'reflect');

            var nodes = document.querySelectorAll('#lineup > .gallery li');
            var list = Array.prototype.slice.call(nodes, 0);

            var fragment = document.createDocumentFragment();
            list.forEach(function (li, index) {
                var file_path = li.getAttribute('data-filepath');

                var img = document.createElement('img');
                img.setAttribute('src', file_path);
                fragment.appendChild(img);

            });
            reflect.appendChild(fragment)
            frame.appendChild(reflect);
            return frame;
        }


        return this;
    }
})(jQuery);

$(document).ready(function () {
	$(document).on('click','.js-popup-review-open, .js-popup-product-open',function(e){
		e.preventDefault();
		$this=$(this);
		$($this.attr('data-target')).fadeIn(600);
		$($this.attr('data-target')).find('.modal-content-wrapper').load($this.data('url'),function(){
			$("#product-popup .product-img").imagezoomsl({
				zoomrange: [2, 2],
				zoomstart: 2,
				innerzoom: true,
				magnifierborder: "none"
			});
			$('.js-similar-goods-slider').slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 4000,
				pauseOnHover: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
						}
					}
				]
			});		
		});
	});
	$("#catalog-sort").change(function(){
		$.fn.yiiListView.update("products-wrapper",{data:{sortAttr:"price",sort:$(this).val()}});  
	});
	$("#best-price").change(function(){
		val='';
		if($(this).is(':checked')){
			val=$(this).val();
		}
		data=[];
		attribute=$(this).attr('name');
		data[attribute]=val;
		$.fn.yiiListView.update("products-wrapper",{data:data});  
	});	
	$(document).on('change','.type-filter-input',function(){
		$(this).parents('form').submit();
	});
	$(document).on('submit', '#filter-form', function(event) {
		event.preventDefault();
		$this=$(this);
		$.pjax.submit(event, '#products-wrapper',{'fragment': '#products-wrapper','push': false,'replace': false,'scrollTo': false,'timeout': 100000,});
		return false;
	});
    var windowW;
    $(window).resize(function () {
        windowW = $(window).width();
        if (windowW >= 992) {
            $('#js-menu-btn').removeClass('open');
            $('#js-menu').removeAttr('style');
            $('.js-submenu-btn').removeClass('open');
            $('.js-submenu').removeAttr('style');
        }
    });
    $(window).trigger('resize');
   
    //scroll menu
    var menu = $('#js-menu-wrapper');
    var menuTop = menu.offset().top;
    $(window).scroll(function () {
        fixMenu();
    });
    fixMenu();
    function fixMenu() {
        if ($(window).scrollTop() >= menuTop) {
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
        }
    }
    
    //mobile menu
    $('#js-menu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#js-menu').slideToggle();
    });
    $('.js-submenu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $(this).next('.js-submenu').slideToggle();
    });
   
    //welcome-slider
    if ($('*').is('#js-welcome-slider')) {
        $('#js-welcome-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            dots: true,
        });
    }
    //review-slider
    if ($('*').is('.js-reviews-slider')) {
        $('.js-reviews-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    //best-slider
    if ($('*').is('.js-best-slider')) {
        $('.js-best-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    //similar-goods-slider
    $('#product-popup').on('shown.bs.modal', function () {
        $('.js-similar-goods-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
        $("#product-popup .product-img").imagezoomsl({
            zoomrange: [2, 2],
            zoomstart: 2,
            innerzoom: true,
            magnifierborder: "none"
        });
    });
    $('#product-popup').on('hidden.bs.modal', function (e) {
        $('.js-similar-goods-slider').slick('unslick');
    });
    //select
    if ($('*').is('select')) {
        $('select').styler();
    }
    //input [type="file"]
    $('.js-file').change(function () {
        var file = $(this),
            fileValue = file.val(),
            label = file.next('.js-file-label');
        console.log(fileValue);
        if (fileValue !== '') {
            label.text(fileValue);
        }
    });
    //catalog layout
    $('#js-catalog-list-rows-btn').click(function () {
        $(this).addClass('active');
        $(this).siblings('#js-catalog-list-cols-btn').removeClass('active');
        $('.catalog-list').addClass('catalog-list-rows');
        $('.catalog-list .card-wrapper').removeClass('col-sm-6 col-lg-4');
    });
    $('#js-catalog-list-cols-btn').click(function () {
        $(this).addClass('active');
        $(this).siblings('#js-catalog-list-rows-btn').removeClass('active');
        $('.catalog-list').removeClass('catalog-list-rows');
        $('.catalog-list .card-wrapper').addClass('col-sm-6 col-lg-4');
    });
    //hidden-content
    $('.js-btn-show').click(function () {
        $(this).toggleClass('active');
        $(this).siblings('.js-hidden-content').slideToggle();
    });
    //range-slider
    if ($('*').is('.js-ion-range-slider')) {
        var rangeSlider = $('.js-ion-range-slider'),
            rangeSliderFrom = rangeSlider.closest('.js-catalog-price').find('.js-range-min'),
            rangeSliderTo = rangeSlider.closest('.js-catalog-price').find('.js-range-max'),
            rangeSliderMin = rangeSlider.data('min'),
            rangeSliderMax = rangeSlider.data('max'),
            range,
            from,
            to;
        var updateValues = function (elem) {
            rangeSlider = $(elem);
            rangeSliderFrom = $(elem).closest('.js-catalog-price').find('.js-range-min');
            rangeSliderTo = $(elem).closest('.js-catalog-price').find('.js-range-max');
            $(rangeSliderFrom).prop("value", from);
            $(rangeSliderTo).prop("value", to);
        };
        rangeSlider.ionRangeSlider({
            type: "double",
            hide_min_max: true,
            force_edges: true,
            prettify_enabled: false,
            onChange: function (data) {
                from = data.from;
                to = data.to;
                updateValues(data.input);
            },
			onFinish: function(data){
				$($(data.input).parents('form')).submit();
			}
        });
        range = rangeSlider.data("ionRangeSlider");
        var updateRange = function (from, to) {
            range.update({
                from: from,
                to: to
            });
        };
        $(rangeSliderFrom).on("change", function (event) {
            to = $(event.target).closest('.js-catalog-price').find('.js-range-max').prop("value");
            from = +$(this).prop("value");
            if (from < rangeSliderMin) {
                from = rangeSliderMin;
            }
            if (from > rangeSliderMax) {
                from = rangeSliderMax;
            }
            if (to >= 1 && from > to) {
                from = to;
            }
            var target = $(event.target).closest('.js-catalog-price').find('.js-ion-range-slider');
            updateValues(target);
            range = $(target).data("ionRangeSlider");
            updateRange(from, to);
        });
        $(rangeSliderTo).on("change", function (event) {
            from = $(event.target).closest('.js-catalog-price').find('.js-range-min').prop("value");
            to = +$(this).prop("value");
            if (to > rangeSliderMax) {
                to = rangeSliderMax;
            }
            if (to < rangeSliderMin) {
                to = rangeSliderMin;
            }
            if (from >= 1 && to < from) {
                to = from;
            }
            var target = $(event.target).closest('.js-catalog-price').find('.js-ion-range-slider');
            updateValues(target);
            range = $(target).data("ionRangeSlider");
            updateRange(from, to);
        });
    }
    //scroll to section
    if($('*').is('.js-link')) {
        var links = $('.js-link');
        links.click(function(e) {
            e.preventDefault();
            var link = $(this),
                linkHref = link.attr('href'),
                top = $(linkHref).offset().top - 70;
            links.removeClass('active');
            link.addClass('active');
            $('body,html').animate({scrollTop: top}, 900);
        });
    }
    
    //popup
    var overlay = $('.popup-bg');
    var popup = $('.popup');
    var closePopupBtn = $('.js-popup-close');
    var openPopupBtn = $('.js-popup-open');
    var href = '';
    $(openPopupBtn).click(function (e) {
        e.preventDefault();
        openPopup(this);
    });
    $('.product-popup-content .js-open-popup').click(function (e) {
        e.preventDefault();
        openPopup(this);
        closePopup();
        setTimeout(openPopup, 20);
    });
    $(document).mouseup(function (e) {
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            closePopup();
        }
    });
    $(closePopupBtn).click(function () {
        closePopup();
    });
    $(document).keyup(function(e) {
        if (e.which === 27) {
            closePopup();
        }
    });
    function closePopup() {
        overlay.fadeOut();
        $('html, body').removeClass('open-popup');
        if (href === '#product-popup') {
            $('.js-similar-goods-slider').slick('unslick');
        }
    }
     function openPopup(btn) {
         href = $(btn).attr('data-href');
         $(href).fadeIn();
         $('html, body').addClass('open-popup');
         if (href === '#product-popup') {
             $('.js-similar-goods-slider').slick({
                 infinite: true,
                 slidesToShow: 3,
                 slidesToScroll: 1,
                 autoplay: true,
                 autoplaySpeed: 4000,
                 pauseOnHover: true,
                 responsive: [
                     {
                         breakpoint: 992,
                         settings: {
                             slidesToShow: 2,
                         }
                     },
                     {
                         breakpoint: 641,
                         settings: {
                             slidesToShow: 1,
                         }
                     }
                 ]
             });
             $("#product-popup .product-img").imagezoomsl({
                 zoomrange: [2, 2],
                 zoomstart: 2,
                 innerzoom: true,
                 magnifierborder: "none"
             });
         }
     }
});
function init(map) {
	if(document.getElementById(map)==null){
		return false;
	}
	myMap = new ymaps.Map(map, {
		center: [55.753994, 37.622093],
		zoom: 9
	});
	myMap.behaviors.disable('scrollZoom'); 
	ymaps.geocode(scheme_address, {
		results: 1
	}).then(function (res) {
			var firstGeoObject = res.geoObjects.get(0),
				coords = firstGeoObject.geometry.getCoordinates(),
				bounds = firstGeoObject.properties.get('boundedBy');
			firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
			firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
			myMap.geoObjects.add(firstGeoObject);
			myMap.setBounds(bounds, {
				checkZoomRange: true
			});
			$('#'+map).addClass('active');
		});
}
function initStoreMap(points,map,name,hint,content) {
	if(document.getElementById(map)==null){
		return false;
	}
	myMap = new ymaps.Map(map, {
		center: [55.753215, 37.622504],
		zoom: 9,
		controls:[]
	});
	myMap.behaviors.disable('scrollZoom'); 
	objectManager = new ymaps.ObjectManager({
		clusterize: true,
		gridSize: 32,
		clusterDisableClickZoom: true
	});	
	objectManager.add(points);
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);	
}
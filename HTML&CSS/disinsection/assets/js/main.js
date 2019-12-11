(function ($) {
	"use strict";

	// Sticky menu
	var $window = $(window);
	$window.on('scroll', function () {
		var scroll = $window.scrollTop();
		if (scroll < 300) {
			$(".sticky").removeClass("is-sticky");
		} else {
			$(".sticky").addClass("is-sticky");
		}
	});

	// Off Canvas Open close
	$(".mobile-menu-btn").on('click', function () {
		$("body").addClass('fix');
		$(".off-canvas-wrapper").addClass('open');
	});

	$(".btn-close-off-canvas,.off-canvas-overlay").on('click', function () {
		$("body").removeClass('fix');
		$(".off-canvas-wrapper").removeClass('open');
	});

	// offcanvas mobile menu
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
	});

	// hero slider active js
	$('.hero-slider-active').slick({
		fade: true,
		speed: 1000,
		autoplay: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				arrows: false,
				dots: true
			}
		}]
	});


	// service carousel active js
	$('.service-carousel-active').slick({
		speed: 1000,
		slidesToShow: 3,
		autoplay: false,
		arrows: false,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});

	// testimonial cariusel active js
	$('.testimonial-content-carousel').slick({
        arrows: false,
        asNavFor: '.testimonial-thumb-carousel'
    });


    // product details slider nav active
    $('.testimonial-thumb-carousel').slick({
        slidesToShow: 3,
        asNavFor: '.testimonial-content-carousel',
		centerMode: true,
		arrows: false,
        centerPadding: 0,
		focusOnSelect: true
	});

	// blog carousel active js
	$('.blog-carousel-active').slick({
		speed: 1000,
		slidesToShow: 3,
		autoplay: false,
		arrows: false,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});


	// Background Image JS start
	var bgSelector = $(".bg-img");
	bgSelector.each(function (index, elem) {
		var element = $(elem),
			bgSource = element.data('bg');
		element.css('background-image', 'url(' + bgSource + ')');
	});


	//nice select active start
	$('select').niceSelect();


	$('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

    });

    // mailchimp active js
    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);

        } else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
	}


	// Counter To Up JS
    $('.odometer').each(function () {
        $(this).appear(function () {
            var $this = $(this),
                $dataValue = $this.data('count');

            setTimeout(function () {
                $this.html($dataValue);
            }, 1000);
        })
    });
	
	
})(jQuery);


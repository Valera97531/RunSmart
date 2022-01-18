@@include('jquery-3.5.1.js')
@@include('slick.js')
@@include('jquery.validate.js')
@@include('wow.js')
@@include('jquery.maskedinput.js')


$(document).ready(function(){

	// slider
	$('.carousel__wrapper').slick({
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		infinite: true,
		adaptiveHeight: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 992,
      		settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1
     		   }
			}
		]
	});

	// tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
		$(this)
		  .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
	});

	// additional-description
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog__item-content').eq(i).toggleClass('catalog__item-content-active');
				$('.catalog__item-inner').eq(i).toggleClass('catalog__item-inner-active');
			});
		});
	}

	toggleSlide('.catalog__item-link');
	toggleSlide('.catalog__item-back');

	// modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button-mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog__item-subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	// validate-form
	function valideForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: 'Пожалуйста, введите свое имя',
				phone: 'Пожалуйста введите свой номер телефона',
				email: {
					required: 'Пожалуйста, введите свою почту',
					email: 'Неправильная почта'
				}
			}
		});
	}

	valideForms('#consultation form');
	valideForms('#consultation-form');
	valideForms('#order form');


	// masted-input 
	$('input[name=phone]').mask('+38 (999) 999-99-99');

	// php-mailer
	// $('form').submit(function(e) {
	// 	e.preventDefault();
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: 'mailer/smart.php',
	// 		data: $(this).serialize()
	// 	}).done(function() {
	// 		$(this).find('input').val('');
	// 		$('#consultation, #order').fadeOut('slow');
	// 		$('.overlay, #thanks').fadeIn('slow');
	// 		$('form').trigger('reset');
	// 	});
	// 	return false;
	// });

	// page-up
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.page-up').fadeIn();
		} else {
			$('.page-up').fadeOut();
		}
	});

	// smooth-scroll
	$("a[href='#page-up']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	// animated-wow
	new WOW().init();
});
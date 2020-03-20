$(document).ready(function () {

	//Portfolio slider
	$('.folio_wrapper').flexslider({
		animation: "slide",
		slideshow: true,
		animationLoop: true,
		itemWidth: 235,
		itemMargin: 70,
		directionNav: false,
	});

	//show sticky header on scroll
	let WinHeight = $('.billboard').innerHeight() - 100;

	$(document).on('scroll', window, function () {
		let vscroll = $(window).scrollTop();

		if (vscroll > WinHeight) {

			$("header.hero_header #sticky_menu").removeClass('active');
			hide_nav_menu('hero_header');
			$(".animated header.header_fixed").stop().animate({
				marginTop: 0
			}, 200);

		} else {

			$("header.header_fixed #sticky_menu").removeClass('active');
			hide_nav_menu('header_fixed');
			$(".animated header.header_fixed").stop().animate({
				marginTop: "-100px"
			}, 80);

		}
	});

	//Navigation animated scroll
	$(document).on('click', 'header nav ul li a', function (event) {
		event.preventDefault();
		let section = $(this).attr('href');
		let section_pos = $(section).position();

		if (section_pos) {
			section_pos = section_pos.top - 50;
			$(window).scrollTo({top: section_pos, left: '0px'}, 1000, {easing: 'easeInOutCubic'});
		}

	});

	//menu items show/hide animation
	let block;
	block = false;

	$(document).on('click', '#sticky_menu', function (event) {
		event.preventDefault();
		let header_pos;

		if ($(this).hasClass('fixed_nav')) {
			header_pos = 'header_fixed';
		} else if ($(this).hasClass('hero_nav')) {
			header_pos = 'hero_header';
		}

		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			show_nav_menu(header_pos);
			block = false;
		} else {
			$(this).removeClass('active');
			block = true;
			hide_nav_menu(header_pos);
		}

	});

	//function to show/animate the nav menu elements
	let timer;

	function show_nav_menu(selector) {
		let count_li = $('header.' + selector + ' nav ul li').length - 1;

		$('header.' + selector + ' nav ul li').each(function (i) {

			timer = setTimeout(function () {

				if (!block) {
					i = count_li - i;
					$('header.' + selector + ' nav ul li').eq(i).fadeIn(300).animate({marginTop: '0'}, {
						duration: 300,
						queue: false
					});
				} else {
					clearTimeout(timer);
					$('header.' + selector + ' nav ul li').hide();
					block = true;
				}

			}, 200 * i);
		});
	}

	//function to hide the nav menu
	function hide_nav_menu(selector) {
		$('header.' + selector + ' nav ul li').stop().fadeOut(300, function () {
			$(this).css({marginTop: '-10px;'});
		});
	}
});

// ---------------------------------------------
// タブメニュー
// ---------------------------------------------

$(document).ready(function () {
	clickAction();
});

function clickAction() {
	$('.headline li').click(function () {
		$('.desc-list > li').hide();
		$('.headline li').removeClass('current');
		$(this).addClass('current');
		index = $(".headline li").index(this) + 1;
		$('.desc-list > li:nth-child(' + index + ')').removeClass('current');
		$('.desc-list > li:nth-child(' + index + ')').fadeIn();
		$('.desc-list > li:nth-child(' + index + ')').addClass('current');
	});
}

// ---------------------------------------------
// スクロールしたら固定ヘッダーのCSSを変える - Intersection Observer
// ---------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
	console.log(location.pathname);
	if (location.pathname == '/recruit/') {
    // ヘッダーと交差の基準となる要素を定義
    const elmHeader = document.querySelector('#js-header');
    const elmIntersect = document.querySelector('#js-header-observer');
    // 交差した時に実行する関数を定義
    // （ヘッダーにカスタム属性を付ける）
    const doWhenIntersect = entries => {
      elmHeader.setAttribute('data-js-scroll', String(!entries[0].isIntersecting));
    }
    // IntersectionObserverをインスタンス化&実行
    const observer = new IntersectionObserver(doWhenIntersect, {});
		observer.observe(elmIntersect);

  }
});

// ---------------------------------------------
// slick-slider
// ---------------------------------------------
$('#main-slider').each(function () {
	$(this).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		speed: 2000,
		autoplaySpeed: 4000,
		infinite: true,
		dots: true,
		arrows: false,
		fade: true,
		lazyLoad: 'progressive',
	});
});

$('#interview-slider').each(function () {
	$(this).slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		speed: 2000,
		autoplaySpeed: 4000,
		infinite: true,
		dots: false,
		arrows: true,
		prevArrow: '<img src="/recruit/staff/office/img/icon_arrow_l.svg" class="slide-arrow prev-arrow">',
		nextArrow: '<img src="/recruit/staff/office/img/icon_arrow_r.svg" class="slide-arrow next-arrow">',
		lazyLoad: 'progressive',
		responsive: [
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					centerMode: true,
				},
			},
		],
	});
});

// TOPに戻る
$(function () {
	var pagetop = $(".pagetop");
	//ボタン非表示
	pagetop.hide();
	pagetop.css("display", "none");
	//100px スクロールしたらボタン表示
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$("body, html").animate({ scrollTop: 0 }, 500);
		return false;
	});

	// $('.g-h .search-box').click(function () {
	// 	$('.header-search').toggleClass('active');
	// });
	// if(location.pathname != '/shoki-rinshou/'){
	// 	$('.g-h .g-nav').addClass('notfront');
	// }
	$('.g-h .g-h__toggle').click(function () {
		$('.g-h__toggle').toggleClass('active');
    $('#drower-menu').fadeToggle(200);
    $('body').toggleClass('hidden');
	});
  if (location.pathname !== '/recruit/') {
		$('.g-h').css('background-color', '#fff');
		$('.g-h .g-nav li .link').css('color', '#333');
  }

});
//スムーススクロール
$(function () {
	// #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
	$('a[href^="#"]').click(function () {
		// 移動先を0px調整する。0を30にすると30px下にずらすことができる。
		var adjust = 0;
		if (location.pathname.match('next')) {
			var adjust = -300;
		}
		// スクロールの速度（ミリ秒）
		var speed = 400;
		// アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
		var href = $(this).attr("href");
		// 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
		var position = target.offset().top + adjust;
		// スムーススクロール linear（等速） or swing（変速）
		$('body,html').animate({ scrollTop: position }, speed, 'swing');
		return false;
	});
});


(function (d, w, $) {
	'use strict';

	// var _ua = window.navigator.userAgent.toLowerCase();
	// let _ms = false;
	// ---------------------------------------------
	// IE11の場合bodyにクラスを付与
	// ---------------------------------------------
	// if( _ua.indexOf( 'trident' ) > -1 ) {
	// 	document.body.classList.add( 'ie11' );
	// 	_ms = true;
	// } else
	// if( _ua.indexOf( 'edge' ) > -1 ) {
	// 	_ms = true;
	// }
	// ---------------------------------------------
	// viewportの切り替え
	// ---------------------------------------------
	// $( '#viewport' ).remove();
	// if( ( _ua.indexOf( 'iphone' ) > 0 ) || _ua.indexOf( 'ipod' ) > 0 || ( _ua.indexOf( 'android' ) > 0 && _ua.indexOf( 'mobile' ) > 0 ) ) {
	// 	// console.log( 'mobile' );
	// 	if(w.innerWidth < 768) {
	// 		$( 'head' ).prepend( '<meta name="viewport" id="viewport" content="width=device-width,initial-scale=1, viewport-fit=cover">' );
	// 	}else{
	// 		$( 'head' ).prepend( '<meta name="viewport" id="viewport" content="width=1100, viewport-fit=cover">' );
	// 	}
	// } else {
	// 	$( 'head' ).prepend( '<meta name="viewport" id="viewport" content="width=1100, viewport-fit=cover">' );
	// }

	// var _hash = location.hash;

	// $( function() {
	// ---------------------------------------------
	// matchHeight
	// ---------------------------------------------
	// $( '.mh' ).matchHeight();
	// ---------------------------------------------
	// Magnificpopup
	// ---------------------------------------------
	// $( '.mfp-image' ).magnificPopup( {
	// 	type: 'image'
	// } );
	// $( '.mfp-inline' ).magnificPopup( {
	// 	type: 'inline'
	// } );
	// ---------------------------------------------
	//responsive Imagemap link
	// ---------------------------------------------
	// $( 'img[usemap]' ).rwdImageMaps();
	// //move2hash
	// var _m2h = new move2hash();
	// _m2h.init();
	// $( w ).on( 'load', function() {
	// 	_m2h.start();
	// } );
	// ---------------------------------------------
	// scroll-hint
	// ---------------------------------------------
	if ($('#js-scroll').length) {
		new ScrollHint('#js-scroll', {
			i18n: {
				scrollable: 'スクロールできます'
			}
		});
	}
	// ---------------------------------------------
	// ページ内ナビのレスポンシブ対応
	// ---------------------------------------------
	// $( '.pageanchor' ).each( function( i, elm ) {
	// 		var _select = $( '<div class="selecton"><select><option value="" selected>MENU</option></select></div>' );
	// 		$( this ).find( '.nav-item' ).each( function( i, elm ) {
	// 			let _anchor = $( this ).find( '.nav-link' ).data( 'anchor' );
	// 			let _type = "scroll";
	// 			if( !_anchor ) {
	// 				_anchor = $( this ).find( '.nav-link' ).attr( 'href' );
	// 				_type = "link";
	// 				if( $( this ).find( '.nav-link' ).attr( 'target' ) === "_blank" ) {
	// 					_type = "blank";
	// 				}
	// 			}
	// 			var _option = $( '<option/>' ).text( $( this ).find( '.nav-link' ).text() ).val( _anchor ).data( 'type', _type );
	// 			_select.find( 'select' ).append( _option );
	// 		} );
	// 		$( this ).append( _select );
	// 	} )
	// 	.on( 'change', 'select', function() {
	// 		var _v = $( this ).val();
	// 		if( _v.length < 1 ) return false;

	// 		var _tar = $( this ).find( 'option:selected' );
	// 		if( _tar.data( 'type' ) === "scroll" ) {
	// 			_m2h.move( _v );
	// 		} else
	// 		if( _tar.data( 'type' ) === "link" ) {
	// 			location.href = _v;
	// 		} else
	// 		if( _tar.data( 'type' ) === "blank" ) {
	// 			window.open( _v );
	// 		}
	// 	} );
	// ---------------------------------------------
	// タブのレスポンシブ対応
	// ---------------------------------------------
	// $( '.tabnav' ).each( function( i, elm ) {
	// 		var _select = $( '<div class="selecton"><select/></div>' );
	// 		$( this ).find( '.nav-item' ).each( function( i, elm ) {
	// 			var _a = $( this ).find( '.nav-link' );
	// 			var _option = $( '<option/>' ).text( _a.text() ).val( i );
	// 			if( _a.attr( 'href' ) === _hash ) {
	// 				_a.click();
	// 				_option.attr( 'selected', true );
	// 			}
	// 			_select.find( 'select' ).append( _option );
	// 		} );
	// 		$( this ).find( '.inner' ).append( _select );
	// 	} )
	// 	.on( 'change', 'select', function() {
	// 		// console.log($(this).val());
	// 		$( this ).closest( '.tabnav' ).find( '.nav-tabs' ).find( '.nav-link' ).eq( $( this ).val() ).tab( 'show' );
	// 	} );
	// ---------------------------------------------
	// アコーディオンの開閉イベント補完
	// ---------------------------------------------
	// $( '.panel' ).find( '.panel-heading' ).find( 'a' ).append( '<span class="icon"/>' );
	// $( '.panel-collapse' ).on( 'show.bs.collapse hidden.bs.collapse', function( e ) {
	// 	// console.log(e);
	// 	// var _id = e.target.id;
	// 	if( e.type === 'show' ) {
	// 		$( this ).closest( '.panel' ).addClass( 'collapse_show' );
	// 	} else {
	// 		$( this ).closest( '.panel' ).removeClass( 'collapse_show' );
	// 		$( this ).find( '.panel-collapse' ).collapse( 'hide' );
	// 	}
	// } );
	// $( '.panel-title' ).each( function() {
	// 	var _a = $( this ).find( 'a' );
	// 	if( _a.attr( 'href' ) === _hash ) {
	// 		_a.click();
	// 		if( $( this ).parents( '.panel' ).length > 0 ) {
	// 			$( this ).parents( '.panel' ).find( '.panel-title > a' ).click();
	// 		}
	// 	}
	// } );
	// ----------------------------------------------
	// Windows resize Event
	// ----------------------------------------------
	// let _resizeTimer = false;
	// let _size = w.innerWidth;
	// $( w ).on( 'resize', function() {
	// 	if( _resizeTimer ) {
	// 		clearTimeout( _resizeTimer );
	// 	}
	// 	_resizeTimer = setTimeout( function() {
	// 		if( _size !== w.innerWidth ) {
	// 			_size = w.innerWidth;
	// 			$( d ).trigger( "hoge::resized", [ _size ] );
	// 		}
	// 	}, 60 );
	// } );
	// ----------------------------------------------
	// スクロールイベント
	// ----------------------------------------------
	// 	$( d ).on( 'hoge::scroll', function() {
	// 		var _top = document.body.getBoundingClientRect().top;
	// 		if( _top < -200 ) {
	// 			$( '.pagetop' ).fadeIn();
	// 		} else {
	// 			$( '.pagetop' ).fadeOut();
	// 		}
	// 	} );

	// 	let _scrollTimer = false;
	// 	$( w ).on( 'scroll', function() {
	// 		if( _scrollTimer ) {
	// 			clearTimeout( _scrollTimer )
	// 		}
	// 		_scrollTimer = setTimeout( function() {
	// 			$( d ).trigger( "hoge::scroll" );
	// 		}, 60 );
	// 	} );
	// } );

	// ----------------------------------------------
	// ページ内リンク
	// ----------------------------------------------

	// var move2hash = function() {};
	// //pagetop
	// move2hash.prototype.init = function() {
	// 	var _this = this;
	// 	$( 'a[href^="#"], area[href^="#"]' ).filter( '.scroll' ).each( function() {
	// 		var $this = $( this );
	// 		var _href = $this.attr( 'href' );
	// 		$this
	// 			.attr( {
	// 				href: 'javascript:void(0);',
	// 				rel: _href
	// 			} )
	// 			.on( 'click', function( e ) {
	// 				e.preventDefault();
	// 				var _target;
	// 				if( $this.parent().hasClass( 'pagetop' ) ) {
	// 					// _target = 0;
	// 					_target = $( 'body' );
	// 				} else {
	// 					_target = $( $this.attr( 'rel' ) );
	// 				}
	// 				_this.move( _target );
	// 				return false;
	// 			} );
	// 	} );

	// 	$( w ).on( 'hashchange', function( e ) {
	// 		e.preventDefault();
	// 		var _hash = location.hash;
	// 		if( $( _hash ).length > 0 ) {
	// 			_this.move( _hash );
	// 		}
	// 		return false;
	// 	} );
	// };
	// move2hash.prototype.start = function() {
	// 	var _url = d.URL;
	// 	var _url_split = _url.split( "#" );
	// 	var _hash = _url_split[ 1 ];
	// 	if( _hash ) {
	// 		var _start = this.get_target( "#" + _hash );
	// 		this.move( "#" + _hash );
	// 	}
	// };
	// move2hash.prototype.get_target = function( _elmId ) {
	// 	let _result = 0;
	// 	if( $( _elmId ).length ) {
	// 		_result = $( _elmId ).offset().top;
	// 	} else {
	// 		_result = 0;
	// 	}
	// 	_result = _result - 100 > -1 ? _result -= 100 : 0;
	// 	return Math.floor( _result );
	// };
	// move2hash.prototype.move = function( _elmId ) {
	// 	// var _current = $( d ).scrollTop();
	// 	// var _speed = 5000 / 1000; // 秒速 5000px
	// 	// var _duration = Math.floor( Math.abs( _pos - _current ) / _speed );
	// 	var _pos = this.get_target( _elmId );
	// 	var _gap = parseInt( $( 'body' ).css( 'padding-top' ) );
	// 	$( _elmId ).velocity( 'scroll', {
	// 		duration: 1000,
	// 		offset: _gap * -1
	// 	} );
	// };
})(document, window, jQuery);

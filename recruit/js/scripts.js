
if (location.hostname !== "localhost") {
  console.log = function () { };
}
let varAjaxStop = false;
let varMediaQuery = window.matchMedia("(max-width:768px)");
let varMediaQueryTab = window.matchMedia("(max-width:1280px)");
let funcEventUtil = {
  spFlag: varMediaQuery.matches,
  spFlagPre: varMediaQuery.matches,
  tabResizeProcFlag: true,
  tabFlag: varMediaQueryTab.matches,
  tabFlagPre: varMediaQueryTab.matches,
  kind: varMediaQuery.matches,
  // [Add] [#xxx-open]でアコーディオンオープン
  funcOpenHashAccordion: function () {
    console.log("[funcEventUtil.funcOpenHashAccordion]");
    if (location.hash.match(/-open$/)) {
      var link_id = location.hash.substr(0, location.hash.length - 5);
      console.log(link_id);
      if ($("[href='" + link_id + "'][data-toggle=pill]")) {
        $("[href='" + link_id + "']")
          .closest(".nav-pills")
          .attr("id", location.hash.substr(1));
      }
      if ($("[href='" + link_id + "'][data-toggle=collapse]")) {
        $("[href='" + link_id + "']")
          .closest(".plist__box")
          .attr("id", location.hash.substr(1));
      }
      $("[href='" + link_id + "']").click();
    }
    $(".collapse-open.scroll").on("click", function () {
      if ($(this).attr('rel')) {
        var _id = $(this).attr('rel');
        var _target = $(_id).find('.pcollapse__body');
        var _toggle = $(_id).find('.pcollapse__toggle');
        if (!($(_toggle).attr('aria-expanded') === 'true')) {
          $(_target).collapse('toggle');
          $(_toggle).attr('aria-expanded', true);
        }
      }
    });
    $(".pcollapse__toggle").on("click", function () {
      setTimeout(function () {
        $(window).trigger('resize');
      }, 200);
    });

  },
  // [Add] [target="_blank"]時[rel="noopener noreferrer"]付与
  funcAddAnchorBlankRel: function () {
    console.log("[funcEventUtil.funcAddAnchorBlankRel]");
    var aTags = [].slice.call(document.getElementsByTagName("a"));
    var ua = window.navigator.userAgent.toLowerCase();
    var isIE = ~ua.indexOf("msie") || ~ua.indexOf("trident");
    if (!isIE) {
      aTags.forEach(function (el) {
        if (el.target === "_blank") {
          var rels = el.rel.split(" ");
          if (rels.indexOf("norel")) {
            if (!~rels.indexOf("noopener")) {
              rels.push("noopener");
              el.setAttribute("rel", rels.join(" ").trim());
            }
            if (!~rels.indexOf("noreferrer")) {
              rels.push("noreferrer");
              el.setAttribute("rel", rels.join(" ").trim());
            }
          }
        }
      });
    }
  },
  // [Acc] 背景色を変更
  funcAccBgColor: function () {
    console.log("[funcEventUtil.funcAccBgColor]");
    let accClassPrefix = "acc-bg_";
    let accCookiePrefix = "funcAccBgColor";
    $(".acc__list_bg .acc__item").on("click", function () {
      let accHtmlClass = "";
      let accElemClass = "";
      if ($(this).hasClass("acc__item_std")) {
        accHtmlClass = "acc-bg_std";
        accElemClass = "acc__item_std";
      } else if ($(this).hasClass("acc__item_blk")) {
        accHtmlClass = "acc-bg_blk";
        accElemClass = "acc__item_blk";
      }
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      $("html")
        .removeClass(function (index, className) {
          reg = new RegExp("\\b" + accClassPrefix + "\\S+", "g");
          return (className.match(reg) || []).join(" ");
        })
        .addClass(accHtmlClass);
      $.cookie(accCookiePrefix + "HtmlClass", accHtmlClass, {
        path: "/",
      });
      $.cookie(accCookiePrefix + "ElemClass", accElemClass, {
        path: "/",
      });
      if (varMediaQuery.matches) {
        $(".navbar-toggler").click();
      }
    });
    if ($.cookie(accCookiePrefix + "HtmlClass") === undefined) {
    } else {
      console.log($.cookie(accCookiePrefix + "HtmlClass"));
      console.log($.cookie(accCookiePrefix + "ElemClass"));
      $("html").addClass($.cookie(accCookiePrefix + "HtmlClass"));
      $("." + $.cookie(accCookiePrefix + "ElemClass"))
        .parent()
        .children()
        .removeClass("active");
      $("." + $.cookie(accCookiePrefix + "ElemClass")).addClass("active");
    }
  },
  // [Acc] 文字サイズを変更
  funcAccFontSize: function () {
    console.log("[funcEventUtil.funcAccFontSize]");
    let accClassPrefix = "acc-fz_";
    let accCookiePrefix = "funcAccFontSize";
    $(".acc__list_fz .acc__item").on("click", function () {
      let accHtmlClass = "";
      let accElemClass = "";
      if ($(this).hasClass("acc__item_s")) {
        accHtmlClass = "acc-fz_s"; // 50%
        accElemClass = "acc__item_s";
      } else if ($(this).hasClass("acc__item_m")) {
        accHtmlClass = "acc-fz_m"; // 62.5%
        accElemClass = "acc__item_m";
      } else if ($(this).hasClass("acc__item_l")) {
        accHtmlClass = "acc-fz_l"; // 75%
        accElemClass = "acc__item_l";
      }
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      $("html")
        .removeClass(function (index, className) {
          reg = new RegExp("\\b" + accClassPrefix + "\\S+", "g");
          return (className.match(reg) || []).join(" ");
        })
        .addClass(accHtmlClass);
      $.cookie(accCookiePrefix + "HtmlClass", accHtmlClass, {
        path: "/",
      });
      $.cookie(accCookiePrefix + "ElemClass", accElemClass, {
        path: "/",
      });
      if (varMediaQuery.matches) {
        $(".navbar-toggler").click();
      }
    });
    if ($.cookie(accCookiePrefix + "HtmlClass") === undefined) {
    } else {
      console.log($.cookie(accCookiePrefix + "HtmlClass"));
      console.log($.cookie(accCookiePrefix + "ElemClass"));
      $("html").addClass($.cookie(accCookiePrefix + "HtmlClass"));
      $("." + $.cookie(accCookiePrefix + "ElemClass"))
        .parent()
        .children()
        .removeClass("active");
      $("." + $.cookie(accCookiePrefix + "ElemClass")).addClass("active");
    }
  },
  // [Acc] 画像をテキストに変更
  funcAccAlt2Txt: function () {
    console.log("[funcEventUtil.funcAccAlt2Txt]");
    let accClassPrefix = "acc-alt_";
    let accCookiePrefix = "funcAccAlt2Txt";
    $(".acc__list_alt .acc__item").on("click", function () {
      console.log("acc__list_alt");
      let accHtmlClass = "";
      let accElemClass = "";
      if ($(this).hasClass("acc__item_txt")) {
        accHtmlClass = "acc-alt_txt";
        accElemClass = "acc__item_txt";
      } else if ($(this).hasClass("acc__item_alt")) {
        accHtmlClass = "acc-alt_alt";
        accElemClass = "acc__item_alt";
      }
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      $("html")
        .removeClass(function (index, className) {
          reg = new RegExp("\\b" + accClassPrefix + "\\S+", "g");
          return (className.match(reg) || []).join(" ");
        })
        .addClass(accHtmlClass);
      $.cookie(accCookiePrefix + "HtmlClass", accHtmlClass, {
        path: "/",
      });
      $.cookie(accCookiePrefix + "ElemClass", accElemClass, {
        path: "/",
      });
      funcEventUtil.funcAccAlt2TxtProc();
      if (varMediaQuery.matches) {
        $(".navbar-toggler").click();
      }
    });
    if ($.cookie(accCookiePrefix + "HtmlClass") === undefined) {
    } else {
      console.log($.cookie(accCookiePrefix + "HtmlClass"));
      console.log($.cookie(accCookiePrefix + "ElemClass"));
      $("html").addClass($.cookie(accCookiePrefix + "HtmlClass"));
      $("." + $.cookie(accCookiePrefix + "ElemClass"))
        .parent()
        .children()
        .removeClass("active");
      $("." + $.cookie(accCookiePrefix + "ElemClass")).addClass("active");
      if ($.cookie(accCookiePrefix + "HtmlClass") === "acc-alt_txt") {
        funcEventUtil.funcAccAlt2TxtProc();
      }
    }
  },
  funcAccAlt2TxtProc: function () {
    $("img").each(function () {
      if ($(this).hasClass("alt")) {
        // txt -> img[alt]
        $(this).removeClass("alt").removeClass("d-none");
        $(this).next().remove();
        $(".sns.sns_type_icon").removeClass("alt2txt");
      } else {
        // img[alt] -> txt
        $(this).addClass("alt").addClass("d-none");
        $(this).after($("<span>").text($(this).attr("alt")));
        $(".sns.sns_type_icon").addClass("alt2txt");
      }
    });
  },
  // [mfp] magnificPopup設定
  funcMagnificPopup: function () {
    $(".mfp-inline").magnificPopup({
      type: "inline",
      fixedContentPos: true,
    });
    $(".mfp-image").magnificPopup({
      type: "image",
    });
    $("[class*=mfp-list]").each(function () {
      $(this).magnificPopup({
        delegate: "a",
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });
    $(".mfp-youtube").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
    $(".mfp-youtube-pc").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
    $(".mfp-close-btn").on("click", function () {
      $(".mfp-close").click();
      return false;
    });
  },
  // リサイズ処理
  funcResize: function () {
    this.spFlag = varMediaQuery.matches;
    this.tabFlag = varMediaQueryTab.matches;
    if (funcEventUtil.tabResizeProcFlag) {
      this.kind = this.spFlag && this.tabFlag ? "SP" : this.tabFlag ? "TAB" : "PC";
    } else {
      this.kind = this.spFlag ? "SP" : "PC";
    }
    console.log("[funcEventUtil.funcResize] " + this.kind);
    if (this.spFlag != this.spFlagPre) {
      this.spFlagPre = this.spFlag;
      if (this.spFlag) {
        console.log("[funcEventUtil.funcResize][PC->SP]");
      } else {
        console.log("[funcEventUtil.funcResize][SP->PC]");
      }
      // 初期表示処理
      funcEventUtil.funcInitDrow(true);
    }
    if (funcEventUtil.tabResizeProcFlag && this.tabFlag != this.tabFlagPre) {
      this.tabFlagPre = this.tabFlag;
      if (this.tabFlag) {
        console.log("[funcEventUtil.funcResize][PC->TAB]");
      } else {
        console.log("[funcEventUtil.funcResize][TAB->PC]");
      }
      // 初期表示処理
      funcEventUtil.funcInitDrow(true);
    }
  },
  // スクロール処理(再設定)
  // ch) https://qiita.com/zaru/items/878b892e4debf03785e3
  funcScrollSet: function () {
    console.log("[funcEventUtil.funcScroll]");
    funcEventUtil.funcScrollProc();
    // ---- [common.js]を改修 ----
    // console.log("[funcEventUtil.funcScroll]");
    // setTimeout(function () {
    //   Object.keys($._data($(document).get(0), "events")).forEach(function (k) {
    //     console.log("events:" + k);
    //     if (k == "hoge::scroll") {
    //       $(document).off(k);
    //       console.log("events-delete:" + k);
    //       funcEventUtil.funcScrollProc();
    //     }
    //   });
    // }, 50);
  },
  funcScrollProc: function () {
    console.log("[funcEventUtil.funcScrollProc]");
    console.log("events-seting:hoge::scroll");
    $(document).on("hoge::scroll", function () {
      funcEventUtil.funcScrollProcMain();
    });
  },
  funcScrollProcMain: function () {
    var _top = document.body.getBoundingClientRect().top;
    if (_top < -200) {
      $(".pagetop").addClass("pagetop_show");
    } else {
      $(".pagetop").removeClass("pagetop_show");
    }

    if (_top < 0) {
      if ($(".gnav-home__item:hover").length <= 0) {
        $(".gnav-home__wrap").addClass("hide");
      }
    } else {
      $(".gnav-home__wrap").removeClass("hide");
    }
    // $(".gnav-home__item").mouseleave(function(){
    //   var _top = document.body.getBoundingClientRect().top;
    //   if (_top < 0) {
    //     $(".gnav-home__wrap").addClass("hide");
    //   }
    // });

  },
  funcAccordionSet: function () {
    $('.contents').on('click', '.pcollapse__toggle', function () {
      if (!$(this).attr('href')) {
        var _target = $(this).parent('.pcollapse__head').next('.pcollapse__body');
        $(_target).collapse('toggle');
        if ($(this).attr('aria-expanded') === 'true') {
          $(this).attr('aria-expanded', false);
        } else {
          $(this).attr('aria-expanded', true);
          if ($(this).hasClass('pcollapse-only')) {
            $('.editor__main .pcollapse__toggle').not(this).each(function (i, this2) {
              if ($(this2).attr('aria-expanded') === 'true') {
                var _target2 = $(this2).parent('.pcollapse__head').next('.pcollapse__body');
                _target2.collapse('toggle');
                $(this2).attr('aria-expanded', false);
              }
            });
          }
        }
      }

    });
    $('.pcollapse-all').on('click', function () {

      if ($(this).attr('aria-expanded') === 'true') {
        $($(this).attr('data-target')).collapse('toggle');
        $(this).attr('aria-expanded', false);
        $('.editor__main .pcollapse__toggle').attr('aria-expanded', false);
        $('.pcollapse-all').attr('data-target', '.editor__main .pcollapse__body:not(.show)');
        $('.pcollapse-all').removeClass('pcollapse-all_close');
        $('.pcollapse-all').text('全てを表示する');
      } else {
        $($(this).attr('data-target')).collapse('toggle');
        $(this).attr('aria-expanded', true);
        $('.editor__main .pcollapse__toggle').attr('aria-expanded', true);
        $('.pcollapse-all').attr('data-target', '.editor__main .pcollapse__body.show');
        $('.pcollapse-all').addClass('pcollapse-all_close');
        $('.pcollapse-all').text('全てを閉じる');
      }
      return false;
    });


    if (this.spFlag) {
      $('.gnav .gnav__link1').each(function () {
        if ($(this).attr('aria-expanded') === 'true') {
          $(this).next('.collapse').collapse('toggle');
          $(this).attr('aria-expanded', false);
        }
      });
    } else {
      $('.gnav .gnav__link1').each(function (index) {
        if (index === 0) {
          if ($(this).attr('aria-expanded') === 'false') {
            $(this).next('.collapse').collapse('toggle');
            $(this).attr('aria-expanded', true);
          }
        } else {
          if ($(this).attr('aria-expanded') === 'true') {
            $(this).next('.collapse').collapse('toggle');
            $(this).attr('aria-expanded', false);
          }
        }
      });
    }

    $('.faculty__link').on('click', function () {
      $('.faculty__link[aria-expanded="true"]').not(this).trigger("click");
    });


  },
  funcNavAccordionSet: function () {

    $('.wrapper').on('click', '.gnav .gnav__link1', function (i, this2) {
      if (funcEventUtil.spFlag) {
        $(this).next('.collapse').collapse('toggle');
        if ($(this).attr('aria-expanded') === 'true') {
          $(this).attr('aria-expanded', false);
        } else {
          $(this).attr('aria-expanded', true);
        }
      } else {

        $('.gnav .gnav__link1[aria-expanded="true"]').each(function (i, this2) {
          $(this2).next('.collapse').collapse('toggle');
          $(this2).attr('aria-expanded', false);
        });
        if ($(this).attr('aria-expanded') === 'false') {
          $(this).next('.collapse').collapse('toggle');
          $(this).attr('aria-expanded', true);
        }
      }
    });

    $('.wrapper').on('click', '.gnav .gnav__link2', function () {
      if (funcEventUtil.spFlag) {
        $(this).next('.collapse').collapse('toggle');
        if ($(this).attr('aria-expanded') === 'true') {
          $(this).attr('aria-expanded', false);
        } else if ($(this).attr('aria-expanded') === 'false') {
          $(this).attr('aria-expanded', true);
        }
      } else {
        $('.gnav .gnav__link2[aria-expanded="true"]').each(function (i, this2) {
          $(this2).next('.collapse').collapse('toggle');
          $(this2).attr('aria-expanded', false);
        });
        if ($(this).attr('aria-expanded') === 'false') {
          $(this).next('.collapse').collapse('toggle');
          $(this).attr('aria-expanded', true);
        }
      }
    });

  },
}
//   funcTabDropSet: function () {
//     if (this.spFlag) {
//       $('.ptab_sp-drop, .pnav_sp-drop').addClass('dropdown');
//       $('.ptab_sp-drop .nav, .pnav_sp-drop .nav').addClass('dropdown-menu');
//       $('.ptab_sp-drop .nav a, .pnav_sp-drop .nav a').addClass('dropdown-item');
//       $('.ptab_sp-drop').each(function () {
//         $(this).find('.dropdown-toggle').text($(this).find('.nav a.active').text());
//       })
//       $('.ptab_sp-drop .nav a, .pnav_sp-drop .nav a').on('click', function () {
//         $(this).parents('.ptab_sp-drop, .pnav_sp-drop').find('.dropdown-toggle').text($(this).text());
//         $(this).parents('.ptab_sp-drop, .pnav_sp-drop').find('.dropdown-menu').removeClass('show');
//       });

//       $('.plink_sp-drop').addClass('dropdown');
//       $('.plink_sp-drop-list').addClass('dropdown-menu');
//       $('.plink_sp-drop-item').addClass('dropdown-item');

//     } else {
//       $('.ptab_sp-drop, .pnav_sp-drop').removeClass('dropdown');
//       $('.ptab_sp-drop .nav, .pnav_sp-drop .nav').removeClass('dropdown-menu');
//       $('.ptab_sp-drop .nav a, .pnav_sp-drop .nav a').removeClass('dropdown-item');


//       $('.plink_sp-drop').removeClass('dropdown');
//       $('.plink_sp-drop-list').removeClass('dropdown-menu');
//       $('.plink_sp-drop-item').removeClass('dropdown-item');
//     }
//   },
//   // 初期化処理
//   funcInitDrow: function (resizeFlag) {
//     console.log("[funcEventUtil.funcInitDrow] resizeFlag=" + resizeFlag);
//     if (resizeFlag) {
//       // リサイズ時の初期化処理
//       if (varMediaQuery.matches) {
//         console.log("[funcEventUtil.funcInitDrow][PC->SP]");
//       } else {
//         console.log("[funcEventUtil.funcInitDrow][SP->PC]");
//         $("body").removeClass("active");
//         if ($("body.modal-open").length) {
//           $(".navbar-toggler").click();
//         }
//       }
//     } else {
//       // 初期表示処理
//       if (varMediaQuery.matches) {
//         console.log("[funcEventUtil.funcInitDrow][SP-Init]");
//       } else {
//         console.log("[funcEventUtil.funcInitDrow][PC-Init]");
//       }

//       $('html').addClass('js_ajaxload');
//       varAjaxStop = true;

//       // 共通処理
//       if (true) {
//         // BootstrapToggleJudge[Open/Close]

//         $('.wrapper').on('click', '.navbar-toggler', function () {
//           // $(".navbar-toggler").on("click", function () {
//           // console.log($(this).attr("data-toggle") + ":" + $(this).attr("data-target"));

//           setTimeout(function () {
//             if ($("html").hasClass("js_toggle_open_fac")) {
//               // if($("#gnav_fac").hasClass('show')){
//               $(".navbar-toggler_fac").trigger('click');
//             }
//             if ($("#gnav").hasClass('show')) {
//               $("html").addClass("js_toggle_open");
//               setTimeout(function () {
//                 $("body").addClass("modal-open");
//               }, 200);
//             }
//             else {
//               $("html").removeClass("js_toggle_open");
//             }
//           }, 200);

//         });


//         $('.wrapper').on('click', '.navbar-toggler_fac', function () {
//           // $(".navbar-toggler_fac").on("click", function () {

//           setTimeout(function () {

//             if ($("html").hasClass("js_toggle_open")) {
//               // if($("#gnav").hasClass('show')){
//               $(".navbar-toggler").trigger('click');
//             }

//             if ($("#gnav_fac").hasClass('show')) {
//               $("html").addClass("js_toggle_open_fac");
//               setTimeout(function () {
//                 $("body").addClass("modal-open");
//               }, 200);
//             }
//             else {
//               $("html").removeClass("js_toggle_open_fac");
//             }
//           }, 200);

//         });

//         // SlickSlider
//         if (typeof $.fn.slick === "function") {
//           console.log("--> Library [$.fn.slick]");
//           funcSlider.funcSliderAll();
//         }
//         // objectFitImages
//         if (typeof objectFitImages === "function") {
//           console.log("--> Library [objectFitImages]");
//           objectFitImages(".ofi");
//         }
//         // Stickyfill
//         if (typeof Stickyfill === "object") {
//           console.log("--> Library [Stickyfill]");
//           Stickyfill.add($(".sticky"));
//         }
//         // Emergence.js
//         if (typeof emergence === "object") {
//           console.log("--> Library [Emergence.js]");
//           funcEmergence.funcInit();
//         }
//         // ScrollHint
//         new ScrollHint(".table-responsive", {
//           i18n: {
//             scrollable: "スクロールできます",
//           },
//         });
//         new ScrollHint(".img-responsive", {
//           i18n: {
//             scrollable: "スクロールできます",
//           },
//         });
//         // magnificPopup設定
//         this.funcMagnificPopup();
//         // スクロールイベント再設定
//         this.funcScrollSet();
//         this.funcNavAccordionSet();

//         // this.funcTabDropSet();

//         // 横スクロール対策 for FixedMenu
//         if ($(".gnav").css("position") == "fixed") {
//           console.log("[横スクロール対策 for FixedMenu]");
//           $(window).on("scroll", function () {
//             var _left = document.body.getBoundingClientRect().left;
//             if (_left === 0) {
//               $(".gnav").removeAttr("style");
//             } else {
//               $(".gnav").css("transform", "translateX(" + _left + "px)");
//             }
//             //console.log(_left);
//           });
//         }
//         // [ResizeProc]
//         $(document).on("hoge::resized", function () {
//           if (typeof funcEventUtil.funcResize === "function") {
//             funcEventUtil.funcResize();
//           }
//         });
//         // funcAccBgColor
//         if (typeof funcEventUtil.funcAccBgColor === "function") {
//           funcEventUtil.funcAccBgColor();
//         }
//         // funcAccFontSize
//         if (typeof funcEventUtil.funcAccFontSize === "function") {
//           funcEventUtil.funcAccFontSize();
//         }
//         // funcAccAlt2Txt
//         if (typeof funcEventUtil.funcAccAlt2Txt === "function") {
//           funcEventUtil.funcAccAlt2Txt();
//         }
//         // funcAddAnchorBlankRel
//         if (typeof funcEventUtil.funcAddAnchorBlankRel === "function") {
//           funcEventUtil.funcAddAnchorBlankRel();
//         }
//         // funcOpenHashAccordion
//         if (typeof funcEventUtil.funcOpenHashAccordion === "function") {
//           funcEventUtil.funcOpenHashAccordion();
//         }
//         // PictSelect
//         if ($(".sys-img_type_thumbnail").length) {
//           $(".sys-img__link").attr("href", "javascript:void(0);");
//           $(".sys-img__link").on("click", function () {
//             $(this).closest(".sys-img").find(".sys-img__main .sys-img__pict").attr("src", $(this).find(".sys-img__pict").attr("src"));
//           });
//         }
//         //$(d).trigger("hoge::resized");
//         // [MENU] MenuActive by ScrollPosition
//         // -> 指定クラス名[data-change-header="**"]を超えるとgnav_active付与
//         if ($("[data-change-header]").length) {
//           let _realtime = true;
//           let _targetVal = $("[data-change-header]").data("change-header");
//           let _targetClass = "." + _targetVal;
//           console.log("--> [ScrollJudge][data-change-header=" + _targetVal + "]");
//           $(document).on(_realtime ? "scroll" : "hoge::scroll", function () {
//             var _top = document.body.getBoundingClientRect().top * -1;
//             let _menu_btm = _targetVal.toString().match(/^\d+$/) ? _targetVal : $(_targetClass).offset().top + $(_targetClass).height();
//             //console.log("[_top > _menu_btm] " + _top + ">" + _menu_btm);
//             if (_top > _menu_btm) {
//               $(".gnav").addClass("gnav_active");
//               //console.log("[ScrollJudge][addClass]");
//             } else {
//               $(".gnav").removeClass("gnav_active");
//               //console.log("[ScrollJudge][removeClass]");
//             }
//           });
//           if (!_realtime) {
//             $(document).trigger("hoge::scroll");
//           }
//         }
//       }
//     }
//     // アコーディオンイベント設定
//     this.funcAccordionSet();
//     this.funcTabDropSet();
//   },
// };
// let funcEmergence = {
//   spFlag: varMediaQuery.matches,
//   funcInit: function () {
//     console.log("[funcEmergence." + arguments.callee.name + "]");
//     this.funcSetting();
//     emergence.init({
//       reset: false,
//       elemCushion: 0.25,
//     });
//   },
//   funcSetting: function () {
//     console.log("[funcEmergence." + arguments.callee.name + "]");
//     $(".em").attr("data-emergence", "hidden");
//     // this.funcSet1(".em_fade", "fade", 0, 0);
//     // this.funcSet1(".em_fadeup", "fadeup", 0, 0);
//     // this.funcSet1(".em_fadedown", "fadedown", 0, 0);
//     // this.funcSet1(".em_fadeleft", "fadeleft", 0, 0);
//     // this.funcSet1(".em_faderight", "faderight", 0, 0);
//     // this.funcSet1(".em_zoomin", "zoomin", 0, 0);
//     // this.funcSet1(".em_zoomout", "zoomout", 0, 0);
//     // this.funcSet1(".em_maker", "maker", 0, 0);
//     // ---- Additional Setting
//     //  this.funcSet1(".mv__title", "fade", 0, 0);
//     //  this.funcSet1(".start-box");
//     //  this.funcSet2(".start-box:nth-child(even) .start-box__text", "faderight", 0, 500);
//     //  this.funcSet2(".start-box:nth-child(odd) .start-box__text", "fadeleft", 0, 500);
//   },
//   funcSet1: function (className, emType, duration, delay) {
//     $(className).attr("data-emergence", "hidden").addClass("em");
//     if (emType) {
//       $(className).addClass("em_" + emType);
//     }
//     if (duration) {
//       $(className).addClass("em_duration_" + duration);
//     }
//     if (delay) {
//       $(className).addClass("em_delay_" + delay);
//     }
//   },
//   funcSet2: function (className, emType, duration, delay) {
//     $(className)
//       .addClass("em")
//       .addClass("em_" + emType);
//     if (duration) {
//       $(className).addClass("em_duration_" + duration);
//     }
//     if (delay) {
//       $(className).addClass("em_delay_" + delay);
//     }
//   },
// };

// let funcSlider = {
//   // https://kenwheeler.github.io/slick/
//   // https://tr.you84815.space/slick/
//   // https://www.nxworld.net/tips/jquery-plugin-slick-slide-counter.html
//   funcSliderAll: function () {
//     console.log("[funcSlider." + arguments.callee.name + "]");
//     if (typeof $.fn.slick === "function") {
//       for (let funcName in this) {
//         if (funcName === arguments.callee.name) {
//           continue;
//         }
//         if (typeof eval("funcSlider." + funcName) === "function") {
//           //console.log("-" + this.name + "." + funcName + "]");
//           eval("funcSlider." + funcName)();
//         }
//       }
//     }
//   },
//   funcSliderDataSlick: function () {
//     console.log("[funcSlider." + arguments.callee.name + "]");
//     $("[data-slick]").slick({
//       autoplay: true,
//       dots: true,
//       // slidesToShow: 4,
//       // slidesToScroll: 1,
//       touchMove: true,
//       swipeToSlide: true,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             // slidesToShow: 1,
//             // slidesToScroll: 1,
//           },
//         },
//       ],
//     });
//     // $("[data-slick]").slick({
//     //   //autoplay: true,
//     //   infinite: true,
//     //   slidesToShow: 1,
//     //   arrows: false,
//     //   dots: false,
//     //   autoplaySpeed: 5000,
//     //   fade: true,
//     //   pauseOnFocus: false,
//     //   pauseOnHover: false,
//     //   speed: 3000,
//     //   swipe: false,
//     //   touchMove: false,
//     //   responsive: [
//     //     {
//     //       breakpoint: 768,
//     //       settings: {
//     //         arrows: false,
//     //         centerMode: true,
//     //         centerPadding: "40px",
//     //         slidesToShow: 3,
//     //       },
//     //     },
//     //   ],
//     // });
//   },
//   funcSliderTopics: function () {
//     console.log("[funcSlider." + arguments.callee.name + "]");
//     $("#slider-topics").slick({
//       fade: false,
//       slidesToShow: 4,
//       responsive: [
//         {
//           breakpoint: "1024",
//           settings: {
//             slidesToShow: "3",
//           },
//         },
//         {
//           breakpoint: "768",
//           settings: {
//             slidesToShow: "1",
//           },
//         },
//       ],
//     });
//   },
//   funcSliderWork: function () {
//     console.log("[funcSlider." + arguments.callee.name + "]");
//     if (varMediaQuery.matches) {
//       // SP-unslick
//       $("#slider-news").not(".slick-initialized").slick({
//         autoplay: true,
//         dots: false,
//         touchMove: true,
//         swipeToSlide: true,
//         slidesToShow: 1,
//         centerMode: true,
//         centerPadding: "30px",
//       });
//     } else {
//       // PC-slick
//       $("#slider-news.slick-initialized").slick("unslick");
//     }
//   },
//   funcSliderMv: function () {
//     $("#slider-mv").slick({
//       fade: false,
//       centerMode: true,
//       centerPadding: "30%",
//       slidesToShow: 1,
//       responsive: [
//         {
//           breakpoint: "768",
//           settings: {
//             centerPadding: "40px",
//           },
//         },
//       ],
//     });
//     $("#slider-mv-wide").slick({
//       autoplay: true,
//       dots: false,
//       arrows: false,
//       fade: true,
//       slidesToShow: 1,
//       speed: 1000,
//       autoplaySpeed: 4000,
//     });
//   },
//   funcSliderWorkListener: function () {
//     console.log("[funcSlider." + arguments.callee.name + "]");
//     varMediaQuery.addListener(function (e) {
//       funcSlider.funcSliderWork();
//     });
//   },
// };
// // スクロール中判定
// // $(w).on("scroll", function () {
// //   if (typeof funcScrolling === "function") {
// //     funcScrolling();
// //   }
// // });
// let _timerScrolling = false;
// let funcScrolling = function () {
//   document.body.classList.add("scrolling");
//   if (_timerScrolling) {
//     clearTimeout(_timerScrolling);
//   }
//   _timerScrolling = setTimeout(function () {
//     document.body.classList.remove("scrolling");
//   }, 300);
// };

// let funcDebug = {
//   _TopPathName: "/",
//   funcDebug: function () {
//     console.log("[funcDebug." + arguments.callee.name + "]");
//     // this.funcCheckBodyClassName();
//     // this.funcCheckHeadTagHierarchy();
//   },
//   funcCheckBodyClassName: function () {
//     console.log("[funcDebug." + arguments.callee.name + "] ---- start");
//     let _bodyClsName = $("body").attr("class") || "";
//     var _pathName = location.pathname;
//     console.log("[TopPathName] " + funcDebug._TopPathName);
//     console.log("[PathName] " + _pathName);
//     _bodyClsName.split(/ /).forEach(function (_bodyClassName) {
//       console.log("[BodyClassName] " + _bodyClassName);
//       if (_pathName.indexOf(_bodyClassName) <= -1) {
//         if (_pathName === funcDebug._TopPathName && _bodyClassName === "home") {
//         } else if (_bodyClassName === "detail") {
//         } else if (_bodyClassName === "ie11") {
//         } else {
//           if (location.pathname.match(/\/_/)) {
//             // url[_xxx]は無視
//             console.log("-> [PASS] class check");
//           } else {
//             console.log("-> [NG] " + _bodyClassName);
//             $("body").before(_bodyClassName);
//             alert("body.classの指定が不正確です。");
//             scrollTo(0, 0);
//           }
//         }
//       }
//     });
//     console.log("[funcDebug." + arguments.callee.name + "] ---- end");
//   },
//   funcCheckHeadTagHierarchy: function () {
//     console.log("[funcDebug." + arguments.callee.name + "] ---- start");
//     var _tagHierarchy = "(body)";
//     var _tagNgFlag = false;
//     var _tagLvSearch = 0;
//     var _tags = $("body").html().match(/<h\d/g);
//     var _tagCntH1 = 0;
//     console.log(_tags);
//     if (_tags === null) {
//       _tagNgFlag = true;
//       console.log("-> [NG] not found h1");
//     } else {
//       for (var i = 0; i < _tags.length; i++) {
//         var _tagLvNow = parseInt(_tags[i].substr(-1));
//         if (_tagLvNow == 1) {
//           if (++_tagCntH1 > 1) {
//             _tagNgFlag = true;
//             console.log("-> [NG] h1 duplication");
//           }
//         }
//         console.log("[_tagLvSearch:h" + _tagLvSearch + "][_tagLvNow:h" + _tagLvNow + "] [" + _tagLvNow + ">=" + _tagLvSearch + "+2]");
//         if (_tagLvNow >= _tagLvSearch + 2) {
//           _tagNgFlag = true;
//           console.log("-> [NG] h" + _tagLvNow);
//         }
//         _tagLvSearch = _tagLvNow;
//         _tagHierarchy += " > h" + _tagLvSearch + (_tagNgFlag ? "*" : "");
//       }
//     }
//     console.log(_tagHierarchy);
//     if (_tagNgFlag) {
//       if (location.pathname.match(/\/_/)) {
//         // url[_xxx]は無視
//         console.log("-> [PASS] h1 duplication check");
//         _tagNgFlag = false;
//       } else {
//         $("body").before(_tagHierarchy);
//         alert("h要素の順番が不正確です。");
//         scrollTo(0, 0);
//       }
//     }
//     console.log("[funcDebug." + arguments.callee.name + "] ---- end");
//   },
//   funcShowHeadTagHierarchy: function () {
//     console.log("[funcDebug." + arguments.callee.name + "] ---- start");
//     $("h2,h3,h4,h5,h6").each(function () {
//       var _elem = $(this).prop("tagName");
//       var _tag = $("<span>")
//         .css({
//           color: "#000",
//           background: "#ff0",
//           position: "absolute",
//           zIndex: 10,
//           top: "-20px",
//           left: 0,
//           fontSize: "14px",
//           fontWeight: "bold",
//         })
//         .text(_elem);
//       if ($(this).css("overflow") === "hidden") {
//         _tag.css({ top: 0, left: 0 });
//       }
//       if ($(this).closest(".tus-vertical").length) {
//         _tag.css({ top: 0, left: "-20px" });
//       }
//       if ($(this).css("position") === "static") {
//         $(this).css({ position: "relative" });
//       }
//       $(this).append(_tag);
//     });
//     console.log("[funcDebug." + arguments.callee.name + "] ---- end");
//   },
// };

// (function (d, w, $) {
//   ("use strict");

//   let _bodyClsName = $("body").attr("class") || "";
//   console.log("[body." + _bodyClsName + "]");

//   setTimeout(function () {
//     if (!varAjaxStop) {
//       console.log("[AjaxStop-Timeout]");
//       funcEventUtil.funcInitDrow(false);
//     }
//   }, 500);

//   // [CHK] funcDebug
//   if (location.hostname.match(/^localhost|^127\.0\.0\.1|\.waveltd\.work$/)) {
//     funcDebug.funcDebug();
//     if (location.search === "?debug=1") {
//       console.log("[Debug] on");
//       $.cookie("DebugShowHeadTag", true, { path: "/" });
//     } else if (location.search === "?debug=0") {
//       $.removeCookie("DebugShowHeadTag", { path: "/" });
//       console.log("[Debug] off");
//     }
//     if (location.pathname === "/sample/") {
//     } else if ($.cookie("DebugShowHeadTag") === undefined) {
//     } else {
//       funcDebug.funcShowHeadTagHierarchy();
//     }
//   }

//   // $("[data-bgimage]").each(function () {
//   //   $(this).css("background-image", $(this).attr("data-bgimage"));
//   // });
//   $("[data-bgimage]").each(function () {
//     var bgimage = $(this).attr("data-bgimage");
//     if (varMediaQuery.matches) {
//       bgimage = bgimage.replace(/-pc.jpg$/, "-sp.jpg");
//       $("[data-bgimage]").css("background-image", "url(" + bgimage + ")");
//     } else {
//       $("[data-bgimage]").css("background-image", "url(" + bgimage + ")");
//     }
//   });
//   // 読込終了判定
//   $("html").addClass("js_domload");
//   $(w).on("load", function () {
//     $("html").addClass("js_imgload");
//     if ($("body").hasClass("sample")) {
//       $("[id^='frm-']").each(function () {
//         console.log($(this).attr("id"));
//       });
//     }
//     funcMoreDspChange();
//   });

//   $(w).on('load scroll resize', function () {
//     var _top = document.body.getBoundingClientRect().top;

//     var _mv_height = 0;
//     var _nav_haight = 0;
//     var _btm_height = 0;
//     var _footer_height = 0;

//     if ($('.cont-mv').length) {
//       _mv_height = $('.cont-mv').height();
//     }
//     if ($('.gnav').length) {
//       _nav_haight = $('.gnav').height();
//     }
//     var _hd_height = _mv_height + _nav_haight;

//     if ($('.pblock-btm').length) {
//       _btm_height = $('.pblock-btm').height();
//     }
//     if ($('.ft').length) {
//       _footer_height = $('.ft').height();
//     }
//     var _ft_height = $(d).height() - ($(w).height() + _btm_height + _footer_height);
//     if (_top < - _ft_height) {
//       $(".snav").addClass("end");
//       $(".snav").removeClass("fixed");
//       $(".pblock-kuzu_fixed").addClass("end");
//     } else if (_top < - _hd_height) {
//       $(".snav").addClass("fixed");
//       $(".snav").removeClass("end");
//       $(".pblock-kuzu_fixed").removeClass("end");
//     } else {
//       $(".snav").removeClass("fixed");
//       $(".snav").removeClass("end");
//       $(".pblock-kuzu_fixed").removeClass("end");
//     }
//     var _ttl_h = $("[class^='snav__ttl']:visible").height() + "px";
//     $(".snav__list1").css({ height: "calc(100% - " + _ttl_h });

//     var vh100 = window.innerHeight;
//     var g_head_height = 0;
//     g_head_height = $(".gnav").outerHeight() || 0;
//     if (varMediaQuery.matches) {
//       $('.modal-content').css('height', vh100 - g_head_height + 'px');
//       $('.modal-content').css('min-height', vh100 - g_head_height + 'px');
//     }
//   });

//   $('.contents').on('click', '.more-cont__link', function () {
//     // $(this).parents('.more-cont').find('.more-cont__item').fadeIn();
//     $('.more-cont__item').fadeIn();
//     funcMoreDspChange();
//     return false;
//   });

//   $(w).on('keyup', function (e) {
//     if (e.key) {
//       var _key = e.key;

//       if (_key === "Escape") {
//         if ($("html").hasClass("js_toggle_open")) {
//           $("html").removeClass("js_toggle_open");
//           // $(".navbar-toggler-text").text("MENU");
//         }
//         if ($("html").hasClass("js_toggle_open_fac")) {
//           $("html").removeClass("js_toggle_open_fac");
//         }
//       }
//     }
//   });

//   $('a[href^="#"]').on('click', function (e) {
//     if ($("html").hasClass("js_toggle_open") && $(this).hasClass('gnav__link_scroll')) {

//       var item = $(this).parents('.modal-scroll').find('.modal-scroll__box');
//       var target = $(this).attr("href");
//       var dist = $(target).position().top + item.scrollTop() - item.position().top;
//       if (varMediaQuery.matches) {
//         item = $('.modal-content');
//         // dist = $(target).offset().top;
//         dist = $(target).position().top + item.scrollTop();
//       }
//       item.scrollTop(dist);
//       return false;

//     } else {
//       return true;
//     }
//   });

//   // [InitProc]
//   //$("body").attr("data-change-header", "42");
//   if (typeof funcEventUtil.funcInitDrow === "function") {
//     // Default
//     // funcEventUtil.funcInitDrow(false);
//   }

//   if (_bodyClsName.split(/ /).indexOf("home") > -1) {
//   }

//   function funcMoreDspChange() {
//     $(".more-cont").each(function () {
//       if ($(this).find('.more-cont__item').length === $(this).find('.more-cont__item').filter(':visible').length) {
//         $(this).find('.more-cont__link').hide();
//       }
//       else {
//         $(this).find('.more-cont__link').show();
//       }
//     })
//   }


//   $(d).ajaxStop(function () {
//     console.log("[AjaxStop]");
//     funcEventUtil.funcInitDrow(false);
//   });


// })(document, window, jQuery);

// // youtube API
// if ($("#youtube[data-yid]").length) {
//   const scriptEl = document.createElement("script");
//   const headEl = document.querySelector("head");
//   scriptEl.src = "https://www.youtube.com/iframe_api";
//   headEl.appendChild(scriptEl);

//   function onYouTubeIframeAPIReady() {
//     const player = new YT.Player("youtube", {
//       videoId: $("#youtube").attr("data-yid"),
//       playerVars: {
//         playsinline: 1,
//         loop: 1, // ループ
//         playlist: $("#youtube").attr("data-yid"),
//         controls: 1, // コントローラー表示
//         disablekb: 1, // キーボードでの操作をさせない
//         autoplay: 1, // 自動再生
//         rel: 0, // オススメ動画
//         showinfo: 0, // タイトル表示
//       },
//       events: {
//         onReady: onPlayerReady,
//       },
//     });
//   }
//   function onPlayerReady(event) {
//     const player = event.target;
//     player.mute();
//     player.playVideo();
//   }
// }

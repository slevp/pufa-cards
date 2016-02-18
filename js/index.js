(function () {
  "use strict";
  if(!Date.now)Date.now=function(){return(new Date).getTime()};(function(){var n=["webkit","moz"];for(var e=0;e<n.length&&!window.requestAnimationFrame;++e){var i=n[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"];window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var a=0;window.requestAnimationFrame=function(n){var e=Date.now();var i=Math.max(a+16,e);return setTimeout(function(){n(a=i)},i-e)};window.cancelAnimationFrame=clearTimeout}})();

  document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);

  $(document).ready(function () {
    var RAF = window.requestAnimationFrame;
    var animating = false, lastTime = Date.now();

    // 以下是图片
    var stageImages = [
      // 第1页
      [
        '../img/bg1.jpg', '../img/wz1.png', '../img/bg1-1.jpg', '../img/hand1.png', '../img/bg1-2.jpg', '../img/jiantou2.png',
      ],
      // 第2页
      [
        '../img/bg2.jpg', '../img/wz2.png', '../img/bg2-1.jpg', '../img/bg2-2.jpg', '../img/jiantou.png',
      ],
      // 第3页
      [
        '../img/bg3.jpg', '../img/wz3.png',
        '../img/chibang_00000.png',
        '../img/chibang_00001.png', '../img/chibang_00002.png', '../img/chibang_00003.png', '../img/chibang_00004.png',
        '../img/chibang_00005.png', '../img/chibang_00006.png', '../img/chibang_00007.png', '../img/chibang_00008.png',
        '../img/chibang_00009.png', '../img/chibang_00010.png', '../img/chibang_00011.png', '../img/chibang_00012.png',
        '../img/chibang_00013.png', '../img/chibang_00014.png', '../img/chibang_00015.png', '../img/chibang_00016.png',
        '../img/chibang_00017.png', '../img/chibang_00018.png', '../img/chibang_00019.png', '../img/chibang_00020.png',
        '../img/chibang_00021.png', '../img/chibang_00022.png', '../img/chibang_00023.png', '../img/chibang_00024.png',
        '../img/chibang_00025.png', '../img/chibang_00026.png', '../img/chibang_00027.png', '../img/chibang_00028.png',
        '../img/chibang_00029.png', '../img/chibang_00030.png', '../img/chibang_00031.png', '../img/chibang_00032.png',
        '../img/chibang_00033.png', '../img/chibang_00034.png', '../img/chibang_00035.png', '../img/chibang_00036.png',
        '../img/chibang_00037.png', '../img/chibang_00038.png', '../img/chibang_00039.png', '../img/chibang_00040.png',
        '../img/chibang_00041.png', '../img/chibang_00042.png', '../img/chibang_00043.png', '../img/chibang_00044.png',
        '../img/chibang_00045.png', '../img/chibang_00046.png', '../img/chibang_00047.png', '../img/chibang_00048.png',
        '../img/chibang_00049.png', '../img/chibang_00050.png', '../img/chibang_00051.png', '../img/chibang_00052.png',
        '../img/chibang_00053.png', '../img/chibang_00054.png', '../img/chibang_00055.png', '../img/chibang_00056.png',
        '../img/jiantou.png',
      ],
      // 卡片展示
      [
        '../img/bg3.jpg', // 背景
        '../img/card1w.png', '../img/card2w.png', '../img/card3w.png', '../img/card4w.png', // 女性卡片
        '../img/card5m.png', '../img/card6m.png', // 男性卡片

        '../img/wz4-1.png', '../img/wz4-2.png', '../img/wz4-3.png','../img/wz4-4.png', // 文字

        '../img/card1w2.png', '../img/card2w2.png', '../img/card3w2.png', '../img/card4w2.png', // 倒影女性卡片
        '../img/card5m2.png', '../img/card6m2.png', // 倒影男性卡片

        '../img/hand2.png', // 17

        // 18~23
        '../img/card1w3.png', '../img/card2w3.png', '../img/card3w3.png', '../img/card4w3.png', // 反面女性卡片
        '../img/card5m3.png', '../img/card6m3.png', // 反面男性卡片

        // 24~27
        '../img/card1w4.png', '../img/card2w4.png', '../img/card3w4.png', '../img/card4w4.png', // 反面女性卡片

        // 28~33
        '../img/card1w5.png', '../img/card2w5.png', '../img/card3w5.png', '../img/card4w5.png', // 反面女性卡片
        '../img/card5m5.png', '../img/card6m5.png', // 反面男性卡片
      ],
      // 详细
      [
        '../img/button.png',
        '../img/button1.png',
        '../img/button2.png',
        '../img/button3.png',
        '../img/wzw.png',
        '../img/wzm.png',
        '../img/button_back.png',
      ],
      // 详细1
      [
        '../img/card1w.png',
        '../img/card1w2.png',
        '../img/wz5-1-1.png',
        '../img/wz5-1-2.png',
        '../img/wz5-1-3.png',
      ],
      // 详细2
      [
        '../img/card2w.png',
        '../img/card2w2.png',
        '../img/wz5-2-1.png',
        '../img/wz5-2-2.png',
        '../img/wz5-2-3.png',
      ],
      // 详细3
      [
        '../img/card3w.png',
        '../img/card3w2.png',
        '../img/wz5-3-1.png',
        '../img/wz5-3-2.png',
        '../img/wz5-3-3.png',
      ],
      // 详细4
      [
        '../img/card4w.png',
        '../img/card4w2.png',
        '../img/wz5-4-1.png',
        '../img/wz5-4-2.png',
        '../img/wz5-4-3.png',
      ],
      // 详细5
      [
        '../img/card5m.png',
        '../img/card5m2.png',
        '../img/wz5-5-1.png',
        '../img/wz5-5-2.png',
        '../img/wz5-5-3.png',
      ],
      // 详细6
      [
        '../img/card6m.png',
        '../img/card6m2.png',
        '../img/wz5-6-1.png',
        '../img/wz5-6-2.png',
        '../img/wz5-6-3.png',
      ]
    ];
    var stageImagesEl = [];
    var loadingIndex = 0;
    var mergedStageImages = [];
    var showingDetail = false;
    var ended = false;

    (function () {
      for (var i = 0; i < stageImages.length; i++) {
        for (var j = 0; j < stageImages[i].length; j++) {
          mergedStageImages.push(stageImages[i][j]);
        }
      }
    })();

    function loadImages(images, cb) {
      var loaded = 0;
      var amount = images.length;
      var loadedImages = [];

      for (var i = 0; i < amount; i++) {
        (function (index) {
          var img = new Image();

          img.src = images[index];
          if (img.complete) {
            // 在缓存中
            handler();
          } else {
            img.onload = handler;
            img.onerror = handler;
          }

          function handler() {
            loaded++;
            loadingIndex++;
            loadedImages[index] = img;
            if (loaded >= amount) RAF(function () { cb(loadedImages); });
          }
        })(i);
      }
    }

    function loadStageImagesSerial() {
      var max = stageImages.length - 1;

      (function serial(index) {
        loadImages(stageImages[index], function (images) {
          console.log('stageImagesLoaded', index);

          stageImagesEl[index] = images;
          triggerEvent(document, 'stageImagesLoaded', {index: index, images: images});

          if (index < max) {
            serial(index + 1);
          } else {
            console.log('allStageImagesLoaded');
            RAF(function () {
              triggerEvent(document, 'allStageImagesLoaded', {allImages: stageImagesEl});
            });
          }
        });
      })(0);
    }

    function loadStageImagesAll() {
      loadImages(mergedStageImages, function (allImages) {
        console.log('allStageImagesLoaded');
        RAF(function () {
          triggerEvent(document, 'allStageImagesLoaded', {allImages: allImages});
        });
      });
    }

    function changePage(inEl, outEl, isBack) {
      if (animating || showingDetail) return;

      if (inEl && outEl) {
        isBack = !!isBack;
        animating = true;
        var classNames = ['ps-left', 'ps-right'];
        var inClass = isBack ? classNames[0] : classNames[1];
        var outClass = isBack ? classNames[1] : classNames[0];

        RAF(function () {
          addClass(inEl, 'animating ' + inClass);
          removeClass(outEl, 'active');
          addClass(outEl, 'animating');

          RAF(function () {
            removeClass(inEl, inClass);
            addClass(inEl, 'ps-active');
            addClass(outEl, outClass);
            setTimeout(function () {
              addClass(inEl, 'active');
              removeClass(inEl, 'animating');
              removeClass(inEl, 'ps-active');

              removeClass(outEl, 'animating');
              removeClass(outEl, outClass);

              triggerEvent(inEl, 'active');
              triggerEvent(outEl, 'inactive');

              setTimeout(function () {
                animating = false;
              }, 1000);
            }, 1016);
          });
        });
      }
    }

    function initTransitionEvents() {
      var lastChangedTime = Date.now();

      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function motionHandle(e) {
          if (ended || animating || showingDetail) return;

          var gamma = e.gamma;
          var gammaAbs = Math.abs(gamma);
          var nowTime = Date.now();
          var diffTime = (nowTime - lastTime) / 1000;

          if (nowTime - lastChangedTime < 3000) return;

          if (diffTime > 0.1) {
            lastTime = nowTime;
            if (gammaAbs > 10) {
              lastChangedTime = nowTime;

              var currentPage = document.querySelector('.pages>.page.active');
              var prevPage = currentPage.previousElementSibling;
              var nextPage = currentPage.nextElementSibling;

              if (gamma < 0) {
                if (!ended) {
                  if (!nextPage) {
                    ended = true;
                    triggerEvent(document, 'pageEnd');
                    triggerEvent(currentPage, 'bg-inactive');
                  } else {
                    changePage(nextPage, currentPage, false);
                  }
                }
              } else {
                if (!nextPage && ended) {
                  // 退回第三页
                  ended = false;
                  triggerEvent(document, 'pageEndBack');
                  triggerEvent(currentPage, 'bg-active');
                } else if (prevPage) {
                  changePage(prevPage, currentPage, true);
                }
              }
            }
          }
        }, false);
      }

      (function () {
        $('.pages .page').on('swipeLeft', function handle(e) {
          if (animating || showingDetail || ended) return;
          var currentPage = e.currentTarget;
          var prevPage = currentPage.previousElementSibling;
          var nextPage = currentPage.nextElementSibling;

          if (!nextPage) {
            ended = true;
            triggerEvent(document, 'pageEnd');
            triggerEvent(currentPage, 'bg-inactive');
          } else {
            changePage(nextPage, currentPage, false);
          }
        });

        $('.pages .page').on('swipeRight', function handle(e) {
          if (ended || animating || showingDetail) return;
          var currentPage = e.currentTarget;
          var prevPage = currentPage.previousElementSibling;
          var nextPage = currentPage.nextElementSibling;

          if (!nextPage && ended) {
            // 退回第三页
            ended = false;
            triggerEvent(document, 'pageEndBack');
            triggerEvent(currentPage, 'bg-active');
          } else if (prevPage) {
            changePage(prevPage, currentPage, true);
          }
        });
      })();
    }

    function initPageEvents() {
      var pages = document.querySelectorAll('.pages>.page');
      var firstPage = pages[0];
      var secondPage = pages[1];
      var thirdPage = pages[2];

      // 处理页面1
      var firstPageBgAnimate;
      firstPage.addEventListener('active', function (e) {
        var titleImgEl = firstPage.querySelector('.title>img');
        //var guangyingImgEl = firstPage.querySelector('.guangying>img');
        var tipImgEl = firstPage.querySelector('.tip>img');

        if (!titleImgEl) {
          titleImgEl = stageImagesEl[0][1];
          firstPage.querySelector('.title').appendChild(titleImgEl);
        }
        //if (!guangyingImgEl) {
        //  guangyingImgEl = stageImagesEl[0][2];
        //  firstPage.querySelector('.guangying').appendChild(guangyingImgEl);
        //}
        if (!tipImgEl) {
          tipImgEl = stageImagesEl[0][3];
          var tipEl = firstPage.querySelector('.tip');
          tipEl.appendChild(tipImgEl);
        }
        firstPageBgAnimate = animateImgs($(firstPage).find('.bg'));
      }, false);
      firstPage.addEventListener('inactive', function (e) {
        firstPageBgAnimate && firstPageBgAnimate();
      }, false);

      // 处理页面2
      var secondPageBgAnimate;
      secondPage.addEventListener('active', function (e) {
        var titleImgEl = secondPage.querySelector('.title>img');

        if (!titleImgEl) {
          titleImgEl = stageImagesEl[1][1];
          secondPage.querySelector('.title').appendChild(titleImgEl);
        }

        secondPageBgAnimate = animateImgs($(secondPage).find('.bg'));
      }, false);
      secondPage.addEventListener('inactive', function (e) {
        secondPageBgAnimate && secondPageBgAnimate();
      }, false);

      // 处理页面3
      var logoAnimate;
      thirdPage.addEventListener('active', function (e) {
        var titleImgEl = thirdPage.querySelector('.label>img');

        if (!titleImgEl) {
          titleImgEl = stageImagesEl[2][1];
          thirdPage.querySelector('.label').appendChild(titleImgEl);
        }

        logoAnimate = animateImgs($(thirdPage).find('.logo'), 1, 3);
      }, false);
      thirdPage.addEventListener('inactive', function (e) {
        $(thirdPage).find('.logo>.current').removeClass('current');
      }, false);

      thirdPage.addEventListener('bg-active', function (e) {
        var logoEl = thirdPage.querySelector('.logo');
        var titleEl = thirdPage.querySelector('.label');
        var bgEl = thirdPage.querySelector('.bg');
        var navEl = thirdPage.querySelector('.nav');

        // 背景淡入
        $(bgEl).removeClass('fade-out60');
        $(logoEl).removeClass('fade-out60');
        $(titleEl).removeClass('fade-out0');
        $(navEl).removeClass('fade-out0');
      }, false);
      thirdPage.addEventListener('bg-inactive', function (e) {
        var logoEl = thirdPage.querySelector('.logo');
        var titleEl = thirdPage.querySelector('.label');
        var bgEl = thirdPage.querySelector('.bg');
        var navEl = thirdPage.querySelector('.nav');

        // 背景淡出
        $(bgEl).addClass('animating fade-out60');
        $(logoEl).addClass('animating fade-out60');
        $(titleEl).addClass('animating fade-out0');
        $(navEl).addClass('animating fade-out0');
      }, false);

      // 处理页面4，显示卡片列表画面
      document.addEventListener('pageEnd', function (e) {
        var cardWrapperEl = thirdPage.querySelector('.card-wrapper');
        $(cardWrapperEl).addClass('showing');
        setTimeout(function () {
          // 卡片展现
          $(thirdPage).find('.card-grid .card').each(function (i, el) {
            setTimeout(function () {
              // 出现描边
              var $borderEls = $(el).find('.border');

              $($borderEls[0]).addClass('running');
              $($borderEls[2]).addClass('running');
              setTimeout(function () {
                $($borderEls[1]).addClass('running');
                $($borderEls[3]).addClass('running');
              }, 416);
              setTimeout(function () {
                $borderEls.each(function () { $(this).removeClass('running');});
                $(el).addClass('moving shown');
                triggerEvent(document, 'showCardText');
              }, 1000);
            }, i * 200);
          });
        }, 616);
        setTimeout(function () {

        }, 8000);
      });

      // 退回页面3
      document.addEventListener('pageEndBack', function (e) {
        var $cardWrapperEl = $(thirdPage).find('.card-wrapper');

        $cardWrapperEl.addClass('fade-out0');
        setTimeout(function () {
          $cardWrapperEl.removeClass('showing fade-out0');

          RAF(function () {
            $(thirdPage).find('.card-grid .card').each(function (i, el) {
              $(el).removeClass('moving shown');
            });
          });
        }, 1000);
      });

      document.addEventListener('showCardText', function (e) {
        var closeBtnEl = thirdPage.querySelector('.card-wrapper .close-btn');
        var closeBtnElImgEl = closeBtnEl.querySelector('img');
        var headTitleEl = thirdPage.querySelector('.card-wrapper .head-title');
        var headTitleImgEl = headTitleEl.querySelector('img');
        var womanTitleEl = thirdPage.querySelector('.card-wrapper .woman .title');
        var womanTitleImgEl = womanTitleEl.querySelector('img');
        var manTitleEl = thirdPage.querySelector('.card-wrapper .man .title');
        var manTitleImgEl = manTitleEl.querySelector('img');
        var bottomDescEl = thirdPage.querySelector('.card-wrapper .bottom-desc');
        var bottomDescImgEl = bottomDescEl.querySelector('img');
        var tipEl = thirdPage.querySelector('.card-wrapper .tip');
        var tipImgEl = tipEl.querySelector('img');

        RAF(function () {
          if (!closeBtnElImgEl) {
            closeBtnElImgEl = stageImagesEl[4][6];
            closeBtnEl.appendChild(closeBtnElImgEl);
          }
          if (!headTitleImgEl) {
            headTitleImgEl = stageImagesEl[3][7];
            headTitleEl.appendChild(headTitleImgEl);
          }
          if (!womanTitleImgEl) {
            womanTitleImgEl = stageImagesEl[3][8];
            womanTitleEl.appendChild(womanTitleImgEl);
          }
          if (!manTitleImgEl) {
            manTitleImgEl = stageImagesEl[3][9];
            manTitleEl.appendChild(manTitleImgEl);
          }
          if (!bottomDescImgEl) {
            bottomDescImgEl = stageImagesEl[3][10];
            bottomDescEl.appendChild(bottomDescImgEl);
          }
          if (!tipImgEl) {
            tipImgEl = stageImagesEl[3][17];
            tipEl.appendChild(tipImgEl);
          }
        });

        setTimeout(function () {
          var cardDetailEl = thirdPage.querySelector('.card-detail');
          if (!$(cardDetailEl).attr('data-loaded')) {
            $(cardDetailEl).attr('data-loaded', 1);

            $(cardDetailEl).find('.close-btn').append(stageImagesEl[4][0]);
            $(cardDetailEl).find('.submit').append([stageImagesEl[4][1], stageImagesEl[4][2], stageImagesEl[4][3]]);
          }
        }, 600);
      });

      (function bindCardTapEvent() {
        $('.card-grid .card').on('tap', function (e) {
          if (showingDetail) return;
          showingDetail = true;

          var $cardEl = $(e.currentTarget);
          var $cardDetailEl = $(thirdPage).find('.card-detail');
          var $cardDetailCardEl = $cardDetailEl.find('.card');
          var index = parseInt($cardEl.attr('data-index'));

          var $titleEl = $cardDetailEl.find('.title');
          var $nameEl = $cardDetailEl.find('.name');
          var $commentEl = $cardDetailEl.find('.comment');
          var $descEl = $cardDetailEl.find('.desc');

          var images = stageImagesEl[index + 5];
          $titleEl.empty().append(images[2]);
          $nameEl.empty().append(images[3]);
          $commentEl.empty().append(images[4]);
          $descEl.empty();

          switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
              $descEl.append(stageImagesEl[4][4]);
              break;
            case 4:
            case 5:
              $descEl.append(stageImagesEl[4][5]);
              break;
          }

          $cardEl.removeClass('moving').addClass('expand');
          $cardDetailEl.addClass('ready');
          $cardDetailEl.attr('data-index', index);

          RAF(function () {
            var cardDetailCardOffset = $cardDetailCardEl.offset();
            var endX = cardDetailCardOffset.left, endY = cardDetailCardOffset.top;
            //var endW = $cardDetailCardEl.width(), endH = $cardDetailCardEl.height();
            var endW = 254, endH = 206;

            var offset = $cardEl.offset();
            var x = offset.left, y = offset.top;
            var w = $cardEl.width(), h = $cardEl.height();
            var xRate = endW / w, yRate = (endH / h);
            var translateX = endX - x, translateY = endY - y;

            RAF(function () {
              $cardEl.css({
                '-webkit-transform': 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + xRate + ')'
              });
              $cardDetailEl.addClass('fade-in-imp');

              setTimeout(function () {
                $cardEl.addClass('flashing');
              }, 600);
              //setTimeout(function () {
              //  rotateCardBack($cardEl);
              //}, 2600);
            });
          });
        });
        //$('.card-grid .card').on('longTap', function (e) {
        //  if (showingDetail) {
        //    e.preventDefault();
        //  }
        //});
        //$('.card-grid .card').on('touchstart', function (e) {
        //  if (showingDetail) {
        //    rotateCard($(e.currentTarget));
        //  }
        //});
        //$('.card-grid .card').on('touchend', function (e) {
        //  if (showingDetail) {
        //    rotateCardBack($(e.currentTarget));
        //  }
        //});

        //function rotateCard($cardEl) {
        //  var transform = $cardEl.css('transform');
        //  var strIndex = transform.indexOf(' rotateY(180deg)');
        //
        //  if (strIndex !== -1) {
        //    transform = transform.substr(0, strIndex);
        //  } else {
        //    transform += ' rotateY(180deg)'
        //  }
        //  $cardEl.css({
        //    '-webkit-transform': transform
        //  });
        //}
        //
        //function rotateCardBack($cardEl) {
        //  var transform = $cardEl.css('transform');
        //  var strIndex = transform.indexOf(' rotateY(180deg)');
        //
        //  if (strIndex !== -1) {
        //    transform = transform.substr(0, strIndex);
        //    $cardEl.css({
        //      '-webkit-transform': transform
        //    });
        //  }
        //}
      })();

      $('.card-detail>.close-btn').on('tap', function (e) {
        var $cardDetailEl = $(thirdPage).find('.card-detail');
        var index = $cardDetailEl.attr('data-index');
        var $lastCardEl = $(thirdPage).find('.card-grid .card[data-index="' + index + '"]');

        $cardDetailEl.removeClass('fade-in-imp');
        $lastCardEl.css({
          '-webkit-transform': 'translate(0,0) scale(1)'
        });

        setTimeout(function () {
          $lastCardEl.removeClass('expand flashing').addClass('moving');
          $cardDetailEl.removeClass('ready');
          showingDetail = false;
        }, 616);
      });

      $('.card-wrapper>.close-btn').on('tap', function (e) {
        var currentPage = document.querySelector('.pages>.page.active');
        var firstPage = document.querySelector('.pages>.page[data-index="0"]');

        changePage(firstPage, currentPage, true);
        ended = false;
        setTimeout(function () {
          triggerEvent(document, 'pageEndBack');
          triggerEvent(currentPage, 'bg-active');
        }, 1000);
      });

      $('.card-detail>.submit').on('tap', function (e) {
        var $cardDetailEl = $(thirdPage).find('.card-detail');
        var index = parseInt($cardDetailEl.attr('data-index'));
        var href;
        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
            href = 'https://mbank.spdbccc.com.cn/creditcard/indexActivity.htm?data=001243';
            break;
          case 4:
          case 5:
            href = 'https://mbank.spdbccc.com.cn/creditcard/indexActivity.htm?data=000701';
            break;
        }
        href && (window.location.href = href);
      });
    }

    function setupLoadingProgress() {
      var loadingPageNumberEl = document.querySelector('.pages>.loading .number');
      var count = mergedStageImages.length;

      (function loop() {
        var rate = loadingIndex / count;
        loadingPageNumberEl.innerText = parseInt(rate * 100) + '%';
        if (loadingIndex < count) RAF(loop);
      })();
    }

    (function start() {
      setupLoadingProgress();

      loadStageImagesSerial();

      document.addEventListener('stageImagesLoaded', function (e) {
        var data = e.detail;
        var index = data.index;
        var images = data.images;
        var pageEl;

        switch (index) {
          case 0:
            // 背景
            pageEl = document.querySelector('.pages>.page[data-index="' + index + '"]');
            var navEl = pageEl.querySelector('.nav');

            $(images[0]).addClass('current');
            $(pageEl.querySelector('.bg')).append([images[0], images[2], images[4]]);
            $(navEl).append([images[5]]);
            break;
          case 1:
            // 背景
            pageEl = document.querySelector('.pages>.page[data-index="' + index + '"]');
            var bgEl = pageEl.querySelector('.bg');
            var navEl = pageEl.querySelector('.nav');

            $(images[0]).addClass('current');
            $(bgEl).append([images[0], images[2], images[3]]);
            $(navEl).append([images[4]]);
            break;
          case 2:
            // 背景
            pageEl = document.querySelector('.pages>.page[data-index="' + index + '"]');
            var logoEl = pageEl.querySelector('.logo');
            var bgEl = pageEl.querySelector('.bg');
            var navEl = pageEl.querySelector('.nav');
            var pushed = [];

            for (var i = 0; i < 57; i++) {
              pushed.push(images[i + 2]);
            }
            bgEl.appendChild(images[0]);
            $(logoEl).append(pushed);
            $(navEl).append([images[59]]);
            break;
          case 3:
            // 卡片
            pageEl= document.querySelector('.pages>.page[data-index="' + 2 + '"]');
            var cardGridEl = pageEl.querySelector('.card-grid');
            var $cardsEl = $(cardGridEl).find('.row .card');

            $($cardsEl[0]).prepend([images[1], images[11], images[18], images[24], images[28]]);
            $($cardsEl[1]).prepend([images[2], images[12], images[19], images[25], images[29]]);
            $($cardsEl[2]).prepend([images[3], images[13], images[20], images[26], images[30]]);
            $($cardsEl[3]).prepend([images[4], images[14], images[21], images[27], images[31]]);
            $($cardsEl[4]).prepend([images[5], images[15], images[22], images[32]]);
            $($cardsEl[5]).prepend([images[6], images[16], images[23], images[33]]);
            break;
          case 5:
            // 设置卡片大小
            pageEl = document.querySelector('.pages>.page[data-index="' + 2 + '"]');
            $(pageEl.querySelector('.card-detail>.card')).append([images[0], images[1]]);
            break;
          default:
            break;
        }
      }, false);

      document.addEventListener('allStageImagesLoaded', function (e) {
        var now = Date.now();
        var diff = now - lastTime;

        if (diff < 2000) {
          setTimeout(over, 2000 - diff);
        } else {
          over();
        }

        function over() {
          // removeLoading
          $('.pages>.loading').remove();

          setTimeout(function () {
            initTransitionEvents();
          }, 1500);

          initPageEvents();

          // show first page
          var firstPage = document.querySelector('.pages>.page[data-index="0"]');
          addClass(firstPage, 'animating ps-first-in');
          RAF(function () {
            addClass(firstPage, 'ps-active');
            setTimeout(function () {
              addClass(firstPage, 'active');
              removeClass(firstPage, 'animating');
              removeClass(firstPage, 'ps-active');
              removeClass(firstPage, 'ps-first-in');

              triggerEvent(firstPage, 'active');
            }, 1016);
          });
        }
      }, false);

      $('#on-off-btn').on('tap', function (e) {
        var $btn = $(e.currentTarget);
        var bgMusic = document.querySelector('#bg-music');

        if ($btn.hasClass('running')) {
          bgMusic.pause();
        } else {
          bgMusic.play();
        }
        $btn.toggleClass('running');
      });
    })();

    // Util
    function animateImgs($el, times, freqCount) {
      times = times || 'infinite';
      freqCount = freqCount || 5;

      var imgEls = $el.find('img');
      var current = 0, size = imgEls.length;
      var counter = 0;
      var over = false;

      function loop() {
        if (over) return;
        RAF(loop);
        if (counter < freqCount) return counter++;

        counter = 0;
        $(imgEls[current]).removeClass('current');
        current++;

        if (current >= size) {
          if (times !== 'infinite') {
            times--;
            if (times <= 0) over = true;
            current = size - 1;
          } else {
            current = 0;
          }
        }
        $(imgEls[current]).addClass('current');
      }
      loop();

      return (function () { over = true; });
    }

    function triggerEvent(element, name, opts) {
      var event = new CustomEvent(name, {
        detail: opts
      });
      element.dispatchEvent(event);
    }

    function cssStyle(obj, properties) {
      for (var k in properties) obj.style[k] = properties[k];
    }

    function hasClass(obj, cls) {
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
      if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    function removeClass(obj, cls) {
      if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
      }
    }

    function toggleClass(obj,cls){
      if(hasClass(obj,cls)){
        removeClass(obj, cls);
      }else{
        addClass(obj, cls);
      }
    }
  })
})();
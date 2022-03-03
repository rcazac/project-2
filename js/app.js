/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      97: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, s = arguments.length; i < s; i++)
                    for (var n in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              thumbnail: !0,
              animateThumb: !0,
              currentPagerPosition: "middle",
              alignThumbnails: "middle",
              thumbWidth: 100,
              thumbHeight: "80px",
              thumbMargin: 5,
              appendThumbnailsTo: ".lg-components",
              toggleThumb: !1,
              enableThumbDrag: !0,
              enableThumbSwipe: !0,
              thumbnailSwipeThreshold: 10,
              loadYouTubeThumbnail: !0,
              youTubeThumbSize: 1,
            },
            i = "lgContainerResize",
            s = "lgUpdateSlides",
            n = "lgBeforeOpen",
            o = "lgBeforeSlide";
          return (function () {
            function r(e, t) {
              return (
                (this.thumbOuterWidth = 0),
                (this.thumbTotalWidth = 0),
                (this.translateX = 0),
                (this.thumbClickable = !1),
                (this.core = e),
                (this.$LG = t),
                this
              );
            }
            return (
              (r.prototype.init = function () {
                (this.settings = e(e({}, t), this.core.settings)),
                  (this.thumbOuterWidth = 0),
                  (this.thumbTotalWidth =
                    this.core.galleryItems.length *
                    (this.settings.thumbWidth + this.settings.thumbMargin)),
                  (this.translateX = 0),
                  this.setAnimateThumbStyles(),
                  this.core.settings.allowMediaOverlap ||
                    (this.settings.toggleThumb = !1),
                  this.settings.thumbnail &&
                    (this.build(),
                    this.settings.animateThumb
                      ? (this.settings.enableThumbDrag &&
                          this.enableThumbDrag(),
                        this.settings.enableThumbSwipe &&
                          this.enableThumbSwipe(),
                        (this.thumbClickable = !1))
                      : (this.thumbClickable = !0),
                    this.toggleThumbBar(),
                    this.thumbKeyPress());
              }),
              (r.prototype.build = function () {
                var e = this;
                this.setThumbMarkup(),
                  this.manageActiveClassOnSlideChange(),
                  this.$lgThumb
                    .first()
                    .on("click.lg touchend.lg", function (t) {
                      var i = e.$LG(t.target);
                      i.hasAttribute("data-lg-item-id") &&
                        setTimeout(function () {
                          if (e.thumbClickable && !e.core.lgBusy) {
                            var t = parseInt(i.attr("data-lg-item-id"));
                            e.core.slide(t, !1, !0, !1);
                          }
                        }, 50);
                    }),
                  this.core.LGel.on(o + ".thumb", function (t) {
                    var i = t.detail.index;
                    e.animateThumb(i);
                  }),
                  this.core.LGel.on(n + ".thumb", function () {
                    e.thumbOuterWidth = e.core.outer.get().offsetWidth;
                  }),
                  this.core.LGel.on(s + ".thumb", function () {
                    e.rebuildThumbnails();
                  }),
                  this.core.LGel.on(i + ".thumb", function () {
                    e.core.lgOpened &&
                      setTimeout(function () {
                        (e.thumbOuterWidth = e.core.outer.get().offsetWidth),
                          e.animateThumb(e.core.index),
                          (e.thumbOuterWidth = e.core.outer.get().offsetWidth);
                      }, 50);
                  });
              }),
              (r.prototype.setThumbMarkup = function () {
                var e = "lg-thumb-outer ";
                this.settings.alignThumbnails &&
                  (e += "lg-thumb-align-" + this.settings.alignThumbnails);
                var t =
                  '<div class="' +
                  e +
                  '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                this.core.outer.addClass("lg-has-thumb"),
                  ".lg-components" === this.settings.appendThumbnailsTo
                    ? this.core.$lgComponents.append(t)
                    : this.core.outer.append(t),
                  (this.$thumbOuter = this.core.outer
                    .find(".lg-thumb-outer")
                    .first()),
                  (this.$lgThumb = this.core.outer.find(".lg-thumb").first()),
                  this.settings.animateThumb &&
                    this.core.outer
                      .find(".lg-thumb")
                      .css(
                        "transition-duration",
                        this.core.settings.speed + "ms"
                      )
                      .css("width", this.thumbTotalWidth + "px")
                      .css("position", "relative"),
                  this.setThumbItemHtml(this.core.galleryItems);
              }),
              (r.prototype.enableThumbDrag = function () {
                var e = this,
                  t = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  },
                  i = !1;
                this.$thumbOuter.addClass("lg-grab"),
                  this.core.outer
                    .find(".lg-thumb")
                    .first()
                    .on("mousedown.lg.thumb", function (s) {
                      e.thumbTotalWidth > e.thumbOuterWidth &&
                        (s.preventDefault(),
                        (t.cords.startX = s.pageX),
                        (t.startTime = new Date()),
                        (e.thumbClickable = !1),
                        (i = !0),
                        (e.core.outer.get().scrollLeft += 1),
                        (e.core.outer.get().scrollLeft -= 1),
                        e.$thumbOuter
                          .removeClass("lg-grab")
                          .addClass("lg-grabbing"));
                    }),
                  this.$LG(window).on(
                    "mousemove.lg.thumb.global" + this.core.lgId,
                    function (s) {
                      e.core.lgOpened &&
                        i &&
                        ((t.cords.endX = s.pageX), (t = e.onThumbTouchMove(t)));
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.thumb.global" + this.core.lgId,
                    function () {
                      e.core.lgOpened &&
                        (t.isMoved
                          ? (t = e.onThumbTouchEnd(t))
                          : (e.thumbClickable = !0),
                        i &&
                          ((i = !1),
                          e.$thumbOuter
                            .removeClass("lg-grabbing")
                            .addClass("lg-grab")));
                    }
                  );
              }),
              (r.prototype.enableThumbSwipe = function () {
                var e = this,
                  t = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  };
                this.$lgThumb.on("touchstart.lg", function (i) {
                  e.thumbTotalWidth > e.thumbOuterWidth &&
                    (i.preventDefault(),
                    (t.cords.startX = i.targetTouches[0].pageX),
                    (e.thumbClickable = !1),
                    (t.startTime = new Date()));
                }),
                  this.$lgThumb.on("touchmove.lg", function (i) {
                    e.thumbTotalWidth > e.thumbOuterWidth &&
                      (i.preventDefault(),
                      (t.cords.endX = i.targetTouches[0].pageX),
                      (t = e.onThumbTouchMove(t)));
                  }),
                  this.$lgThumb.on("touchend.lg", function () {
                    t.isMoved
                      ? (t = e.onThumbTouchEnd(t))
                      : (e.thumbClickable = !0);
                  });
              }),
              (r.prototype.rebuildThumbnails = function () {
                var e = this;
                this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),
                  setTimeout(function () {
                    (e.thumbTotalWidth =
                      e.core.galleryItems.length *
                      (e.settings.thumbWidth + e.settings.thumbMargin)),
                      e.$lgThumb.css("width", e.thumbTotalWidth + "px"),
                      e.$lgThumb.empty(),
                      e.setThumbItemHtml(e.core.galleryItems),
                      e.animateThumb(e.core.index);
                  }, 50),
                  setTimeout(function () {
                    e.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                  }, 200);
              }),
              (r.prototype.setTranslate = function (e) {
                this.$lgThumb.css(
                  "transform",
                  "translate3d(-" + e + "px, 0px, 0px)"
                );
              }),
              (r.prototype.getPossibleTransformX = function (e) {
                return (
                  e > this.thumbTotalWidth - this.thumbOuterWidth &&
                    (e = this.thumbTotalWidth - this.thumbOuterWidth),
                  e < 0 && (e = 0),
                  e
                );
              }),
              (r.prototype.animateThumb = function (e) {
                if (
                  (this.$lgThumb.css(
                    "transition-duration",
                    this.core.settings.speed + "ms"
                  ),
                  this.settings.animateThumb)
                ) {
                  var t = 0;
                  switch (this.settings.currentPagerPosition) {
                    case "left":
                      t = 0;
                      break;
                    case "middle":
                      t =
                        this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                      break;
                    case "right":
                      t = this.thumbOuterWidth - this.settings.thumbWidth;
                  }
                  (this.translateX =
                    (this.settings.thumbWidth + this.settings.thumbMargin) * e -
                    1 -
                    t),
                    this.translateX >
                      this.thumbTotalWidth - this.thumbOuterWidth &&
                      (this.translateX =
                        this.thumbTotalWidth - this.thumbOuterWidth),
                    this.translateX < 0 && (this.translateX = 0),
                    this.setTranslate(this.translateX);
                }
              }),
              (r.prototype.onThumbTouchMove = function (e) {
                return (
                  (e.newTranslateX = this.translateX),
                  (e.isMoved = !0),
                  (e.touchMoveTime = new Date().valueOf()),
                  (e.newTranslateX -= e.cords.endX - e.cords.startX),
                  (e.newTranslateX = this.getPossibleTransformX(
                    e.newTranslateX
                  )),
                  this.setTranslate(e.newTranslateX),
                  this.$thumbOuter.addClass("lg-dragging"),
                  e
                );
              }),
              (r.prototype.onThumbTouchEnd = function (e) {
                (e.isMoved = !1),
                  (e.endTime = new Date()),
                  this.$thumbOuter.removeClass("lg-dragging");
                var t = e.endTime.valueOf() - e.startTime.valueOf(),
                  i = e.cords.endX - e.cords.startX,
                  s = Math.abs(i) / t;
                return (
                  s > 0.15 && e.endTime.valueOf() - e.touchMoveTime < 30
                    ? ((s += 1) > 2 && (s += 1),
                      (s += s * (Math.abs(i) / this.thumbOuterWidth)),
                      this.$lgThumb.css(
                        "transition-duration",
                        Math.min(s - 1, 2) + "settings"
                      ),
                      (i *= s),
                      (this.translateX = this.getPossibleTransformX(
                        this.translateX - i
                      )),
                      this.setTranslate(this.translateX))
                    : (this.translateX = e.newTranslateX),
                  Math.abs(e.cords.endX - e.cords.startX) <
                    this.settings.thumbnailSwipeThreshold &&
                    (this.thumbClickable = !0),
                  e
                );
              }),
              (r.prototype.getThumbHtml = function (e, t) {
                var i,
                  s = this.core.galleryItems[t].__slideVideoInfo || {};
                return (
                  (i =
                    s.youtube && this.settings.loadYouTubeThumbnail
                      ? "//img.youtube.com/vi/" +
                        s.youtube[1] +
                        "/" +
                        this.settings.youTubeThumbSize +
                        ".jpg"
                      : e),
                  '<div data-lg-item-id="' +
                    t +
                    '" class="lg-thumb-item ' +
                    (t === this.core.index ? " active" : "") +
                    '" \n        style="width:' +
                    this.settings.thumbWidth +
                    "px; height: " +
                    this.settings.thumbHeight +
                    ";\n            margin-right: " +
                    this.settings.thumbMargin +
                    'px;">\n            <img data-lg-item-id="' +
                    t +
                    '" src="' +
                    i +
                    '" />\n        </div>'
                );
              }),
              (r.prototype.getThumbItemHtml = function (e) {
                for (var t = "", i = 0; i < e.length; i++)
                  t += this.getThumbHtml(e[i].thumb, i);
                return t;
              }),
              (r.prototype.setThumbItemHtml = function (e) {
                var t = this.getThumbItemHtml(e);
                this.$lgThumb.html(t);
              }),
              (r.prototype.setAnimateThumbStyles = function () {
                this.settings.animateThumb &&
                  this.core.outer.addClass("lg-animate-thumb");
              }),
              (r.prototype.manageActiveClassOnSlideChange = function () {
                var e = this;
                this.core.LGel.on(o + ".thumb", function (t) {
                  var i = e.core.outer.find(".lg-thumb-item"),
                    s = t.detail.index;
                  i.removeClass("active"), i.eq(s).addClass("active");
                });
              }),
              (r.prototype.toggleThumbBar = function () {
                var e = this;
                this.settings.toggleThumb &&
                  (this.core.outer.addClass("lg-can-toggle"),
                  this.core.$toolbar.append(
                    '<button type="button" aria-label="Toggle thumbnails" class="lg-toggle-thumb lg-icon"></button>'
                  ),
                  this.core.outer
                    .find(".lg-toggle-thumb")
                    .first()
                    .on("click.lg", function () {
                      e.core.outer.toggleClass("lg-components-open");
                    }));
              }),
              (r.prototype.thumbKeyPress = function () {
                var e = this;
                this.$LG(window).on(
                  "keydown.lg.thumb.global" + this.core.lgId,
                  function (t) {
                    e.core.lgOpened &&
                      e.settings.toggleThumb &&
                      (38 === t.keyCode
                        ? (t.preventDefault(),
                          e.core.outer.addClass("lg-components-open"))
                        : 40 === t.keyCode &&
                          (t.preventDefault(),
                          e.core.outer.removeClass("lg-components-open")));
                  }
                );
              }),
              (r.prototype.destroy = function () {
                this.settings.thumbnail &&
                  (this.$LG(window).off(".lg.thumb.global" + this.core.lgId),
                  this.core.LGel.off(".lg.thumb"),
                  this.core.LGel.off(".thumb"),
                  this.$thumbOuter.remove(),
                  this.core.outer.removeClass("lg-has-thumb"));
              }),
              r
            );
          })();
        })();
      },
      363: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, s = arguments.length; i < s; i++)
                    for (var n in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              autoplayFirstVideo: !0,
              youTubePlayerParams: !1,
              vimeoPlayerParams: !1,
              wistiaPlayerParams: !1,
              gotoNextSlideOnVideoEnd: !0,
              autoplayVideoOnSlide: !1,
              videojs: !1,
              videojsOptions: {},
            },
            i = "lgHasVideo",
            s = "lgSlideItemLoad",
            n = "lgBeforeSlide",
            o = "lgAfterSlide",
            r = "lgPosterClick",
            a = function (e) {
              return Object.keys(e)
                .map(function (t) {
                  return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
                })
                .join("&");
            };
          return (function () {
            function l(i) {
              return (
                (this.core = i),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (l.prototype.init = function () {
                var e = this;
                this.core.LGel.on(i + ".video", this.onHasVideo.bind(this)),
                  this.core.LGel.on(r + ".video", function () {
                    var t = e.core.getSlideItem(e.core.index);
                    e.loadVideoOnPosterClick(t);
                  }),
                  this.core.LGel.on(
                    s + ".video",
                    this.onSlideItemLoad.bind(this)
                  ),
                  this.core.LGel.on(
                    n + ".video",
                    this.onBeforeSlide.bind(this)
                  ),
                  this.core.LGel.on(o + ".video", this.onAfterSlide.bind(this));
              }),
              (l.prototype.onSlideItemLoad = function (e) {
                var t = this,
                  i = e.detail,
                  s = i.isFirstSlide,
                  n = i.index;
                this.settings.autoplayFirstVideo &&
                  s &&
                  n === this.core.index &&
                  setTimeout(function () {
                    t.loadAndPlayVideo(n);
                  }, 200),
                  !s &&
                    this.settings.autoplayVideoOnSlide &&
                    n === this.core.index &&
                    this.loadAndPlayVideo(n);
              }),
              (l.prototype.onHasVideo = function (e) {
                var t = e.detail,
                  i = t.index,
                  s = t.src,
                  n = t.html5Video;
                t.hasPoster ||
                  (this.appendVideos(this.core.getSlideItem(i), {
                    src: s,
                    addClass: "lg-object",
                    index: i,
                    html5Video: n,
                  }),
                  this.gotoNextSlideOnVideoEnd(s, i));
              }),
              (l.prototype.onBeforeSlide = function (e) {
                if (this.core.lGalleryOn) {
                  var t = e.detail.prevIndex;
                  this.pauseVideo(t);
                }
              }),
              (l.prototype.onAfterSlide = function (e) {
                var t = this,
                  i = e.detail,
                  s = i.index,
                  n = i.prevIndex,
                  o = this.core.getSlideItem(s);
                this.settings.autoplayVideoOnSlide &&
                  s !== n &&
                  o.hasClass("lg-complete") &&
                  setTimeout(function () {
                    t.loadAndPlayVideo(s);
                  }, 100);
              }),
              (l.prototype.loadAndPlayVideo = function (e) {
                var t = this.core.getSlideItem(e);
                this.core.galleryItems[e].poster
                  ? this.loadVideoOnPosterClick(t, !0)
                  : this.playVideo(e);
              }),
              (l.prototype.playVideo = function (e) {
                this.controlVideo(e, "play");
              }),
              (l.prototype.pauseVideo = function (e) {
                this.controlVideo(e, "pause");
              }),
              (l.prototype.getVideoHtml = function (e, t, i, s) {
                var n = "",
                  o = this.core.galleryItems[i].__slideVideoInfo || {},
                  r = this.core.galleryItems[i],
                  l = r.title || r.alt;
                l = l ? 'title="' + l + '"' : "";
                var d =
                  'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
                if (o.youtube) {
                  var u = "lg-youtube" + i,
                    c =
                      "?" +
                      (o.youtube[2] ? o.youtube[2] + "&" : "") +
                      "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" +
                      (this.settings.youTubePlayerParams
                        ? "&" + a(this.settings.youTubePlayerParams)
                        : "");
                  n =
                    '<iframe allow="autoplay" id=' +
                    u +
                    ' class="lg-video-object lg-youtube ' +
                    t +
                    '" ' +
                    l +
                    ' src="//www.youtube.com/embed/' +
                    (o.youtube[1] + c) +
                    '" ' +
                    d +
                    "></iframe>";
                } else if (o.vimeo)
                  (u = "lg-vimeo" + i),
                    (c = (function (e, t) {
                      if (!t || !t.vimeo) return "";
                      var i = t.vimeo[2] || "";
                      return (
                        (i = "?" == i[0] ? "&" + i.slice(1) : i || ""),
                        "?autoplay=0&muted=1" + (e ? "&" + a(e) : "") + i
                      );
                    })(this.settings.vimeoPlayerParams, o)),
                    (n =
                      '<iframe allow="autoplay" id=' +
                      u +
                      ' class="lg-video-object lg-vimeo ' +
                      t +
                      '" ' +
                      l +
                      ' src="//player.vimeo.com/video/' +
                      (o.vimeo[1] + c) +
                      '" ' +
                      d +
                      "></iframe>");
                else if (o.wistia) {
                  var h = "lg-wistia" + i;
                  (c = (c = a(this.settings.wistiaPlayerParams))
                    ? "?" + c
                    : ""),
                    (n =
                      '<iframe allow="autoplay" id="' +
                      h +
                      '" src="//fast.wistia.net/embed/iframe/' +
                      (o.wistia[4] + c) +
                      '" ' +
                      l +
                      ' class="wistia_embed lg-video-object lg-wistia ' +
                      t +
                      '" name="wistia_embed" ' +
                      d +
                      "></iframe>");
                } else if (o.html5) {
                  for (var p = "", m = 0; m < s.source.length; m++)
                    p +=
                      '<source src="' +
                      s.source[m].src +
                      '" type="' +
                      s.source[m].type +
                      '">';
                  if (s.tracks) {
                    var g = function (e) {
                      var t = "",
                        i = s.tracks[e];
                      Object.keys(i || {}).forEach(function (e) {
                        t += e + '="' + i[e] + '" ';
                      }),
                        (p += "<track " + t + ">");
                    };
                    for (m = 0; m < s.tracks.length; m++) g(m);
                  }
                  var f = "",
                    v = s.attributes || {};
                  Object.keys(v || {}).forEach(function (e) {
                    f += e + '="' + v[e] + '" ';
                  }),
                    (n =
                      '<video class="lg-video-object lg-html5 ' +
                      (this.settings.videojs ? "video-js" : "") +
                      '" ' +
                      f +
                      ">\n                " +
                      p +
                      "\n                Your browser does not support HTML5 video.\n            </video>");
                }
                return n;
              }),
              (l.prototype.appendVideos = function (e, t) {
                var i,
                  s = this.getVideoHtml(
                    t.src,
                    t.addClass,
                    t.index,
                    t.html5Video
                  );
                e.find(".lg-video-cont").append(s);
                var n = e.find(".lg-video-object").first();
                if (
                  (t.html5Video &&
                    n.on("mousedown.lg.video", function (e) {
                      e.stopPropagation();
                    }),
                  this.settings.videojs &&
                    (null ===
                      (i = this.core.galleryItems[t.index].__slideVideoInfo) ||
                    void 0 === i
                      ? void 0
                      : i.html5))
                )
                  try {
                    return videojs(n.get(), this.settings.videojsOptions);
                  } catch (e) {
                    console.error(
                      "lightGallery:- Make sure you have included videojs"
                    );
                  }
              }),
              (l.prototype.gotoNextSlideOnVideoEnd = function (e, t) {
                var i = this,
                  s = this.core
                    .getSlideItem(t)
                    .find(".lg-video-object")
                    .first(),
                  n = this.core.galleryItems[t].__slideVideoInfo || {};
                if (this.settings.gotoNextSlideOnVideoEnd)
                  if (n.html5)
                    s.on("ended", function () {
                      i.core.goToNextSlide();
                    });
                  else if (n.vimeo)
                    try {
                      new Vimeo.Player(s.get()).on("ended", function () {
                        i.core.goToNextSlide();
                      });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                      );
                    }
                  else if (n.wistia)
                    try {
                      (window._wq = window._wq || []),
                        window._wq.push({
                          id: s.attr("id"),
                          onReady: function (e) {
                            e.bind("end", function () {
                              i.core.goToNextSlide();
                            });
                          },
                        });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                      );
                    }
              }),
              (l.prototype.controlVideo = function (e, t) {
                var i = this.core
                    .getSlideItem(e)
                    .find(".lg-video-object")
                    .first(),
                  s = this.core.galleryItems[e].__slideVideoInfo || {};
                if (i.get())
                  if (s.youtube)
                    try {
                      i.get().contentWindow.postMessage(
                        '{"event":"command","func":"' + t + 'Video","args":""}',
                        "*"
                      );
                    } catch (e) {
                      console.error("lightGallery:- " + e);
                    }
                  else if (s.vimeo)
                    try {
                      new Vimeo.Player(i.get())[t]();
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                      );
                    }
                  else if (s.html5)
                    if (this.settings.videojs)
                      try {
                        videojs(i.get())[t]();
                      } catch (e) {
                        console.error(
                          "lightGallery:- Make sure you have included videojs"
                        );
                      }
                    else i.get()[t]();
                  else if (s.wistia)
                    try {
                      (window._wq = window._wq || []),
                        window._wq.push({
                          id: i.attr("id"),
                          onReady: function (e) {
                            e[t]();
                          },
                        });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                      );
                    }
              }),
              (l.prototype.loadVideoOnPosterClick = function (e, t) {
                var i = this;
                if (e.hasClass("lg-video-loaded"))
                  t && this.playVideo(this.core.index);
                else if (e.hasClass("lg-has-video"))
                  this.playVideo(this.core.index);
                else {
                  e.addClass("lg-has-video");
                  var s = void 0,
                    n = this.core.galleryItems[this.core.index].src,
                    o = this.core.galleryItems[this.core.index].video;
                  o && (s = "string" == typeof o ? JSON.parse(o) : o);
                  var r = this.appendVideos(e, {
                    src: n,
                    addClass: "",
                    index: this.core.index,
                    html5Video: s,
                  });
                  this.gotoNextSlideOnVideoEnd(n, this.core.index);
                  var a = e.find(".lg-object").first().get();
                  e.find(".lg-video-cont").first().append(a),
                    e.addClass("lg-video-loading"),
                    r &&
                      r.ready(function () {
                        r.on("loadedmetadata", function () {
                          i.onVideoLoadAfterPosterClick(e, i.core.index);
                        });
                      }),
                    e
                      .find(".lg-video-object")
                      .first()
                      .on("load.lg error.lg loadedmetadata.lg", function () {
                        setTimeout(function () {
                          i.onVideoLoadAfterPosterClick(e, i.core.index);
                        }, 50);
                      });
                }
              }),
              (l.prototype.onVideoLoadAfterPosterClick = function (e, t) {
                e.addClass("lg-video-loaded"), this.playVideo(t);
              }),
              (l.prototype.destroy = function () {
                this.core.LGel.off(".lg.video"), this.core.LGel.off(".video");
              }),
              l
            );
          })();
        })();
      },
    },
    t = {};
  function i(s) {
    var n = t[s];
    if (void 0 !== n) return n.exports;
    var o = (t[s] = { exports: {} });
    return e[s].call(o.exports, o, o.exports, i), o.exports;
  }
  (() => {
    "use strict";
    function e(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function t(i = {}, s = {}) {
      Object.keys(s).forEach((n) => {
        void 0 === i[n]
          ? (i[n] = s[n])
          : e(s[n]) && e(i[n]) && Object.keys(s[n]).length > 0 && t(i[n], s[n]);
      });
    }
    const s = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function n() {
      const e = "undefined" != typeof document ? document : {};
      return t(e, s), e;
    }
    const o = {
      document: s,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function r() {
      const e = "undefined" != typeof window ? window : {};
      return t(e, o), e;
    }
    class a extends Array {
      constructor(e) {
        "number" == typeof e
          ? super(e)
          : (super(...(e || [])),
            (function (e) {
              const t = e.__proto__;
              Object.defineProperty(e, "__proto__", {
                get: () => t,
                set(e) {
                  t.__proto__ = e;
                },
              });
            })(this));
      }
    }
    function l(e = []) {
      const t = [];
      return (
        e.forEach((e) => {
          Array.isArray(e) ? t.push(...l(e)) : t.push(e);
        }),
        t
      );
    }
    function d(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function u(e, t) {
      const i = r(),
        s = n();
      let o = [];
      if (!t && e instanceof a) return e;
      if (!e) return new a(o);
      if ("string" == typeof e) {
        const i = e.trim();
        if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
          let e = "div";
          0 === i.indexOf("<li") && (e = "ul"),
            0 === i.indexOf("<tr") && (e = "tbody"),
            (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
            0 === i.indexOf("<tbody") && (e = "table"),
            0 === i.indexOf("<option") && (e = "select");
          const t = s.createElement(e);
          t.innerHTML = i;
          for (let e = 0; e < t.childNodes.length; e += 1)
            o.push(t.childNodes[e]);
        } else
          o = (function (e, t) {
            if ("string" != typeof e) return [e];
            const i = [],
              s = t.querySelectorAll(e);
            for (let e = 0; e < s.length; e += 1) i.push(s[e]);
            return i;
          })(e.trim(), t || s);
      } else if (e.nodeType || e === i || e === s) o.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof a) return e;
        o = e;
      }
      return new a(
        (function (e) {
          const t = [];
          for (let i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
          return t;
        })(o)
      );
    }
    u.fn = a.prototype;
    const c = "resize scroll".split(" ");
    function h(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            c.indexOf(e) < 0 &&
              (e in this[t] ? this[t][e]() : u(this[t]).trigger(e));
          return this;
        }
        return this.on(e, ...t);
      };
    }
    h("click"),
      h("blur"),
      h("focus"),
      h("focusin"),
      h("focusout"),
      h("keyup"),
      h("keydown"),
      h("keypress"),
      h("submit"),
      h("change"),
      h("mousedown"),
      h("mousemove"),
      h("mouseup"),
      h("mouseenter"),
      h("mouseleave"),
      h("mouseout"),
      h("mouseover"),
      h("touchstart"),
      h("touchend"),
      h("touchmove"),
      h("resize"),
      h("scroll");
    const p = {
      addClass: function (...e) {
        const t = l(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.add(...t);
          }),
          this
        );
      },
      removeClass: function (...e) {
        const t = l(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.remove(...t);
          }),
          this
        );
      },
      hasClass: function (...e) {
        const t = l(e.map((e) => e.split(" ")));
        return (
          d(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
            .length > 0
        );
      },
      toggleClass: function (...e) {
        const t = l(e.map((e) => e.split(" ")));
        this.forEach((e) => {
          t.forEach((t) => {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (let i = 0; i < this.length; i += 1)
          if (2 === arguments.length) this[i].setAttribute(e, t);
          else
            for (const t in e)
              (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
        return this;
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? `${e}ms` : e;
        return this;
      },
      on: function (...e) {
        let [t, i, s, n] = e;
        function o(e) {
          const t = e.target;
          if (!t) return;
          const n = e.target.dom7EventData || [];
          if ((n.indexOf(e) < 0 && n.unshift(e), u(t).is(i))) s.apply(t, n);
          else {
            const e = u(t).parents();
            for (let t = 0; t < e.length; t += 1)
              u(e[t]).is(i) && s.apply(e[t], n);
          }
        }
        function r(e) {
          const t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
        }
        "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
          n || (n = !1);
        const a = t.split(" ");
        let l;
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e];
          if (i)
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: s, proxyListener: o }),
                t.addEventListener(e, o, n);
            }
          else
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: s, proxyListener: r }),
                t.addEventListener(e, r, n);
            }
        }
        return this;
      },
      off: function (...e) {
        let [t, i, s, n] = e;
        "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
          n || (n = !1);
        const o = t.split(" ");
        for (let e = 0; e < o.length; e += 1) {
          const t = o[e];
          for (let e = 0; e < this.length; e += 1) {
            const o = this[e];
            let r;
            if (
              (!i && o.dom7Listeners
                ? (r = o.dom7Listeners[t])
                : i && o.dom7LiveListeners && (r = o.dom7LiveListeners[t]),
              r && r.length)
            )
              for (let e = r.length - 1; e >= 0; e -= 1) {
                const i = r[e];
                (s && i.listener === s) ||
                (s &&
                  i.listener &&
                  i.listener.dom7proxy &&
                  i.listener.dom7proxy === s)
                  ? (o.removeEventListener(t, i.proxyListener, n),
                    r.splice(e, 1))
                  : s ||
                    (o.removeEventListener(t, i.proxyListener, n),
                    r.splice(e, 1));
              }
          }
        }
        return this;
      },
      trigger: function (...e) {
        const t = r(),
          i = e[0].split(" "),
          s = e[1];
        for (let n = 0; n < i.length; n += 1) {
          const o = i[n];
          for (let i = 0; i < this.length; i += 1) {
            const n = this[i];
            if (t.CustomEvent) {
              const i = new t.CustomEvent(o, {
                detail: s,
                bubbles: !0,
                cancelable: !0,
              });
              (n.dom7EventData = e.filter((e, t) => t > 0)),
                n.dispatchEvent(i),
                (n.dom7EventData = []),
                delete n.dom7EventData;
            }
          }
        }
        return this;
      },
      transitionEnd: function (e) {
        const t = this;
        return (
          e &&
            t.on("transitionend", function i(s) {
              s.target === this && (e.call(this, s), t.off("transitionend", i));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        const e = r();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          const e = r(),
            t = n(),
            i = this[0],
            s = i.getBoundingClientRect(),
            o = t.body,
            a = i.clientTop || o.clientTop || 0,
            l = i.clientLeft || o.clientLeft || 0,
            d = i === e ? e.scrollY : i.scrollTop,
            u = i === e ? e.scrollX : i.scrollLeft;
          return { top: s.top + d - a, left: s.left + u - l };
        }
        return null;
      },
      css: function (e, t) {
        const i = r();
        let s;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (s = 0; s < this.length; s += 1)
              for (const t in e) this[s].style[t] = e[t];
            return this;
          }
          if (this[0])
            return i.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach((t, i) => {
              e.apply(t, [t, i]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        const t = r(),
          i = n(),
          s = this[0];
        let o, l;
        if (!s || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (s.matches) return s.matches(e);
          if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
          if (s.msMatchesSelector) return s.msMatchesSelector(e);
          for (o = u(e), l = 0; l < o.length; l += 1) if (o[l] === s) return !0;
          return !1;
        }
        if (e === i) return s === i;
        if (e === t) return s === t;
        if (e.nodeType || e instanceof a) {
          for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
            if (o[l] === s) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        let e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        const t = this.length;
        if (e > t - 1) return u([]);
        if (e < 0) {
          const i = t + e;
          return u(i < 0 ? [] : [this[i]]);
        }
        return u([this[e]]);
      },
      append: function (...e) {
        let t;
        const i = n();
        for (let s = 0; s < e.length; s += 1) {
          t = e[s];
          for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
              const s = i.createElement("div");
              for (s.innerHTML = t; s.firstChild; )
                this[e].appendChild(s.firstChild);
            } else if (t instanceof a)
              for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
            else this[e].appendChild(t);
        }
        return this;
      },
      prepend: function (e) {
        const t = n();
        let i, s;
        for (i = 0; i < this.length; i += 1)
          if ("string" == typeof e) {
            const n = t.createElement("div");
            for (n.innerHTML = e, s = n.childNodes.length - 1; s >= 0; s -= 1)
              this[i].insertBefore(n.childNodes[s], this[i].childNodes[0]);
          } else if (e instanceof a)
            for (s = 0; s < e.length; s += 1)
              this[i].insertBefore(e[s], this[i].childNodes[0]);
          else this[i].insertBefore(e, this[i].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && u(this[0].nextElementSibling).is(e)
              ? u([this[0].nextElementSibling])
              : u([])
            : this[0].nextElementSibling
            ? u([this[0].nextElementSibling])
            : u([])
          : u([]);
      },
      nextAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return u([]);
        for (; i.nextElementSibling; ) {
          const s = i.nextElementSibling;
          e ? u(s).is(e) && t.push(s) : t.push(s), (i = s);
        }
        return u(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0];
          return e
            ? t.previousElementSibling && u(t.previousElementSibling).is(e)
              ? u([t.previousElementSibling])
              : u([])
            : t.previousElementSibling
            ? u([t.previousElementSibling])
            : u([]);
        }
        return u([]);
      },
      prevAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return u([]);
        for (; i.previousElementSibling; ) {
          const s = i.previousElementSibling;
          e ? u(s).is(e) && t.push(s) : t.push(s), (i = s);
        }
        return u(t);
      },
      parent: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1)
          null !== this[i].parentNode &&
            (e
              ? u(this[i].parentNode).is(e) && t.push(this[i].parentNode)
              : t.push(this[i].parentNode));
        return u(t);
      },
      parents: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          let s = this[i].parentNode;
          for (; s; )
            e ? u(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
        }
        return u(t);
      },
      closest: function (e) {
        let t = this;
        return void 0 === e ? u([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i].querySelectorAll(e);
          for (let e = 0; e < s.length; e += 1) t.push(s[e]);
        }
        return u(t);
      },
      children: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i].children;
          for (let i = 0; i < s.length; i += 1)
            (e && !u(s[i]).is(e)) || t.push(s[i]);
        }
        return u(t);
      },
      filter: function (e) {
        return u(d(this, e));
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
    Object.keys(p).forEach((e) => {
      Object.defineProperty(u.fn, e, { value: p[e], writable: !0 });
    });
    const m = u;
    function g(e, t = 0) {
      return setTimeout(e, t);
    }
    function f() {
      return Date.now();
    }
    function v(e, t = "x") {
      const i = r();
      let s, n, o;
      const a = (function (e) {
        const t = r();
        let i;
        return (
          t.getComputedStyle && (i = t.getComputedStyle(e, null)),
          !i && e.currentStyle && (i = e.currentStyle),
          i || (i = e.style),
          i
        );
      })(e);
      return (
        i.WebKitCSSMatrix
          ? ((n = a.transform || a.webkitTransform),
            n.split(",").length > 6 &&
              (n = n
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (o = new i.WebKitCSSMatrix("none" === n ? "" : n)))
          : ((o =
              a.MozTransform ||
              a.OTransform ||
              a.MsTransform ||
              a.msTransform ||
              a.transform ||
              a
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (s = o.toString().split(","))),
        "x" === t &&
          (n = i.WebKitCSSMatrix
            ? o.m41
            : 16 === s.length
            ? parseFloat(s[12])
            : parseFloat(s[4])),
        "y" === t &&
          (n = i.WebKitCSSMatrix
            ? o.m42
            : 16 === s.length
            ? parseFloat(s[13])
            : parseFloat(s[5])),
        n || 0
      );
    }
    function y(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function b(...e) {
      const t = Object(e[0]),
        i = ["__proto__", "constructor", "prototype"];
      for (let n = 1; n < e.length; n += 1) {
        const o = e[n];
        if (
          null != o &&
          ((s = o),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? s instanceof HTMLElement
            : s && (1 === s.nodeType || 11 === s.nodeType)))
        ) {
          const e = Object.keys(Object(o)).filter((e) => i.indexOf(e) < 0);
          for (let i = 0, s = e.length; i < s; i += 1) {
            const s = e[i],
              n = Object.getOwnPropertyDescriptor(o, s);
            void 0 !== n &&
              n.enumerable &&
              (y(t[s]) && y(o[s])
                ? o[s].__swiper__
                  ? (t[s] = o[s])
                  : b(t[s], o[s])
                : !y(t[s]) && y(o[s])
                ? ((t[s] = {}), o[s].__swiper__ ? (t[s] = o[s]) : b(t[s], o[s]))
                : (t[s] = o[s]));
          }
        }
      }
      var s;
      return t;
    }
    function w(e, t, i) {
      e.style.setProperty(t, i);
    }
    function C({ swiper: e, targetPosition: t, side: i }) {
      const s = r(),
        n = -e.translate;
      let o,
        a = null;
      const l = e.params.speed;
      (e.wrapperEl.style.scrollSnapType = "none"),
        s.cancelAnimationFrame(e.cssModeFrameID);
      const d = t > n ? "next" : "prev",
        u = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
        c = () => {
          (o = new Date().getTime()), null === a && (a = o);
          const r = Math.max(Math.min((o - a) / l, 1), 0),
            d = 0.5 - Math.cos(r * Math.PI) / 2;
          let h = n + d * (t - n);
          if ((u(h, t) && (h = t), e.wrapperEl.scrollTo({ [i]: h }), u(h, t)))
            return (
              (e.wrapperEl.style.overflow = "hidden"),
              (e.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (e.wrapperEl.style.overflow = ""),
                  e.wrapperEl.scrollTo({ [i]: h });
              }),
              void s.cancelAnimationFrame(e.cssModeFrameID)
            );
          e.cssModeFrameID = s.requestAnimationFrame(c);
        };
      c();
    }
    let T, S, x;
    function E() {
      return (
        T ||
          (T = (function () {
            const e = r(),
              t = n();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              passiveListener: (function () {
                let t = !1;
                try {
                  const i = Object.defineProperty({}, "passive", {
                    get() {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        T
      );
    }
    function I(e = {}) {
      return (
        S ||
          (S = (function ({ userAgent: e } = {}) {
            const t = E(),
              i = r(),
              s = i.navigator.platform,
              n = e || i.navigator.userAgent,
              o = { ios: !1, android: !1 },
              a = i.screen.width,
              l = i.screen.height,
              d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let u = n.match(/(iPad).*OS\s([\d_]+)/);
            const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
              h = !u && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              p = "Win32" === s;
            let m = "MacIntel" === s;
            return (
              !u &&
                m &&
                t.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${a}x${l}`) >= 0 &&
                ((u = n.match(/(Version)\/([\d.]+)/)),
                u || (u = [0, 1, "13_0_0"]),
                (m = !1)),
              d && !p && ((o.os = "android"), (o.android = !0)),
              (u || h || c) && ((o.os = "ios"), (o.ios = !0)),
              o
            );
          })(e)),
        S
      );
    }
    function _() {
      return (
        x ||
          (x = (function () {
            const e = r();
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase();
                return (
                  t.indexOf("safari") >= 0 &&
                  t.indexOf("chrome") < 0 &&
                  t.indexOf("android") < 0
                );
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        x
      );
    }
    const L = {
      on(e, t, i) {
        const s = this;
        if ("function" != typeof t) return s;
        const n = i ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            s.eventsListeners[e] || (s.eventsListeners[e] = []),
              s.eventsListeners[e][n](t);
          }),
          s
        );
      },
      once(e, t, i) {
        const s = this;
        if ("function" != typeof t) return s;
        function n(...i) {
          s.off(e, n),
            n.__emitterProxy && delete n.__emitterProxy,
            t.apply(s, i);
        }
        return (n.__emitterProxy = t), s.on(e, n, i);
      },
      onAny(e, t) {
        const i = this;
        if ("function" != typeof e) return i;
        const s = t ? "unshift" : "push";
        return (
          i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const i = t.eventsAnyListeners.indexOf(e);
        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
      },
      off(e, t) {
        const i = this;
        return i.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (i.eventsListeners[e] = [])
                : i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach((s, n) => {
                    (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                      i.eventsListeners[e].splice(n, 1);
                  });
            }),
            i)
          : i;
      },
      emit(...e) {
        const t = this;
        if (!t.eventsListeners) return t;
        let i, s, n;
        "string" == typeof e[0] || Array.isArray(e[0])
          ? ((i = e[0]), (s = e.slice(1, e.length)), (n = t))
          : ((i = e[0].events), (s = e[0].data), (n = e[0].context || t)),
          s.unshift(n);
        return (
          (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
            t.eventsAnyListeners &&
              t.eventsAnyListeners.length &&
              t.eventsAnyListeners.forEach((t) => {
                t.apply(n, [e, ...s]);
              }),
              t.eventsListeners &&
                t.eventsListeners[e] &&
                t.eventsListeners[e].forEach((e) => {
                  e.apply(n, s);
                });
          }),
          t
        );
      },
    };
    const O = {
      updateSize: function () {
        const e = this;
        let t, i;
        const s = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : s[0].clientWidth),
          (i =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : s[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === i && e.isVertical()) ||
            ((t =
              t -
              parseInt(s.css("padding-left") || 0, 10) -
              parseInt(s.css("padding-right") || 0, 10)),
            (i =
              i -
              parseInt(s.css("padding-top") || 0, 10) -
              parseInt(s.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(i) && (i = 0),
            Object.assign(e, {
              width: t,
              height: i,
              size: e.isHorizontal() ? t : i,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function i(e, i) {
          return parseFloat(e.getPropertyValue(t(i)) || 0);
        }
        const s = e.params,
          { $wrapperEl: n, size: o, rtlTranslate: r, wrongRTL: a } = e,
          l = e.virtual && s.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          u = n.children(`.${e.params.slideClass}`),
          c = l ? e.virtual.slides.length : u.length;
        let h = [];
        const p = [],
          m = [];
        let g = s.slidesOffsetBefore;
        "function" == typeof g && (g = s.slidesOffsetBefore.call(e));
        let f = s.slidesOffsetAfter;
        "function" == typeof f && (f = s.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          y = e.slidesGrid.length;
        let b = s.spaceBetween,
          C = -g,
          T = 0,
          S = 0;
        if (void 0 === o) return;
        "string" == typeof b &&
          b.indexOf("%") >= 0 &&
          (b = (parseFloat(b.replace("%", "")) / 100) * o),
          (e.virtualSize = -b),
          r
            ? u.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : u.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          s.centeredSlides &&
            s.cssMode &&
            (w(e.wrapperEl, "--swiper-centered-offset-before", ""),
            w(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const x = s.grid && s.grid.rows > 1 && e.grid;
        let E;
        x && e.grid.initSlides(c);
        const I =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView
          ).length > 0;
        for (let n = 0; n < c; n += 1) {
          E = 0;
          const r = u.eq(n);
          if (
            (x && e.grid.updateSlide(n, r, c, t), "none" !== r.css("display"))
          ) {
            if ("auto" === s.slidesPerView) {
              I && (u[n].style[t("width")] = "");
              const o = getComputedStyle(r[0]),
                a = r[0].style.transform,
                l = r[0].style.webkitTransform;
              if (
                (a && (r[0].style.transform = "none"),
                l && (r[0].style.webkitTransform = "none"),
                s.roundLengths)
              )
                E = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
              else {
                const e = i(o, "width"),
                  t = i(o, "padding-left"),
                  s = i(o, "padding-right"),
                  n = i(o, "margin-left"),
                  a = i(o, "margin-right"),
                  l = o.getPropertyValue("box-sizing");
                if (l && "border-box" === l) E = e + n + a;
                else {
                  const { clientWidth: i, offsetWidth: o } = r[0];
                  E = e + t + s + n + a + (o - i);
                }
              }
              a && (r[0].style.transform = a),
                l && (r[0].style.webkitTransform = l),
                s.roundLengths && (E = Math.floor(E));
            } else
              (E = (o - (s.slidesPerView - 1) * b) / s.slidesPerView),
                s.roundLengths && (E = Math.floor(E)),
                u[n] && (u[n].style[t("width")] = `${E}px`);
            u[n] && (u[n].swiperSlideSize = E),
              m.push(E),
              s.centeredSlides
                ? ((C = C + E / 2 + T / 2 + b),
                  0 === T && 0 !== n && (C = C - o / 2 - b),
                  0 === n && (C = C - o / 2 - b),
                  Math.abs(C) < 0.001 && (C = 0),
                  s.roundLengths && (C = Math.floor(C)),
                  S % s.slidesPerGroup == 0 && h.push(C),
                  p.push(C))
                : (s.roundLengths && (C = Math.floor(C)),
                  (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                    e.params.slidesPerGroup ==
                    0 && h.push(C),
                  p.push(C),
                  (C = C + E + b)),
              (e.virtualSize += E + b),
              (T = E),
              (S += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, o) + f),
          r &&
            a &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            n.css({ width: `${e.virtualSize + s.spaceBetween}px` }),
          s.setWrapperSize &&
            n.css({ [t("width")]: `${e.virtualSize + s.spaceBetween}px` }),
          x && e.grid.updateWrapperSize(E, h, t),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < h.length; i += 1) {
            let n = h[i];
            s.roundLengths && (n = Math.floor(n)),
              h[i] <= e.virtualSize - o && t.push(n);
          }
          (h = t),
            Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
              h.push(e.virtualSize - o);
        }
        if ((0 === h.length && (h = [0]), 0 !== s.spaceBetween)) {
          const i = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
          u.filter((e, t) => !s.cssMode || t !== u.length - 1).css({
            [i]: `${b}px`,
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          m.forEach((t) => {
            e += t + (s.spaceBetween ? s.spaceBetween : 0);
          }),
            (e -= s.spaceBetween);
          const t = e - o;
          h = h.map((e) => (e < 0 ? -g : e > t ? t + f : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (m.forEach((t) => {
              e += t + (s.spaceBetween ? s.spaceBetween : 0);
            }),
            (e -= s.spaceBetween),
            e < o)
          ) {
            const t = (o - e) / 2;
            h.forEach((e, i) => {
              h[i] = e - t;
            }),
              p.forEach((e, i) => {
                p[i] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: u,
            snapGrid: h,
            slidesGrid: p,
            slidesSizesGrid: m,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          w(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"),
            w(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - m[m.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            i = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + i));
        }
        c !== d && e.emit("slidesLengthChange"),
          h.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          p.length !== y && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset();
      },
      updateAutoHeight: function (e) {
        const t = this,
          i = [],
          s = t.virtual && t.params.virtual.enabled;
        let n,
          o = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const r = (e) =>
          s
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
              i.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !s) break;
              i.push(r(e));
            }
        else i.push(r(t.activeIndex));
        for (n = 0; n < i.length; n += 1)
          if (void 0 !== i[n]) {
            const e = i[n].offsetHeight;
            o = e > o ? e : o;
          }
        (o || 0 === o) && t.$wrapperEl.css("height", `${o}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset = e.isHorizontal()
            ? t[i].offsetLeft
            : t[i].offsetTop;
      },
      updateSlidesProgress: function (e = (this && this.translate) || 0) {
        const t = this,
          i = t.params,
          { slides: s, rtlTranslate: n, snapGrid: o } = t;
        if (0 === s.length) return;
        void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
        let r = -e;
        n && (r = e),
          s.removeClass(i.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < s.length; e += 1) {
          const a = s[e];
          let l = a.swiperSlideOffset;
          i.cssMode && i.centeredSlides && (l -= s[0].swiperSlideOffset);
          const d =
              (r + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            u =
              (r - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            c = -(r - l),
            h = c + t.slidesSizesGrid[e];
          ((c >= 0 && c < t.size - 1) ||
            (h > 1 && h <= t.size) ||
            (c <= 0 && h >= t.size)) &&
            (t.visibleSlides.push(a),
            t.visibleSlidesIndexes.push(e),
            s.eq(e).addClass(i.slideVisibleClass)),
            (a.progress = n ? -d : d),
            (a.originalProgress = n ? -u : u);
        }
        t.visibleSlides = m(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const i = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * i) || 0;
        }
        const i = t.params,
          s = t.maxTranslate() - t.minTranslate();
        let { progress: n, isBeginning: o, isEnd: r } = t;
        const a = o,
          l = r;
        0 === s
          ? ((n = 0), (o = !0), (r = !0))
          : ((n = (e - t.minTranslate()) / s), (o = n <= 0), (r = n >= 1)),
          Object.assign(t, { progress: n, isBeginning: o, isEnd: r }),
          (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
            t.updateSlidesProgress(e),
          o && !a && t.emit("reachBeginning toEdge"),
          r && !l && t.emit("reachEnd toEdge"),
          ((a && !o) || (l && !r)) && t.emit("fromEdge"),
          t.emit("progress", n);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: i,
            $wrapperEl: s,
            activeIndex: n,
            realIndex: o,
          } = e,
          r = e.virtual && i.virtual.enabled;
        let a;
        t.removeClass(
          `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
        ),
          (a = r
            ? e.$wrapperEl.find(
                `.${i.slideClass}[data-swiper-slide-index="${n}"]`
              )
            : t.eq(n)),
          a.addClass(i.slideActiveClass),
          i.loop &&
            (a.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${o}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass)
              : s
                  .children(
                    `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${o}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass));
        let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
        i.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(i.slideNextClass));
        let d = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
        i.loop &&
          0 === d.length &&
          ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
          i.loop &&
            (l.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass)
              : s
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass),
            d.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)
              : s
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          i = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: s,
            snapGrid: n,
            params: o,
            activeIndex: r,
            realIndex: a,
            snapIndex: l,
          } = t;
        let d,
          u = e;
        if (void 0 === u) {
          for (let e = 0; e < s.length; e += 1)
            void 0 !== s[e + 1]
              ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2
                ? (u = e)
                : i >= s[e] && i < s[e + 1] && (u = e + 1)
              : i >= s[e] && (u = e);
          o.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
        }
        if (n.indexOf(i) >= 0) d = n.indexOf(i);
        else {
          const e = Math.min(o.slidesPerGroupSkip, u);
          d = e + Math.floor((u - e) / o.slidesPerGroup);
        }
        if ((d >= n.length && (d = n.length - 1), u === r))
          return void (
            d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
          );
        const c = parseInt(
          t.slides.eq(u).attr("data-swiper-slide-index") || u,
          10
        );
        Object.assign(t, {
          snapIndex: d,
          realIndex: c,
          previousIndex: r,
          activeIndex: u,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          a !== c && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          i = t.params,
          s = m(e).closest(`.${i.slideClass}`)[0];
        let n,
          o = !1;
        if (s)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === s) {
              (o = !0), (n = e);
              break;
            }
        if (!s || !o)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = s),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                m(s).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = n),
          i.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const M = {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const {
          params: t,
          rtlTranslate: i,
          translate: s,
          $wrapperEl: n,
        } = this;
        if (t.virtualTranslate) return i ? -s : s;
        if (t.cssMode) return s;
        let o = v(n[0], e);
        return i && (o = -o), o || 0;
      },
      setTranslate: function (e, t) {
        const i = this,
          {
            rtlTranslate: s,
            params: n,
            $wrapperEl: o,
            wrapperEl: r,
            progress: a,
          } = i;
        let l,
          d = 0,
          u = 0;
        i.isHorizontal() ? (d = s ? -e : e) : (u = e),
          n.roundLengths && ((d = Math.floor(d)), (u = Math.floor(u))),
          n.cssMode
            ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                i.isHorizontal() ? -d : -u)
            : n.virtualTranslate ||
              o.transform(`translate3d(${d}px, ${u}px, 0px)`),
          (i.previousTranslate = i.translate),
          (i.translate = i.isHorizontal() ? d : u);
        const c = i.maxTranslate() - i.minTranslate();
        (l = 0 === c ? 0 : (e - i.minTranslate()) / c),
          l !== a && i.updateProgress(e),
          i.emit("setTranslate", i.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e = 0, t = this.params.speed, i = !0, s = !0, n) {
        const o = this,
          { params: r, wrapperEl: a } = o;
        if (o.animating && r.preventInteractionOnTransition) return !1;
        const l = o.minTranslate(),
          d = o.maxTranslate();
        let u;
        if (
          ((u = s && e > l ? l : s && e < d ? d : e),
          o.updateProgress(u),
          r.cssMode)
        ) {
          const e = o.isHorizontal();
          if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -u;
          else {
            if (!o.support.smoothScroll)
              return (
                C({ swiper: o, targetPosition: -u, side: e ? "left" : "top" }),
                !0
              );
            a.scrollTo({ [e ? "left" : "top"]: -u, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (o.setTransition(0),
              o.setTranslate(u),
              i &&
                (o.emit("beforeTransitionStart", t, n),
                o.emit("transitionEnd")))
            : (o.setTransition(t),
              o.setTranslate(u),
              i &&
                (o.emit("beforeTransitionStart", t, n),
                o.emit("transitionStart")),
              o.animating ||
                ((o.animating = !0),
                o.onTranslateToWrapperTransitionEnd ||
                  (o.onTranslateToWrapperTransitionEnd = function (e) {
                    o &&
                      !o.destroyed &&
                      e.target === this &&
                      (o.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        o.onTranslateToWrapperTransitionEnd
                      ),
                      o.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        o.onTranslateToWrapperTransitionEnd
                      ),
                      (o.onTranslateToWrapperTransitionEnd = null),
                      delete o.onTranslateToWrapperTransitionEnd,
                      i && o.emit("transitionEnd"));
                  }),
                o.$wrapperEl[0].addEventListener(
                  "transitionend",
                  o.onTranslateToWrapperTransitionEnd
                ),
                o.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  o.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function P({ swiper: e, runCallbacks: t, direction: i, step: s }) {
      const { activeIndex: n, previousIndex: o } = e;
      let r = i;
      if (
        (r || (r = n > o ? "next" : n < o ? "prev" : "reset"),
        e.emit(`transition${s}`),
        t && n !== o)
      ) {
        if ("reset" === r) return void e.emit(`slideResetTransition${s}`);
        e.emit(`slideChangeTransition${s}`),
          "next" === r
            ? e.emit(`slideNextTransition${s}`)
            : e.emit(`slidePrevTransition${s}`);
      }
    }
    const k = {
      slideTo: function (e = 0, t = this.params.speed, i = !0, s, n) {
        if ("number" != typeof e && "string" != typeof e)
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const o = this;
        let r = e;
        r < 0 && (r = 0);
        const {
          params: a,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: u,
          activeIndex: c,
          rtlTranslate: h,
          wrapperEl: p,
          enabled: m,
        } = o;
        if (
          (o.animating && a.preventInteractionOnTransition) ||
          (!m && !s && !n)
        )
          return !1;
        const g = Math.min(o.params.slidesPerGroupSkip, r);
        let f = g + Math.floor((r - g) / o.params.slidesPerGroup);
        f >= l.length && (f = l.length - 1),
          (c || a.initialSlide || 0) === (u || 0) &&
            i &&
            o.emit("beforeSlideChangeStart");
        const v = -l[f];
        if ((o.updateProgress(v), a.normalizeSlideIndex))
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              i = Math.floor(100 * d[e]),
              s = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= i && t < s - (s - i) / 2
                ? (r = e)
                : t >= i && t < s && (r = e + 1)
              : t >= i && (r = e);
          }
        if (o.initialized && r !== c) {
          if (!o.allowSlideNext && v < o.translate && v < o.minTranslate())
            return !1;
          if (
            !o.allowSlidePrev &&
            v > o.translate &&
            v > o.maxTranslate() &&
            (c || 0) !== r
          )
            return !1;
        }
        let y;
        if (
          ((y = r > c ? "next" : r < c ? "prev" : "reset"),
          (h && -v === o.translate) || (!h && v === o.translate))
        )
          return (
            o.updateActiveIndex(r),
            a.autoHeight && o.updateAutoHeight(),
            o.updateSlidesClasses(),
            "slide" !== a.effect && o.setTranslate(v),
            "reset" !== y && (o.transitionStart(i, y), o.transitionEnd(i, y)),
            !1
          );
        if (a.cssMode) {
          const e = o.isHorizontal(),
            i = h ? v : -v;
          if (0 === t) {
            const t = o.virtual && o.params.virtual.enabled;
            t &&
              ((o.wrapperEl.style.scrollSnapType = "none"),
              (o._immediateVirtual = !0)),
              (p[e ? "scrollLeft" : "scrollTop"] = i),
              t &&
                requestAnimationFrame(() => {
                  (o.wrapperEl.style.scrollSnapType = ""),
                    (o._swiperImmediateVirtual = !1);
                });
          } else {
            if (!o.support.smoothScroll)
              return (
                C({ swiper: o, targetPosition: i, side: e ? "left" : "top" }),
                !0
              );
            p.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
          }
          return !0;
        }
        return (
          o.setTransition(t),
          o.setTranslate(v),
          o.updateActiveIndex(r),
          o.updateSlidesClasses(),
          o.emit("beforeTransitionStart", t, s),
          o.transitionStart(i, y),
          0 === t
            ? o.transitionEnd(i, y)
            : o.animating ||
              ((o.animating = !0),
              o.onSlideToWrapperTransitionEnd ||
                (o.onSlideToWrapperTransitionEnd = function (e) {
                  o &&
                    !o.destroyed &&
                    e.target === this &&
                    (o.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      o.onSlideToWrapperTransitionEnd
                    ),
                    o.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      o.onSlideToWrapperTransitionEnd
                    ),
                    (o.onSlideToWrapperTransitionEnd = null),
                    delete o.onSlideToWrapperTransitionEnd,
                    o.transitionEnd(i, y));
                }),
              o.$wrapperEl[0].addEventListener(
                "transitionend",
                o.onSlideToWrapperTransitionEnd
              ),
              o.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                o.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e = 0, t = this.params.speed, i = !0, s) {
        const n = this;
        let o = e;
        return n.params.loop && (o += n.loopedSlides), n.slideTo(o, t, i, s);
      },
      slideNext: function (e = this.params.speed, t = !0, i) {
        const s = this,
          { animating: n, enabled: o, params: r } = s;
        if (!o) return s;
        let a = r.slidesPerGroup;
        "auto" === r.slidesPerView &&
          1 === r.slidesPerGroup &&
          r.slidesPerGroupAuto &&
          (a = Math.max(s.slidesPerViewDynamic("current", !0), 1));
        const l = s.activeIndex < r.slidesPerGroupSkip ? 1 : a;
        if (r.loop) {
          if (n && r.loopPreventsSlide) return !1;
          s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
        }
        return r.rewind && s.isEnd
          ? s.slideTo(0, e, t, i)
          : s.slideTo(s.activeIndex + l, e, t, i);
      },
      slidePrev: function (e = this.params.speed, t = !0, i) {
        const s = this,
          {
            params: n,
            animating: o,
            snapGrid: r,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: d,
          } = s;
        if (!d) return s;
        if (n.loop) {
          if (o && n.loopPreventsSlide) return !1;
          s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const c = u(l ? s.translate : -s.translate),
          h = r.map((e) => u(e));
        let p = r[h.indexOf(c) - 1];
        if (void 0 === p && n.cssMode) {
          let e;
          r.forEach((t, i) => {
            c >= t && (e = i);
          }),
            void 0 !== e && (p = r[e > 0 ? e - 1 : e]);
        }
        let m = 0;
        return (
          void 0 !== p &&
            ((m = a.indexOf(p)),
            m < 0 && (m = s.activeIndex - 1),
            "auto" === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((m = m - s.slidesPerViewDynamic("previous", !0) + 1),
              (m = Math.max(m, 0)))),
          n.rewind && s.isBeginning
            ? s.slideTo(s.slides.length - 1, e, t, i)
            : s.slideTo(m, e, t, i)
        );
      },
      slideReset: function (e = this.params.speed, t = !0, i) {
        return this.slideTo(this.activeIndex, e, t, i);
      },
      slideToClosest: function (e = this.params.speed, t = !0, i, s = 0.5) {
        const n = this;
        let o = n.activeIndex;
        const r = Math.min(n.params.slidesPerGroupSkip, o),
          a = r + Math.floor((o - r) / n.params.slidesPerGroup),
          l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[a]) {
          const e = n.snapGrid[a];
          l - e > (n.snapGrid[a + 1] - e) * s && (o += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[a - 1];
          l - e <= (n.snapGrid[a] - e) * s && (o -= n.params.slidesPerGroup);
        }
        return (
          (o = Math.max(o, 0)),
          (o = Math.min(o, n.slidesGrid.length - 1)),
          n.slideTo(o, e, t, i)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: i } = e,
          s =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let n,
          o = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (n = parseInt(m(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? o < e.loopedSlides - s / 2 ||
                o > e.slides.length - e.loopedSlides + s / 2
                ? (e.loopFix(),
                  (o = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  g(() => {
                    e.slideTo(o);
                  }))
                : e.slideTo(o)
              : o > e.slides.length - s
              ? (e.loopFix(),
                (o = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                g(() => {
                  e.slideTo(o);
                }))
              : e.slideTo(o);
        } else e.slideTo(o);
      },
    };
    const z = {
      loopCreate: function () {
        const e = this,
          t = n(),
          { params: i, $wrapperEl: s } = e,
          o = s.children().length > 0 ? m(s.children()[0].parentNode) : s;
        o.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
        let r = o.children(`.${i.slideClass}`);
        if (i.loopFillGroupWithBlank) {
          const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
          if (e !== i.slidesPerGroup) {
            for (let s = 0; s < e; s += 1) {
              const e = m(t.createElement("div")).addClass(
                `${i.slideClass} ${i.slideBlankClass}`
              );
              o.append(e);
            }
            r = o.children(`.${i.slideClass}`);
          }
        }
        "auto" !== i.slidesPerView ||
          i.loopedSlides ||
          (i.loopedSlides = r.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(i.loopedSlides || i.slidesPerView, 10)
          )),
          (e.loopedSlides += i.loopAdditionalSlides),
          e.loopedSlides > r.length && (e.loopedSlides = r.length);
        const a = [],
          l = [];
        r.each((t, i) => {
          const s = m(t);
          i < e.loopedSlides && l.push(t),
            i < r.length && i >= r.length - e.loopedSlides && a.push(t),
            s.attr("data-swiper-slide-index", i);
        });
        for (let e = 0; e < l.length; e += 1)
          o.append(m(l[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        for (let e = a.length - 1; e >= 0; e -= 1)
          o.prepend(m(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: i,
          loopedSlides: s,
          allowSlidePrev: n,
          allowSlideNext: o,
          snapGrid: r,
          rtlTranslate: a,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const d = -r[t] - e.getTranslate();
        if (t < s) {
          (l = i.length - 3 * s + t), (l += s);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((a ? -e.translate : e.translate) - d);
        } else if (t >= i.length - s) {
          (l = -i.length + t + s), (l += s);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((a ? -e.translate : e.translate) - d);
        }
        (e.allowSlidePrev = n), (e.allowSlideNext = o), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: i } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          i.removeAttr("data-swiper-slide-index");
      },
    };
    function A(e) {
      const t = this,
        i = n(),
        s = r(),
        o = t.touchEventsData,
        { params: a, touches: l, enabled: d } = t;
      if (!d) return;
      if (t.animating && a.preventInteractionOnTransition) return;
      !t.animating && a.cssMode && a.loop && t.loopFix();
      let u = e;
      u.originalEvent && (u = u.originalEvent);
      let c = m(u.target);
      if ("wrapper" === a.touchEventsTarget && !c.closest(t.wrapperEl).length)
        return;
      if (
        ((o.isTouchEvent = "touchstart" === u.type),
        !o.isTouchEvent && "which" in u && 3 === u.which)
      )
        return;
      if (!o.isTouchEvent && "button" in u && u.button > 0) return;
      if (o.isTouched && o.isMoved) return;
      !!a.noSwipingClass &&
        "" !== a.noSwipingClass &&
        u.target &&
        u.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (c = m(e.path[0]));
      const h = a.noSwipingSelector
          ? a.noSwipingSelector
          : `.${a.noSwipingClass}`,
        p = !(!u.target || !u.target.shadowRoot);
      if (
        a.noSwiping &&
        (p
          ? (function (e, t = this) {
              return (function t(i) {
                return i && i !== n() && i !== r()
                  ? (i.assignedSlot && (i = i.assignedSlot),
                    i.closest(e) || t(i.getRootNode().host))
                  : null;
              })(t);
            })(h, u.target)
          : c.closest(h)[0])
      )
        return void (t.allowClick = !0);
      if (a.swipeHandler && !c.closest(a.swipeHandler)[0]) return;
      (l.currentX =
        "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX),
        (l.currentY =
          "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY);
      const g = l.currentX,
        v = l.currentY,
        y = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
        b = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
      if (y && (g <= b || g >= s.innerWidth - b)) {
        if ("prevent" !== y) return;
        e.preventDefault();
      }
      if (
        (Object.assign(o, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (l.startX = g),
        (l.startY = v),
        (o.touchStartTime = f()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        a.threshold > 0 && (o.allowThresholdMove = !1),
        "touchstart" !== u.type)
      ) {
        let e = !0;
        c.is(o.focusableElements) && (e = !1),
          i.activeElement &&
            m(i.activeElement).is(o.focusableElements) &&
            i.activeElement !== c[0] &&
            i.activeElement.blur();
        const s = e && t.allowTouchMove && a.touchStartPreventDefault;
        (!a.touchStartForcePreventDefault && !s) ||
          c[0].isContentEditable ||
          u.preventDefault();
      }
      t.emit("touchStart", u);
    }
    function $(e) {
      const t = n(),
        i = this,
        s = i.touchEventsData,
        { params: o, touches: r, rtlTranslate: a, enabled: l } = i;
      if (!l) return;
      let d = e;
      if ((d.originalEvent && (d = d.originalEvent), !s.isTouched))
        return void (
          s.startMoving &&
          s.isScrolling &&
          i.emit("touchMoveOpposite", d)
        );
      if (s.isTouchEvent && "touchmove" !== d.type) return;
      const u =
          "touchmove" === d.type &&
          d.targetTouches &&
          (d.targetTouches[0] || d.changedTouches[0]),
        c = "touchmove" === d.type ? u.pageX : d.pageX,
        h = "touchmove" === d.type ? u.pageY : d.pageY;
      if (d.preventedByNestedSwiper) return (r.startX = c), void (r.startY = h);
      if (!i.allowTouchMove)
        return (
          (i.allowClick = !1),
          void (
            s.isTouched &&
            (Object.assign(r, {
              startX: c,
              startY: h,
              currentX: c,
              currentY: h,
            }),
            (s.touchStartTime = f()))
          )
        );
      if (s.isTouchEvent && o.touchReleaseOnEdges && !o.loop)
        if (i.isVertical()) {
          if (
            (h < r.startY && i.translate <= i.maxTranslate()) ||
            (h > r.startY && i.translate >= i.minTranslate())
          )
            return (s.isTouched = !1), void (s.isMoved = !1);
        } else if (
          (c < r.startX && i.translate <= i.maxTranslate()) ||
          (c > r.startX && i.translate >= i.minTranslate())
        )
          return;
      if (
        s.isTouchEvent &&
        t.activeElement &&
        d.target === t.activeElement &&
        m(d.target).is(s.focusableElements)
      )
        return (s.isMoved = !0), void (i.allowClick = !1);
      if (
        (s.allowTouchCallbacks && i.emit("touchMove", d),
        d.targetTouches && d.targetTouches.length > 1)
      )
        return;
      (r.currentX = c), (r.currentY = h);
      const p = r.currentX - r.startX,
        g = r.currentY - r.startY;
      if (i.params.threshold && Math.sqrt(p ** 2 + g ** 2) < i.params.threshold)
        return;
      if (void 0 === s.isScrolling) {
        let e;
        (i.isHorizontal() && r.currentY === r.startY) ||
        (i.isVertical() && r.currentX === r.startX)
          ? (s.isScrolling = !1)
          : p * p + g * g >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(g), Math.abs(p))) / Math.PI),
            (s.isScrolling = i.isHorizontal()
              ? e > o.touchAngle
              : 90 - e > o.touchAngle));
      }
      if (
        (s.isScrolling && i.emit("touchMoveOpposite", d),
        void 0 === s.startMoving &&
          ((r.currentX === r.startX && r.currentY === r.startY) ||
            (s.startMoving = !0)),
        s.isScrolling)
      )
        return void (s.isTouched = !1);
      if (!s.startMoving) return;
      (i.allowClick = !1),
        !o.cssMode && d.cancelable && d.preventDefault(),
        o.touchMoveStopPropagation && !o.nested && d.stopPropagation(),
        s.isMoved ||
          (o.loop && !o.cssMode && i.loopFix(),
          (s.startTranslate = i.getTranslate()),
          i.setTransition(0),
          i.animating &&
            i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
          (s.allowMomentumBounce = !1),
          !o.grabCursor ||
            (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
            i.setGrabCursor(!0),
          i.emit("sliderFirstMove", d)),
        i.emit("sliderMove", d),
        (s.isMoved = !0);
      let v = i.isHorizontal() ? p : g;
      (r.diff = v),
        (v *= o.touchRatio),
        a && (v = -v),
        (i.swipeDirection = v > 0 ? "prev" : "next"),
        (s.currentTranslate = v + s.startTranslate);
      let y = !0,
        b = o.resistanceRatio;
      if (
        (o.touchReleaseOnEdges && (b = 0),
        v > 0 && s.currentTranslate > i.minTranslate()
          ? ((y = !1),
            o.resistance &&
              (s.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + s.startTranslate + v) ** b))
          : v < 0 &&
            s.currentTranslate < i.maxTranslate() &&
            ((y = !1),
            o.resistance &&
              (s.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - s.startTranslate - v) ** b)),
        y && (d.preventedByNestedSwiper = !0),
        !i.allowSlideNext &&
          "next" === i.swipeDirection &&
          s.currentTranslate < s.startTranslate &&
          (s.currentTranslate = s.startTranslate),
        !i.allowSlidePrev &&
          "prev" === i.swipeDirection &&
          s.currentTranslate > s.startTranslate &&
          (s.currentTranslate = s.startTranslate),
        i.allowSlidePrev ||
          i.allowSlideNext ||
          (s.currentTranslate = s.startTranslate),
        o.threshold > 0)
      ) {
        if (!(Math.abs(v) > o.threshold || s.allowThresholdMove))
          return void (s.currentTranslate = s.startTranslate);
        if (!s.allowThresholdMove)
          return (
            (s.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (s.currentTranslate = s.startTranslate),
            void (r.diff = i.isHorizontal()
              ? r.currentX - r.startX
              : r.currentY - r.startY)
          );
      }
      o.followFinger &&
        !o.cssMode &&
        (((o.freeMode && o.freeMode.enabled && i.freeMode) ||
          o.watchSlidesProgress) &&
          (i.updateActiveIndex(), i.updateSlidesClasses()),
        i.params.freeMode &&
          o.freeMode.enabled &&
          i.freeMode &&
          i.freeMode.onTouchMove(),
        i.updateProgress(s.currentTranslate),
        i.setTranslate(s.currentTranslate));
    }
    function D(e) {
      const t = this,
        i = t.touchEventsData,
        {
          params: s,
          touches: n,
          rtlTranslate: o,
          slidesGrid: r,
          enabled: a,
        } = t;
      if (!a) return;
      let l = e;
      if (
        (l.originalEvent && (l = l.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", l),
        (i.allowTouchCallbacks = !1),
        !i.isTouched)
      )
        return (
          i.isMoved && s.grabCursor && t.setGrabCursor(!1),
          (i.isMoved = !1),
          void (i.startMoving = !1)
        );
      s.grabCursor &&
        i.isMoved &&
        i.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const d = f(),
        u = d - i.touchStartTime;
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath());
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit("tap click", l),
          u < 300 &&
            d - i.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", l);
      }
      if (
        ((i.lastClickTime = f()),
        g(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !i.isTouched ||
          !i.isMoved ||
          !t.swipeDirection ||
          0 === n.diff ||
          i.currentTranslate === i.startTranslate)
      )
        return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
      let c;
      if (
        ((i.isTouched = !1),
        (i.isMoved = !1),
        (i.startMoving = !1),
        (c = s.followFinger
          ? o
            ? t.translate
            : -t.translate
          : -i.currentTranslate),
        s.cssMode)
      )
        return;
      if (t.params.freeMode && s.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: c });
      let h = 0,
        p = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < r.length;
        e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
      ) {
        const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== r[e + t]
          ? c >= r[e] && c < r[e + t] && ((h = e), (p = r[e + t] - r[e]))
          : c >= r[e] && ((h = e), (p = r[r.length - 1] - r[r.length - 2]));
      }
      const m = (c - r[h]) / p,
        v = h < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      if (u > s.longSwipesMs) {
        if (!s.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (m >= s.longSwipesRatio ? t.slideTo(h + v) : t.slideTo(h)),
          "prev" === t.swipeDirection &&
            (m > 1 - s.longSwipesRatio ? t.slideTo(h + v) : t.slideTo(h));
      } else {
        if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(h + v)
            : t.slideTo(h)
          : ("next" === t.swipeDirection && t.slideTo(h + v),
            "prev" === t.swipeDirection && t.slideTo(h));
      }
    }
    function B() {
      const e = this,
        { params: t, el: i } = e;
      if (i && 0 === i.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: s, allowSlidePrev: n, snapGrid: o } = e;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = n),
        (e.allowSlideNext = s),
        e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
    }
    function G(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function W() {
      const e = this,
        { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
      if (!s) return;
      let n;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const o = e.maxTranslate() - e.minTranslate();
      (n = 0 === o ? 0 : (e.translate - e.minTranslate()) / o),
        n !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    let j = !1;
    function H() {}
    const V = (e, t) => {
      const i = n(),
        {
          params: s,
          touchEvents: o,
          el: r,
          wrapperEl: a,
          device: l,
          support: d,
        } = e,
        u = !!s.nested,
        c = "on" === t ? "addEventListener" : "removeEventListener",
        h = t;
      if (d.touch) {
        const t = !(
          "touchstart" !== o.start ||
          !d.passiveListener ||
          !s.passiveListeners
        ) && { passive: !0, capture: !1 };
        r[c](o.start, e.onTouchStart, t),
          r[c](
            o.move,
            e.onTouchMove,
            d.passiveListener ? { passive: !1, capture: u } : u
          ),
          r[c](o.end, e.onTouchEnd, t),
          o.cancel && r[c](o.cancel, e.onTouchEnd, t);
      } else
        r[c](o.start, e.onTouchStart, !1),
          i[c](o.move, e.onTouchMove, u),
          i[c](o.end, e.onTouchEnd, !1);
      (s.preventClicks || s.preventClicksPropagation) &&
        r[c]("click", e.onClick, !0),
        s.cssMode && a[c]("scroll", e.onScroll),
        s.updateOnWindowResize
          ? e[h](
              l.ios || l.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              B,
              !0
            )
          : e[h]("observerUpdate", B, !0);
    };
    const F = {
        attachEvents: function () {
          const e = this,
            t = n(),
            { params: i, support: s } = e;
          (e.onTouchStart = A.bind(e)),
            (e.onTouchMove = $.bind(e)),
            (e.onTouchEnd = D.bind(e)),
            i.cssMode && (e.onScroll = W.bind(e)),
            (e.onClick = G.bind(e)),
            s.touch && !j && (t.addEventListener("touchstart", H), (j = !0)),
            V(e, "on");
        },
        detachEvents: function () {
          V(this, "off");
        },
      },
      N = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const q = {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: i,
            loopedSlides: s = 0,
            params: n,
            $el: o,
          } = e,
          r = n.breakpoints;
        if (!r || (r && 0 === Object.keys(r).length)) return;
        const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
        if (!a || e.currentBreakpoint === a) return;
        const l = (a in r ? r[a] : void 0) || e.originalParams,
          d = N(e, n),
          u = N(e, l),
          c = n.enabled;
        d && !u
          ? (o.removeClass(
              `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !d &&
            u &&
            (o.addClass(`${n.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === n.grid.fill)) &&
              o.addClass(`${n.containerModifierClass}grid-column`),
            e.emitContainerClasses());
        const h = l.direction && l.direction !== n.direction,
          p = n.loop && (l.slidesPerView !== n.slidesPerView || h);
        h && i && e.changeDirection(), b(e.params, l);
        const m = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          c && !m ? e.disable() : !c && m && e.enable(),
          (e.currentBreakpoint = a),
          e.emit("_beforeBreakpoint", l),
          p &&
            i &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - s + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t = "window", i) {
        if (!e || ("container" === t && !i)) return;
        let s = !1;
        const n = r(),
          o = "window" === t ? n.innerHeight : i.clientHeight,
          a = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: o * t, point: e };
            }
            return { value: e, point: e };
          });
        a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let e = 0; e < a.length; e += 1) {
          const { point: o, value: r } = a[e];
          "window" === t
            ? n.matchMedia(`(min-width: ${r}px)`).matches && (s = o)
            : r <= i.clientWidth && (s = o);
        }
        return s || "max";
      },
    };
    const R = {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: i,
            rtl: s,
            $el: n,
            device: o,
            support: r,
          } = e,
          a = (function (e, t) {
            const i = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((s) => {
                      e[s] && i.push(t + s);
                    })
                  : "string" == typeof e && i.push(t + e);
              }),
              i
            );
          })(
            [
              "initialized",
              i.direction,
              { "pointer-events": !r.touch },
              { "free-mode": e.params.freeMode && i.freeMode.enabled },
              { autoheight: i.autoHeight },
              { rtl: s },
              { grid: i.grid && i.grid.rows > 1 },
              {
                "grid-column":
                  i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
              },
              { android: o.android },
              { ios: o.ios },
              { "css-mode": i.cssMode },
              { centered: i.cssMode && i.centeredSlides },
            ],
            i.containerModifierClass
          );
        t.push(...a), n.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    };
    const X = {
      loadImage: function (e, t, i, s, n, o) {
        const a = r();
        let l;
        function d() {
          o && o();
        }
        m(e).parent("picture")[0] || (e.complete && n)
          ? d()
          : t
          ? ((l = new a.Image()),
            (l.onload = d),
            (l.onerror = d),
            s && (l.sizes = s),
            i && (l.srcset = i),
            t && (l.src = t))
          : d();
      },
      preloadImages: function () {
        const e = this;
        function t() {
          null != e &&
            e &&
            !e.destroyed &&
            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
            e.imagesLoaded === e.imagesToLoad.length &&
              (e.params.updateOnImagesReady && e.update(),
              e.emit("imagesReady")));
        }
        e.imagesToLoad = e.$el.find("img");
        for (let i = 0; i < e.imagesToLoad.length; i += 1) {
          const s = e.imagesToLoad[i];
          e.loadImage(
            s,
            s.currentSrc || s.getAttribute("src"),
            s.srcset || s.getAttribute("srcset"),
            s.sizes || s.getAttribute("sizes"),
            !0,
            t
          );
        }
      },
    };
    const Y = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function U(e, t) {
      return function (i = {}) {
        const s = Object.keys(i)[0],
          n = i[s];
        "object" == typeof n && null !== n
          ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
              !0 === e[s] &&
              (e[s] = { auto: !0 }),
            s in e && "enabled" in n
              ? (!0 === e[s] && (e[s] = { enabled: !0 }),
                "object" != typeof e[s] ||
                  "enabled" in e[s] ||
                  (e[s].enabled = !0),
                e[s] || (e[s] = { enabled: !1 }),
                b(t, i))
              : b(t, i))
          : b(t, i);
      };
    }
    const Q = {
        eventsEmitter: L,
        update: O,
        translate: M,
        transition: {
          setTransition: function (e, t) {
            const i = this;
            i.params.cssMode || i.$wrapperEl.transition(e),
              i.emit("setTransition", e, t);
          },
          transitionStart: function (e = !0, t) {
            const i = this,
              { params: s } = i;
            s.cssMode ||
              (s.autoHeight && i.updateAutoHeight(),
              P({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e = !0, t) {
            const i = this,
              { params: s } = i;
            (i.animating = !1),
              s.cssMode ||
                (i.setTransition(0),
                P({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: k,
        loop: z,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const i =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            (i.style.cursor = "move"),
              (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (i.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            const e = this;
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = "");
          },
        },
        events: F,
        breakpoints: q,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: i } = e,
              { slidesOffsetBefore: s } = i;
            if (s) {
              const t = e.slides.length - 1,
                i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
              e.isLocked = e.size > i;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: R,
        images: X,
      },
      K = {};
    class J {
      constructor(...e) {
        let t, i;
        if (
          (1 === e.length &&
          e[0].constructor &&
          "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
            ? (i = e[0])
            : ([t, i] = e),
          i || (i = {}),
          (i = b({}, i)),
          t && !i.el && (i.el = t),
          i.el && m(i.el).length > 1)
        ) {
          const e = [];
          return (
            m(i.el).each((t) => {
              const s = b({}, i, { el: t });
              e.push(new J(s));
            }),
            e
          );
        }
        const s = this;
        (s.__swiper__ = !0),
          (s.support = E()),
          (s.device = I({ userAgent: i.userAgent })),
          (s.browser = _()),
          (s.eventsListeners = {}),
          (s.eventsAnyListeners = []),
          (s.modules = [...s.__modules__]),
          i.modules && Array.isArray(i.modules) && s.modules.push(...i.modules);
        const n = {};
        s.modules.forEach((e) => {
          e({
            swiper: s,
            extendParams: U(i, n),
            on: s.on.bind(s),
            once: s.once.bind(s),
            off: s.off.bind(s),
            emit: s.emit.bind(s),
          });
        });
        const o = b({}, Y, n);
        return (
          (s.params = b({}, o, K, i)),
          (s.originalParams = b({}, s.params)),
          (s.passedParams = b({}, i)),
          s.params &&
            s.params.on &&
            Object.keys(s.params.on).forEach((e) => {
              s.on(e, s.params.on[e]);
            }),
          s.params && s.params.onAny && s.onAny(s.params.onAny),
          (s.$ = m),
          Object.assign(s, {
            enabled: s.params.enabled,
            el: t,
            classNames: [],
            slides: m(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === s.params.direction,
            isVertical: () => "vertical" === s.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: s.params.allowSlideNext,
            allowSlidePrev: s.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                t = ["pointerdown", "pointermove", "pointerup"];
              return (
                (s.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (s.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                s.support.touch || !s.params.simulateTouch
                  ? s.touchEventsTouch
                  : s.touchEventsDesktop
              );
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: s.params.focusableElements,
              lastClickTime: f(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: s.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          s.emit("_swiper"),
          s.params.init && s.init(),
          s
        );
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const s = i.minTranslate(),
          n = (i.maxTranslate() - s) * e + s;
        i.translateTo(n, void 0 === t ? 0 : t),
          i.updateActiveIndex(),
          i.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((i) => {
          const s = e.getSlideClasses(i);
          t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e = "current", t = !1) {
        const {
          params: i,
          slides: s,
          slidesGrid: n,
          slidesSizesGrid: o,
          size: r,
          activeIndex: a,
        } = this;
        let l = 1;
        if (i.centeredSlides) {
          let e,
            t = s[a].swiperSlideSize;
          for (let i = a + 1; i < s.length; i += 1)
            s[i] &&
              !e &&
              ((t += s[i].swiperSlideSize), (l += 1), t > r && (e = !0));
          for (let i = a - 1; i >= 0; i -= 1)
            s[i] &&
              !e &&
              ((t += s[i].swiperSlideSize), (l += 1), t > r && (e = !0));
        } else if ("current" === e)
          for (let e = a + 1; e < s.length; e += 1) {
            (t ? n[e] + o[e] - n[a] < r : n[e] - n[a] < r) && (l += 1);
          }
        else
          for (let e = a - 1; e >= 0; e -= 1) {
            n[a] - n[e] < r && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: i } = e;
        function s() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        i.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (s(), e.params.autoHeight && e.updateAutoHeight())
            : ((n =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              n || s()),
          i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t = !0) {
        const i = this,
          s = i.params.direction;
        return (
          e || (e = "horizontal" === s ? "vertical" : "horizontal"),
          e === s ||
            ("horizontal" !== e && "vertical" !== e) ||
            (i.$el
              .removeClass(`${i.params.containerModifierClass}${s}`)
              .addClass(`${i.params.containerModifierClass}${e}`),
            i.emitContainerClasses(),
            (i.params.direction = e),
            i.slides.each((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            i.emit("changeDirection"),
            t && i.update()),
          i
        );
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const i = m(e || t.params.el);
        if (!(e = i[0])) return !1;
        e.swiper = t;
        const s = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let o = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = m(e.shadowRoot.querySelector(s()));
            return (t.children = (e) => i.children(e)), t;
          }
          return i.children(s());
        })();
        if (0 === o.length && t.params.createElements) {
          const e = n().createElement("div");
          (o = m(e)),
            (e.className = t.params.wrapperClass),
            i.append(e),
            i.children(`.${t.params.slideClass}`).each((e) => {
              o.append(e);
            });
        }
        return (
          Object.assign(t, {
            $el: i,
            el: e,
            $wrapperEl: o,
            wrapperEl: o[0],
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
            wrongRTL: "-webkit-box" === o.css("display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(
                  t.params.initialSlide + t.loopedSlides,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e = !0, t = !0) {
        const i = this,
          { params: s, $el: n, $wrapperEl: o, slides: r } = i;
        return (
          void 0 === i.params ||
            i.destroyed ||
            (i.emit("beforeDestroy"),
            (i.initialized = !1),
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t &&
              (i.removeClasses(),
              n.removeAttr("style"),
              o.removeAttr("style"),
              r &&
                r.length &&
                r
                  .removeClass(
                    [
                      s.slideVisibleClass,
                      s.slideActiveClass,
                      s.slideNextClass,
                      s.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((e) => {
              i.off(e);
            }),
            !1 !== e &&
              ((i.$el[0].swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(i)),
            (i.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        b(K, e);
      }
      static get extendedDefaults() {
        return K;
      }
      static get defaults() {
        return Y;
      }
      static installModule(e) {
        J.prototype.__modules__ || (J.prototype.__modules__ = []);
        const t = J.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => J.installModule(e)), J)
          : (J.installModule(e), J);
      }
    }
    Object.keys(Q).forEach((e) => {
      Object.keys(Q[e]).forEach((t) => {
        J.prototype[t] = Q[e][t];
      });
    }),
      J.use([
        function ({ swiper: e, on: t, emit: i }) {
          const s = r();
          let n = null;
          const o = () => {
              e &&
                !e.destroyed &&
                e.initialized &&
                (i("beforeResize"), i("resize"));
            },
            a = () => {
              e && !e.destroyed && e.initialized && i("orientationchange");
            };
          t("init", () => {
            e.params.resizeObserver && void 0 !== s.ResizeObserver
              ? e &&
                !e.destroyed &&
                e.initialized &&
                ((n = new ResizeObserver((t) => {
                  const { width: i, height: s } = e;
                  let n = i,
                    r = s;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: i, target: s }) => {
                      (s && s !== e.el) ||
                        ((n = i ? i.width : (t[0] || t).inlineSize),
                        (r = i ? i.height : (t[0] || t).blockSize));
                    }
                  ),
                    (n === i && r === s) || o();
                })),
                n.observe(e.el))
              : (s.addEventListener("resize", o),
                s.addEventListener("orientationchange", a));
          }),
            t("destroy", () => {
              n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
                s.removeEventListener("resize", o),
                s.removeEventListener("orientationchange", a);
            });
        },
        function ({ swiper: e, extendParams: t, on: i, emit: s }) {
          const n = [],
            o = r(),
            a = (e, t = {}) => {
              const i = new (o.MutationObserver || o.WebkitMutationObserver)(
                (e) => {
                  if (1 === e.length) return void s("observerUpdate", e[0]);
                  const t = function () {
                    s("observerUpdate", e[0]);
                  };
                  o.requestAnimationFrame
                    ? o.requestAnimationFrame(t)
                    : o.setTimeout(t, 0);
                }
              );
              i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                n.push(i);
            };
          t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (e.params.observer) {
                if (e.params.observeParents) {
                  const t = e.$el.parents();
                  for (let e = 0; e < t.length; e += 1) a(t[e]);
                }
                a(e.$el[0], { childList: e.params.observeSlideChildren }),
                  a(e.$wrapperEl[0], { attributes: !1 });
              }
            }),
            i("destroy", () => {
              n.forEach((e) => {
                e.disconnect();
              }),
                n.splice(0, n.length);
            });
        },
      ]);
    const Z = J;
    function ee(e, t, i, s) {
      const o = n();
      return (
        e.params.createElements &&
          Object.keys(s).forEach((n) => {
            if (!i[n] && !0 === i.auto) {
              let r = e.$el.children(`.${s[n]}`)[0];
              r ||
                ((r = o.createElement("div")),
                (r.className = s[n]),
                e.$el.append(r)),
                (i[n] = r),
                (t[n] = r);
            }
          }),
        i
      );
    }
    function te({ swiper: e, extendParams: t, on: i, emit: s }) {
      function n(t) {
        let i;
        return (
          t &&
            ((i = m(t)),
            e.params.uniqueNavElements &&
              "string" == typeof t &&
              i.length > 1 &&
              1 === e.$el.find(t).length &&
              (i = e.$el.find(t))),
          i
        );
      }
      function o(t, i) {
        const s = e.params.navigation;
        t &&
          t.length > 0 &&
          (t[i ? "addClass" : "removeClass"](s.disabledClass),
          t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
          e.params.watchOverflow &&
            e.enabled &&
            t[e.isLocked ? "addClass" : "removeClass"](s.lockClass));
      }
      function r() {
        if (e.params.loop) return;
        const { $nextEl: t, $prevEl: i } = e.navigation;
        o(i, e.isBeginning && !e.params.rewind),
          o(t, e.isEnd && !e.params.rewind);
      }
      function a(t) {
        t.preventDefault(),
          (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
      }
      function l(t) {
        t.preventDefault(),
          (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
      }
      function d() {
        const t = e.params.navigation;
        if (
          ((e.params.navigation = ee(
            e,
            e.originalParams.navigation,
            e.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !t.nextEl && !t.prevEl)
        )
          return;
        const i = n(t.nextEl),
          s = n(t.prevEl);
        i && i.length > 0 && i.on("click", l),
          s && s.length > 0 && s.on("click", a),
          Object.assign(e.navigation, {
            $nextEl: i,
            nextEl: i && i[0],
            $prevEl: s,
            prevEl: s && s[0],
          }),
          e.enabled ||
            (i && i.addClass(t.lockClass), s && s.addClass(t.lockClass));
      }
      function u() {
        const { $nextEl: t, $prevEl: i } = e.navigation;
        t &&
          t.length &&
          (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", a),
            i.removeClass(e.params.navigation.disabledClass));
      }
      t({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
        },
      }),
        (e.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        i("init", () => {
          d(), r();
        }),
        i("toEdge fromEdge lock unlock", () => {
          r();
        }),
        i("destroy", () => {
          u();
        }),
        i("enable disable", () => {
          const { $nextEl: t, $prevEl: i } = e.navigation;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            ),
            i &&
              i[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              );
        }),
        i("click", (t, i) => {
          const { $nextEl: n, $prevEl: o } = e.navigation,
            r = i.target;
          if (e.params.navigation.hideOnClick && !m(r).is(o) && !m(r).is(n)) {
            if (
              e.pagination &&
              e.params.pagination &&
              e.params.pagination.clickable &&
              (e.pagination.el === r || e.pagination.el.contains(r))
            )
              return;
            let t;
            n
              ? (t = n.hasClass(e.params.navigation.hiddenClass))
              : o && (t = o.hasClass(e.params.navigation.hiddenClass)),
              s(!0 === t ? "navigationShow" : "navigationHide"),
              n && n.toggleClass(e.params.navigation.hiddenClass),
              o && o.toggleClass(e.params.navigation.hiddenClass);
          }
        }),
        Object.assign(e.navigation, { update: r, init: d, destroy: u });
    }
    function ie(e = "") {
      return `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function se({ swiper: e, extendParams: t, on: i, emit: s }) {
      const n = "swiper-pagination";
      let o;
      t({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${n}-bullet`,
          bulletActiveClass: `${n}-bullet-active`,
          modifierClass: `${n}-`,
          currentClass: `${n}-current`,
          totalClass: `${n}-total`,
          hiddenClass: `${n}-hidden`,
          progressbarFillClass: `${n}-progressbar-fill`,
          progressbarOppositeClass: `${n}-progressbar-opposite`,
          clickableClass: `${n}-clickable`,
          lockClass: `${n}-lock`,
          horizontalClass: `${n}-horizontal`,
          verticalClass: `${n}-vertical`,
        },
      }),
        (e.pagination = { el: null, $el: null, bullets: [] });
      let r = 0;
      function a() {
        return (
          !e.params.pagination.el ||
          !e.pagination.el ||
          !e.pagination.$el ||
          0 === e.pagination.$el.length
        );
      }
      function l(t, i) {
        const { bulletActiveClass: s } = e.params.pagination;
        t[i]().addClass(`${s}-${i}`)[i]().addClass(`${s}-${i}-${i}`);
      }
      function d() {
        const t = e.rtl,
          i = e.params.pagination;
        if (a()) return;
        const n =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          d = e.pagination.$el;
        let u;
        const c = e.params.loop
          ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        if (
          (e.params.loop
            ? ((u = Math.ceil(
                (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
              )),
              u > n - 1 - 2 * e.loopedSlides && (u -= n - 2 * e.loopedSlides),
              u > c - 1 && (u -= c),
              u < 0 && "bullets" !== e.params.paginationType && (u = c + u))
            : (u = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
          "bullets" === i.type &&
            e.pagination.bullets &&
            e.pagination.bullets.length > 0)
        ) {
          const s = e.pagination.bullets;
          let n, a, c;
          if (
            (i.dynamicBullets &&
              ((o = s
                .eq(0)
                [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              d.css(
                e.isHorizontal() ? "width" : "height",
                o * (i.dynamicMainBullets + 4) + "px"
              ),
              i.dynamicMainBullets > 1 &&
                void 0 !== e.previousIndex &&
                ((r += u - (e.previousIndex - e.loopedSlides || 0)),
                r > i.dynamicMainBullets - 1
                  ? (r = i.dynamicMainBullets - 1)
                  : r < 0 && (r = 0)),
              (n = Math.max(u - r, 0)),
              (a = n + (Math.min(s.length, i.dynamicMainBullets) - 1)),
              (c = (a + n) / 2)),
            s.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${i.bulletActiveClass}${e}`)
                .join(" ")
            ),
            d.length > 1)
          )
            s.each((e) => {
              const t = m(e),
                s = t.index();
              s === u && t.addClass(i.bulletActiveClass),
                i.dynamicBullets &&
                  (s >= n &&
                    s <= a &&
                    t.addClass(`${i.bulletActiveClass}-main`),
                  s === n && l(t, "prev"),
                  s === a && l(t, "next"));
            });
          else {
            const t = s.eq(u),
              o = t.index();
            if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
              const t = s.eq(n),
                r = s.eq(a);
              for (let e = n; e <= a; e += 1)
                s.eq(e).addClass(`${i.bulletActiveClass}-main`);
              if (e.params.loop)
                if (o >= s.length) {
                  for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                    s.eq(s.length - e).addClass(`${i.bulletActiveClass}-main`);
                  s.eq(s.length - i.dynamicMainBullets - 1).addClass(
                    `${i.bulletActiveClass}-prev`
                  );
                } else l(t, "prev"), l(r, "next");
              else l(t, "prev"), l(r, "next");
            }
          }
          if (i.dynamicBullets) {
            const n = Math.min(s.length, i.dynamicMainBullets + 4),
              r = (o * n - o) / 2 - c * o,
              a = t ? "right" : "left";
            s.css(e.isHorizontal() ? a : "top", `${r}px`);
          }
        }
        if (
          ("fraction" === i.type &&
            (d.find(ie(i.currentClass)).text(i.formatFractionCurrent(u + 1)),
            d.find(ie(i.totalClass)).text(i.formatFractionTotal(c))),
          "progressbar" === i.type)
        ) {
          let t;
          t = i.progressbarOpposite
            ? e.isHorizontal()
              ? "vertical"
              : "horizontal"
            : e.isHorizontal()
            ? "horizontal"
            : "vertical";
          const s = (u + 1) / c;
          let n = 1,
            o = 1;
          "horizontal" === t ? (n = s) : (o = s),
            d
              .find(ie(i.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`)
              .transition(e.params.speed);
        }
        "custom" === i.type && i.renderCustom
          ? (d.html(i.renderCustom(e, u + 1, c)), s("paginationRender", d[0]))
          : s("paginationUpdate", d[0]),
          e.params.watchOverflow &&
            e.enabled &&
            d[e.isLocked ? "addClass" : "removeClass"](i.lockClass);
      }
      function u() {
        const t = e.params.pagination;
        if (a()) return;
        const i =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          n = e.pagination.$el;
        let o = "";
        if ("bullets" === t.type) {
          let s = e.params.loop
            ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          e.params.freeMode &&
            e.params.freeMode.enabled &&
            !e.params.loop &&
            s > i &&
            (s = i);
          for (let i = 0; i < s; i += 1)
            t.renderBullet
              ? (o += t.renderBullet.call(e, i, t.bulletClass))
              : (o += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
          n.html(o), (e.pagination.bullets = n.find(ie(t.bulletClass)));
        }
        "fraction" === t.type &&
          ((o = t.renderFraction
            ? t.renderFraction.call(e, t.currentClass, t.totalClass)
            : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
          n.html(o)),
          "progressbar" === t.type &&
            ((o = t.renderProgressbar
              ? t.renderProgressbar.call(e, t.progressbarFillClass)
              : `<span class="${t.progressbarFillClass}"></span>`),
            n.html(o)),
          "custom" !== t.type && s("paginationRender", e.pagination.$el[0]);
      }
      function c() {
        e.params.pagination = ee(
          e,
          e.originalParams.pagination,
          e.params.pagination,
          { el: "swiper-pagination" }
        );
        const t = e.params.pagination;
        if (!t.el) return;
        let i = m(t.el);
        0 !== i.length &&
          (e.params.uniqueNavElements &&
            "string" == typeof t.el &&
            i.length > 1 &&
            ((i = e.$el.find(t.el)),
            i.length > 1 &&
              (i = i.filter((t) => m(t).parents(".swiper")[0] === e.el))),
          "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
          i.addClass(t.modifierClass + t.type),
          i.addClass(t.modifierClass + e.params.direction),
          "bullets" === t.type &&
            t.dynamicBullets &&
            (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
            (r = 0),
            t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
          "progressbar" === t.type &&
            t.progressbarOpposite &&
            i.addClass(t.progressbarOppositeClass),
          t.clickable &&
            i.on("click", ie(t.bulletClass), function (t) {
              t.preventDefault();
              let i = m(this).index() * e.params.slidesPerGroup;
              e.params.loop && (i += e.loopedSlides), e.slideTo(i);
            }),
          Object.assign(e.pagination, { $el: i, el: i[0] }),
          e.enabled || i.addClass(t.lockClass));
      }
      function h() {
        const t = e.params.pagination;
        if (a()) return;
        const i = e.pagination.$el;
        i.removeClass(t.hiddenClass),
          i.removeClass(t.modifierClass + t.type),
          i.removeClass(t.modifierClass + e.params.direction),
          e.pagination.bullets &&
            e.pagination.bullets.removeClass &&
            e.pagination.bullets.removeClass(t.bulletActiveClass),
          t.clickable && i.off("click", ie(t.bulletClass));
      }
      i("init", () => {
        c(), u(), d();
      }),
        i("activeIndexChange", () => {
          (e.params.loop || void 0 === e.snapIndex) && d();
        }),
        i("snapIndexChange", () => {
          e.params.loop || d();
        }),
        i("slidesLengthChange", () => {
          e.params.loop && (u(), d());
        }),
        i("snapGridLengthChange", () => {
          e.params.loop || (u(), d());
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          const { $el: t } = e.pagination;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.pagination.lockClass
            );
        }),
        i("lock unlock", () => {
          d();
        }),
        i("click", (t, i) => {
          const n = i.target,
            { $el: o } = e.pagination;
          if (
            e.params.pagination.el &&
            e.params.pagination.hideOnClick &&
            o.length > 0 &&
            !m(n).hasClass(e.params.pagination.bulletClass)
          ) {
            if (
              e.navigation &&
              ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                (e.navigation.prevEl && n === e.navigation.prevEl))
            )
              return;
            const t = o.hasClass(e.params.pagination.hiddenClass);
            s(!0 === t ? "paginationShow" : "paginationHide"),
              o.toggleClass(e.params.pagination.hiddenClass);
          }
        }),
        Object.assign(e.pagination, {
          render: u,
          update: d,
          init: c,
          destroy: h,
        });
    }
    function ne({ swiper: e, extendParams: t, on: i, emit: s }) {
      let o;
      function r() {
        const t = e.slides.eq(e.activeIndex);
        let i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          clearTimeout(o),
          (o = g(() => {
            let t;
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  (t = e.slidePrev(e.params.speed, !0, !0)),
                  s("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? l()
                  : ((t = e.slideTo(
                      e.slides.length - 1,
                      e.params.speed,
                      !0,
                      !0
                    )),
                    s("autoplay"))
                : ((t = e.slidePrev(e.params.speed, !0, !0)), s("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                (t = e.slideNext(e.params.speed, !0, !0)),
                s("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? l()
                : ((t = e.slideTo(0, e.params.speed, !0, !0)), s("autoplay"))
              : ((t = e.slideNext(e.params.speed, !0, !0)), s("autoplay")),
              ((e.params.cssMode && e.autoplay.running) || !1 === t) && r();
          }, i));
      }
      function a() {
        return (
          void 0 === o &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0), s("autoplayStart"), r(), !0)
        );
      }
      function l() {
        return (
          !!e.autoplay.running &&
          void 0 !== o &&
          (o && (clearTimeout(o), (o = void 0)),
          (e.autoplay.running = !1),
          s("autoplayStop"),
          !0)
        );
      }
      function d(t) {
        e.autoplay.running &&
          (e.autoplay.paused ||
            (o && clearTimeout(o),
            (e.autoplay.paused = !0),
            0 !== t && e.params.autoplay.waitForTransition
              ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                  e.$wrapperEl[0].addEventListener(t, c);
                })
              : ((e.autoplay.paused = !1), r())));
      }
      function u() {
        const t = n();
        "hidden" === t.visibilityState && e.autoplay.running && d(),
          "visible" === t.visibilityState &&
            e.autoplay.paused &&
            (r(), (e.autoplay.paused = !1));
      }
      function c(t) {
        e &&
          !e.destroyed &&
          e.$wrapperEl &&
          t.target === e.$wrapperEl[0] &&
          (["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, c);
          }),
          (e.autoplay.paused = !1),
          e.autoplay.running ? r() : l());
      }
      function h() {
        e.params.autoplay.disableOnInteraction ? l() : d(),
          ["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, c);
          });
      }
      function p() {
        e.params.autoplay.disableOnInteraction ||
          ((e.autoplay.paused = !1), r());
      }
      (e.autoplay = { running: !1, paused: !1 }),
        t({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        i("init", () => {
          if (e.params.autoplay.enabled) {
            a();
            n().addEventListener("visibilitychange", u),
              e.params.autoplay.pauseOnMouseEnter &&
                (e.$el.on("mouseenter", h), e.$el.on("mouseleave", p));
          }
        }),
        i("beforeTransitionStart", (t, i, s) => {
          e.autoplay.running &&
            (s || !e.params.autoplay.disableOnInteraction
              ? e.autoplay.pause(i)
              : l());
        }),
        i("sliderFirstMove", () => {
          e.autoplay.running &&
            (e.params.autoplay.disableOnInteraction ? l() : d());
        }),
        i("touchEnd", () => {
          e.params.cssMode &&
            e.autoplay.paused &&
            !e.params.autoplay.disableOnInteraction &&
            r();
        }),
        i("destroy", () => {
          e.$el.off("mouseenter", h),
            e.$el.off("mouseleave", p),
            e.autoplay.running && l();
          n().removeEventListener("visibilitychange", u);
        }),
        Object.assign(e.autoplay, { pause: d, run: r, start: a, stop: l });
    }
    function oe({ swiper: e, extendParams: t, on: i }) {
      t({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let s = !1,
        n = !1;
      function o() {
        const t = e.thumbs.swiper;
        if (!t) return;
        const i = t.clickedIndex,
          s = t.clickedSlide;
        if (s && m(s).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
        if (null == i) return;
        let n;
        if (
          ((n = t.params.loop
            ? parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10)
            : i),
          e.params.loop)
        ) {
          let t = e.activeIndex;
          e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
            (e.loopFix(),
            (e._clientLeft = e.$wrapperEl[0].clientLeft),
            (t = e.activeIndex));
          const i = e.slides
              .eq(t)
              .prevAll(`[data-swiper-slide-index="${n}"]`)
              .eq(0)
              .index(),
            s = e.slides
              .eq(t)
              .nextAll(`[data-swiper-slide-index="${n}"]`)
              .eq(0)
              .index();
          n = void 0 === i ? s : void 0 === s ? i : s - t < t - i ? s : i;
        }
        e.slideTo(n);
      }
      function r() {
        const { thumbs: t } = e.params;
        if (s) return !1;
        s = !0;
        const i = e.constructor;
        if (t.swiper instanceof i)
          (e.thumbs.swiper = t.swiper),
            Object.assign(e.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(e.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (y(t.swiper)) {
          const s = Object.assign({}, t.swiper);
          Object.assign(s, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (e.thumbs.swiper = new i(s)),
            (n = !0);
        }
        return (
          e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
          e.thumbs.swiper.on("tap", o),
          !0
        );
      }
      function a(t) {
        const i = e.thumbs.swiper;
        if (!i) return;
        const s =
            "auto" === i.params.slidesPerView
              ? i.slidesPerViewDynamic()
              : i.params.slidesPerView,
          n = e.params.thumbs.autoScrollOffset,
          o = n && !i.params.loop;
        if (e.realIndex !== i.realIndex || o) {
          let r,
            a,
            l = i.activeIndex;
          if (i.params.loop) {
            i.slides.eq(l).hasClass(i.params.slideDuplicateClass) &&
              (i.loopFix(),
              (i._clientLeft = i.$wrapperEl[0].clientLeft),
              (l = i.activeIndex));
            const t = i.slides
                .eq(l)
                .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                .eq(0)
                .index(),
              s = i.slides
                .eq(l)
                .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                .eq(0)
                .index();
            (r =
              void 0 === t
                ? s
                : void 0 === s
                ? t
                : s - l == l - t
                ? i.params.slidesPerGroup > 1
                  ? s
                  : l
                : s - l < l - t
                ? s
                : t),
              (a = e.activeIndex > e.previousIndex ? "next" : "prev");
          } else (r = e.realIndex), (a = r > e.previousIndex ? "next" : "prev");
          o && (r += "next" === a ? n : -1 * n),
            i.visibleSlidesIndexes &&
              i.visibleSlidesIndexes.indexOf(r) < 0 &&
              (i.params.centeredSlides
                ? (r =
                    r > l
                      ? r - Math.floor(s / 2) + 1
                      : r + Math.floor(s / 2) - 1)
                : r > l && i.params.slidesPerGroup,
              i.slideTo(r, t ? 0 : void 0));
        }
        let r = 1;
        const a = e.params.thumbs.slideThumbActiveClass;
        if (
          (e.params.slidesPerView > 1 &&
            !e.params.centeredSlides &&
            (r = e.params.slidesPerView),
          e.params.thumbs.multipleActiveThumbs || (r = 1),
          (r = Math.floor(r)),
          i.slides.removeClass(a),
          i.params.loop || (i.params.virtual && i.params.virtual.enabled))
        )
          for (let t = 0; t < r; t += 1)
            i.$wrapperEl
              .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
              .addClass(a);
        else
          for (let t = 0; t < r; t += 1)
            i.slides.eq(e.realIndex + t).addClass(a);
      }
      (e.thumbs = { swiper: null }),
        i("beforeInit", () => {
          const { thumbs: t } = e.params;
          t && t.swiper && (r(), a(!0));
        }),
        i("slideChange update resize observerUpdate", () => {
          e.thumbs.swiper && a();
        }),
        i("setTransition", (t, i) => {
          const s = e.thumbs.swiper;
          s && s.setTransition(i);
        }),
        i("beforeDestroy", () => {
          const t = e.thumbs.swiper;
          t && n && t && t.destroy();
        }),
        Object.assign(e.thumbs, { init: r, update: a });
    }
    window.addEventListener("load", function (e) {
      !(function () {
        new Z(".main-slider__sliders", {
          modules: [te, se],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 800,
          pagination: { el: ".swiper-pagination", clickable: !0 },
          navigation: {
            nextEl: " .more__item_prev",
            prevEl: ".more__item_next",
          },
        }),
          document.querySelector(".gallery__sliders") &&
            new Z(".gallery__sliders", {
              modules: [te, se],
              observer: !0,
              observeParents: !0,
              slidesPerView: 1,
              spaceBetween: 20,
              autoHeight: !0,
              speed: 300,
              centeredSlides: !0,
              loop: !0,
              navigation: {
                nextEl: ".more__item_prev",
                prevEl: ".more__item_next",
              },
              breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 0, autoHeight: !0 },
                768: { slidesPerView: 1.5, spaceBetween: 20 },
              },
              on: {},
            }),
          document.querySelector(".video-sliders__sliders") &&
            new Z(".video-sliders__sliders", {
              modules: [te, se],
              observer: !0,
              observeParents: !0,
              slidesPerView: 1,
              spaceBetween: 20,
              autoHeight: !0,
              speed: 300,
              centeredSlides: !0,
              loop: !0,
              navigation: {
                nextEl: ".more__item_prev",
                prevEl: ".more__item_next",
              },
              on: {},
            }),
          document.querySelector(".about-parteners") &&
            new Z(".about-parteners", {
              modules: [te, se, ne],
              autoplay: { delay: 3e3, disableOnInteraction: !1 },
              observer: !0,
              observeParents: !0,
              slidesPerView: 6,
              spaceBetween: 80,
              autoHeight: !0,
              speed: 300,
              centeredSlides: !0,
              loop: !0,
              navigation: {
                nextEl: ".more__item_prev",
                prevEl: ".more__item_next",
              },
              on: {},
            });
        let e = new Z(".gallery-thumbs-single", {
          slidesPerView: 2,
          spaceBetween: 10,
          speed: 800,
          on: {
            lazyImageReady: function () {
              ibg();
            },
          },
          pagination: { el: ".reviews__pagination", dynamicBullets: !0 },
          freeMode: !1,
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
          breakpoints: { 500: { slidesPerView: 3 } },
        });
        new Z(".gallery-top-single", {
          modules: [te, oe],
          observer: !0,
          observeParents: !0,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 800,
          navigation: {
            nextEl: ".nav-slide__right",
            prevEl: ".nav-slide__left",
          },
          thumbs: { swiper: e },
        }),
          new Z(".products-procured__sliders", {
            modules: [te, se, ne],
            slidesPerView: 1,
            observer: !0,
            observeParents: !0,
            spaceBetween: 10,
            autoHeight: !0,
            speed: 800,
            autoplay: !0,
            loop: !0,
            breakpoints: {
              400: { slidesPerView: 2, spaceBetween: 20 },
              600: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 20 },
            },
            on: {
              lazyImageReady: function () {
                ibg();
              },
            },
            pagination: { el: ".reviews__pagination", dynamicBullets: !0 },
            navigation: {
              nextEl: ".nav-slide__right",
              prevEl: ".nav-slide__left",
            },
          });
      })();
    });
    const re = {};
    let ae = (e, t = 500, i = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !i),
              !i && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !i && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideUpDone", { detail: { target: e } })
              );
          }, t));
      },
      le = (e, t = 500, i = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            i && e.style.removeProperty("height");
          let s = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = i ? `${i}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = s + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide"),
                document.dispatchEvent(
                  new CustomEvent("slideDownDone", { detail: { target: e } })
                );
            }, t);
        }
      },
      de = !0,
      ue = (e = 500) => {
        let t = document.querySelector("body");
        if (de) {
          let i = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (de = !1),
            setTimeout(function () {
              de = !0;
            }, e);
        }
      },
      ce = (e = 500) => {
        let t = document.querySelector("body");
        if (de) {
          let i = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (de = !1),
            setTimeout(function () {
              de = !0;
            }, e);
        }
      };
    function he(e, t) {
      const i = Array.from(e).filter(function (e, i, s) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (i.length) {
        const e = [];
        i.forEach((i) => {
          const s = {},
            n = i.dataset[t].split(",");
          (s.value = n[0]),
            (s.type = n[1] ? n[1].trim() : "max"),
            (s.item = i),
            e.push(s);
        });
        let s = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        s = (function (e) {
          return e.filter(function (e, t, i) {
            return i.indexOf(e) === t;
          });
        })(s);
        const n = [];
        if (s.length)
          return (
            s.forEach((t) => {
              const i = t.split(","),
                s = i[1],
                o = i[2],
                r = window.matchMedia(i[0]),
                a = e.filter(function (e) {
                  if (e.value === s && e.type === o) return !0;
                });
              n.push({ itemsArray: a, matchMedia: r });
            }),
            n
          );
      }
    }
    let pe = !1;
    setTimeout(() => {
      if (pe) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var me = function () {
      return (
        (me =
          Object.assign ||
          function (e) {
            for (var t, i = 1, s = arguments.length; i < s; i++)
              for (var n in (t = arguments[i]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        me.apply(this, arguments)
      );
    };
    var ge = (function () {
      function e(e) {
        return (
          (this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition",
          ]),
          (this.selector = this._getSelector(e)),
          (this.firstElement = this._getFirstEl()),
          this
        );
      }
      return (
        (e.generateUUID = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }),
        (e.prototype._getSelector = function (e, t) {
          return (
            void 0 === t && (t = document),
            "string" != typeof e
              ? e
              : ((t = t || document),
                "#" === e.substring(0, 1)
                  ? t.querySelector(e)
                  : t.querySelectorAll(e))
          );
        }),
        (e.prototype._each = function (e) {
          return this.selector
            ? (void 0 !== this.selector.length
                ? [].forEach.call(this.selector, e)
                : e(this.selector, 0),
              this)
            : this;
        }),
        (e.prototype._setCssVendorPrefix = function (e, t, i) {
          var s = t.replace(/-([a-z])/gi, function (e, t) {
            return t.toUpperCase();
          });
          -1 !== this.cssVenderPrefixes.indexOf(s)
            ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
              (e.style["webkit" + s] = i),
              (e.style["moz" + s] = i),
              (e.style["ms" + s] = i),
              (e.style["o" + s] = i))
            : (e.style[s] = i);
        }),
        (e.prototype._getFirstEl = function () {
          return this.selector && void 0 !== this.selector.length
            ? this.selector[0]
            : this.selector;
        }),
        (e.prototype.isEventMatched = function (e, t) {
          var i = t.split(".");
          return e
            .split(".")
            .filter(function (e) {
              return e;
            })
            .every(function (e) {
              return -1 !== i.indexOf(e);
            });
        }),
        (e.prototype.attr = function (e, t) {
          return void 0 === t
            ? this.firstElement
              ? this.firstElement.getAttribute(e)
              : ""
            : (this._each(function (i) {
                i.setAttribute(e, t);
              }),
              this);
        }),
        (e.prototype.find = function (e) {
          return fe(this._getSelector(e, this.selector));
        }),
        (e.prototype.first = function () {
          return this.selector && void 0 !== this.selector.length
            ? fe(this.selector[0])
            : fe(this.selector);
        }),
        (e.prototype.eq = function (e) {
          return fe(this.selector[e]);
        }),
        (e.prototype.parent = function () {
          return fe(this.selector.parentElement);
        }),
        (e.prototype.get = function () {
          return this._getFirstEl();
        }),
        (e.prototype.removeAttr = function (e) {
          var t = e.split(" ");
          return (
            this._each(function (e) {
              t.forEach(function (t) {
                return e.removeAttribute(t);
              });
            }),
            this
          );
        }),
        (e.prototype.wrap = function (e) {
          if (!this.firstElement) return this;
          var t = document.createElement("div");
          return (
            (t.className = e),
            this.firstElement.parentNode.insertBefore(t, this.firstElement),
            this.firstElement.parentNode.removeChild(this.firstElement),
            t.appendChild(this.firstElement),
            this
          );
        }),
        (e.prototype.addClass = function (e) {
          return (
            void 0 === e && (e = ""),
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.add(e);
              });
            }),
            this
          );
        }),
        (e.prototype.removeClass = function (e) {
          return (
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.remove(e);
              });
            }),
            this
          );
        }),
        (e.prototype.hasClass = function (e) {
          return !!this.firstElement && this.firstElement.classList.contains(e);
        }),
        (e.prototype.hasAttribute = function (e) {
          return !!this.firstElement && this.firstElement.hasAttribute(e);
        }),
        (e.prototype.toggleClass = function (e) {
          return this.firstElement
            ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
            : this;
        }),
        (e.prototype.css = function (e, t) {
          var i = this;
          return (
            this._each(function (s) {
              i._setCssVendorPrefix(s, e, t);
            }),
            this
          );
        }),
        (e.prototype.on = function (t, i) {
          var s = this;
          return this.selector
            ? (t.split(" ").forEach(function (t) {
                Array.isArray(e.eventListeners[t]) ||
                  (e.eventListeners[t] = []),
                  e.eventListeners[t].push(i),
                  s.selector.addEventListener(t.split(".")[0], i);
              }),
              this)
            : this;
        }),
        (e.prototype.once = function (e, t) {
          var i = this;
          return (
            this.on(e, function () {
              i.off(e), t(e);
            }),
            this
          );
        }),
        (e.prototype.off = function (t) {
          var i = this;
          return this.selector
            ? (Object.keys(e.eventListeners).forEach(function (s) {
                i.isEventMatched(t, s) &&
                  (e.eventListeners[s].forEach(function (e) {
                    i.selector.removeEventListener(s.split(".")[0], e);
                  }),
                  (e.eventListeners[s] = []));
              }),
              this)
            : this;
        }),
        (e.prototype.trigger = function (e, t) {
          if (!this.firstElement) return this;
          var i = new CustomEvent(e.split(".")[0], { detail: t || null });
          return this.firstElement.dispatchEvent(i), this;
        }),
        (e.prototype.load = function (e) {
          var t = this;
          return (
            fetch(e).then(function (e) {
              t.selector.innerHTML = e;
            }),
            this
          );
        }),
        (e.prototype.html = function (e) {
          return void 0 === e
            ? this.firstElement
              ? this.firstElement.innerHTML
              : ""
            : (this._each(function (t) {
                t.innerHTML = e;
              }),
              this);
        }),
        (e.prototype.append = function (e) {
          return (
            this._each(function (t) {
              "string" == typeof e
                ? t.insertAdjacentHTML("beforeend", e)
                : t.appendChild(e);
            }),
            this
          );
        }),
        (e.prototype.prepend = function (e) {
          return (
            this._each(function (t) {
              t.insertAdjacentHTML("afterbegin", e);
            }),
            this
          );
        }),
        (e.prototype.remove = function () {
          return (
            this._each(function (e) {
              e.parentNode.removeChild(e);
            }),
            this
          );
        }),
        (e.prototype.empty = function () {
          return (
            this._each(function (e) {
              e.innerHTML = "";
            }),
            this
          );
        }),
        (e.prototype.scrollTop = function (e) {
          return void 0 !== e
            ? ((document.body.scrollTop = e),
              (document.documentElement.scrollTop = e),
              this)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }),
        (e.prototype.scrollLeft = function (e) {
          return void 0 !== e
            ? ((document.body.scrollLeft = e),
              (document.documentElement.scrollLeft = e),
              this)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }),
        (e.prototype.offset = function () {
          if (!this.firstElement) return { left: 0, top: 0 };
          var e = this.firstElement.getBoundingClientRect(),
            t = fe("body").style().marginLeft;
          return {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          };
        }),
        (e.prototype.style = function () {
          return this.firstElement
            ? this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement)
            : {};
        }),
        (e.prototype.width = function () {
          var e = this.style();
          return (
            this.firstElement.clientWidth -
            parseFloat(e.paddingLeft) -
            parseFloat(e.paddingRight)
          );
        }),
        (e.prototype.height = function () {
          var e = this.style();
          return (
            this.firstElement.clientHeight -
            parseFloat(e.paddingTop) -
            parseFloat(e.paddingBottom)
          );
        }),
        (e.eventListeners = {}),
        e
      );
    })();
    function fe(e) {
      return (
        (function () {
          if ("function" == typeof window.CustomEvent) return !1;
          window.CustomEvent = function (e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: null };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
          };
        })(),
        Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        new ge(e)
      );
    }
    var ve = [
      "src",
      "sources",
      "subHtml",
      "subHtmlUrl",
      "html",
      "video",
      "poster",
      "slideName",
      "responsive",
      "srcset",
      "sizes",
      "iframe",
      "downloadUrl",
      "download",
      "width",
      "facebookShareUrl",
      "tweetText",
      "iframeTitle",
      "twitterShareUrl",
      "pinterestShareUrl",
      "pinterestText",
      "fbHtml",
      "disqusIdentifier",
      "disqusUrl",
    ];
    function ye(e) {
      return "href" === e
        ? "src"
        : (e = (e =
            (e = e.replace("data-", "")).charAt(0).toLowerCase() +
            e.slice(1)).replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          }));
    }
    var be = function (e, t, i, s) {
        void 0 === i && (i = 0);
        var n = fe(e).attr("data-lg-size") || s;
        if (n) {
          var o = n.split(",");
          if (o[1])
            for (var r = window.innerWidth, a = 0; a < o.length; a++) {
              var l = o[a];
              if (parseInt(l.split("-")[2], 10) > r) {
                n = l;
                break;
              }
              a === o.length - 1 && (n = l);
            }
          var d = n.split("-"),
            u = parseInt(d[0], 10),
            c = parseInt(d[1], 10),
            h = t.width(),
            p = t.height() - i,
            m = Math.min(h, u),
            g = Math.min(p, c),
            f = Math.min(m / u, g / c);
          return { width: u * f, height: c * f };
        }
      },
      we = function (e, t, i, s, n) {
        if (n) {
          var o = fe(e).find("img").first();
          if (o.get()) {
            var r = t.get().getBoundingClientRect(),
              a = r.width,
              l = t.height() - (i + s),
              d = o.width(),
              u = o.height(),
              c = o.style(),
              h =
                (a - d) / 2 -
                o.offset().left +
                (parseFloat(c.paddingLeft) || 0) +
                (parseFloat(c.borderLeft) || 0) +
                fe(window).scrollLeft() +
                r.left,
              p =
                (l - u) / 2 -
                o.offset().top +
                (parseFloat(c.paddingTop) || 0) +
                (parseFloat(c.borderTop) || 0) +
                fe(window).scrollTop() +
                i;
            return (
              "translate3d(" +
              (h *= -1) +
              "px, " +
              (p *= -1) +
              "px, 0) scale3d(" +
              d / n.width +
              ", " +
              u / n.height +
              ", 1)"
            );
          }
        }
      },
      Ce = function (e, t, i, s, n, o) {
        return (
          '<div class="lg-video-cont lg-has-iframe" style="width:' +
          e +
          "; max-width:" +
          i +
          "; height: " +
          t +
          "; max-height:" +
          s +
          '">\n                    <iframe class="lg-object" frameborder="0" ' +
          (o ? 'title="' + o + '"' : "") +
          ' src="' +
          n +
          '"  allowfullscreen="true"></iframe>\n                </div>'
        );
      },
      Te = function (e, t, i, s, n, o) {
        var r =
            "<img " +
            i +
            " " +
            (s ? 'srcset="' + s + '"' : "") +
            "  " +
            (n ? 'sizes="' + n + '"' : "") +
            ' class="lg-object lg-image" data-index="' +
            e +
            '" src="' +
            t +
            '" />',
          a = "";
        o &&
          (a = ("string" == typeof o ? JSON.parse(o) : o).map(function (e) {
            var t = "";
            return (
              Object.keys(e).forEach(function (i) {
                t += " " + i + '="' + e[i] + '"';
              }),
              "<source " + t + "></source>"
            );
          }));
        return "" + a + r;
      },
      Se = function (e) {
        for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
          var o = e[n].split(" ");
          "" === o[0] && o.splice(0, 1), i.push(o[0]), t.push(o[1]);
        }
        for (var r = window.innerWidth, a = 0; a < t.length; a++)
          if (parseInt(t[a], 10) > r) {
            s = i[a];
            break;
          }
        return s;
      },
      xe = function (e) {
        return !!e && !!e.complete && 0 !== e.naturalWidth;
      },
      Ee = function (e, t, i, s) {
        return (
          '<div class="lg-video-cont ' +
          (s && s.youtube
            ? "lg-has-youtube"
            : s && s.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
          '" style="' +
          i +
          '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
          (t || "") +
          '\n            <img class="lg-object lg-video-poster" src="' +
          e +
          '" />\n        </div>'
        );
      },
      Ie = function (e, t, i, s) {
        var n = [],
          o = (function () {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++)
              e += arguments[t].length;
            var s = Array(e),
              n = 0;
            for (t = 0; t < i; t++)
              for (var o = arguments[t], r = 0, a = o.length; r < a; r++, n++)
                s[n] = o[r];
            return s;
          })(ve, t);
        return (
          [].forEach.call(e, function (e) {
            for (var t = {}, r = 0; r < e.attributes.length; r++) {
              var a = e.attributes[r];
              if (a.specified) {
                var l = ye(a.name),
                  d = "";
                o.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
              }
            }
            var u = fe(e),
              c = u.find("img").first().attr("alt"),
              h = u.attr("title"),
              p = s ? u.attr(s) : u.find("img").first().attr("src");
            (t.thumb = p),
              i && !t.subHtml && (t.subHtml = h || c || ""),
              (t.alt = c || h || ""),
              n.push(t);
          }),
          n
        );
      },
      _e = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
      Le = function (e, t, i) {
        if (!e)
          return t
            ? { html5: !0 }
            : void console.error(
                "lightGallery :- data-src is not provided on slide item " +
                  (i + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
              );
        var s = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
          ),
          n = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
          ),
          o = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
          );
        return s
          ? { youtube: s }
          : n
          ? { vimeo: n }
          : o
          ? { wistia: o }
          : void 0;
      },
      Oe = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: !0,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: !0,
        allowMediaOverlap: !1,
        videoMaxSize: "1280-720",
        loadYouTubePoster: !0,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        closable: !0,
        swipeToClose: !0,
        closeOnTap: !0,
        showCloseIcon: !0,
        showMaximizeIcon: !1,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimation: !0,
        hideControlOnEnd: !1,
        mousewheel: !1,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
        plugins: [],
      },
      Me = "lgAfterAppendSlide",
      Pe = "lgInit",
      ke = "lgHasVideo",
      ze = "lgContainerResize",
      Ae = "lgUpdateSlides",
      $e = "lgAfterAppendSubHtml",
      De = "lgBeforeOpen",
      Be = "lgAfterOpen",
      Ge = "lgSlideItemLoad",
      We = "lgBeforeSlide",
      je = "lgAfterSlide",
      He = "lgPosterClick",
      Ve = "lgDragStart",
      Fe = "lgDragMove",
      Ne = "lgDragEnd",
      qe = "lgBeforeNextSlide",
      Re = "lgBeforePrevSlide",
      Xe = "lgBeforeClose",
      Ye = "lgAfterClose",
      Ue = 0,
      Qe = (function () {
        function e(e, t) {
          if (
            ((this.lgOpened = !1),
            (this.index = 0),
            (this.plugins = []),
            (this.lGalleryOn = !1),
            (this.lgBusy = !1),
            (this.currentItemsInDom = []),
            (this.prevScrollTop = 0),
            (this.isDummyImageRemoved = !1),
            (this.dragOrSwipeEnabled = !1),
            (this.mediaContainerPosition = { top: 0, bottom: 0 }),
            !e)
          )
            return this;
          if (
            (Ue++,
            (this.lgId = Ue),
            (this.el = e),
            (this.LGel = fe(e)),
            this.generateSettings(t),
            this.buildModules(),
            this.settings.dynamic &&
              void 0 !== this.settings.dynamicEl &&
              !Array.isArray(this.settings.dynamicEl))
          )
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          return (
            (this.galleryItems = this.getItems()),
            this.normalizeSettings(),
            this.init(),
            this.validateLicense(),
            this
          );
        }
        return (
          (e.prototype.generateSettings = function (e) {
            if (
              ((this.settings = me(me({}, Oe), e)),
              this.settings.isMobile &&
              "function" == typeof this.settings.isMobile
                ? this.settings.isMobile()
                : _e())
            ) {
              var t = me(
                me({}, this.settings.mobileSettings),
                this.settings.mobileSettings
              );
              this.settings = me(me({}, this.settings), t);
            }
          }),
          (e.prototype.normalizeSettings = function () {
            this.settings.slideEndAnimation &&
              (this.settings.hideControlOnEnd = !1),
              this.settings.closable || (this.settings.swipeToClose = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              this.settings.dynamic && (this.zoomFromOrigin = !1),
              this.settings.container ||
                (this.settings.container = document.body),
              (this.settings.preload = Math.min(
                this.settings.preload,
                this.galleryItems.length
              ));
          }),
          (e.prototype.init = function () {
            var e = this;
            this.addSlideVideoInfo(this.galleryItems),
              this.buildStructure(),
              this.LGel.trigger(Pe, { instance: this }),
              this.settings.keyPress && this.keyPress(),
              setTimeout(function () {
                e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
              }, 50),
              this.arrow(),
              this.settings.mousewheel && this.mousewheel(),
              this.settings.dynamic || this.openGalleryOnItemClick();
          }),
          (e.prototype.openGalleryOnItemClick = function () {
            for (
              var e = this,
                t = function (t) {
                  var s = i.items[t],
                    n = fe(s),
                    o = ge.generateUUID();
                  n.attr("data-lg-id", o).on(
                    "click.lgcustom-item-" + o,
                    function (i) {
                      i.preventDefault();
                      var n = e.settings.index || t;
                      e.openGallery(n, s);
                    }
                  );
                },
                i = this,
                s = 0;
              s < this.items.length;
              s++
            )
              t(s);
          }),
          (e.prototype.buildModules = function () {
            var e = this;
            this.settings.plugins.forEach(function (t) {
              e.plugins.push(new t(e, fe));
            });
          }),
          (e.prototype.validateLicense = function () {
            this.settings.licenseKey
              ? "0000-0000-000-0000" === this.settings.licenseKey &&
                console.warn(
                  "lightGallery: " +
                    this.settings.licenseKey +
                    " license key is not valid for production use"
                )
              : console.error("Please provide a valid license key");
          }),
          (e.prototype.getSlideItem = function (e) {
            return fe(this.getSlideItemId(e));
          }),
          (e.prototype.getSlideItemId = function (e) {
            return "#lg-item-" + this.lgId + "-" + e;
          }),
          (e.prototype.getIdName = function (e) {
            return e + "-" + this.lgId;
          }),
          (e.prototype.getElementById = function (e) {
            return fe("#" + this.getIdName(e));
          }),
          (e.prototype.manageSingleSlideClassName = function () {
            this.galleryItems.length < 2
              ? this.outer.addClass("lg-single-item")
              : this.outer.removeClass("lg-single-item");
          }),
          (e.prototype.buildStructure = function () {
            var e = this;
            if (!(this.$container && this.$container.get())) {
              var t = "",
                i = "";
              this.settings.controls &&
                (t =
                  '<button type="button" id="' +
                  this.getIdName("lg-prev") +
                  '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                  this.settings.prevHtml +
                  ' </button>\n                <button type="button" id="' +
                  this.getIdName("lg-next") +
                  '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                  this.settings.nextHtml +
                  " </button>"),
                ".lg-item" !== this.settings.appendSubHtmlTo &&
                  (i =
                    '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
              var s = "";
              this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
              var n = this.settings.ariaLabelledby
                  ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                  : "",
                o = this.settings.ariaDescribedby
                  ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                  : "",
                r =
                  "lg-container " +
                  this.settings.addClass +
                  " " +
                  (document.body !== this.settings.container
                    ? "lg-inline"
                    : ""),
                a =
                  this.settings.closable && this.settings.showCloseIcon
                    ? '<button type="button" aria-label="Close gallery" id="' +
                      this.getIdName("lg-close") +
                      '" class="lg-close lg-icon"></button>'
                    : "",
                l = this.settings.showMaximizeIcon
                  ? '<button type="button" aria-label="Toggle maximize" id="' +
                    this.getIdName("lg-maximize") +
                    '" class="lg-maximize lg-icon"></button>'
                  : "",
                d =
                  '\n        <div class="' +
                  r +
                  '" id="' +
                  this.getIdName("lg-container") +
                  '" tabindex="-1" aria-modal="true" ' +
                  n +
                  " " +
                  o +
                  ' role="dialog"\n        >\n            <div id="' +
                  this.getIdName("lg-backdrop") +
                  '" class="lg-backdrop"></div>\n\n            <div id="' +
                  this.getIdName("lg-outer") +
                  '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                  s +
                  ' ">\n\n              <div id="' +
                  this.getIdName("lg-content") +
                  '" class="lg-content">\n                <div id="' +
                  this.getIdName("lg-inner") +
                  '" class="lg-inner">\n                </div>\n                ' +
                  t +
                  '\n              </div>\n                <div id="' +
                  this.getIdName("lg-toolbar") +
                  '" class="lg-toolbar lg-group">\n                    ' +
                  l +
                  "\n                    " +
                  a +
                  "\n                    </div>\n                    " +
                  (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                  '\n                <div id="' +
                  this.getIdName("lg-components") +
                  '" class="lg-components">\n                    ' +
                  (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                  "\n                </div>\n            </div>\n        </div>\n        ";
              fe(this.settings.container).css("position", "relative").append(d),
                (this.outer = this.getElementById("lg-outer")),
                (this.$lgComponents = this.getElementById("lg-components")),
                (this.$backdrop = this.getElementById("lg-backdrop")),
                (this.$container = this.getElementById("lg-container")),
                (this.$inner = this.getElementById("lg-inner")),
                (this.$content = this.getElementById("lg-content")),
                (this.$toolbar = this.getElementById("lg-toolbar")),
                this.$backdrop.css(
                  "transition-duration",
                  this.settings.backdropDuration + "ms"
                );
              var u = this.settings.mode + " ";
              this.manageSingleSlideClassName(),
                this.settings.enableDrag && (u += "lg-grab "),
                this.outer.addClass(u),
                this.$inner.css(
                  "transition-timing-function",
                  this.settings.easing
                ),
                this.$inner.css(
                  "transition-duration",
                  this.settings.speed + "ms"
                ),
                this.settings.download &&
                  this.$toolbar.append(
                    '<a id="' +
                      this.getIdName("lg-download") +
                      '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                  ),
                this.counter(),
                fe(window).on(
                  "resize.lg.global" +
                    this.lgId +
                    " orientationchange.lg.global" +
                    this.lgId,
                  function () {
                    e.refreshOnResize();
                  }
                ),
                this.hideBars(),
                this.manageCloseGallery(),
                this.toggleMaximize(),
                this.initModules();
            }
          }),
          (e.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
              var e = this.galleryItems[this.index].__slideVideoInfo;
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var t = this.mediaContainerPosition,
                i = t.top,
                s = t.bottom;
              if (
                ((this.currentImageSize = be(
                  this.items[this.index],
                  this.outer,
                  i + s,
                  e && this.settings.videoMaxSize
                )),
                e && this.resizeVideoSlide(this.index, this.currentImageSize),
                this.zoomFromOrigin && !this.isDummyImageRemoved)
              ) {
                var n = this.getDummyImgStyles(this.currentImageSize);
                this.outer
                  .find(".lg-current .lg-dummy-img")
                  .first()
                  .attr("style", n);
              }
              this.LGel.trigger(ze);
            }
          }),
          (e.prototype.resizeVideoSlide = function (e, t) {
            var i = this.getVideoContStyle(t);
            this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
          }),
          (e.prototype.updateSlides = function (e, t) {
            if (
              (this.index > e.length - 1 && (this.index = e.length - 1),
              1 === e.length && (this.index = 0),
              e.length)
            ) {
              var i = this.galleryItems[t].src;
              (this.galleryItems = e),
                this.updateControls(),
                this.$inner.empty(),
                (this.currentItemsInDom = []);
              var s = 0;
              this.galleryItems.some(function (e, t) {
                return e.src === i && ((s = t), !0);
              }),
                (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
                this.loadContent(s, !0),
                this.getSlideItem(s).addClass("lg-current"),
                (this.index = s),
                this.updateCurrentCounter(s),
                this.LGel.trigger(Ae);
            } else this.closeGallery();
          }),
          (e.prototype.getItems = function () {
            if (((this.items = []), this.settings.dynamic))
              return this.settings.dynamicEl || [];
            if ("this" === this.settings.selector) this.items.push(this.el);
            else if (this.settings.selector)
              if ("string" == typeof this.settings.selector)
                if (this.settings.selectWithin) {
                  var e = fe(this.settings.selectWithin);
                  this.items = e.find(this.settings.selector).get();
                } else
                  this.items = this.el.querySelectorAll(this.settings.selector);
              else this.items = this.settings.selector;
            else this.items = this.el.children;
            return Ie(
              this.items,
              this.settings.extraProps,
              this.settings.getCaptionFromTitleOrAlt,
              this.settings.exThumbImage
            );
          }),
          (e.prototype.openGallery = function (e, t) {
            var i = this;
            if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
              (this.lgOpened = !0),
                this.outer.get().focus(),
                this.outer.removeClass("lg-hide-items"),
                this.$container.addClass("lg-show");
              var s = this.getItemsToBeInsertedToDom(e, e);
              this.currentItemsInDom = s;
              var n = "";
              s.forEach(function (e) {
                n = n + '<div id="' + e + '" class="lg-item"></div>';
              }),
                this.$inner.append(n),
                this.addHtml(e);
              var o = "";
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var r = this.mediaContainerPosition,
                a = r.top,
                l = r.bottom;
              this.settings.allowMediaOverlap ||
                this.setMediaContainerPosition(a, l);
              var d = this.galleryItems[e].__slideVideoInfo;
              this.zoomFromOrigin &&
                t &&
                ((this.currentImageSize = be(
                  t,
                  this.outer,
                  a + l,
                  d && this.settings.videoMaxSize
                )),
                (o = we(t, this.outer, a, l, this.currentImageSize))),
                (this.zoomFromOrigin && o) ||
                  (this.outer.addClass(this.settings.startClass),
                  this.getSlideItem(e).removeClass("lg-complete"));
              var u = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
              setTimeout(function () {
                i.outer.addClass("lg-components-open");
              }, u),
                (this.index = e),
                this.LGel.trigger(De),
                this.getSlideItem(e).addClass("lg-current"),
                (this.lGalleryOn = !1),
                (this.prevScrollTop = fe(window).scrollTop()),
                setTimeout(function () {
                  if (i.zoomFromOrigin && o) {
                    var t = i.getSlideItem(e);
                    t.css("transform", o),
                      setTimeout(function () {
                        t
                          .addClass("lg-start-progress lg-start-end-progress")
                          .css(
                            "transition-duration",
                            i.settings.startAnimationDuration + "ms"
                          ),
                          i.outer.addClass("lg-zoom-from-image");
                      }),
                      setTimeout(function () {
                        t.css("transform", "translate3d(0, 0, 0)");
                      }, 100);
                  }
                  setTimeout(function () {
                    i.$backdrop.addClass("in"),
                      i.$container.addClass("lg-show-in");
                  }, 10),
                    (i.zoomFromOrigin && o) ||
                      setTimeout(function () {
                        i.outer.addClass("lg-visible");
                      }, i.settings.backdropDuration),
                    i.slide(e, !1, !1, !1),
                    i.LGel.trigger(Be);
                }),
                document.body === this.settings.container &&
                  fe("html").addClass("lg-on");
            }
          }),
          (e.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
            var e = this.$toolbar.get().clientHeight || 0,
              t = this.outer.find(".lg-components .lg-sub-html").get(),
              i =
                this.settings.defaultCaptionHeight ||
                (t && t.clientHeight) ||
                0,
              s = this.outer.find(".lg-thumb-outer").get();
            return { top: e, bottom: (s ? s.clientHeight : 0) + i };
          }),
          (e.prototype.setMediaContainerPosition = function (e, t) {
            void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              this.$content.css("top", e + "px").css("bottom", t + "px");
          }),
          (e.prototype.hideBars = function () {
            var e = this;
            setTimeout(function () {
              e.outer.removeClass("lg-hide-items"),
                e.settings.hideBarsDelay > 0 &&
                  (e.outer.on(
                    "mousemove.lg click.lg touchstart.lg",
                    function () {
                      e.outer.removeClass("lg-hide-items"),
                        clearTimeout(e.hideBarTimeout),
                        (e.hideBarTimeout = setTimeout(function () {
                          e.outer.addClass("lg-hide-items");
                        }, e.settings.hideBarsDelay));
                    }
                  ),
                  e.outer.trigger("mousemove.lg"));
            }, this.settings.showBarsAfter);
          }),
          (e.prototype.initPictureFill = function (e) {
            if (this.settings.supportLegacyBrowser)
              try {
                picturefill({ elements: [e.get()] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                );
              }
          }),
          (e.prototype.counter = function () {
            if (this.settings.counter) {
              var e =
                '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                this.getIdName("lg-counter-current") +
                '" class="lg-counter-current">' +
                (this.index + 1) +
                ' </span> /\n                <span id="' +
                this.getIdName("lg-counter-all") +
                '" class="lg-counter-all">' +
                this.galleryItems.length +
                " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(e);
            }
          }),
          (e.prototype.addHtml = function (e) {
            var t, i;
            if (
              (this.galleryItems[e].subHtmlUrl
                ? (i = this.galleryItems[e].subHtmlUrl)
                : (t = this.galleryItems[e].subHtml),
              !i)
            )
              if (t) {
                var s = t.substring(0, 1);
                ("." !== s && "#" !== s) ||
                  (t =
                    this.settings.subHtmlSelectorRelative &&
                    !this.settings.dynamic
                      ? fe(this.items).eq(e).find(t).first().html()
                      : fe(t).first().html());
              } else t = "";
            if (".lg-item" !== this.settings.appendSubHtmlTo)
              i
                ? this.outer.find(".lg-sub-html").load(i)
                : this.outer.find(".lg-sub-html").html(t);
            else {
              var n = fe(this.getSlideItemId(e));
              i
                ? n.load(i)
                : n.append('<div class="lg-sub-html">' + t + "</div>");
            }
            null != t &&
              ("" === t
                ? this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .addClass("lg-empty-html")
                : this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .removeClass("lg-empty-html")),
              this.LGel.trigger($e, { index: e });
          }),
          (e.prototype.preload = function (e) {
            for (
              var t = 1;
              t <= this.settings.preload &&
              !(t >= this.galleryItems.length - e);
              t++
            )
              this.loadContent(e + t, !1);
            for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
              this.loadContent(e - i, !1);
          }),
          (e.prototype.getDummyImgStyles = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                margin-left: -" +
                  e.width / 2 +
                  "px;\n                margin-top: -" +
                  e.height / 2 +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getVideoContStyle = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getDummyImageContent = function (e, t, i) {
            var s;
            if ((this.settings.dynamic || (s = fe(this.items).eq(t)), s)) {
              var n = void 0;
              if (
                !(n = this.settings.exThumbImage
                  ? s.attr(this.settings.exThumbImage)
                  : s.find("img").first().attr("src"))
              )
                return "";
              var o =
                "<img " +
                i +
                ' style="' +
                this.getDummyImgStyles(this.currentImageSize) +
                '" class="lg-dummy-img" src="' +
                n +
                '" />';
              return (
                e.addClass("lg-first-slide"),
                this.outer.addClass("lg-first-slide-loading"),
                o
              );
            }
            return "";
          }),
          (e.prototype.setImgMarkup = function (e, t, i) {
            var s = this.galleryItems[i],
              n = s.alt,
              o = s.srcset,
              r = s.sizes,
              a = s.sources,
              l = n ? 'alt="' + n + '"' : "",
              d =
                '<picture class="lg-img-wrap"> ' +
                (this.isFirstSlideWithZoomAnimation()
                  ? this.getDummyImageContent(t, i, l)
                  : Te(i, e, l, o, r, a)) +
                "</picture>";
            t.prepend(d);
          }),
          (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
            var n = e.find(".lg-object").first();
            xe(n.get()) || t
              ? i()
              : (n.on("load.lg error.lg", function () {
                  i && i();
                }),
                n.on("error.lg", function () {
                  s && s();
                }));
          }),
          (e.prototype.onLgObjectLoad = function (e, t, i, s, n, o) {
            var r = this;
            this.onSlideObjectLoad(
              e,
              o,
              function () {
                r.triggerSlideItemLoad(e, t, i, s, n);
              },
              function () {
                e.addClass("lg-complete lg-complete_"),
                  e.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              }
            );
          }),
          (e.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
            var o = this,
              r = this.galleryItems[t],
              a = n && "video" === this.getSlideType(r) && !r.poster ? s : 0;
            setTimeout(function () {
              e.addClass("lg-complete lg-complete_"),
                o.LGel.trigger(Ge, {
                  index: t,
                  delay: i || 0,
                  isFirstSlide: n,
                });
            }, a);
          }),
          (e.prototype.isFirstSlideWithZoomAnimation = function () {
            return !(
              this.lGalleryOn ||
              !this.zoomFromOrigin ||
              !this.currentImageSize
            );
          }),
          (e.prototype.addSlideVideoInfo = function (e) {
            var t = this;
            e.forEach(function (e, i) {
              (e.__slideVideoInfo = Le(e.src, !!e.video, i)),
                e.__slideVideoInfo &&
                  t.settings.loadYouTubePoster &&
                  !e.poster &&
                  e.__slideVideoInfo.youtube &&
                  (e.poster =
                    "//img.youtube.com/vi/" +
                    e.__slideVideoInfo.youtube[1] +
                    "/maxresdefault.jpg");
            });
          }),
          (e.prototype.loadContent = function (e, t) {
            var i = this,
              s = this.galleryItems[e],
              n = fe(this.getSlideItemId(e)),
              o = s.poster,
              r = s.srcset,
              a = s.sizes,
              l = s.sources,
              d = s.src,
              u = s.video,
              c = u && "string" == typeof u ? JSON.parse(u) : u;
            if (s.responsive) {
              var h = s.responsive.split(",");
              d = Se(h) || d;
            }
            var p = s.__slideVideoInfo,
              m = "",
              g = !!s.iframe,
              f = !this.lGalleryOn,
              v = 0;
            if (
              (f &&
                (v =
                  this.zoomFromOrigin && this.currentImageSize
                    ? this.settings.startAnimationDuration + 10
                    : this.settings.backdropDuration + 10),
              !n.hasClass("lg-loaded"))
            ) {
              if (p) {
                var y = this.mediaContainerPosition,
                  b = y.top,
                  w = y.bottom,
                  C = be(
                    this.items[e],
                    this.outer,
                    b + w,
                    p && this.settings.videoMaxSize
                  );
                m = this.getVideoContStyle(C);
              }
              if (g) {
                var T = Ce(
                  this.settings.iframeWidth,
                  this.settings.iframeHeight,
                  this.settings.iframeMaxWidth,
                  this.settings.iframeMaxHeight,
                  d,
                  s.iframeTitle
                );
                n.prepend(T);
              } else if (o) {
                var S = "";
                f &&
                  this.zoomFromOrigin &&
                  this.currentImageSize &&
                  (S = this.getDummyImageContent(n, e, ""));
                T = Ee(o, S || "", m, p);
                n.prepend(T);
              } else if (p) {
                T = '<div class="lg-video-cont " style="' + m + '"></div>';
                n.prepend(T);
              } else if ((this.setImgMarkup(d, n, e), r || l)) {
                var x = n.find(".lg-object");
                this.initPictureFill(x);
              }
              (o || p) &&
                this.LGel.trigger(ke, {
                  index: e,
                  src: d,
                  html5Video: c,
                  hasPoster: !!o,
                }),
                this.LGel.trigger(Me, { index: e }),
                this.lGalleryOn &&
                  ".lg-item" === this.settings.appendSubHtmlTo &&
                  this.addHtml(e);
            }
            var E = 0;
            v && !fe(document.body).hasClass("lg-from-hash") && (E = v),
              this.isFirstSlideWithZoomAnimation() &&
                (setTimeout(function () {
                  n.removeClass(
                    "lg-start-end-progress lg-start-progress"
                  ).removeAttr("style");
                }, this.settings.startAnimationDuration + 100),
                n.hasClass("lg-loaded") ||
                  setTimeout(function () {
                    if (
                      "image" === i.getSlideType(s) &&
                      (n
                        .find(".lg-img-wrap")
                        .append(Te(e, d, "", r, a, s.sources)),
                      r || l)
                    ) {
                      var t = n.find(".lg-object");
                      i.initPictureFill(t);
                    }
                    ("image" === i.getSlideType(s) ||
                      ("video" === i.getSlideType(s) && o)) &&
                      (i.onLgObjectLoad(n, e, v, E, !0, !1),
                      i.onSlideObjectLoad(
                        n,
                        !(!p || !p.html5 || o),
                        function () {
                          i.loadContentOnFirstSlideLoad(e, n, E);
                        },
                        function () {
                          i.loadContentOnFirstSlideLoad(e, n, E);
                        }
                      ));
                  }, this.settings.startAnimationDuration + 100)),
              n.addClass("lg-loaded"),
              (this.isFirstSlideWithZoomAnimation() &&
                ("video" !== this.getSlideType(s) || o)) ||
                this.onLgObjectLoad(n, e, v, E, f, !(!p || !p.html5 || o)),
              (this.zoomFromOrigin && this.currentImageSize) ||
                !n.hasClass("lg-complete_") ||
                this.lGalleryOn ||
                setTimeout(function () {
                  n.addClass("lg-complete");
                }, this.settings.backdropDuration),
              (this.lGalleryOn = !0),
              !0 === t &&
                (n.hasClass("lg-complete_")
                  ? this.preload(e)
                  : n
                      .find(".lg-object")
                      .first()
                      .on("load.lg error.lg", function () {
                        i.preload(e);
                      }));
          }),
          (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
            var s = this;
            setTimeout(function () {
              t.find(".lg-dummy-img").remove(),
                t.removeClass("lg-first-slide"),
                s.outer.removeClass("lg-first-slide-loading"),
                (s.isDummyImageRemoved = !0),
                s.preload(e);
            }, i + 300);
          }),
          (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
            var s = this;
            void 0 === i && (i = 0);
            var n = [],
              o = Math.max(i, 3);
            o = Math.min(o, this.galleryItems.length);
            var r = "lg-item-" + this.lgId + "-" + t;
            if (this.galleryItems.length <= 3)
              return (
                this.galleryItems.forEach(function (e, t) {
                  n.push("lg-item-" + s.lgId + "-" + t);
                }),
                n
              );
            if (e < (this.galleryItems.length - 1) / 2) {
              for (var a = e; a > e - o / 2 && a >= 0; a--)
                n.push("lg-item-" + this.lgId + "-" + a);
              var l = n.length;
              for (a = 0; a < o - l; a++)
                n.push("lg-item-" + this.lgId + "-" + (e + a + 1));
            } else {
              for (
                a = e;
                a <= this.galleryItems.length - 1 && a < e + o / 2;
                a++
              )
                n.push("lg-item-" + this.lgId + "-" + a);
              for (l = n.length, a = 0; a < o - l; a++)
                n.push("lg-item-" + this.lgId + "-" + (e - a - 1));
            }
            return (
              this.settings.loop &&
                (e === this.galleryItems.length - 1
                  ? n.push("lg-item-" + this.lgId + "-0")
                  : 0 === e &&
                    n.push(
                      "lg-item-" +
                        this.lgId +
                        "-" +
                        (this.galleryItems.length - 1)
                    )),
              -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + t),
              n
            );
          }),
          (e.prototype.organizeSlideItems = function (e, t) {
            var i = this,
              s = this.getItemsToBeInsertedToDom(
                e,
                t,
                this.settings.numberOfSlideItemsInDom
              );
            return (
              s.forEach(function (e) {
                -1 === i.currentItemsInDom.indexOf(e) &&
                  i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
              }),
              this.currentItemsInDom.forEach(function (e) {
                -1 === s.indexOf(e) && fe("#" + e).remove();
              }),
              s
            );
          }),
          (e.prototype.getPreviousSlideIndex = function () {
            var e = 0;
            try {
              var t = this.outer.find(".lg-current").first().attr("id");
              e = parseInt(t.split("-")[3]) || 0;
            } catch (t) {
              e = 0;
            }
            return e;
          }),
          (e.prototype.setDownloadValue = function (e) {
            if (this.settings.download) {
              var t = this.galleryItems[e];
              if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                this.outer.addClass("lg-hide-download");
              else {
                var i = this.getElementById("lg-download");
                this.outer.removeClass("lg-hide-download"),
                  i.attr("href", t.downloadUrl || t.src),
                  t.download && i.attr("download", t.download);
              }
            }
          }),
          (e.prototype.makeSlideAnimation = function (e, t, i) {
            var s = this;
            this.lGalleryOn && i.addClass("lg-slide-progress"),
              setTimeout(
                function () {
                  s.outer.addClass("lg-no-trans"),
                    s.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-next-slide"),
                    "prev" === e
                      ? (t.addClass("lg-prev-slide"),
                        i.addClass("lg-next-slide"))
                      : (t.addClass("lg-next-slide"),
                        i.addClass("lg-prev-slide")),
                    setTimeout(function () {
                      s.outer.find(".lg-item").removeClass("lg-current"),
                        t.addClass("lg-current"),
                        s.outer.removeClass("lg-no-trans");
                    }, 50);
                },
                this.lGalleryOn ? this.settings.slideDelay : 0
              );
          }),
          (e.prototype.slide = function (e, t, i, s) {
            var n = this,
              o = this.getPreviousSlideIndex();
            if (
              ((this.currentItemsInDom = this.organizeSlideItems(e, o)),
              !this.lGalleryOn || o !== e)
            ) {
              var r = this.galleryItems.length;
              if (!this.lgBusy) {
                this.settings.counter && this.updateCurrentCounter(e);
                var a = this.getSlideItem(e),
                  l = this.getSlideItem(o),
                  d = this.galleryItems[e],
                  u = d.__slideVideoInfo;
                if (
                  (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                  this.setDownloadValue(e),
                  u)
                ) {
                  var c = this.mediaContainerPosition,
                    h = c.top,
                    p = c.bottom,
                    m = be(
                      this.items[e],
                      this.outer,
                      h + p,
                      u && this.settings.videoMaxSize
                    );
                  this.resizeVideoSlide(e, m);
                }
                if (
                  (this.LGel.trigger(We, {
                    prevIndex: o,
                    index: e,
                    fromTouch: !!t,
                    fromThumb: !!i,
                  }),
                  (this.lgBusy = !0),
                  clearTimeout(this.hideBarTimeout),
                  this.arrowDisable(e),
                  s || (e < o ? (s = "prev") : e > o && (s = "next")),
                  t)
                ) {
                  this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide");
                  var g = void 0,
                    f = void 0;
                  r > 2
                    ? ((g = e - 1),
                      (f = e + 1),
                      ((0 === e && o === r - 1) || (e === r - 1 && 0 === o)) &&
                        ((f = 0), (g = r - 1)))
                    : ((g = 0), (f = 1)),
                    "prev" === s
                      ? this.getSlideItem(f).addClass("lg-next-slide")
                      : this.getSlideItem(g).addClass("lg-prev-slide"),
                    a.addClass("lg-current");
                } else this.makeSlideAnimation(s, a, l);
                this.lGalleryOn
                  ? setTimeout(function () {
                      n.loadContent(e, !0),
                        ".lg-item" !== n.settings.appendSubHtmlTo &&
                          n.addHtml(e);
                    }, this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay))
                  : this.loadContent(e, !0),
                  setTimeout(function () {
                    (n.lgBusy = !1),
                      l.removeClass("lg-slide-progress"),
                      n.LGel.trigger(je, {
                        prevIndex: o,
                        index: e,
                        fromTouch: t,
                        fromThumb: i,
                      });
                  }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay));
              }
              this.index = e;
            }
          }),
          (e.prototype.updateCurrentCounter = function (e) {
            this.getElementById("lg-counter-current").html(e + 1 + "");
          }),
          (e.prototype.updateCounterTotal = function () {
            this.getElementById("lg-counter-all").html(
              this.galleryItems.length + ""
            );
          }),
          (e.prototype.getSlideType = function (e) {
            return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
          }),
          (e.prototype.touchMove = function (e, t, i) {
            var s = t.pageX - e.pageX,
              n = t.pageY - e.pageY,
              o = !1;
            if (
              (this.swipeDirection
                ? (o = !0)
                : Math.abs(s) > 15
                ? ((this.swipeDirection = "horizontal"), (o = !0))
                : Math.abs(n) > 15 &&
                  ((this.swipeDirection = "vertical"), (o = !0)),
              o)
            ) {
              var r = this.getSlideItem(this.index);
              if ("horizontal" === this.swipeDirection) {
                null == i || i.preventDefault(),
                  this.outer.addClass("lg-dragging"),
                  this.setTranslate(r, s, 0);
                var a = r.get().offsetWidth,
                  l = (15 * a) / 100 - Math.abs((10 * s) / 100);
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  -a + s - l,
                  0
                ),
                  this.setTranslate(
                    this.outer.find(".lg-next-slide").first(),
                    a + s + l,
                    0
                  );
              } else if (
                "vertical" === this.swipeDirection &&
                this.settings.swipeToClose
              ) {
                null == i || i.preventDefault(),
                  this.$container.addClass("lg-dragging-vertical");
                var d = 1 - Math.abs(n) / window.innerHeight;
                this.$backdrop.css("opacity", d);
                var u = 1 - Math.abs(n) / (2 * window.innerWidth);
                this.setTranslate(r, 0, n, u, u),
                  Math.abs(n) > 100 &&
                    this.outer
                      .addClass("lg-hide-items")
                      .removeClass("lg-components-open");
              }
            }
          }),
          (e.prototype.touchEnd = function (e, t, i) {
            var s,
              n = this;
            "lg-slide" !== this.settings.mode &&
              this.outer.addClass("lg-slide"),
              setTimeout(function () {
                n.$container.removeClass("lg-dragging-vertical"),
                  n.outer
                    .removeClass("lg-dragging lg-hide-items")
                    .addClass("lg-components-open");
                var o = !0;
                if ("horizontal" === n.swipeDirection) {
                  s = e.pageX - t.pageX;
                  var r = Math.abs(e.pageX - t.pageX);
                  s < 0 && r > n.settings.swipeThreshold
                    ? (n.goToNextSlide(!0), (o = !1))
                    : s > 0 &&
                      r > n.settings.swipeThreshold &&
                      (n.goToPrevSlide(!0), (o = !1));
                } else if ("vertical" === n.swipeDirection) {
                  if (
                    ((s = Math.abs(e.pageY - t.pageY)),
                    n.settings.closable && n.settings.swipeToClose && s > 100)
                  )
                    return void n.closeGallery();
                  n.$backdrop.css("opacity", 1);
                }
                if (
                  (n.outer.find(".lg-item").removeAttr("style"),
                  o && Math.abs(e.pageX - t.pageX) < 5)
                ) {
                  var a = fe(i.target);
                  n.isPosterElement(a) && n.LGel.trigger(He);
                }
                n.swipeDirection = void 0;
              }),
              setTimeout(function () {
                n.outer.hasClass("lg-dragging") ||
                  "lg-slide" === n.settings.mode ||
                  n.outer.removeClass("lg-slide");
              }, this.settings.speed + 100);
          }),
          (e.prototype.enableSwipe = function () {
            var e = this,
              t = {},
              i = {},
              s = !1,
              n = !1;
            this.settings.enableSwipe &&
              (this.$inner.on("touchstart.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var s = e.getSlideItem(e.index);
                (!fe(i.target).hasClass("lg-item") &&
                  !s.get().contains(i.target)) ||
                  e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  1 !== i.targetTouches.length ||
                  ((n = !0),
                  (e.touchAction = "swipe"),
                  e.manageSwipeClass(),
                  (t = {
                    pageX: i.targetTouches[0].pageX,
                    pageY: i.targetTouches[0].pageY,
                  }));
              }),
              this.$inner.on("touchmove.lg", function (o) {
                n &&
                  "swipe" === e.touchAction &&
                  1 === o.targetTouches.length &&
                  ((i = {
                    pageX: o.targetTouches[0].pageX,
                    pageY: o.targetTouches[0].pageY,
                  }),
                  e.touchMove(t, i, o),
                  (s = !0));
              }),
              this.$inner.on("touchend.lg", function (o) {
                if ("swipe" === e.touchAction) {
                  if (s) (s = !1), e.touchEnd(i, t, o);
                  else if (n) {
                    var r = fe(o.target);
                    e.isPosterElement(r) && e.LGel.trigger(He);
                  }
                  (e.touchAction = void 0), (n = !1);
                }
              }));
          }),
          (e.prototype.enableDrag = function () {
            var e = this,
              t = {},
              i = {},
              s = !1,
              n = !1;
            this.settings.enableDrag &&
              (this.outer.on("mousedown.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var n = e.getSlideItem(e.index);
                (fe(i.target).hasClass("lg-item") ||
                  n.get().contains(i.target)) &&
                  (e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    (i.preventDefault(),
                    e.lgBusy ||
                      (e.manageSwipeClass(),
                      (t = { pageX: i.pageX, pageY: i.pageY }),
                      (s = !0),
                      (e.outer.get().scrollLeft += 1),
                      (e.outer.get().scrollLeft -= 1),
                      e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      e.LGel.trigger(Ve))));
              }),
              fe(window).on("mousemove.lg.global" + this.lgId, function (o) {
                s &&
                  e.lgOpened &&
                  ((n = !0),
                  (i = { pageX: o.pageX, pageY: o.pageY }),
                  e.touchMove(t, i),
                  e.LGel.trigger(Fe));
              }),
              fe(window).on("mouseup.lg.global" + this.lgId, function (o) {
                if (e.lgOpened) {
                  var r = fe(o.target);
                  n
                    ? ((n = !1), e.touchEnd(i, t, o), e.LGel.trigger(Ne))
                    : e.isPosterElement(r) && e.LGel.trigger(He),
                    s &&
                      ((s = !1),
                      e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                }
              }));
          }),
          (e.prototype.triggerPosterClick = function () {
            var e = this;
            this.$inner.on("click.lg", function (t) {
              !e.dragOrSwipeEnabled &&
                e.isPosterElement(fe(t.target)) &&
                e.LGel.trigger(He);
            });
          }),
          (e.prototype.manageSwipeClass = function () {
            var e = this.index + 1,
              t = this.index - 1;
            this.settings.loop &&
              this.galleryItems.length > 2 &&
              (0 === this.index
                ? (t = this.galleryItems.length - 1)
                : this.index === this.galleryItems.length - 1 && (e = 0)),
              this.outer
                .find(".lg-item")
                .removeClass("lg-next-slide lg-prev-slide"),
              t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
              this.getSlideItem(e).addClass("lg-next-slide");
          }),
          (e.prototype.goToNextSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index + 1 < this.galleryItems.length
                  ? (this.index++,
                    this.LGel.trigger(qe, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : i
                  ? ((this.index = 0),
                    this.LGel.trigger(qe, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
          }),
          (e.prototype.goToPrevSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index > 0
                  ? (this.index--,
                    this.LGel.trigger(Re, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : i
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Re, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
          }),
          (e.prototype.keyPress = function () {
            var e = this;
            fe(window).on("keydown.lg.global" + this.lgId, function (t) {
              e.lgOpened &&
                !0 === e.settings.escKey &&
                27 === t.keyCode &&
                (t.preventDefault(),
                e.settings.allowMediaOverlap &&
                e.outer.hasClass("lg-can-toggle") &&
                e.outer.hasClass("lg-components-open")
                  ? e.outer.removeClass("lg-components-open")
                  : e.closeGallery()),
                e.lgOpened &&
                  e.galleryItems.length > 1 &&
                  (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                  39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
            });
          }),
          (e.prototype.arrow = function () {
            var e = this;
            this.getElementById("lg-prev").on("click.lg", function () {
              e.goToPrevSlide();
            }),
              this.getElementById("lg-next").on("click.lg", function () {
                e.goToNextSlide();
              });
          }),
          (e.prototype.arrowDisable = function (e) {
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
              var t = this.getElementById("lg-prev"),
                i = this.getElementById("lg-next");
              e + 1 === this.galleryItems.length
                ? i.attr("disabled", "disabled").addClass("disabled")
                : i.removeAttr("disabled").removeClass("disabled"),
                0 === e
                  ? t.attr("disabled", "disabled").addClass("disabled")
                  : t.removeAttr("disabled").removeClass("disabled");
            }
          }),
          (e.prototype.setTranslate = function (e, t, i, s, n) {
            void 0 === s && (s = 1),
              void 0 === n && (n = 1),
              e.css(
                "transform",
                "translate3d(" +
                  t +
                  "px, " +
                  i +
                  "px, 0px) scale3d(" +
                  s +
                  ", " +
                  n +
                  ", 1)"
              );
          }),
          (e.prototype.mousewheel = function () {
            var e = this,
              t = 0;
            this.outer.on("wheel.lg", function (i) {
              if (i.deltaY && !(e.galleryItems.length < 2)) {
                i.preventDefault();
                var s = new Date().getTime();
                s - t < 1e3 ||
                  ((t = s),
                  i.deltaY > 0
                    ? e.goToNextSlide()
                    : i.deltaY < 0 && e.goToPrevSlide());
              }
            });
          }),
          (e.prototype.isSlideElement = function (e) {
            return (
              e.hasClass("lg-outer") ||
              e.hasClass("lg-item") ||
              e.hasClass("lg-img-wrap")
            );
          }),
          (e.prototype.isPosterElement = function (e) {
            var t = this.getSlideItem(this.index)
              .find(".lg-video-play-button")
              .get();
            return (
              e.hasClass("lg-video-poster") ||
              e.hasClass("lg-video-play-button") ||
              (t && t.contains(e.get()))
            );
          }),
          (e.prototype.toggleMaximize = function () {
            var e = this;
            this.getElementById("lg-maximize").on("click.lg", function () {
              e.$container.toggleClass("lg-inline"), e.refreshOnResize();
            });
          }),
          (e.prototype.invalidateItems = function () {
            for (var e = 0; e < this.items.length; e++) {
              var t = fe(this.items[e]);
              t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
            }
          }),
          (e.prototype.manageCloseGallery = function () {
            var e = this;
            if (this.settings.closable) {
              var t = !1;
              this.getElementById("lg-close").on("click.lg", function () {
                e.closeGallery();
              }),
                this.settings.closeOnTap &&
                  (this.outer.on("mousedown.lg", function (i) {
                    var s = fe(i.target);
                    t = !!e.isSlideElement(s);
                  }),
                  this.outer.on("mousemove.lg", function () {
                    t = !1;
                  }),
                  this.outer.on("mouseup.lg", function (i) {
                    var s = fe(i.target);
                    e.isSlideElement(s) &&
                      t &&
                      (e.outer.hasClass("lg-dragging") || e.closeGallery());
                  }));
            }
          }),
          (e.prototype.closeGallery = function (e) {
            var t = this;
            if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
            this.LGel.trigger(Xe), fe(window).scrollTop(this.prevScrollTop);
            var i,
              s = this.items[this.index];
            if (this.zoomFromOrigin && s) {
              var n = this.mediaContainerPosition,
                o = n.top,
                r = n.bottom,
                a = this.galleryItems[this.index],
                l = a.__slideVideoInfo,
                d = a.poster,
                u = be(
                  s,
                  this.outer,
                  o + r,
                  l && d && this.settings.videoMaxSize
                );
              i = we(s, this.outer, o, r, u);
            }
            this.zoomFromOrigin && i
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms"
                  )
                  .css("transform", i))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
              this.destroyModules(),
              (this.lGalleryOn = !1),
              (this.isDummyImageRemoved = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              clearTimeout(this.hideBarTimeout),
              (this.hideBarTimeout = !1),
              fe("html").removeClass("lg-on"),
              this.outer.removeClass("lg-visible lg-components-open"),
              this.$backdrop.removeClass("in").css("opacity", 0);
            var c =
              this.zoomFromOrigin && i
                ? Math.max(
                    this.settings.startAnimationDuration,
                    this.settings.backdropDuration
                  )
                : this.settings.backdropDuration;
            return (
              this.$container.removeClass("lg-show-in"),
              setTimeout(function () {
                t.zoomFromOrigin &&
                  i &&
                  t.outer.removeClass("lg-zoom-from-image"),
                  t.$container.removeClass("lg-show"),
                  t.$backdrop
                    .removeAttr("style")
                    .css(
                      "transition-duration",
                      t.settings.backdropDuration + "ms"
                    ),
                  t.outer.removeClass("lg-closing " + t.settings.startClass),
                  t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                  t.$inner.empty(),
                  t.lgOpened && t.LGel.trigger(Ye, { instance: t }),
                  t.outer.get() && t.outer.get().blur(),
                  (t.lgOpened = !1);
              }, c + 100),
              c + 100
            );
          }),
          (e.prototype.initModules = function () {
            this.plugins.forEach(function (e) {
              try {
                e.init();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly initiated"
                );
              }
            });
          }),
          (e.prototype.destroyModules = function (e) {
            this.plugins.forEach(function (t) {
              try {
                e ? t.destroy() : t.closeGallery && t.closeGallery();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly destroyed"
                );
              }
            });
          }),
          (e.prototype.refresh = function (e) {
            this.settings.dynamic || this.invalidateItems(),
              (this.galleryItems = e || this.getItems()),
              this.updateControls(),
              this.openGalleryOnItemClick(),
              this.LGel.trigger(Ae);
          }),
          (e.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems),
              this.updateCounterTotal(),
              this.manageSingleSlideClassName();
          }),
          (e.prototype.destroy = function () {
            var e = this,
              t = this.closeGallery(!0);
            return (
              setTimeout(function () {
                e.destroyModules(!0),
                  e.settings.dynamic || e.invalidateItems(),
                  fe(window).off(".lg.global" + e.lgId),
                  e.LGel.off(".lg"),
                  e.$container.remove();
              }, t),
              t
            );
          }),
          e
        );
      })();
    const Ke = function (e, t) {
      return new Qe(e, t);
    };
    var Je = i(97),
      Ze = i(363);
    const et = document.querySelectorAll("[data-gallery]");
    if (et.length) {
      let e = [];
      et.forEach((t) => {
        e.push({
          gallery: t,
          galleryClass: Ke(t, {
            plugins: [Je, Ze],
            licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
            speed: 500,
          }),
        });
      }),
        (re.gallery = e);
    }
    function tt(e) {
      this.type = e;
    }
    (tt.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          i = t.dataset.da.trim().split(","),
          s = {};
        (s.element = t),
          (s.parent = t.parentNode),
          (s.destination = document.querySelector(i[0].trim())),
          (s.breakpoint = i[1] ? i[1].trim() : "767"),
          (s.place = i[2] ? i[2].trim() : "last"),
          (s.index = this.indexInParent(s.parent, s.element)),
          this.оbjects.push(s);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, i) {
            return Array.prototype.indexOf.call(i, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const i = this.mediaQueries[t],
          s = String.prototype.split.call(i, ","),
          n = window.matchMedia(s[0]),
          o = s[1],
          r = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === o;
          });
        n.addListener(function () {
          e.mediaHandler(n, r);
        }),
          this.mediaHandler(n, r);
      }
    }),
      (tt.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            (i.index = this.indexInParent(i.parent, i.element)),
              this.moveTo(i.place, i.element, i.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const i = t[e];
            i.element.classList.contains(this.daClassname) &&
              this.moveBack(i.parent, i.element, i.index);
          }
      }),
      (tt.prototype.moveTo = function (e, t, i) {
        t.classList.add(this.daClassname),
          "last" === e || e >= i.children.length
            ? i.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? i.children[e].insertAdjacentElement("beforebegin", t)
            : i.insertAdjacentElement("afterbegin", t);
      }),
      (tt.prototype.moveBack = function (e, t, i) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[i]
            ? e.children[i].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (tt.prototype.indexInParent = function (e, t) {
        const i = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(i, t);
      }),
      (tt.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    var it, st;
    new tt("max").init(),
      (it = window),
      (st = function (e, t) {
        function i(i, o, a) {
          function l(e, t, s) {
            var n,
              o = "$()." + i + '("' + t + '")';
            return (
              e.each(function (e, l) {
                var d = a.data(l, i);
                if (d) {
                  var u = d[t];
                  if (u && "_" != t.charAt(0)) {
                    var c = u.apply(d, s);
                    n = void 0 === n ? c : n;
                  } else r(o + " is not a valid method");
                } else r(i + " not initialized. Cannot call methods, i.e. " + o);
              }),
              void 0 !== n ? n : e
            );
          }
          function d(e, t) {
            e.each(function (e, s) {
              var n = a.data(s, i);
              n
                ? (n.option(t), n._init())
                : ((n = new o(s, t)), a.data(s, i, n));
            });
          }
          (a = a || t || e.jQuery) &&
            (o.prototype.option ||
              (o.prototype.option = function (e) {
                a.isPlainObject(e) &&
                  (this.options = a.extend(!0, this.options, e));
              }),
            (a.fn[i] = function (e) {
              if ("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t);
              }
              return d(this, e), this;
            }),
            s(a));
        }
        function s(e) {
          !e || (e && e.bridget) || (e.bridget = i);
        }
        var n = Array.prototype.slice,
          o = e.console,
          r =
            void 0 === o
              ? function () {}
              : function (e) {
                  o.error(e);
                };
        return s(t || e.jQuery), i;
      }),
      "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (e) {
            return st(it, e);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = st(it, require("jquery")))
        : (it.jQueryBridget = st(it, it.jQuery)),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define("ev-emitter/ev-emitter", t)
          : "object" == typeof module && module.exports
          ? (module.exports = t())
          : (e.EvEmitter = t());
      })("undefined" != typeof window ? window : void 0, function () {
        function e() {}
        var t = e.prototype;
        return (
          (t.on = function (e, t) {
            if (e && t) {
              var i = (this._events = this._events || {}),
                s = (i[e] = i[e] || []);
              return -1 == s.indexOf(t) && s.push(t), this;
            }
          }),
          (t.once = function (e, t) {
            if (e && t) {
              this.on(e, t);
              var i = (this._onceEvents = this._onceEvents || {});
              return ((i[e] = i[e] || {})[t] = !0), this;
            }
          }),
          (t.off = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
              var s = i.indexOf(t);
              return -1 != s && i.splice(s, 1), this;
            }
          }),
          (t.emitEvent = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
              (i = i.slice(0)), (t = t || []);
              for (
                var s = this._onceEvents && this._onceEvents[e], n = 0;
                n < i.length;
                n++
              ) {
                var o = i[n];
                s && s[o] && (this.off(e, o), delete s[o]), o.apply(this, t);
              }
              return this;
            }
          }),
          (t.allOff = function () {
            delete this._events, delete this._onceEvents;
          }),
          e
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define("get-size/get-size", t)
          : "object" == typeof module && module.exports
          ? (module.exports = t())
          : (e.getSize = t());
      })(window, function () {
        function e(e) {
          var t = parseFloat(e);
          return -1 == e.indexOf("%") && !isNaN(t) && t;
        }
        function t(e) {
          var t = getComputedStyle(e);
          return (
            t ||
              o(
                "Style returned " +
                  t +
                  ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
              ),
            t
          );
        }
        function i() {
          if (!l) {
            l = !0;
            var i = document.createElement("div");
            (i.style.width = "200px"),
              (i.style.padding = "1px 2px 3px 4px"),
              (i.style.borderStyle = "solid"),
              (i.style.borderWidth = "1px 2px 3px 4px"),
              (i.style.boxSizing = "border-box");
            var o = document.body || document.documentElement;
            o.appendChild(i);
            var r = t(i);
            (n = 200 == Math.round(e(r.width))),
              (s.isBoxSizeOuter = n),
              o.removeChild(i);
          }
        }
        function s(s) {
          if (
            (i(),
            "string" == typeof s && (s = document.querySelector(s)),
            s && "object" == typeof s && s.nodeType)
          ) {
            var o = t(s);
            if ("none" == o.display)
              return (function () {
                for (
                  var e = {
                      width: 0,
                      height: 0,
                      innerWidth: 0,
                      innerHeight: 0,
                      outerWidth: 0,
                      outerHeight: 0,
                    },
                    t = 0;
                  t < a;
                  t++
                )
                  e[r[t]] = 0;
                return e;
              })();
            var l = {};
            (l.width = s.offsetWidth), (l.height = s.offsetHeight);
            for (
              var d = (l.isBorderBox = "border-box" == o.boxSizing), u = 0;
              u < a;
              u++
            ) {
              var c = r[u],
                h = o[c],
                p = parseFloat(h);
              l[c] = isNaN(p) ? 0 : p;
            }
            var m = l.paddingLeft + l.paddingRight,
              g = l.paddingTop + l.paddingBottom,
              f = l.marginLeft + l.marginRight,
              v = l.marginTop + l.marginBottom,
              y = l.borderLeftWidth + l.borderRightWidth,
              b = l.borderTopWidth + l.borderBottomWidth,
              w = d && n,
              C = e(o.width);
            !1 !== C && (l.width = C + (w ? 0 : m + y));
            var T = e(o.height);
            return (
              !1 !== T && (l.height = T + (w ? 0 : g + b)),
              (l.innerWidth = l.width - (m + y)),
              (l.innerHeight = l.height - (g + b)),
              (l.outerWidth = l.width + f),
              (l.outerHeight = l.height + v),
              l
            );
          }
        }
        var n,
          o =
            "undefined" == typeof console
              ? function () {}
              : function (e) {
                  console.error(e);
                },
          r = [
            "paddingLeft",
            "paddingRight",
            "paddingTop",
            "paddingBottom",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
            "borderLeftWidth",
            "borderRightWidth",
            "borderTopWidth",
            "borderBottomWidth",
          ],
          a = r.length,
          l = !1;
        return s;
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define("desandro-matches-selector/matches-selector", t)
          : "object" == typeof module && module.exports
          ? (module.exports = t())
          : (e.matchesSelector = t());
      })(window, function () {
        var e = (function () {
          var e = window.Element.prototype;
          if (e.matches) return "matches";
          if (e.matchesSelector) return "matchesSelector";
          for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var s = t[i] + "MatchesSelector";
            if (e[s]) return s;
          }
        })();
        return function (t, i) {
          return t[e](i);
        };
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "fizzy-ui-utils/utils",
              ["desandro-matches-selector/matches-selector"],
              function (i) {
                return t(e, i);
              }
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(e, require("desandro-matches-selector")))
          : (e.fizzyUIUtils = t(e, e.matchesSelector));
      })(window, function (e, t) {
        var i = {
            extend: function (e, t) {
              for (var i in t) e[i] = t[i];
              return e;
            },
            modulo: function (e, t) {
              return ((e % t) + t) % t;
            },
          },
          s = Array.prototype.slice;
        (i.makeArray = function (e) {
          return Array.isArray(e)
            ? e
            : null == e
            ? []
            : "object" == typeof e && "number" == typeof e.length
            ? s.call(e)
            : [e];
        }),
          (i.removeFrom = function (e, t) {
            var i = e.indexOf(t);
            -1 != i && e.splice(i, 1);
          }),
          (i.getParent = function (e, i) {
            for (; e.parentNode && e != document.body; )
              if (((e = e.parentNode), t(e, i))) return e;
          }),
          (i.getQueryElement = function (e) {
            return "string" == typeof e ? document.querySelector(e) : e;
          }),
          (i.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e);
          }),
          (i.filterFindElements = function (e, s) {
            e = i.makeArray(e);
            var n = [];
            return (
              e.forEach(function (e) {
                if (e instanceof HTMLElement) {
                  if (!s) return void n.push(e);
                  t(e, s) && n.push(e);
                  for (var i = e.querySelectorAll(s), o = 0; o < i.length; o++)
                    n.push(i[o]);
                }
              }),
              n
            );
          }),
          (i.debounceMethod = function (e, t, i) {
            i = i || 100;
            var s = e.prototype[t],
              n = t + "Timeout";
            e.prototype[t] = function () {
              var e = this[n];
              clearTimeout(e);
              var t = arguments,
                o = this;
              this[n] = setTimeout(function () {
                s.apply(o, t), delete o[n];
              }, i);
            };
          }),
          (i.docReady = function (e) {
            var t = document.readyState;
            "complete" == t || "interactive" == t
              ? setTimeout(e)
              : document.addEventListener("DOMContentLoaded", e);
          }),
          (i.toDashed = function (e) {
            return e
              .replace(/(.)([A-Z])/g, function (e, t, i) {
                return t + "-" + i;
              })
              .toLowerCase();
          });
        var n = e.console;
        return (
          (i.htmlInit = function (t, s) {
            i.docReady(function () {
              var o = i.toDashed(s),
                r = "data-" + o,
                a = document.querySelectorAll("[" + r + "]"),
                l = document.querySelectorAll(".js-" + o),
                d = i.makeArray(a).concat(i.makeArray(l)),
                u = r + "-options",
                c = e.jQuery;
              d.forEach(function (e) {
                var i,
                  o = e.getAttribute(r) || e.getAttribute(u);
                try {
                  i = o && JSON.parse(o);
                } catch (t) {
                  return void (
                    n &&
                    n.error(
                      "Error parsing " + r + " on " + e.className + ": " + t
                    )
                  );
                }
                var a = new t(e, i);
                c && c.data(e, s, a);
              });
            });
          }),
          i
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "outlayer/item",
              ["ev-emitter/ev-emitter", "get-size/get-size"],
              t
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(require("ev-emitter"), require("get-size")))
          : ((e.Outlayer = {}), (e.Outlayer.Item = t(e.EvEmitter, e.getSize)));
      })(window, function (e, t) {
        function i(e, t) {
          e &&
            ((this.element = e),
            (this.layout = t),
            (this.position = { x: 0, y: 0 }),
            this._create());
        }
        var s = document.documentElement.style,
          n =
            "string" == typeof s.transition ? "transition" : "WebkitTransition",
          o = "string" == typeof s.transform ? "transform" : "WebkitTransform",
          r = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend",
          }[n],
          a = {
            transform: o,
            transition: n,
            transitionDuration: n + "Duration",
            transitionProperty: n + "Property",
            transitionDelay: n + "Delay",
          },
          l = (i.prototype = Object.create(e.prototype));
        (l.constructor = i),
          (l._create = function () {
            (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
              this.css({ position: "absolute" });
          }),
          (l.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e);
          }),
          (l.getSize = function () {
            this.size = t(this.element);
          }),
          (l.css = function (e) {
            var t = this.element.style;
            for (var i in e) {
              t[a[i] || i] = e[i];
            }
          }),
          (l.getPosition = function () {
            var e = getComputedStyle(this.element),
              t = this.layout._getOption("originLeft"),
              i = this.layout._getOption("originTop"),
              s = e[t ? "left" : "right"],
              n = e[i ? "top" : "bottom"],
              o = parseFloat(s),
              r = parseFloat(n),
              a = this.layout.size;
            -1 != s.indexOf("%") && (o = (o / 100) * a.width),
              -1 != n.indexOf("%") && (r = (r / 100) * a.height),
              (o = isNaN(o) ? 0 : o),
              (r = isNaN(r) ? 0 : r),
              (o -= t ? a.paddingLeft : a.paddingRight),
              (r -= i ? a.paddingTop : a.paddingBottom),
              (this.position.x = o),
              (this.position.y = r);
          }),
          (l.layoutPosition = function () {
            var e = this.layout.size,
              t = {},
              i = this.layout._getOption("originLeft"),
              s = this.layout._getOption("originTop"),
              n = i ? "paddingLeft" : "paddingRight",
              o = i ? "left" : "right",
              r = i ? "right" : "left",
              a = this.position.x + e[n];
            (t[o] = this.getXValue(a)), (t[r] = "");
            var l = s ? "paddingTop" : "paddingBottom",
              d = s ? "top" : "bottom",
              u = s ? "bottom" : "top",
              c = this.position.y + e[l];
            (t[d] = this.getYValue(c)),
              (t[u] = ""),
              this.css(t),
              this.emitEvent("layout", [this]);
          }),
          (l.getXValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !t
              ? (e / this.layout.size.width) * 100 + "%"
              : e + "px";
          }),
          (l.getYValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && t
              ? (e / this.layout.size.height) * 100 + "%"
              : e + "px";
          }),
          (l._transitionTo = function (e, t) {
            this.getPosition();
            var i = this.position.x,
              s = this.position.y,
              n = e == this.position.x && t == this.position.y;
            if ((this.setPosition(e, t), !n || this.isTransitioning)) {
              var o = e - i,
                r = t - s,
                a = {};
              (a.transform = this.getTranslate(o, r)),
                this.transition({
                  to: a,
                  onTransitionEnd: { transform: this.layoutPosition },
                  isCleaning: !0,
                });
            } else this.layoutPosition();
          }),
          (l.getTranslate = function (e, t) {
            return (
              "translate3d(" +
              (e = this.layout._getOption("originLeft") ? e : -e) +
              "px, " +
              (t = this.layout._getOption("originTop") ? t : -t) +
              "px, 0)"
            );
          }),
          (l.goTo = function (e, t) {
            this.setPosition(e, t), this.layoutPosition();
          }),
          (l.moveTo = l._transitionTo),
          (l.setPosition = function (e, t) {
            (this.position.x = parseFloat(e)),
              (this.position.y = parseFloat(t));
          }),
          (l._nonTransition = function (e) {
            for (var t in (this.css(e.to),
            e.isCleaning && this._removeStyles(e.to),
            e.onTransitionEnd))
              e.onTransitionEnd[t].call(this);
          }),
          (l.transition = function (e) {
            if (parseFloat(this.layout.options.transitionDuration)) {
              var t = this._transn;
              for (var i in e.onTransitionEnd)
                t.onEnd[i] = e.onTransitionEnd[i];
              for (i in e.to)
                (t.ingProperties[i] = !0), e.isCleaning && (t.clean[i] = !0);
              if (e.from) {
                this.css(e.from);
                this.element.offsetHeight;
                null;
              }
              this.enableTransition(e.to),
                this.css(e.to),
                (this.isTransitioning = !0);
            } else this._nonTransition(e);
          });
        var d =
          "opacity," +
          (function (e) {
            return e.replace(/([A-Z])/g, function (e) {
              return "-" + e.toLowerCase();
            });
          })(o);
        (l.enableTransition = function () {
          if (!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            (e = "number" == typeof e ? e + "ms" : e),
              this.css({
                transitionProperty: d,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0,
              }),
              this.element.addEventListener(r, this, !1);
          }
        }),
          (l.onwebkitTransitionEnd = function (e) {
            this.ontransitionend(e);
          }),
          (l.onotransitionend = function (e) {
            this.ontransitionend(e);
          });
        var u = { "-webkit-transform": "transform" };
        (l.ontransitionend = function (e) {
          if (e.target === this.element) {
            var t = this._transn,
              i = u[e.propertyName] || e.propertyName;
            if (
              (delete t.ingProperties[i],
              (function (e) {
                for (var t in e) return !1;
                return !0;
              })(t.ingProperties) && this.disableTransition(),
              i in t.clean &&
                ((this.element.style[e.propertyName] = ""), delete t.clean[i]),
              i in t.onEnd)
            )
              t.onEnd[i].call(this), delete t.onEnd[i];
            this.emitEvent("transitionEnd", [this]);
          }
        }),
          (l.disableTransition = function () {
            this.removeTransitionStyles(),
              this.element.removeEventListener(r, this, !1),
              (this.isTransitioning = !1);
          }),
          (l._removeStyles = function (e) {
            var t = {};
            for (var i in e) t[i] = "";
            this.css(t);
          });
        var c = {
          transitionProperty: "",
          transitionDuration: "",
          transitionDelay: "",
        };
        return (
          (l.removeTransitionStyles = function () {
            this.css(c);
          }),
          (l.stagger = function (e) {
            (e = isNaN(e) ? 0 : e), (this.staggerDelay = e + "ms");
          }),
          (l.removeElem = function () {
            this.element.parentNode.removeChild(this.element),
              this.css({ display: "" }),
              this.emitEvent("remove", [this]);
          }),
          (l.remove = function () {
            return n && parseFloat(this.layout.options.transitionDuration)
              ? (this.once("transitionEnd", function () {
                  this.removeElem();
                }),
                void this.hide())
              : void this.removeElem();
          }),
          (l.reveal = function () {
            delete this.isHidden, this.css({ display: "" });
            var e = this.layout.options,
              t = {};
            (t[this.getHideRevealTransitionEndProperty("visibleStyle")] =
              this.onRevealTransitionEnd),
              this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t,
              });
          }),
          (l.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal");
          }),
          (l.getHideRevealTransitionEndProperty = function (e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var i in t) return i;
          }),
          (l.hide = function () {
            (this.isHidden = !0), this.css({ display: "" });
            var e = this.layout.options,
              t = {};
            (t[this.getHideRevealTransitionEndProperty("hiddenStyle")] =
              this.onHideTransitionEnd),
              this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t,
              });
          }),
          (l.onHideTransitionEnd = function () {
            this.isHidden &&
              (this.css({ display: "none" }), this.emitEvent("hide"));
          }),
          (l.destroy = function () {
            this.css({
              position: "",
              left: "",
              right: "",
              top: "",
              bottom: "",
              transition: "",
              transform: "",
            });
          }),
          i
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "outlayer/outlayer",
              [
                "ev-emitter/ev-emitter",
                "get-size/get-size",
                "fizzy-ui-utils/utils",
                "./item",
              ],
              function (i, s, n, o) {
                return t(e, i, s, n, o);
              }
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(
              e,
              require("ev-emitter"),
              require("get-size"),
              require("fizzy-ui-utils"),
              require("./item")
            ))
          : (e.Outlayer = t(
              e,
              e.EvEmitter,
              e.getSize,
              e.fizzyUIUtils,
              e.Outlayer.Item
            ));
      })(window, function (e, t, i, s, n) {
        function o(e, t) {
          var i = s.getQueryElement(e);
          if (i) {
            (this.element = i),
              l && (this.$element = l(this.element)),
              (this.options = s.extend({}, this.constructor.defaults)),
              this.option(t);
            var n = ++u;
            (this.element.outlayerGUID = n),
              (c[n] = this),
              this._create(),
              this._getOption("initLayout") && this.layout();
          } else a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || e));
        }
        function r(e) {
          function t() {
            e.apply(this, arguments);
          }
          return (
            (t.prototype = Object.create(e.prototype)),
            (t.prototype.constructor = t),
            t
          );
        }
        var a = e.console,
          l = e.jQuery,
          d = function () {},
          u = 0,
          c = {};
        (o.namespace = "outlayer"),
          (o.Item = n),
          (o.defaults = {
            containerStyle: { position: "relative" },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
            visibleStyle: { opacity: 1, transform: "scale(1)" },
          });
        var h = o.prototype;
        s.extend(h, t.prototype),
          (h.option = function (e) {
            s.extend(this.options, e);
          }),
          (h._getOption = function (e) {
            var t = this.constructor.compatOptions[e];
            return t && void 0 !== this.options[t]
              ? this.options[t]
              : this.options[e];
          }),
          (o.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer",
          }),
          (h._create = function () {
            this.reloadItems(),
              (this.stamps = []),
              this.stamp(this.options.stamp),
              s.extend(this.element.style, this.options.containerStyle),
              this._getOption("resize") && this.bindResize();
          }),
          (h.reloadItems = function () {
            this.items = this._itemize(this.element.children);
          }),
          (h._itemize = function (e) {
            for (
              var t = this._filterFindItemElements(e),
                i = this.constructor.Item,
                s = [],
                n = 0;
              n < t.length;
              n++
            ) {
              var o = new i(t[n], this);
              s.push(o);
            }
            return s;
          }),
          (h._filterFindItemElements = function (e) {
            return s.filterFindElements(e, this.options.itemSelector);
          }),
          (h.getItemElements = function () {
            return this.items.map(function (e) {
              return e.element;
            });
          }),
          (h.layout = function () {
            this._resetLayout(), this._manageStamps();
            var e = this._getOption("layoutInstant"),
              t = void 0 !== e ? e : !this._isLayoutInited;
            this.layoutItems(this.items, t), (this._isLayoutInited = !0);
          }),
          (h._init = h.layout),
          (h._resetLayout = function () {
            this.getSize();
          }),
          (h.getSize = function () {
            this.size = i(this.element);
          }),
          (h._getMeasurement = function (e, t) {
            var s,
              n = this.options[e];
            n
              ? ("string" == typeof n
                  ? (s = this.element.querySelector(n))
                  : n instanceof HTMLElement && (s = n),
                (this[e] = s ? i(s)[t] : n))
              : (this[e] = 0);
          }),
          (h.layoutItems = function (e, t) {
            (e = this._getItemsForLayout(e)),
              this._layoutItems(e, t),
              this._postLayout();
          }),
          (h._getItemsForLayout = function (e) {
            return e.filter(function (e) {
              return !e.isIgnored;
            });
          }),
          (h._layoutItems = function (e, t) {
            if ((this._emitCompleteOnItems("layout", e), e && e.length)) {
              var i = [];
              e.forEach(function (e) {
                var s = this._getItemLayoutPosition(e);
                (s.item = e), (s.isInstant = t || e.isLayoutInstant), i.push(s);
              }, this),
                this._processLayoutQueue(i);
            }
          }),
          (h._getItemLayoutPosition = function () {
            return { x: 0, y: 0 };
          }),
          (h._processLayoutQueue = function (e) {
            this.updateStagger(),
              e.forEach(function (e, t) {
                this._positionItem(e.item, e.x, e.y, e.isInstant, t);
              }, this);
          }),
          (h.updateStagger = function () {
            var e = this.options.stagger;
            return null == e
              ? void (this.stagger = 0)
              : ((this.stagger = (function (e) {
                  if ("number" == typeof e) return e;
                  var t = e.match(/(^\d*\.?\d*)(\w*)/),
                    i = t && t[1],
                    s = t && t[2];
                  return i.length ? (i = parseFloat(i)) * (p[s] || 1) : 0;
                })(e)),
                this.stagger);
          }),
          (h._positionItem = function (e, t, i, s, n) {
            s ? e.goTo(t, i) : (e.stagger(n * this.stagger), e.moveTo(t, i));
          }),
          (h._postLayout = function () {
            this.resizeContainer();
          }),
          (h.resizeContainer = function () {
            if (this._getOption("resizeContainer")) {
              var e = this._getContainerSize();
              e &&
                (this._setContainerMeasure(e.width, !0),
                this._setContainerMeasure(e.height, !1));
            }
          }),
          (h._getContainerSize = d),
          (h._setContainerMeasure = function (e, t) {
            if (void 0 !== e) {
              var i = this.size;
              i.isBorderBox &&
                (e += t
                  ? i.paddingLeft +
                    i.paddingRight +
                    i.borderLeftWidth +
                    i.borderRightWidth
                  : i.paddingBottom +
                    i.paddingTop +
                    i.borderTopWidth +
                    i.borderBottomWidth),
                (e = Math.max(e, 0)),
                (this.element.style[t ? "width" : "height"] = e + "px");
            }
          }),
          (h._emitCompleteOnItems = function (e, t) {
            function i() {
              n.dispatchEvent(e + "Complete", null, [t]);
            }
            function s() {
              ++r == o && i();
            }
            var n = this,
              o = t.length;
            if (t && o) {
              var r = 0;
              t.forEach(function (t) {
                t.once(e, s);
              });
            } else i();
          }),
          (h.dispatchEvent = function (e, t, i) {
            var s = t ? [t].concat(i) : i;
            if ((this.emitEvent(e, s), l))
              if (((this.$element = this.$element || l(this.element)), t)) {
                var n = l.Event(t);
                (n.type = e), this.$element.trigger(n, i);
              } else this.$element.trigger(e, i);
          }),
          (h.ignore = function (e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0);
          }),
          (h.unignore = function (e) {
            var t = this.getItem(e);
            t && delete t.isIgnored;
          }),
          (h.stamp = function (e) {
            (e = this._find(e)) &&
              ((this.stamps = this.stamps.concat(e)),
              e.forEach(this.ignore, this));
          }),
          (h.unstamp = function (e) {
            (e = this._find(e)) &&
              e.forEach(function (e) {
                s.removeFrom(this.stamps, e), this.unignore(e);
              }, this);
          }),
          (h._find = function (e) {
            if (e)
              return (
                "string" == typeof e && (e = this.element.querySelectorAll(e)),
                s.makeArray(e)
              );
          }),
          (h._manageStamps = function () {
            this.stamps &&
              this.stamps.length &&
              (this._getBoundingRect(),
              this.stamps.forEach(this._manageStamp, this));
          }),
          (h._getBoundingRect = function () {
            var e = this.element.getBoundingClientRect(),
              t = this.size;
            this._boundingRect = {
              left: e.left + t.paddingLeft + t.borderLeftWidth,
              top: e.top + t.paddingTop + t.borderTopWidth,
              right: e.right - (t.paddingRight + t.borderRightWidth),
              bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth),
            };
          }),
          (h._manageStamp = d),
          (h._getElementOffset = function (e) {
            var t = e.getBoundingClientRect(),
              s = this._boundingRect,
              n = i(e);
            return {
              left: t.left - s.left - n.marginLeft,
              top: t.top - s.top - n.marginTop,
              right: s.right - t.right - n.marginRight,
              bottom: s.bottom - t.bottom - n.marginBottom,
            };
          }),
          (h.handleEvent = s.handleEvent),
          (h.bindResize = function () {
            e.addEventListener("resize", this), (this.isResizeBound = !0);
          }),
          (h.unbindResize = function () {
            e.removeEventListener("resize", this), (this.isResizeBound = !1);
          }),
          (h.onresize = function () {
            this.resize();
          }),
          s.debounceMethod(o, "onresize", 100),
          (h.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
          }),
          (h.needsResizeLayout = function () {
            var e = i(this.element);
            return this.size && e && e.innerWidth !== this.size.innerWidth;
          }),
          (h.addItems = function (e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t;
          }),
          (h.appended = function (e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t));
          }),
          (h.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
              var i = this.items.slice(0);
              (this.items = t.concat(i)),
                this._resetLayout(),
                this._manageStamps(),
                this.layoutItems(t, !0),
                this.reveal(t),
                this.layoutItems(i);
            }
          }),
          (h.reveal = function (e) {
            if ((this._emitCompleteOnItems("reveal", e), e && e.length)) {
              var t = this.updateStagger();
              e.forEach(function (e, i) {
                e.stagger(i * t), e.reveal();
              });
            }
          }),
          (h.hide = function (e) {
            if ((this._emitCompleteOnItems("hide", e), e && e.length)) {
              var t = this.updateStagger();
              e.forEach(function (e, i) {
                e.stagger(i * t), e.hide();
              });
            }
          }),
          (h.revealItemElements = function (e) {
            var t = this.getItems(e);
            this.reveal(t);
          }),
          (h.hideItemElements = function (e) {
            var t = this.getItems(e);
            this.hide(t);
          }),
          (h.getItem = function (e) {
            for (var t = 0; t < this.items.length; t++) {
              var i = this.items[t];
              if (i.element == e) return i;
            }
          }),
          (h.getItems = function (e) {
            e = s.makeArray(e);
            var t = [];
            return (
              e.forEach(function (e) {
                var i = this.getItem(e);
                i && t.push(i);
              }, this),
              t
            );
          }),
          (h.remove = function (e) {
            var t = this.getItems(e);
            this._emitCompleteOnItems("remove", t),
              t &&
                t.length &&
                t.forEach(function (e) {
                  e.remove(), s.removeFrom(this.items, e);
                }, this);
          }),
          (h.destroy = function () {
            var e = this.element.style;
            (e.height = ""),
              (e.position = ""),
              (e.width = ""),
              this.items.forEach(function (e) {
                e.destroy();
              }),
              this.unbindResize();
            var t = this.element.outlayerGUID;
            delete c[t],
              delete this.element.outlayerGUID,
              l && l.removeData(this.element, this.constructor.namespace);
          }),
          (o.data = function (e) {
            var t = (e = s.getQueryElement(e)) && e.outlayerGUID;
            return t && c[t];
          }),
          (o.create = function (e, t) {
            var i = r(o);
            return (
              (i.defaults = s.extend({}, o.defaults)),
              s.extend(i.defaults, t),
              (i.compatOptions = s.extend({}, o.compatOptions)),
              (i.namespace = e),
              (i.data = o.data),
              (i.Item = r(n)),
              s.htmlInit(i, e),
              l && l.bridget && l.bridget(e, i),
              i
            );
          });
        var p = { ms: 1, s: 1e3 };
        return (o.Item = n), o;
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define("isotope-layout/js/item", ["outlayer/outlayer"], t)
          : "object" == typeof module && module.exports
          ? (module.exports = t(require("outlayer")))
          : ((e.Isotope = e.Isotope || {}), (e.Isotope.Item = t(e.Outlayer)));
      })(window, function (e) {
        function t() {
          e.Item.apply(this, arguments);
        }
        var i = (t.prototype = Object.create(e.Item.prototype)),
          s = i._create;
        (i._create = function () {
          (this.id = this.layout.itemGUID++),
            s.call(this),
            (this.sortData = {});
        }),
          (i.updateSortData = function () {
            if (!this.isIgnored) {
              (this.sortData.id = this.id),
                (this.sortData["original-order"] = this.id),
                (this.sortData.random = Math.random());
              var e = this.layout.options.getSortData,
                t = this.layout._sorters;
              for (var i in e) {
                var s = t[i];
                this.sortData[i] = s(this.element, this);
              }
            }
          });
        var n = i.destroy;
        return (
          (i.destroy = function () {
            n.apply(this, arguments), this.css({ display: "" });
          }),
          t
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "isotope-layout/js/layout-mode",
              ["get-size/get-size", "outlayer/outlayer"],
              t
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(require("get-size"), require("outlayer")))
          : ((e.Isotope = e.Isotope || {}),
            (e.Isotope.LayoutMode = t(e.getSize, e.Outlayer)));
      })(window, function (e, t) {
        function i(e) {
          (this.isotope = e),
            e &&
              ((this.options = e.options[this.namespace]),
              (this.element = e.element),
              (this.items = e.filteredItems),
              (this.size = e.size));
        }
        var s = i.prototype;
        return (
          [
            "_resetLayout",
            "_getItemLayoutPosition",
            "_manageStamp",
            "_getContainerSize",
            "_getElementOffset",
            "needsResizeLayout",
            "_getOption",
          ].forEach(function (e) {
            s[e] = function () {
              return t.prototype[e].apply(this.isotope, arguments);
            };
          }),
          (s.needsVerticalResizeLayout = function () {
            var t = e(this.isotope.element);
            return (
              this.isotope.size &&
              t &&
              t.innerHeight != this.isotope.size.innerHeight
            );
          }),
          (s._getMeasurement = function () {
            this.isotope._getMeasurement.apply(this, arguments);
          }),
          (s.getColumnWidth = function () {
            this.getSegmentSize("column", "Width");
          }),
          (s.getRowHeight = function () {
            this.getSegmentSize("row", "Height");
          }),
          (s.getSegmentSize = function (e, t) {
            var i = e + t,
              s = "outer" + t;
            if ((this._getMeasurement(i, s), !this[i])) {
              var n = this.getFirstItemSize();
              this[i] = (n && n[s]) || this.isotope.size["inner" + t];
            }
          }),
          (s.getFirstItemSize = function () {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element);
          }),
          (s.layout = function () {
            this.isotope.layout.apply(this.isotope, arguments);
          }),
          (s.getSize = function () {
            this.isotope.getSize(), (this.size = this.isotope.size);
          }),
          (i.modes = {}),
          (i.create = function (e, t) {
            function n() {
              i.apply(this, arguments);
            }
            return (
              (n.prototype = Object.create(s)),
              (n.prototype.constructor = n),
              t && (n.options = t),
              (n.prototype.namespace = e),
              (i.modes[e] = n),
              n
            );
          }),
          i
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "masonry-layout/masonry",
              ["outlayer/outlayer", "get-size/get-size"],
              t
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(require("outlayer"), require("get-size")))
          : (e.Masonry = t(e.Outlayer, e.getSize));
      })(window, function (e, t) {
        var i = e.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var s = i.prototype;
        return (
          (s._resetLayout = function () {
            this.getSize(),
              this._getMeasurement("columnWidth", "outerWidth"),
              this._getMeasurement("gutter", "outerWidth"),
              this.measureColumns(),
              (this.colYs = []);
            for (var e = 0; e < this.cols; e++) this.colYs.push(0);
            (this.maxY = 0), (this.horizontalColIndex = 0);
          }),
          (s.measureColumns = function () {
            if ((this.getContainerWidth(), !this.columnWidth)) {
              var e = this.items[0],
                i = e && e.element;
              this.columnWidth = (i && t(i).outerWidth) || this.containerWidth;
            }
            var s = (this.columnWidth += this.gutter),
              n = this.containerWidth + this.gutter,
              o = n / s,
              r = s - (n % s);
            (o = Math[r && r < 1 ? "round" : "floor"](o)),
              (this.cols = Math.max(o, 1));
          }),
          (s.getContainerWidth = function () {
            var e = this._getOption("fitWidth")
                ? this.element.parentNode
                : this.element,
              i = t(e);
            this.containerWidth = i && i.innerWidth;
          }),
          (s._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth,
              i = Math[t && t < 1 ? "round" : "ceil"](
                e.size.outerWidth / this.columnWidth
              );
            i = Math.min(i, this.cols);
            for (
              var s = this[
                  this.options.horizontalOrder
                    ? "_getHorizontalColPosition"
                    : "_getTopColPosition"
                ](i, e),
                n = { x: this.columnWidth * s.col, y: s.y },
                o = s.y + e.size.outerHeight,
                r = i + s.col,
                a = s.col;
              a < r;
              a++
            )
              this.colYs[a] = o;
            return n;
          }),
          (s._getTopColPosition = function (e) {
            var t = this._getTopColGroup(e),
              i = Math.min.apply(Math, t);
            return { col: t.indexOf(i), y: i };
          }),
          (s._getTopColGroup = function (e) {
            if (e < 2) return this.colYs;
            for (var t = [], i = this.cols + 1 - e, s = 0; s < i; s++)
              t[s] = this._getColGroupY(s, e);
            return t;
          }),
          (s._getColGroupY = function (e, t) {
            if (t < 2) return this.colYs[e];
            var i = this.colYs.slice(e, e + t);
            return Math.max.apply(Math, i);
          }),
          (s._getHorizontalColPosition = function (e, t) {
            var i = this.horizontalColIndex % this.cols;
            i = e > 1 && i + e > this.cols ? 0 : i;
            var s = t.size.outerWidth && t.size.outerHeight;
            return (
              (this.horizontalColIndex = s ? i + e : this.horizontalColIndex),
              { col: i, y: this._getColGroupY(i, e) }
            );
          }),
          (s._manageStamp = function (e) {
            var i = t(e),
              s = this._getElementOffset(e),
              n = this._getOption("originLeft") ? s.left : s.right,
              o = n + i.outerWidth,
              r = Math.floor(n / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(o / this.columnWidth);
            (a -= o % this.columnWidth ? 0 : 1),
              (a = Math.min(this.cols - 1, a));
            for (
              var l =
                  (this._getOption("originTop") ? s.top : s.bottom) +
                  i.outerHeight,
                d = r;
              d <= a;
              d++
            )
              this.colYs[d] = Math.max(l, this.colYs[d]);
          }),
          (s._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = { height: this.maxY };
            return (
              this._getOption("fitWidth") &&
                (e.width = this._getContainerFitWidth()),
              e
            );
          }),
          (s._getContainerFitWidth = function () {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t]; ) e++;
            return (this.cols - e) * this.columnWidth - this.gutter;
          }),
          (s.needsResizeLayout = function () {
            var e = this.containerWidth;
            return this.getContainerWidth(), e != this.containerWidth;
          }),
          i
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "isotope-layout/js/layout-modes/masonry",
              ["../layout-mode", "masonry-layout/masonry"],
              t
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(
              require("../layout-mode"),
              require("masonry-layout")
            ))
          : t(e.Isotope.LayoutMode, e.Masonry);
      })(window, function (e, t) {
        var i = e.create("masonry"),
          s = i.prototype,
          n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
        for (var o in t.prototype) n[o] || (s[o] = t.prototype[o]);
        var r = s.measureColumns;
        s.measureColumns = function () {
          (this.items = this.isotope.filteredItems), r.call(this);
        };
        var a = s._getOption;
        return (
          (s._getOption = function (e) {
            return "fitWidth" == e
              ? void 0 !== this.options.isFitWidth
                ? this.options.isFitWidth
                : this.options.fitWidth
              : a.apply(this.isotope, arguments);
          }),
          i
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "isotope-layout/js/layout-modes/fit-rows",
              ["../layout-mode"],
              t
            )
          : "object" == typeof exports
          ? (module.exports = t(require("../layout-mode")))
          : t(e.Isotope.LayoutMode);
      })(window, function (e) {
        var t = e.create("fitRows"),
          i = t.prototype;
        return (
          (i._resetLayout = function () {
            (this.x = 0),
              (this.y = 0),
              (this.maxY = 0),
              this._getMeasurement("gutter", "outerWidth");
          }),
          (i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter,
              i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x &&
              t + this.x > i &&
              ((this.x = 0), (this.y = this.maxY));
            var s = { x: this.x, y: this.y };
            return (
              (this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight)),
              (this.x += t),
              s
            );
          }),
          (i._getContainerSize = function () {
            return { height: this.maxY };
          }),
          t
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              "isotope-layout/js/layout-modes/vertical",
              ["../layout-mode"],
              t
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(require("../layout-mode")))
          : t(e.Isotope.LayoutMode);
      })(window, function (e) {
        var t = e.create("vertical", { horizontalAlignment: 0 }),
          i = t.prototype;
        return (
          (i._resetLayout = function () {
            this.y = 0;
          }),
          (i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t =
                (this.isotope.size.innerWidth - e.size.outerWidth) *
                this.options.horizontalAlignment,
              i = this.y;
            return (this.y += e.size.outerHeight), { x: t, y: i };
          }),
          (i._getContainerSize = function () {
            return { height: this.y };
          }),
          t
        );
      }),
      (function (e, t) {
        "function" == typeof define && define.amd
          ? define(
              [
                "outlayer/outlayer",
                "get-size/get-size",
                "desandro-matches-selector/matches-selector",
                "fizzy-ui-utils/utils",
                "isotope-layout/js/item",
                "isotope-layout/js/layout-mode",
                "isotope-layout/js/layout-modes/masonry",
                "isotope-layout/js/layout-modes/fit-rows",
                "isotope-layout/js/layout-modes/vertical",
              ],
              function (i, s, n, o, r, a) {
                return t(e, i, s, n, o, r, a);
              }
            )
          : "object" == typeof module && module.exports
          ? (module.exports = t(
              e,
              require("outlayer"),
              require("get-size"),
              require("desandro-matches-selector"),
              require("fizzy-ui-utils"),
              require("isotope-layout/js/item"),
              require("isotope-layout/js/layout-mode"),
              require("isotope-layout/js/layout-modes/masonry"),
              require("isotope-layout/js/layout-modes/fit-rows"),
              require("isotope-layout/js/layout-modes/vertical")
            ))
          : (e.Isotope = t(
              e,
              e.Outlayer,
              e.getSize,
              e.matchesSelector,
              e.fizzyUIUtils,
              e.Isotope.Item,
              e.Isotope.LayoutMode
            ));
      })(window, function (e, t, i, s, n, o, r) {
        var a = e.jQuery,
          l = String.prototype.trim
            ? function (e) {
                return e.trim();
              }
            : function (e) {
                return e.replace(/^\s+|\s+$/g, "");
              },
          d = t.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0,
          });
        (d.Item = o), (d.LayoutMode = r);
        var u = d.prototype;
        (u._create = function () {
          for (var e in ((this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          t.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]),
          r.modes))
            this._initLayoutMode(e);
        }),
          (u.reloadItems = function () {
            (this.itemGUID = 0), t.prototype.reloadItems.call(this);
          }),
          (u._itemize = function () {
            for (
              var e = t.prototype._itemize.apply(this, arguments), i = 0;
              i < e.length;
              i++
            ) {
              var s = e[i];
              s.id = this.itemGUID++;
            }
            return this._updateItemsSortData(e), e;
          }),
          (u._initLayoutMode = function (e) {
            var t = r.modes[e],
              i = this.options[e] || {};
            (this.options[e] = t.options ? n.extend(t.options, i) : i),
              (this.modes[e] = new t(this));
          }),
          (u.layout = function () {
            return !this._isLayoutInited && this._getOption("initLayout")
              ? void this.arrange()
              : void this._layout();
          }),
          (u._layout = function () {
            var e = this._getIsInstant();
            this._resetLayout(),
              this._manageStamps(),
              this.layoutItems(this.filteredItems, e),
              (this._isLayoutInited = !0);
          }),
          (u.arrange = function (e) {
            this.option(e), this._getIsInstant();
            var t = this._filter(this.items);
            (this.filteredItems = t.matches),
              this._bindArrangeComplete(),
              this._isInstant
                ? this._noTransition(this._hideReveal, [t])
                : this._hideReveal(t),
              this._sort(),
              this._layout();
          }),
          (u._init = u.arrange),
          (u._hideReveal = function (e) {
            this.reveal(e.needReveal), this.hide(e.needHide);
          }),
          (u._getIsInstant = function () {
            var e = this._getOption("layoutInstant"),
              t = void 0 !== e ? e : !this._isLayoutInited;
            return (this._isInstant = t), t;
          }),
          (u._bindArrangeComplete = function () {
            function e() {
              t &&
                i &&
                s &&
                n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
            }
            var t,
              i,
              s,
              n = this;
            this.once("layoutComplete", function () {
              (t = !0), e();
            }),
              this.once("hideComplete", function () {
                (i = !0), e();
              }),
              this.once("revealComplete", function () {
                (s = !0), e();
              });
          }),
          (u._filter = function (e) {
            var t = this.options.filter;
            t = t || "*";
            for (
              var i = [], s = [], n = [], o = this._getFilterTest(t), r = 0;
              r < e.length;
              r++
            ) {
              var a = e[r];
              if (!a.isIgnored) {
                var l = o(a);
                l && i.push(a),
                  l && a.isHidden ? s.push(a) : l || a.isHidden || n.push(a);
              }
            }
            return { matches: i, needReveal: s, needHide: n };
          }),
          (u._getFilterTest = function (e) {
            return a && this.options.isJQueryFiltering
              ? function (t) {
                  return a(t.element).is(e);
                }
              : "function" == typeof e
              ? function (t) {
                  return e(t.element);
                }
              : function (t) {
                  return s(t.element, e);
                };
          }),
          (u.updateSortData = function (e) {
            var t;
            e
              ? ((e = n.makeArray(e)), (t = this.getItems(e)))
              : (t = this.items),
              this._getSorters(),
              this._updateItemsSortData(t);
          }),
          (u._getSorters = function () {
            var e = this.options.getSortData;
            for (var t in e) {
              var i = e[t];
              this._sorters[t] = c(i);
            }
          }),
          (u._updateItemsSortData = function (e) {
            for (var t = e && e.length, i = 0; t && i < t; i++) {
              e[i].updateSortData();
            }
          });
        var c = function (e) {
          if ("string" != typeof e) return e;
          var t = l(e).split(" "),
            i = t[0],
            s = i.match(/^\[(.+)\]$/),
            n = (function (e, t) {
              return e
                ? function (t) {
                    return t.getAttribute(e);
                  }
                : function (e) {
                    var i = e.querySelector(t);
                    return i && i.textContent;
                  };
            })(s && s[1], i),
            o = d.sortDataParsers[t[1]];
          return o
            ? function (e) {
                return e && o(n(e));
              }
            : function (e) {
                return e && n(e);
              };
        };
        (d.sortDataParsers = {
          parseInt: function (e) {
            return parseInt(e, 10);
          },
          parseFloat: function (e) {
            return parseFloat(e);
          },
        }),
          (u._sort = function () {
            if (this.options.sortBy) {
              var e = n.makeArray(this.options.sortBy);
              this._getIsSameSortBy(e) ||
                (this.sortHistory = e.concat(this.sortHistory));
              var t = (function (e, t) {
                return function (i, s) {
                  for (var n = 0; n < e.length; n++) {
                    var o = e[n],
                      r = i.sortData[o],
                      a = s.sortData[o];
                    if (r > a || r < a)
                      return (
                        (r > a ? 1 : -1) *
                        ((void 0 !== t[o] ? t[o] : t) ? 1 : -1)
                      );
                  }
                  return 0;
                };
              })(this.sortHistory, this.options.sortAscending);
              this.filteredItems.sort(t);
            }
          }),
          (u._getIsSameSortBy = function (e) {
            for (var t = 0; t < e.length; t++)
              if (e[t] != this.sortHistory[t]) return !1;
            return !0;
          }),
          (u._mode = function () {
            var e = this.options.layoutMode,
              t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return (t.options = this.options[e]), t;
          }),
          (u._resetLayout = function () {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout();
          }),
          (u._getItemLayoutPosition = function (e) {
            return this._mode()._getItemLayoutPosition(e);
          }),
          (u._manageStamp = function (e) {
            this._mode()._manageStamp(e);
          }),
          (u._getContainerSize = function () {
            return this._mode()._getContainerSize();
          }),
          (u.needsResizeLayout = function () {
            return this._mode().needsResizeLayout();
          }),
          (u.appended = function (e) {
            var t = this.addItems(e);
            if (t.length) {
              var i = this._filterRevealAdded(t);
              this.filteredItems = this.filteredItems.concat(i);
            }
          }),
          (u.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
              this._resetLayout(), this._manageStamps();
              var i = this._filterRevealAdded(t);
              this.layoutItems(this.filteredItems),
                (this.filteredItems = i.concat(this.filteredItems)),
                (this.items = t.concat(this.items));
            }
          }),
          (u._filterRevealAdded = function (e) {
            var t = this._filter(e);
            return (
              this.hide(t.needHide),
              this.reveal(t.matches),
              this.layoutItems(t.matches, !0),
              t.matches
            );
          }),
          (u.insert = function (e) {
            var t = this.addItems(e);
            if (t.length) {
              var i,
                s,
                n = t.length;
              for (i = 0; i < n; i++)
                (s = t[i]), this.element.appendChild(s.element);
              var o = this._filter(t).matches;
              for (i = 0; i < n; i++) t[i].isLayoutInstant = !0;
              for (this.arrange(), i = 0; i < n; i++)
                delete t[i].isLayoutInstant;
              this.reveal(o);
            }
          });
        var h = u.remove;
        return (
          (u.remove = function (e) {
            e = n.makeArray(e);
            var t = this.getItems(e);
            h.call(this, e);
            for (var i = t && t.length, s = 0; i && s < i; s++) {
              var o = t[s];
              n.removeFrom(this.filteredItems, o);
            }
          }),
          (u.shuffle = function () {
            for (var e = 0; e < this.items.length; e++) {
              this.items[e].sortData.random = Math.random();
            }
            (this.options.sortBy = "random"), this._sort(), this._layout();
          }),
          (u._noTransition = function (e, t) {
            var i = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var s = e.apply(this, t);
            return (this.options.transitionDuration = i), s;
          }),
          (u.getFilteredItemElements = function () {
            return this.filteredItems.map(function (e) {
              return e.element;
            });
          }),
          d
        );
      });
    let nt = document.querySelector(".search__btn"),
      ot = document.querySelector(".search__form");
    const rt = () => {
      ot.classList.toggle("active");
    };
    nt.addEventListener("click", (e) => {
      e.stopPropagation(), rt();
    }),
      document.addEventListener("click", (e) => {
        let t = e.target,
          i = t == ot || ot.contains(t),
          s = t == nt,
          n = ot.classList.contains("active");
        i || s || !n || rt();
      });
    const at = document.querySelector(".scroll-top");
    if (
      (window.addEventListener("scroll", () => {
        (window.pageYOffset || document.documentElement.scrollTop) > 500
          ? at.classList.add("active")
          : at.classList.remove("active");
      }),
      at.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }),
      document.querySelector(".products-row"))
    ) {
      var lt = new Isotope(".products-row", {
          itemSelector: ".products-row__column ",
          layoutMode: "masonry",
        }),
        dt = {
          ium: function (e) {
            return e
              .querySelector(".products-row__name")
              .textContent.match(/ium$/);
          },
        };
      document
        .querySelector(".category-aside")
        .addEventListener("click", function (e) {
          if (matchesSelector(e.target, "button")) {
            var t = e.target.getAttribute("data-filter");
            (t = dt[t] || t), lt.arrange({ filter: t });
          }
        });
      for (
        var ut = document.querySelectorAll(".category-aside"),
          ct = 0,
          ht = ut.length;
        ct < ht;
        ct++
      ) {
        e(ut[ct]);
      }
      function e(e) {
        e.addEventListener("click", function (t) {
          matchesSelector(t.target, "button") &&
            (e.querySelector(".is-checked").classList.remove("is-checked"),
            t.target.classList.add("is-checked"));
        });
      }
      lt = new Isotope(".content-products__products", {
        itemSelector: ".products-row__column",
        layoutMode: "masonry",
        getSortData: { name: ".name" },
      });
      document
        .querySelector(".content-products__select")
        .addEventListener("change", function (e) {
          if (matchesSelector(e.target, "select")) {
            var t = e.target.value;
            lt.arrange({ sortBy: t }), console.log(t);
          }
        }),
        setTimeout(function () {
          document.querySelector(".category-aside__category").click();
        }, 500);
    }
    (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
      document.querySelector(".icon-menu") &&
        document.addEventListener("click", function (e) {
          de &&
            e.target.closest(".icon-menu") &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock")
                ? ue(e)
                : ce(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        }),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, i) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && s(t);
          let i = he(e, "spollers");
          function s(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    n(e),
                    e.addEventListener("click", o))
                  : (e.classList.remove("_spoller-init"),
                    n(e, !1),
                    e.removeEventListener("click", o));
            });
          }
          function n(e, t = !0) {
            let i = e.querySelectorAll("[data-spoller]");
            i.length &&
              ((i = Array.from(i).filter(
                (t) => t.closest("[data-spollers]") === e
              )),
              i.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              }));
          }
          function o(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const i = t.closest("[data-spoller]"),
                s = i.closest("[data-spollers]"),
                n = s.hasAttribute("data-one-spoller"),
                o = s.dataset.spollersSpeed
                  ? parseInt(s.dataset.spollersSpeed)
                  : 500;
              s.querySelectorAll("._slide").length ||
                (n && !i.classList.contains("_spoller-active") && r(s),
                i.classList.toggle("_spoller-active"),
                ((e, t = 500) => {
                  e.hidden ? le(e, t) : ae(e, t);
                })(i.nextElementSibling, o)),
                e.preventDefault();
            }
          }
          function r(e) {
            const t = e.querySelector("[data-spoller]._spoller-active"),
              i = e.dataset.spollersSpeed
                ? parseInt(e.dataset.spollersSpeed)
                : 500;
            t &&
              !e.querySelectorAll("._slide").length &&
              (t.classList.remove("_spoller-active"),
              ae(t.nextElementSibling, i));
          }
          i &&
            i.length &&
            i.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                s(e.itemsArray, e.matchMedia);
              }),
                s(e.itemsArray, e.matchMedia);
            });
        }
      })();
  })();
})();

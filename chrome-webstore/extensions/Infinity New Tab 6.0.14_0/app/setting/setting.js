"use strict";
var CITY_AJAX = null;
$(document).ready(function() {
    window.$Setting = {
        ini: function() {
            $Setting.Menu(), $Setting.iconNumChange(), $Setting.addTionalSearch(), $Setting.onSearchAdd(), $Setting.fontColor(), $Setting.setCity(), $Setting.$bg.ini(), $setData.ini(), $dataRestore.ini(), $setting.onChange(), $setting.onRangeChange();
            var t = $setting.get("autoWallpaper");
            t ? $("#autoWallpaperHover").hide() : $("#autoWallpaperHover").show(), "" == $setting.get("wcity") ? $("#CurrentLocation").text(i18n("Locating")) : $("#CurrentLocation").text($setting.get("wcity"));
            try {
                isZh() && $("#aboutTranslate").hide()
            } catch (e) {}
        },
        setCity: function() {
            $("#weatherinput").live("input", function(t) {
                try {
                    var e = $(this).val();
                    "" == e && $("#addThatCity").fadeOut(100), CITY_AJAX && CITY_AJAX.abort(), CITY_AJAX = $.ajax({
                        url: "http://query.yahooapis.com/v1/public/yql",
                        type: "get",
                        dataType: "json",
                        data: {
                            q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + e + '")',
                            format: "json"
                        }
                    }).done(function(t) {
                        var e = t.query.results.channel,
                            a = e.location.city,
                            i = e.location.country;
                        $("#addThatCity").fadeIn(100), $("#addThatCity").val("+" + a), $("#addThatCity").attr({
                            city: a,
                            country: i
                        })
                    }).fail(function() {
                        $("#addThatCity").fadeOut(100)
                    })
                } catch (a) {}
            }), $("#addThatCity").live("click", function(t) {
                if ("" != $(this).attr("city")) {
                    var e = $(this).attr("city"),
                        a = $(this).attr("country");
                    $setting.set("wcity", e), $setting.set("wcountry", a), $("#CurrentLocation").text(e), getCityByCity(), $("#addThatCity").fadeOut(200), $("#weatherinput").val(""), $notification.show(i18n("WeatherLocationHasBeenSettedTo") + " " + e, !0)
                }
            }), $("#weatherinput").live("keydown", function(t) {
                if (13 == t.which && "" != $("#addThatCity").attr("city")) {
                    var e = $("#addThatCity").attr("city"),
                        a = $("#addThatCity").attr("country");
                    $setting.set("wcity", e), $setting.set("wcountry", a), $("#CurrentLocation").text(e), getCityByCity(), $("#addThatCity").fadeOut(200), $("#weatherinput").val(""), $notification.show(i18n("WeatherLocationHasBeenSettedTo") + " " + e, !0)
                }
            }), $("[name=temperatureUnit]").live("click", function(t) {
                "" == $setting.get("wcity") ? autoWeather() : getCityByCity()
            })
        },
        Menu: function() {
            $("[type=setting]").live("click", function(t) {
                if ($my.slide.setting) return $("#settingSlide .topMenu").css("border-bottom", ""), $("[in=settingSlide]:nth-child(2)").css("border-bottom", "solid 2px #fdfdfd"), $("#setting0SlideBox,#setting0SlideMenu").hide(), $("#setting1SlideBox,#setting1SlideMenu").show(), !1
            }), $(".ST").live("click", function(t) {
                var e = $(this)[0].id;
                $(".ST").css("color", ""), $(this).css("color", "#2ECC71"), $(".settingBox").hide(), $("#settingBox" + e).show()
            })
        },
        iconNumChange: function() {
            $("[name=iconNum]").live("change", function(t) {
                var e = $(this).val(),
                    a = e.split("x"),
                    i = parseInt(a[0]),
                    n = parseInt(a[1]),
                    o = JSON.parse(localStorage.main),
                    l = arrayGroupByNum(o, i * n);
                localStorage.main = JSON.stringify(l), $iconIni.load(l, e), $(".icon").css("-webkit-animation", "zoom 0.2s ease"), $onSlide.slideTo("#mainAll", 0)
            })
        },
        addTionalSearch: function() {
            for (var t = $setting.get("searchBottom"), e = "", a = 0; a < t.length; a++) {
                if (0 == a) var i = "-webkit-filter:grayscale(1);";
                else var i = "";
                e += '<div class="additional">', e += '<div class="additionName">' + t[a].name + "</div>", e += '<div class="additionDelete"></div>', e += '<div class="additionTop" style="' + i + '">↑</div>', e += "</div>"
            }
            $("#AddSe").html(e)
        },
        onSearchAdd: function() {
            $("#addSearchBu").live("click", function(t) {
                var e = $("#addSearchName").val(),
                    a = $("#addSearchUrl").val();
                if ("" == e || "" == a) {
                    var i = i18n("CanNotBeEmpty");
                    return $notification.show(i), !1
                }
                var n = a.length,
                    o = a.indexOf("%s"),
                    l = a.substring(0, o),
                    r = a.substring(o + 2, n),
                    c = {
                        name: e,
                        searchStart: l,
                        searchEnd: r
                    },
                    s = $setting.get("searchBottom");
                s.push(c), $setting.set("searchBottom", s), $Setting.addTionalSearch(), $("#addSearchName").val(""), $("#addSearchUrl").val("")
            }), $(".additionDelete").live("click", function(t) {
                var e = $(this).parent().index(),
                    a = $setting.get("searchBottom");
                a.splice(e, 1), $setting.set("searchBottom", a), $Setting.addTionalSearch()
            }), $(".additionTop").live("click", function(t) {
                var e = $(this).parent().index(),
                    a = $setting.get("searchBottom"),
                    i = a[e];
                a.splice(e, 1), a.unshift(i), $setting.set("searchBottom", a), $Setting.addTionalSearch()
            })
        },
        fontColor: function() {
            for (var t = $setting.get("fontColor"), e = 0; e < $(".fontColorSelect").length; e++) {
                var a = $($(".fontColorSelect")[e]).attr("color");
                if (t == a) {
                    $(".fontColorSelect").css("border-color", "");
                    var i = $($(".fontColorSelect")[e]).css("background-color");
                    $($(".fontColorSelect")[e]).css("border-color", i), $(".globalColor").css("color", t)
                }
            }
            $(".fontColorSelect").live("click", function(t) {
                var e = $(this).attr("color");
                $(".fontColorSelect").css("border-color", "");
                var a = $(this).css("background-color");
                $(this).css("border-color", a), $(".globalColor").css("color", e), $setting.set("fontColor", e)
            })
        },
        $bg: {
            ini: function() {
                var t = new Filer;
                t.init({
                    persistent: !1,
                    size: 1073741824
                }, function(t) {}, onError), $Setting.$bg.blurChange(), $Setting.$bg.localWallpaper(t), $Setting.$bg.restoreWallpaper(), $Setting.$bg.autoWallpaperChange(), $Setting.$bg.downloadWallpaper()
            },
            localWallpaper: function(t) {
                try {
                    $("#getLocalWallpaper").live("click", function(t) {
                        $(this).val("")
                    }), $("#getLocalWallpaper")[0].onchange = function() {
                        try {
                            $("#waiting").show(), slideLock();
                            var e = this.files[0],
                                a = new FileReader;
                            a.readAsDataURL(e), a.onload = function() {
                                var e = a.result,
                                    i = getblobUrl(e);
                                console.log(i), saveAllImage(t, i, function() {
                                    var t = $setting.get("blurWallpaper");
                                    t ? ($("#bgOut").css("background-image", "url(filesystem:chrome-extension://" + APPID + "/temporary/localBlur.jpg?time=" + (new Date).getTime() + ")"), $setting.set("lastWallpaper", "filesystem:chrome-extension://" + APPID + "/temporary/localBlur.jpg?time=" + (new Date).getTime())) : ($("#bgOut").css("background-image", "url(filesystem:chrome-extension://" + APPID + "/temporary/local.jpg?time=" + (new Date).getTime() + ")"), $setting.set("lastWallpaper", "filesystem:chrome-extension://" + APPID + "/temporary/local.jpg?time=" + (new Date).getTime())), localStorage.newLocal = "1", $setting.set("bgType", "user"), $("#waiting").hide(), slideUnLock(), $setting.set("autoWallpaper", !1), $("#autoWallpaperButton").removeAttr("checked"), $("#autoWallpaperHover").show()
                                })
                            }
                        } catch (i) {
                            console.log(i)
                        }
                        $("#uploadImage2").val("")
                    }
                } catch (e) {}
            },
            blurChange: function() {
                $("#blurButton").live("change", function(t) {
                    try {
                        wallpaperToblur()
                    } catch (e) {
                        console.log(e)
                    }
                })
            },
            restoreWallpaper: function() {
                $("#RestoreWallpaperButton").live("click", function(t) {
                    $setting.set("autoWallpaper", !1), $("#autoWallpaperButton").removeAttr("checked");
                    var e = $setting.get("blurWallpaper");
                    e ? $setting.set("lastWallpaper", "img/bgblur.jpg") : $setting.set("lastWallpaper", "img/bg.jpg"), $("#bgOut").css("background-image", "url(" + $setting.get("lastWallpaper") + ")"), $setting.set("bgType", "default"), $setting.set("bgname", "bg"), $setting.sync()
                })
            },
            autoWallpaperChange: function() {
                $("#autoWallpaperButton").live("click", function(t) {
                    var e = $(this).is(":checked");
                    e ? $("#autoWallpaperHover").fadeOut(100) : $("#autoWallpaperHover").fadeIn(100), setAutoBg()
                }), $(".autobgs").live("click", function(t) {
                    setAutoBg()
                })
            },
            downloadWallpaper: function() {
                $("#DownloadWallpaperButton").live("click", function(t) {
                    var e = document.createElement("a");
                    e.href = $setting.get("lastWallpaper"), e.download = "infinityWallpaper.jpg", e.click(), $(e).remove()
                })
            }
        }
    }, $Setting.ini()
});
"use strict";

function addSettingStart() {
    setTimeout(function() {
        $(".ADD").css("color", ""), $(".ADD:nth-child(1)").css("color", "#2ECC71"), $(".addContain").hide(), $("#addContain0").show(), $(".ST").css("color", ""), $(".ST:nth-child(1)").css("color", "#2ECC71"), $(".settingBox").hide(), $("#settingBoxGeneralST").show(), $("#addSearch,#addUrl,#addTitle").val(""), $("#iconPreview").css("background-image", ""), $("#iconPreview").attr("bgImg", ""), $("#iconPreview").attr({
            top: "0",
            left: "0"
        }), $("#uploadImage").val(""), $("#remove,#imgSize,#imageSize,.adjustBu,#shareIcon").hide(), $("#previewName").text(""), $("#feedbackText").val(""), $("#allFeedback").removeClass("loginBoxHide"), $("#thankFeedback").hide();
        var t = document.getElementById("mycanvas"),
            e = t.getContext("2d");
        e.clearRect(0, 0, t.width, t.height), $("#iconPreview").attr("dragMove", "false"), $(".icobgColor").css("border-color", "transparent");
        var n = $(".icobgColorPre:nth-child(1)").css("background-color");
        $(".icobgColorPre:nth-child(1)").css("border-color", n), $("#iconPreviewTop").css({
            "background-color": n,
            "background-image": ""
        })
    }, 300)
}

function getbackupIcons(t) {
    var e = [],
        n = JSON.parse(t.sites);
    for (var i in n)
        for (var o in n[i].icons)
            if ("2" != n[i].icons[o].type) {
                try {
                    var a = new URL(n[i].icons[o].ico).hostname.toLowerCase()
                } catch (r) {
                    try {
                        var a = new URL(n[i].icons[o].url).hostname.toLowerCase()
                    } catch (r) {
                        var a = ""
                    }
                }
                a.indexOf("www.") >= 0 && (a = a.substr(4, a.length - 4)), n[i].icons[o].domain = a.toLowerCase(), e.push(n[i].icons[o])
            } else try {
                var a = "app://" + n[i].icons[o].appid;
                n[i].icons[o].url = a, n[i].icons[o].domain = "app", e.push(n[i].icons[o])
            } catch (r) {}
    var s = [],
        c = ["#1ABC9C", "#2ECC71", "#33C5C5", "#3498DB", "#9B59B6", "#34495E", "#F1C40F", "#E67E22", "#E74C3C", "#95A5A6"];
    for (var l in e) {
        var d = {},
            g = "";
        "" == e[l].domain || ("app" == e[l].domain ? g = e[l].img ? e[l].img : e[l].ico : getIcon(e[l].domain, function(t) {
            g = t
        })), e[l].ico = g, d.name = e[l].name, d.ico = e[l].ico, e[l].domain.indexOf("tmall") >= 0 ? d.url = "http://tmall.com" : d.url = e[l].url, "" == d.ico ? (d.type = "custom", d.title = e[l].name.substr(0, 3), d.bgColor = c[Math.floor(Math.random() * c.length)]) : d.ico.substring(0, 10).indexOf("chrome://") >= 0 ? (d.type = "app", d.bgColor = "#fdfdfd") : d.type = "ico", s.push(d)
    }
    s.unshift({
        type: "weather",
        ico: infinityIconUrl + "/icon/150127092540.png",
        bgColor: "#7adaff",
        name: i18n("Weather"),
        url: "",
        notiNum: 0
    }, {
        type: "todos",
        ico: infinityIconUrl + "/icon/150127093122.png",
        bgColor: "transparent",
        name: i18n("Todos"),
        url: "",
        notiNum: 0
    }, {
        type: "apps",
        ico: infinityIconUrl + "/icon/150127092038.png",
        bgColor: "transparent",
        name: i18n("Apps"),
        url: "",
        notiNum: 0
    }, {
        type: "notepad",
        ico: infinityIconUrl + "/icon/150127092837.png",
        bgColor: "transparent",
        name: i18n("NotesAndIdeas"),
        url: "",
        title: "",
        notiNum: 0
    }, {
        type: "history",
        ico: infinityIconUrl + "/icon/150127092734.png",
        bgColor: "transparent",
        name: i18n("History"),
        url: "",
        notiNum: 0
    }, {
        type: "setting",
        ico: infinityIconUrl + "/icon/150127092940.png",
        bgColor: "transparent",
        name: i18n("settings"),
        url: "",
        notiNum: 0
    }, {
        type: "bookmarks",
        ico: infinityIconUrl + "/icon/150204031618.png",
        bgColor: "transparent",
        name: i18n("bookmarks"),
        url: "",
        notiNum: 0
    });
    var u = [s],
        p = arrayGroupByNum(u, 10);
    return p
}

function getIcon(t, e) {
    try {
        $.ajax({
            url: "js/icon.json",
            dataType: "json",
            async: !1
        }).done(function(n) {
            for (var i in n)
                if (null == n[i].url) var o = "";
                else if (n[i].url.toLowerCase().indexOf(t) >= 0) {
                if ("google.com" == t) var o = infinityIconUrl + "/icon/150127092630.png";
                else var o = n[i].src;
                return e(o), !1
            }
            e(o)
        })
    } catch (n) {
        return console.log(n), !1
    }
}

function TransformOld(t, e) {
    try {
        $.ajax({
            url: "js/icon.json",
            dataType: "json",
            async: !1
        }).done(function(n) {
            for (var i = 0; i < t.length; i++)
                for (var o = 0; o < t[i].length; o++) "setting" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127092940.png" : "weather" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127031616.png" : "todos" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127093122.png" : "apps" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127092038.png" : "notepad" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127092837.png" : "history" == t[i][o].type ? t[i][o].ico = infinityIconUrl + "/icon/150127092734.png" : (t[i][o].ico = getIconSrcByUrl(t[i][o].url, n, t[i][o].ico), t[i][o].ico.indexOf("ico/") >= 0 && (t[i][o].ico = getIconSrcByImageName(t[i][o].ico, n)));
            e(t)
        }).fail(function() {
            console.log("error")
        })
    } catch (n) {
        console.log(n)
    }
}

function getIconSrcByUrl(t, e, n) {
    for (var i = 0; i < e.length; i++)
        if (e[i].url == t) return e[i].src;
    return n
}

function getIconSrcByImageName(t, e) {
    for (var n = 0; n < e.length; n++)
        if (e[n].imgname == t) return e[n].src;
    return !1
}

function pagebuttonShow(t, e) {
    $(".point").css("background-color", ""), "last" == t ? $(".point:last").css("background-color", i18n("pointColor")) : $(".point:nth-child(" + t + ")").css("background-color", i18n("pointColor")), e && e(t)
}

function slideLock() {
    $my.G_SlideLock = !0
}

function slideUnLock() {
    $my.G_SlideLock = !1
}

function RGBToHex(t) {
    if ("#" == t.substring(0, 1)) return t.toUpperCase(), t;
    for (var e = /[0-9]{0,3}/g, n = t.match(e), i = "#", o = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], a = 0; a < n.length; a++) {
        for (var r = null, s = n[a], c = s, l = []; s > 16;) r = s % 16, s = s / 16 >> 0, l.push(o[r]);
        l.push(o[s]), c < 16 && "" != c && l.push(0), i += l.reverse().join("")
    }
    return i.toUpperCase(), i
}

function $loadingIn(t) {
    $(t).html('<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>')
}

function wallpaperToblur() {
    var t = getBg(!0),
        e = new Image;
    e.src = t, e.onload = function() {
        $("#bgOut").css("background-image", "url(" + t + ")"), $setting.set("lastWallpaper", t), e.src = ""
    }, e.onerror = function() {
        failedToloadWp()
    }
}

function getBg(t) {
    try {
        var e = $setting.get("autoWallpaper"),
            n = $setting.get("bgType"),
            i = $setting.get("blurWallpaper"),
            o = (new Date).getMonth() + 1,
            a = (new Date).getDate();
        t && (i = !i);
        var r = "";
        if (e) {
            var s = $setting.get("AutoBgType");
            r = "InfinityBg" == s ? i ? infinityImg + "/InfinityBlur/" + o + "_" + a + ".jpg" : infinityImg + "/InfinityWallpaper/" + o + "_" + a + ".jpg" : i ? infinityImg + "/bingWallpaper/bgblur.jpg?month=" + o + "&date=" + a : infinityImg + "/bingWallpaper/bg.jpg?month=" + o + "&date=" + a
        } else {
            if ("default" == n && (r = i ? "img/bgblur.jpg" : "img/bg.jpg"), "user" == n) try {
                if (localStorage.newLocal) r = i ? "filesystem:chrome-extension://" + APPID + "/temporary/localBlur.jpg?time=" + (new Date).getTime() : "filesystem:chrome-extension://" + APPID + "/temporary/local.jpg?time=" + (new Date).getTime();
                else try {
                    var c = $setting.get("bgname"),
                        l = c.substring(0, c.indexOf(".jpg?time=")),
                        d = c.substring(c.indexOf(".jpg?time="), c.length);
                    r = i ? l + "blur" + d : l + d
                } catch (g) {
                    r = i ? infinityImg + "/InfinityBlur/4_15.jpg" : infinityImg + "/InfinityWallpaper/4_15.jpg"
                }
            } catch (g) {}
            if ("bing" == n && (r = i ? infinityImg + "/bingWallpaper/bgblur.jpg?month=" + o + "&date=" + a : infinityImg + "/bingWallpaper/bg.jpg?month=" + o + "&date=" + a), "infinity" == n && (r = i ? infinityImg + "/InfinityBlur/" + o + "_" + a + ".jpg" : infinityImg + "/InfinityWallpaper/" + o + "_" + a + ".jpg"), "random" == n) {
                var u = $setting.get("bgname");
                r = i ? infinityImg + "/randomBlur/" + u + ".jpg" : infinityImg + "/wallpaper/" + u + ".jpg"
            }
        }
        return r
    } catch (g) {}
}

function setAutoBg() {
    var t = getBg(),
        e = new Image;
    e.src = t, e.onload = function() {
        $("#bgOut").css("background-image", "url(" + t + ")"), $setting.set("lastWallpaper", t);
        var n = $setting.get("autoWallpaper");
        if (e.src = "", n) {
            var i = $setting.get("AutoBgType");
            "InfinityBg" == i ? $setting.set("bgType", "infinity") : $setting.set("bgType", "bing")
        }
        $(e).remove()
    }, failedToloadWp()
}

function randomWallpaper() {
    $("#fengche").live("click", function(t) {
        $(this).addClass("xuanzhuan");
        var e = $setting.get("blurWallpaper"),
            n = Math.floor(4050 * Math.random()) + 1,
            i = "";
        i = e ? infinityImg + "/randomBlur/" + n + ".jpg" : infinityImg + "/wallpaper/" + n + ".jpg";
        var o = new Image;
        return o.src = i, o.onload = function() {
            $("#bgOut").css("background-image", "url(" + i + ")"), $setting.set("bgname", n), $setting.set("lastWallpaper", i), $setting.set("bgType", "random"), $("#fengche").removeClass("xuanzhuan"), $setting.set("autoWallpaper", !1), o.src = "", $("#autoWallpaperButton").removeAttr("checked"), $("#autoWallpaperHover").show(), $(o).remove()
        }, o.onerror = function() {
            return $("#fengche").removeClass("xuanzhuan"), $(o).remove(), !1
        }, !1
    })
}

function ResizeIconSize(t, e, n) {
    try {
        var i = document.createElement("canvas");
        i.width = e, i.height = e;
        var o = i.getContext("2d");
        o.clearRect(0, 0, i.width, i.height);
        var a = new Image;
        a.src = t, a.onload = function() {
            o.drawImage(a, 0, 0, e, e);
            var t = i.toDataURL();
            try {
                n(t)
            } catch (r) {
                console.log(r)
            }
        }
    } catch (r) {
        console.log(r)
    }
}

function startAnimation() {
    var t = $setting.get("startAnimation");
    t && ($(".group:nth-child(1)").children().addClass("animationtrue"), setTimeout(function() {
        $(".group").children().removeClass("animationtrue")
    }, 730))
}

function openWebSite() {
    $("[type=ico],[type=custom],[type=gmail],[type=gplus],[type=app]").live("click", function(t) {
        if (!G_Infinity_Open_Lock) {
            var e = $(this).attr("url");
            if ("app://" == e.substring(0, 6)) {
                var n = e.substring(6);
                return chrome.management.launchApp(n), !1
            }
            var i = "",
                o = $setting.get("openInNewtab");
            return i = o ? "_blank" : "_self", window.event.ctrlKey ? e.indexOf("chrome://") >= 0 ? (chrome.tabs.getCurrent(function(t) {
                var n = t.index + 1;
                chrome.tabs.create({
                    index: n,
                    url: e
                }, function() {
                    return !1
                })
            }), !1) : (window.open(e, "_blank"), !1) : e.indexOf("chrome://") >= 0 ? "_self" == i ? (chrome.tabs.update({
                url: e
            }), !1) : (chrome.tabs.getCurrent(function(t) {
                var n = t.index + 1;
                chrome.tabs.create({
                    index: n,
                    url: e
                }, function() {
                    return !1
                })
            }), !1) : (window.open(e, i), !1)
        }
    }), $("[type=ico],[type=custom],[type=gmail],[type=gplus],[type=app]").live("mousedown", function(t) {
        if (!G_Infinity_Open_Lock && 2 == t.which) {
            var e = $(this).attr("url");
            if ("app://" == e.substring(0, 6)) {
                var n = e.substring(6);
                return chrome.management.launchApp(n), !1
            }
            return e.indexOf("chrome://") >= 0 ? (chrome.tabs.getCurrent(function(t) {
                var n = t.index + 1;
                chrome.tabs.create({
                    index: n,
                    url: e
                }, function() {
                    return !1
                })
            }), !1) : (window.open(e, "_blank"), !1)
        }
    })
}

function notiNum(t, e) {
    $("[type=" + t + "] .notiNum").show().html(e), 0 == e && $("[type=" + t + "] .notiNum").hide()
}

function setTodosNotiNum() {
    var t = $setting.get("todostrue").length;
    t >= 99 && (t = "99+"), notiNum("todos", t)
}

function setGmailNotiNum() {
    try {
        if ($setting.get("GmailMessage")) {
            var t = parseInt(localStorage.GmailNum);
            NaN != t && (t >= 99 && (t = "99+"), notiNum("gmail", t))
        } else notiNum("gmail", 0)
    } catch (e) {}
}

function setAllNotiNum() {
    setTodosNotiNum(), setGmailNotiNum()
}

function addIcon(t, e) {
    try {
        var n = localStorage.main,
            n = JSON.parse(n),
            i = $setting.get("iconNum"),
            o = i.split("x"),
            a = parseInt(o[0]),
            r = parseInt(o[1]),
            s = a * r;
        if (0 == n.length) addTo_M(n, t, !0, 0, e);
        else
            for (var c = 0; c < n.length; c++) {
                if (!(c < n.length - 1)) {
                    if (n[c].length < s) {
                        addTo_M(n, t, !1, c, e);
                        break
                    }
                    addTo_M(n, t, !0, c, e);
                    break
                }
                if (n[c].length < s) {
                    addTo_M(n, t, !1, c, e);
                    break
                }
            }
    } catch (l) {
        console.log(l)
    }
}

function addTo_M(t, e, n, i, o) {
    if (n) {
        t.push([e]), localStorage.main = JSON.stringify(t), $iconIni.load(t);
        var a = getCurrentNum();
        0 == i && t[0].length != a ? $(one).css("-webkit-animation", "zoom 0.2s ease") : ($(".point").css("background-color", ""), $onSlide.slideTo("#mainAll", i + 1, function() {}), o(i + 1)), $setting.sync()
    } else {
        var r = _getCurrentN();
        t[i].push(e), localStorage.main = JSON.stringify(t), $iconIni.load(t), $(".point").css("background-color", ""), r == i ? $(".point:nth-child(" + (i + 1) + ")").css("background-color", i18n("pointColor")) : ($onSlide.slideTo("#mainAll", i, function() {}), o(i)), $setting.sync()
    }
}

function _getCurrentN() {
    var t, e;
    return t = $("#mainAll").css("x"), t = parseInt(t), e = t / -1210, e = parseInt(Math.round(e))
}

function setWeather(t, e) {
    var n, i, o = "Celsius" == $setting.get("temperatureUnit"),
        a = o ? "℃" : "℉";
    if (parseInt(t.TempNow) ? (i = t.TempNow + a + " " + t.cityName, n = infinityImg + "/weatherIcon/" + t.img) : (i = i18n("Locating"), $("[type=weather] .iconName").text(i), n = infinityImg + "/weatherIcon/H.png"), $("#rightCityName").text(t.cityName + " | " + weekName((new Date).getDay())), $("#weatherDesc").text(t.desc), $("#weatherTempMin").text(t.TempMin), $("#weatherTempNow").text(t.TempNow), $("#weatherTempMax").text(t.TempMax), $("#HumidityData").text(t.humidity), $("#WindData").text(t.wind), $("#PressureOrPM").text(t.pressure), $("#weatherIconNow").attr("src", n), $("#WeatherTemp2").text(t.Temp2min + "~" + t.Temp2max), $("#WeatherTemp3").text(t.Temp3min + "~" + t.Temp3max), $("#WeatherTemp4").text(t.Temp4min + "~" + t.Temp4max), $("#WeatherTemp5").text(t.Temp5min + "~" + t.Temp5max), $("#WeatherTemp6").text(t.Temp6min + "~" + t.Temp6max), $("#WeatherIcon2").attr("src", infinityImg + "/weatherIcon/" + t.img2), $("#WeatherIcon3").attr("src", infinityImg + "/weatherIcon/" + t.img3), $("#WeatherIcon4").attr("src", infinityImg + "/weatherIcon/" + t.img4), $("#WeatherIcon5").attr("src", infinityImg + "/weatherIcon/" + t.img5), $("#WeatherIcon6").attr("src", infinityImg + "/weatherIcon/" + t.img6), setWeatherBg(n, i), $("[type=weather] .iconName").text(i), $("[type=weather] .iconInIn").css("background-image", "url(" + n + ")"), e) {
        var r = JSON.stringify(t);
        localStorage.weather = r, "" == $setting.get("wcity") && ($setting.set("wcity", t.cityName), $setting.set("wcountry", t.country), $("#CurrentLocation").text(t.cityName))
    }
}

function getImgByCode(t) {
    t = parseInt(t);
    var e = {};
    return e[0] = "F.png", e[1] = "F.png", e[2] = "F.png", e[3] = "OP.png", e[4] = "OP.png", e[5] = "X.png", e[6] = "X.png", e[7] = "X.png", e[8] = "X.png", e[9] = "Q.png", e[10] = "X.png", e[11] = "R.png", e[12] = "R.png", e[13] = "GU.png", e[14] = "GU.png", e[15] = "GU.png", e[16] = "W.png", e[17] = "X.png", e[18] = "X.png", e[19] = "JLM.png", e[20] = "JLM.png", e[21] = "JLM.png", e[22] = "JLM.png", e[23] = "F.png", e[24] = "F.png", e[25] = "GU.png", e[26] = "Y.png", e[27] = "I.png", e[28] = "H.png", e[29] = "E.png", e[30] = "H.png", e[31] = "C.png", e[32] = "B.png", e[33] = "C.png", e[34] = "B.png", e[35] = "X.png", e[36] = "B.png", e[37] = "OP.png", e[38] = "OP.png", e[39] = "OP.png", e[40] = "R.png", e[41] = "W.png", e[42] = "U.png", e[43] = "W.png", e[44] = "H.png", e[45] = "Q.png", e[46] = "W.png", e[47] = "OP.png", e[3200] = "na.png", e[t]
}

function setWeatherWeek() {
    var t = new Date,
        e = t.getDay(),
        n = (weekName((e + 1) % 7), weekName((e + 2) % 7)),
        i = weekName((e + 3) % 7),
        o = weekName((e + 4) % 7),
        a = weekName((e + 5) % 7);
    $("#weatherDate3").text(n), $("#weatherDate4").text(i), $("#weatherDate5").text(o), $("#weatherDate6").text(a)
}

function weekName(t) {
    switch (t) {
        case 0:
            return i18n("Sunday");
        case 1:
            return i18n("Monday");
        case 2:
            return i18n("Tuesday");
        case 3:
            return i18n("Wednesday");
        case 4:
            return i18n("Thursday");
        case 5:
            return i18n("Friday");
        case 6:
            return i18n("Saturday")
    }
}

function FtoC(t) {
    return t = parseInt(t), Math.round((t - 32) / 1.8)
}

function CtoF() {
    return a = parseInt(a), Math.round(1.8 * a + 32)
}

function autoWeather() {
    try {
        navigator.geolocation.getCurrentPosition(function(t) {
            var e = t.coords.latitude,
                n = t.coords.longitude,
                i = e + "," + n;
            $.ajax({
                url: "http://query.yahooapis.com/v1/public/yql",
                type: "get",
                dataType: "json",
                data: {
                    q: 'select * from weather.forecast where woeid in (select woeid from geo.placefinder where text="' + i + '" and gflags="R")',
                    format: "json",
                    randomT: (new Date).getTime()
                }
            }).done(function(t) {
                var e = t.query.results.channel;
                saveWeather(e)
            })
        })
    } catch (t) {
        console.log(t)
    }
}

function getWeatherPerTime() {
    "" == $setting.get("wcity") ? autoWeather() : getCityByCity(), setTimeout(function() {
        getWeatherPerTime()
    }, 3e5)
}

function getCityByCity() {
    try {
        var t = $setting.get("wcity") + "," + $setting.get("wcountry");
        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql",
            type: "get",
            dataType: "json",
            data: {
                q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + t + '")',
                format: "json",
                randomT: (new Date).getTime()
            }
        }).done(function(t) {
            var e = t.query.results.channel;
            saveWeather(e)
        })
    } catch (e) {
        console.log(e)
    }
}

function saveWeather(t) {
    var e = {},
        n = "Celsius" == $setting.get("temperatureUnit");
    e.cityName = t.location.city, e.country = t.location.country, e.desc = t.item.condition.text, e.TempMin = n ? FtoC(t.item.forecast[0].low) : t.item.forecast[0].low, e.TempNow = n ? FtoC(t.item.condition.temp) : t.item.condition.temp, e.TempMax = n ? FtoC(t.item.forecast[0].high) : t.item.forecast[0].high, e.img = getImgByCode(t.item.condition.code), e.humidity = t.atmosphere.humidity, e.wind = t.wind.speed, e.pressure = Math.round(parseInt(t.atmosphere.pressure)), e.Temp2min = n ? FtoC(t.item.forecast[1].low) : t.item.forecast[1].low, e.Temp3min = n ? FtoC(t.item.forecast[2].low) : t.item.forecast[2].low, e.Temp4min = n ? FtoC(t.item.forecast[3].low) : t.item.forecast[3].low, e.Temp5min = n ? FtoC(t.item.forecast[4].low) : t.item.forecast[4].low, e.Temp2max = n ? FtoC(t.item.forecast[1].high) : t.item.forecast[1].high, e.Temp3max = n ? FtoC(t.item.forecast[2].high) : t.item.forecast[2].high, e.Temp4max = n ? FtoC(t.item.forecast[3].high) : t.item.forecast[3].high, e.Temp5max = n ? FtoC(t.item.forecast[4].high) : t.item.forecast[4].high, e.img2 = getImgByCode(t.item.forecast[1].code), e.img3 = getImgByCode(t.item.forecast[2].code), e.img4 = getImgByCode(t.item.forecast[3].code), e.img5 = getImgByCode(t.item.forecast[4].code), setWeather(e, !0)
}

function setWeatherBg(t, e) {
    try {
        for (var n = JSON.parse(localStorage.main), i = 0; i < n.length; i++)
            for (var o = 0; o < n[i].length; o++) "weather" == n[i][o].type && (n[i][o].ico = t, n[i][o].name = e);
        localStorage.main = JSON.stringify(n)
    } catch (a) {}
}

function weatherStart() {
    if (localStorage.weather) {
        var t = JSON.parse(localStorage.weather);
        setWeather(t, !1)
    } else {
        var t = {
                cityName: "",
                country: "",
                desc: "",
                TempMin: "",
                TempNow: "",
                TempMax: "",
                humidity: "",
                wind: "",
                pressure: "",
                Temp2min: "N",
                Temp3min: "N",
                Temp4min: "N",
                Temp5min: "N",
                Temp2max: "A",
                Temp3max: "A",
                Temp4max: "A",
                Temp5max: "A",
                img: "na.png",
                img2: "na.png",
                img3: "na.png",
                img4: "na.png",
                img5: "na.png"
            },
            e = JSON.stringify(t);
        localStorage.weather = e
    }
    getWeatherPerTime()
}

function whenLogin(t) {
    $("#loginOrRegister,#feedbackEmail").val(t.email), $("#cloudBackupHover").hide(), localStorage.backupIn ? $("#lastBackupAt").text(i18n("lastBackupAt") + localStorage.backupIn) : $("#lastBackupAt").text(""), $("#loginUploadWp").text(i18n("yourWallpaper"))
}

function whenUnlogin(t) {
    $("#loginOrRegister").val(i18n("SignInOrRegister")), $("#cloudBackupHover").show(), $("#lastBackupAt").text(i18n("SignInToUseTheFeature")), $("#loginUploadWp").text(i18n("UploadLocalWallpaper"))
}

function onAddbuttonOpen() {
    try {
        ga("send", "event", "侧边栏", "click", "通过添加按钮打开"), ga("send", "event", "添加与设置", "click", "添加")
    } catch (t) {}
}

function GoogleAnalyze() {
    try {
        $("[type=setting]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "通过设置按钮打开"), ga("send", "event", "添加与设置", "click", "设置")
        }), $("#infinitySearch").live("focus", function(t) {
            var e = $setting.get("searchEngine");
            ga("send", "event", "搜索引擎", "search", e), ga("send", "event", "浏览器", "browser", "All Chrome")
        }), $("#fengche").live("click", function(t) {
            ga("send", "event", "小风车", "click", "小风车")
        }), $("[type=todos]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "待办事项")
        }), $("[type=weather]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "天气")
        }), $("[type=apps]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "应用与扩展")
        }), $("[type=history]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "历史记录")
        }), $("[type=notepad]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "笔记")
        }), $("[type=bookmarks]").live("click", function(t) {
            ga("send", "event", "侧边栏", "click", "书签")
        }), $("[type=ico]").live("mousedown", function(t) {
            try {
                var e = "undefined",
                    n = $(this).attr("url");
                e = new URL(n).hostname;
                var i = e.indexOf("www");
                if (0 == i) {
                    var o = e.length,
                        a = e.indexOf(".");
                    e = e.substring(a + 1, o)
                }
                ga("send", "event", "预设网站", "click", e), ga("send", "event", "全部网站", "click", e), ga("send", "event", "图标总数", "load", AllICONNUM), chrome.runtime.sendMessage({
                    name: "openSite",
                    message: {
                        url: e
                    }
                }, function(t) {})
            } catch (r) {}
        }), $("[type=custom]").live("mousedown", function(t) {
            try {
                var e = "undefined",
                    n = $(this).attr("url");
                e = new URL(n).hostname;
                var i = e.indexOf("www");
                if (0 == i) {
                    var o = e.length,
                        a = e.indexOf(".");
                    e = e.substring(a + 1, o)
                }
                ga("send", "event", "自定义网站", "click", e), ga("send", "event", "全部网站", "click", e)
            } catch (r) {}
        })
    } catch (t) {}
}

function getAds() {
    var t = (new Date).getTime();
    localStorage.LastAdTime || (localStorage.LastAdTime = 0);
    var e = parseInt(localStorage.LastAdTime),
        n = (t - e) / 1e3 / 60 / 60 / 24;
    if (n < 4) return !1;
    var i;
    i = isZh() ? infinityApi + "/Ads/Ads_zh.json" : infinityApi + "/Ads/Ads_en.json", $.ajax({
        url: i,
        dataType: "json"
    }).done(function(t) {
        "infinity" == t.infinityType && ("true" == t.showAd ? $("#getAds").show().attr({
            src: t.img,
            url: t.url
        }).css({
            width: t.width,
            height: t.height,
            left: t.left
        }) : $("#getAds").hide())
    }), $("#getAds").click(function(t) {
        var e = $(this).attr("url");
        window.open(e, "_blank"), $("#getAds").hide(), localStorage.LastAdTime = (new Date).getTime()
    })
}

function showTopBar() {
    load_bookmarks(), $mostVisited.ini(), bookmarks(), HowTpShowTop(), $("#displayAtTopButton,[name=displayTopType]").live("click", function(t) {
        HowTpShowTop()
    })
}

function HowTpShowTop() {
    var t = $setting.get("displayAtTop"),
        e = $setting.get("displayTopType");
    t ? "Bookmarksbar" == e ? ($(".BookmarkBar").show(), $("#MostVisitedOut").hide()) : "mostVisited" == e && ($("#MostVisitedOut").show(), $(".BookmarkBar").hide()) : ($(".BookmarkBar").hide(), $("#MostVisitedOut").hide())
}

function failedToloadWp() {
    1 == window.navigator.onLine || $("#wallpaperErrorShow").show()
}

function checkAdd(t, e) {
    try {
        var n = JSON.parse(localStorage.main),
            i = n.length;
        if ("" == t || "ico" == t) {
            for (var o = 0; o < i; o++)
                for (var a = 0; a < n[o].length; a++)
                    if (n[o][a].url == e) return !0;
            return !1
        }
        for (var o = 0; o < n.length; o++)
            for (var a = 0; a < n[o].length; a++)
                if (n[o][a].type == t) return !0;
        return !1
    } catch (r) {
        return !1
    }
}

function checkappAdd(t) {
    try {
        for (var e = JSON.parse(localStorage.main), n = e.length, i = 0; i < n; i++)
            for (var o = 0; o < e[i].length; o++)
                if (e[i][o].url == "app://" + t) return !0;
        return !1
    } catch (a) {
        console.log(a)
    }
}

function onError(t) {
    console.log(t)
}

function saveAllImage(t, e, n) {
    try {
        var i = t;
        GetOriginalImage && GetOriginalImage.abort(), GetOriginalImage = $.ajax({
            url: e,
            dataType: "binary",
            processData: !1
        }).done(function(t) {
            i.write("local.jpg", {
                data: t,
                type: "image/jpeg"
            }, function(t, o) {
                saveBlurImage(i, e, n)
            }, onError)
        })
    } catch (o) {
        console.log(o)
    }
}

function saveBlurImage(t, e, n) {
    try {
        var i = $(window).width();
        setBlurWallpaperBase64(e, i, BlurRadius, function(e) {
            var i = convertDataURIToBinary(e);
            t.write("localBlur.jpg", {
                data: i,
                type: "image/jpg"
            }, function(t, e) {
                n()
            }, onError)
        })
    } catch (o) {
        console.log(o)
    }
}

function convertDataURIToBinary(t) {
    for (var e = ";base64,", n = t.indexOf(e) + e.length, i = t.substring(n), o = window.atob(i), a = o.length, r = new Uint8Array(new ArrayBuffer(a)), s = 0; s < a; s++) r[s] = o.charCodeAt(s);
    return r
}

function setBlurWallpaperBase64(t, e, n, i) {
    try {
        if (n) var o = n;
        else var o = 16;
        var a = document.getElementById("iconCanvas");
        a.width = e;
        var r = a.getContext("2d");
        r.clearRect(0, 0, a.width, a.height);
        var s = new Image;
        s.src = t, s.onload = function() {
            var t = e,
                n = Math.round(e / s.width * s.height);
            a.width = t, a.height = n, r.drawImage(s, 0, 0, t, n), stackBlurCanvasRGB("iconCanvas", 0, 0, t, n, o);
            var c = a.toDataURL();
            try {
                i(c)
            } catch (l) {
                console.log(l)
            }
            r.clearRect(0, 0, a.width, a.height)
        }
    } catch (c) {
        console.log(c)
    }
}

function xmlToJson(t) {
    var e = {};
    if (1 == t.nodeType) {
        if (t.attributes.length > 0) {
            e["@attributes"] = {};
            for (var n = 0; n < t.attributes.length; n++) {
                var i = t.attributes.item(n);
                e["@attributes"][i.nodeName] = i.value
            }
        }
    } else 3 == t.nodeType && (e = t.nodeValue);
    if (t.hasChildNodes())
        for (var o = 0; o < t.childNodes.length; o++) {
            var a = t.childNodes.item(o),
                r = a.nodeName;
            if ("undefined" == typeof e[r]) e[r] = xmlToJson(a);
            else {
                if ("undefined" == typeof e[r].length) {
                    var s = e[r];
                    e[r] = [], e[r].push(s)
                }
                e[r].push(xmlToJson(a))
            }
        }
    return e
}

function $gmail() {
    try {
        var t = $setting.get("GmailMessage");
        t ? (Gmail_Ajax && Gmail_Ajax.abort(), Gmail_Ajax = $.ajax({
            url: "https://mail.google.com/mail/u/0/feed/atom/?timestamp=" + (new Date).getTime(),
            dataType: "xml"
        }).done(function(t, e, n) {
            try {
                if (401 == n.status) return localStorage.gmailLogin = "false", $setting.set("GmailMessage", !1), $("#GmailMessageCheck").prop("checked", !1), !1;
                localStorage.gmailLogin = "true";
                var i = xmlToJson(t),
                    o = i.feed.fullcount["#text"];
                o = parseInt(o), localStorage.GmailNum = o, Show_Noti_Num && setGmailNotiNum(), setTimeout(function() {
                    $gmail()
                }, 3e3)
            } catch (a) {}
        }).fail(function(t) {
            401 == t.status && (localStorage.gmailLogin = "false", $setting.set("GmailMessage", !1), $("#GmailMessageCheck").prop("checked", !1), Show_Noti_Num && setGmailNotiNum(), setTimeout(function() {
                $gmail()
            }, 1e3))
        })) : setTimeout(function() {
            $gmail()
        }, 1e3)
    } catch (e) {
        console.log(e)
    }
}

function html2Escape(t) {
    return t.replace(/[<>&"]/g, function(t) {
        return {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;"
        }[t]
    })
}

function stripscript(t) {
    return t.replace(/<script.*?>.*?<\/script>/gi, "")
}
var GetOriginalImage = null,
    ImageWidth = screen.width,
    BlurRadius = 18,
    AllICONNUM = 0,
    APPID = "dbfmnekepjoapopniengjbcpnbljalfg",
    Gmail_Ajax = null,
    Gmail__link = "",
    __Weather_focus = !1,
    infinityApi = "https://api.infinitynewtab.com",
    infinityApp = "https://app.infinitynewtab.com",
    infinityAdmin = "https://admin.infinitynewtab.com",
    infinityImg = "https://img.infinitynewtab.com",
    infinityIconUrl = "https://infinityicon.infinitynewtab.com";
window.$my = {
    body: $("body"),
    bgOut: $("#bgOut"),
    all: $("#all"),
    addButton: $(".addButton"),
    G_SlideOut: !0,
    G_SlideLock: !1,
    slide: {
        apps: !1,
        setting: !1,
        weather: !1,
        history: !1,
        notepad: !1,
        todos: !1,
        bookmarks: !1,
        edit: !1
    }
}, window.$loadHtml = function(t, e) {
    try {
        $.ajax({
            url: e + "?time=" + (new Date).getTime(),
            async: !1
        }).done(function(e) {
            $(t).html(e)
        })
    } catch (n) {}
}, $.loadHtml = function(t, e, n) {
    try {
        $.ajax({
            url: e
        }).done(function(e) {
            $(t).html(e), $setlang.ini(t);
            try {
                n && n()
            } catch (i) {}
        })
    } catch (i) {}
}, window.i18n = function(t) {
    try {
        return chrome.i18n.getMessage(t)
    } catch (e) {
        return t
    }
}, window.isZh = function() {
    return "zh" == i18n("lang")
}, window.$setlang = {
    ini: function(t) {
        for (var e = "", n = $(e + "[i18n]").length, i = 0; i < n; i++) {
            var o = $("[i18n]")[i],
                a = o.getAttribute("i18n"),
                r = i18n(a);
            $(o).text(r)
        }
        for (var s = $(e + "[i18nh]").length, i = 0; i < s; i++) {
            var o = $("[i18nh]")[i],
                a = o.getAttribute("i18nh"),
                r = i18n(a);
            $(o).html(r)
        }
        for (var c = $(e + "[i18n-placeholder]").length, i = 0; i < c; i++) {
            var o = $("[i18n-placeholder]")[i],
                a = o.getAttribute("i18n-placeholder"),
                r = i18n(a);
            $(o).attr("placeholder", r)
        }
        for (var l = $(e + "[i18n-value]").length, i = 0; i < l; i++) {
            var o = $("[i18n-value]")[i],
                a = o.getAttribute("i18n-value"),
                r = i18n(a);
            $(o).attr("value", r)
        }
        for (var d = $(e + "[i18n-title]").length, i = 0; i < d; i++) {
            var o = $("[i18n-title]")[i],
                a = o.getAttribute("i18n-title"),
                r = i18n(a);
            $(o).attr("title", r)
        }
    }
}, window.$setData = {
    ini: function() {
        try {
            for (var t = $("[infinity-Data-Check]").length, e = 0; e < t; e++) {
                var n = $("[infinity-Data-Check]")[e],
                    i = n.getAttribute("infinity-Data-Check"),
                    o = $setting.get(i);
                o ? $(n).attr("checked", "true") : $(n).removeAttr("checked")
            }
            for (var a = $("[infinity-Data-Text]").length, e = 0; e < a; e++) {
                var n = $("[infinity-Data-Text]")[e],
                    i = n.getAttribute("infinity-Data-Text"),
                    o = $setting.get(i);
                $(n).text(o)
            }
            for (var r = $("[infinity-Data-Value]").length, e = 0; e < r; e++) {
                var n = $("[infinity-Data-Value]")[e],
                    i = n.getAttribute("infinity-Data-Value"),
                    o = $setting.get(i);
                $(n).val(o)
            }
            for (var s = $("[infinity-Data-Checks]").length, e = 0; e < s; e++) {
                var n = $("[infinity-Data-Checks]")[e],
                    i = n.getAttribute("infinity-Data-Checks"),
                    c = i.split("|"),
                    o = $setting.get(c[0]);
                o == c[1] && $(n).attr("checked", !0)
            }
        } catch (l) {
            console.log(l)
        }
    }
}, window.$notification = {
    show: function(t, e) {
        var n = $("#notification");
        n.css("background-color", ""), "undefined" == typeof e ? n.text(t).fadeIn(300, function() {
            setTimeout(function() {
                n.fadeOut(300, function() {})
            }, 2e3)
        }) : n.css("background-color", "#2ECC71").text(t).fadeIn(300, function() {
            setTimeout(function() {
                n.fadeOut(300, function() {})
            }, 2e3)
        })
    }
}, window.$setting = {
    add: function(t, e) {
        var n, i = localStorage.setting,
            o = {};
        try {
            i ? (o = JSON.parse(i), "undefined" != typeof o[t] ? "boolean" == typeof o[t] || "string" == typeof o[t] : (o[t] = e, n = JSON.stringify(o), localStorage.setting = n)) : (o = {}, o[t] = e, n = JSON.stringify(o), localStorage.setting = n)
        } catch (a) {
            console.log(a)
        }
    },
    get: function(t) {
        var e = localStorage.setting,
            n = {};
        try {
            return n = JSON.parse(e), n[t]
        } catch (i) {}
    },
    set: function(t, e) {
        var n = localStorage.setting,
            i = {};
        try {
            i = JSON.parse(n), i[t] = e, localStorage.setting = JSON.stringify(i), "mostVisits" != t && "wpTime" != t && "cloudBackup" != t && "wcity" != t && "wcountry" != t && "lastWallpaper" != t && "bgType" != t && "bgname" != t && $setting.sync()
        } catch (o) {}
    },
    onChange: function() {
        $("input[type=radio]").live("change", function(t) {
            var e = $(this).attr("name"),
                n = $(this).val();
            $setting.set(e, n)
        }), $("input.checkBoxToggle").live("change", function(t) {
            var e = $(this).attr("name"),
                n = $(this).is(":checked");
            $setting.set(e, n)
        })
    },
    onRangeChange: function() {
        $("input[type=range]").live("input", function(t) {
            t.preventDefault();
            var e, n = $(this).attr("name"),
                i = $(this).val();
            $("#" + n + "Value").text(i), "iconRadius" == $(this)[0].id ? (e = Math.round(i / 2) + "%", $(".iconInIn,.icon,.editico,.webIconImg,#iconPreviewTop,#EditiconPreviewTop").css("border-radius", e)) : "iconOpacity" == $(this)[0].id && $(".icon").css("opacity", i / 100)
        }), $("input[type=range]").live("change", function(t) {
            t.preventDefault();
            var e = $(this).attr("name"),
                n = $(this).val();
            $setting.set(e, n)
        })
    },
    sync: function(t) {
        Show_Noti_Num && setAllNotiNum();
        var e = $setting.get("cloudBackup");
        e && syncToCloud(), console.log("设置数据已同步")
    }
}, window.$Slide = function(t, e, n, i) {
    try {
        this.name = e;
        for (var o = e.length, a = "", r = "", s = n, c = i, l = 0; l < o; l++) a += '<div class="topMenu" in="' + t + 'Slide" id="the' + t + l + '" with="' + t + l + '" style="' + (0 == l && 1 != o ? "border-bottom:solid 2px #fdfdfd;" : "") + '">' + e[l] + "</div>", r += '<div class="SlideBox" id="' + t + l + 'SlideBox"></div>';
        this.slide = '<div id="' + t + 'Slide" class="Slide" style="padding-top:' + (c ? c : "75") + 'px;visibility:hidden;"><div class="slideTitle"  style="background-color:' + (s ? s : "") + ';">' + a + '</div><div id="' + t + 'SlideBigBox" class="SlideBigBox">' + r + "</div></div>", $("[type=" + t + "]").live("click", function(e) {
            return G_Infinity_Open_Lock && "edit" != t || ($("#" + t + "Slide").css("visibility", "visible"), $my.slide[t] ? ($my.addButton.removeClass("addButtonToClose"), $("#" + t + "Slide").removeClass("slideOut"), $("#bgOut").removeClass("bgMoveOut"), $("#bgImg").removeClass("bgMoveOut"), $my.slide[t] = !1) : ($my.addButton.addClass("addButtonToClose"), SlideInElse("id"), $("#" + t + "Slide").addClass("slideOut"), $("#bgOut").addClass("bgMoveOut"), $("#bgImg").addClass("bgMoveOut"), $my.slide[t] = !0)), !1
        }), $("#" + t + "Slide").live("webkitTransitionEnd", function(e) {
            $my.slide[t] ? ("todos" == t && $("#addTodos")[0].focus(), "setting" == t && $("#addSearch")[0].focus(), "notepad" == t && $("#addNotesTitle")[0].focus(), "bookmarks" == t && $("#searchBookmarks")[0].focus(), "history" == t && $("#searchhistory")[0].focus(), __Weather_focus && ($("#weatherinput")[0].focus(), __Weather_focus = !1)) : $("#" + t + "Slide").css("visibility", "hidden")
        }), $my.bgOut.click(function(e) {
            if ($my.slide[t]) {
                var n = !1,
                    i = $(e.target);
                i.parents("#" + t + "Slide").length > 0 || (i.parents("#bgOut").length > 0 && i.parents("#mainOut").length > 0 ? i.parents(".groupIn").length > 0 || (n = !0) : n = !0), i.parents("#searchOut").length > 0 && (n = !1), i.parents("#pointOut").length > 0 && (n = !1), "searchOption" == i[0].id && (n = !0), n && ($("#" + t + "Slide").removeClass("slideOut"), $("#bgOut").removeClass("bgMoveOut"), $("#bgImg").removeClass("bgMoveOut"), $my.slide[t] = !1, $my.addButton.removeClass("addButtonToClose"), slideUnLock(), addSettingStart())
            }
        }), this.add = function(e, n) {
            "menu" == e ? $("#" + t + "SlideBigBox").before(n) : $("#" + t + e + "SlideBox").append(n)
        }, this.append = function() {
            $my.all.append(this.slide)
        }
    } catch (d) {}
}, window.SlideInElse = function(t) {
    var e;
    for (e in $my.slide) e != t && 1 == $my.slide[e] && ($("#" + e + "Slide").removeClass("slideOut"), $("#bgOut").removeClass("bgMoveOut"), $("#bgImg").removeClass("bgMoveOut"), $my.slide[e] = !1)
}, window.isAllSlideFalse = function() {
    var t, e = !0;
    for (t in $my.slide) 0 != $my.slide[t] && (e = !1);
    return e
}, window.$addButton = {
    ini: function() {
        $my.addButton.click(function(t) {
            if (isAllSlideFalse()) {
                $("#settingSlide").css("visibility", "visible"), $addButton.rotatedToClose(), SlideInElse("setting"), $("#settingSlide").addClass("slideOut"), $("#bgOut").addClass("bgMoveOut"), $("#bgImg").addClass("bgMoveOut"), $my.slide.setting = !0, $(".topMenu").css("border-bottom", ""), $("[in=settingSlide]:nth-child(1)").css("border-bottom", "solid 2px #fdfdfd"), $("#setting0SlideBox,#setting0SlideMenu").show(), $("#setting1SlideBox,#setting1SlideMenu").hide();
                try {
                    $infinityIcon.loadPopularIcon(), $infinityIcon.addInfinityIcons(), onAddbuttonOpen()
                } catch (e) {}
            } else $addButton.rotatedToOpen(), SlideInElse(), slideUnLock(), $("#editBoxHover").hide()
        })
    },
    rotatedToClose: function() {
        $my.addButton.addClass("addButtonToClose"), $("#addRightTop").html("")
    },
    rotatedToOpen: function() {
        $my.addButton.removeClass("addButtonToClose")
    }
}, window.$topMenu = {
    ini: function() {
        $(".topMenu").live("click", function() {
            var t = $(this).parent().children().length,
                e = $(this).attr("in"),
                n = "#" + e;
            if (t >= 2) {
                var i = $(this).attr("with");
                if ("setting2" == i) return window.open("./modules/proxy.html", "_blank"), !1;
                $("." + e + "Menu").hide(), $("#" + i + "SlideMenu").show(), $(n + " .topMenu").css("border-bottom", ""), $(this).css("border-bottom", "solid 2px #fdfdfd"), $(n + " .SlideBox").hide(), $("#" + i + "SlideBox").show()
            }
            return !1
        })
    }
}, window.checkeURL = function(t) {
    var e = /http(s)?:/,
        n = new RegExp(e);
    return t.indexOf("localhost") && (t = t.replace("localhost", "127.0.0.1")), 1 == n.test(t)
}, window.$firstSlide = {
    weather: !0,
    setting: !0,
    todos: !0,
    bookmarks: !0,
    notepad: !0,
    history: !0,
    apps: !0,
    edit: !0
}, window.$my.$settingContent = {
    ini: function() {
        if (isZh()) var t = new $Slide("setting", [i18n("addCustomItem"), i18n("settings")], "#2ECC71", 125);
        else var t = new $Slide("setting", [i18n("addCustomItem"), i18n("settings")], "#2ECC71", 125);
        t.append(), $.loadHtml("#setting0SlideBox", "app/add/add.html"), $.loadHtml("#setting1SlideBox", "app/setting/setting.html", function() {
            try {
                var t = JSON.parse(localStorage.user);
                t.isLogin ? whenLogin(t) : whenUnlogin(t)
            } catch (e) {}
        }), $("[type=setting]").live("click", function(t) {
            $(".topMenu").css("border-bottom", ""), $("[with=setting1]").css("border-bottom", "solid 2px #fdfdfd"), $("#setting0SlideBox").hide(), $("#setting1SlideBox").show(), $("#setting1SlideMenu").show()
        })
    }
}, window.$my.$todos = {
    ini: function() {
        var t = new $Slide("todos", [i18n("Todos")], "#2ECC71");
        t.append(), $.loadHtml("#todosSlideBigBox", "app/todos/todos.html")
    }
}, window.$my.$weather = {
    ini: function() {
        var t = new $Slide("weather", [i18n("Weather")], "transparent");
        t.append(), $.loadHtml("#weatherSlideBigBox", "app/weather/weather.html")
    }
}, window.$my.$bookmarks = {
    ini: function() {
        var t = new $Slide("bookmarks", [i18n("Bookmarks")], "#3498DB");
        t.append(), $.loadHtml("#bookmarksSlideBigBox", "app/bookmarks/bookmarks.html")
    }
}, window.$my.$notes = {
    ini: function() {
        var t = new $Slide("notepad", [i18n("NotesAndIdeas")], "#F1C40F");
        t.append(), $.loadHtml("#notepadSlideBigBox", "app/notes/notes.html")
    }
}, window.$my.$history = {
    ini: function() {
        var t = new $Slide("history", [i18n("History")], "#9B59B6");
        t.append(), $.loadHtml("#historySlideBigBox", "app/history/history.html")
    }
}, window.$my.$apps = {
    ini: function() {
        var t = new $Slide("apps", [i18n("AppsAndExtensions")], "#1abc9c");
        t.append(), $.loadHtml("#appsSlideBigBox", "app/apps/apps.html")
    }
}, window.clearBr = function(t) {
    return t = t.replace(/<\/?.+?>/g, ""), t = t.replace(/[\r\n]/g, "")
}, window.geticonBase64 = function(t, e) {
    try {
        $.ajax({
            url: t + ".json",
            async: !1
        }).done(function(t) {
            var n, i = new Image;
            i.src = t;
            var o = document.getElementById("iconCanvas"),
                a = o.getContext("2d");
            o.width = 150, o.height = 150, a.clearRect(0, 0, 150, 150), a.drawImage(i, 0, 0, 150, 150), n = o.toDataURL(), e(n)
        })
    } catch (n) {}
}, window.geticonSmall = function(t, e) {
    try {
        var n, i = new Image;
        i.src = t;
        var o = document.getElementById("iconCanvas"),
            a = o.getContext("2d");
        o.width = 150, o.height = 150, a.clearRect(0, 0, 150, 150), a.drawImage(i, 0, 0, 150, 150), n = o.toDataURL(), e(n)
    } catch (r) {}
}, window.$dataRestore = {
    ini: function() {
        $dataRestore.Restore()
    },
    Restore: function() {
        try {
            $("#dataRestore").live("click", function(t) {
                $(this).val("")
            }), $("#dataRestore")[0].onchange = function() {
                var t = this.files[0],
                    e = new FileReader;
                e.readAsText(t), e.type = "text", e.onload = function() {
                    var t = e.result,
                        n = t.substring(0, 30);
                    return n.indexOf("infinity") >= 0 ? ($dataRestore.infinityOldRestore(t), !1) : n.indexOf("theNew__INFINITY") >= 0 ? ($dataRestore.infinityNewRestore(t), !1) : n.indexOf("mifish_ext") >= 0 ? ($dataRestore.mifishRestore(t), !1) : n.indexOf("colorful") >= 0 ? ($dataRestore.mifishRestore(t), !1) : void 0
                }
            }
        } catch (t) {}
    },
    infinityOldRestore: function(t) {
        try {
            var e = JSON.parse(t)
        } catch (n) {
            try {
                t = clearBr(t);
                var e = JSON.parse(t)
            } catch (n) {
                $("#waiting").fadeOut(200);
                var i = i18n("RecoveryDataFailed");
                return $notification.show(i), !1
            }
        }
        try {
            var o = e.main,
                a = JSON.stringify(e.setting);
            TransformOld(o, function(t) {
                localStorage.setting = a;
                var e = JSON.stringify(t);
                localStorage.main = e, recoveryTheData(a, e), $setting.set("showPageAction", !0), $("[name=showPageAction]").attr("checked", "true"), $notification.show(i18n("RecoveryDataSuccess"), !0), $setting.sync()
            })
        } catch (n) {
            var i = i18n("RecoveryDataFailed");
            return $notification.show(i), !1
        }
    },
    infinityNewRestore: function(t) {
        try {
            var e = JSON.parse(t),
                n = decodeURIComponent(e.setting),
                i = decodeURIComponent(e.main);
            localStorage.setting = n, localStorage.main = i, recoveryTheData(n, i), $notification.show(i18n("RecoveryDataSuccess"), !0), $setting.sync()
        } catch (o) {
            var a = i18n("RecoveryDataFailed");
            return $notification.show(a), !1
        }
    },
    mifishRestore: function(t) {
        try {
            var e = JSON.parse(t)
        } catch (n) {
            try {
                t = clearBr(t);
                var e = JSON.parse(t)
            } catch (n) {
                $("#waiting").fadeOut(200);
                var i = i18n("RecoveryDataFailed");
                return $notification.show(i), !1
            }
        }
        try {
            var o = getbackupIcons(e);
            recoveryTheDataMain(o), $notification.show(i18n("RecoveryDataSuccess"), !0), $setting.sync()
        } catch (n) {
            console.log(n);
            var i = i18n("RecoveryDataFailed");
            return $notification.show(i), !1
        }
    },
    VplusRestore: function(t) {
        console.log("colorful")
    }
}, window.$iconIni = {
    firstLoad: function() {
        try {
            var t, e;
            if (localStorage.main) t = JSON.parse(localStorage.main), localStorage.InfinityNew ? $iconIni.load(t) : (localStorage.InfinityNew = 1, TransformOld(t, function(t) {
                localStorage.main = JSON.stringify(t), $iconIni.load(t)
            }));
            else {
                e = isZh() ? [{
                    type: "ico",
                    ico: infinityIconUrl + "/icon/150127093624.png",
                    bgColor: "transparent",
                    name: "爱淘宝",
                    url: "http://ai.taobao.com/?pid=mm_29924319_9258288_31180758"
                }, {
                    type: "ico",
                    ico: infinityIconUrl + "/icon/150128102407.png",
                    bgColor: "transparent",
                    name: "京东商城",
                    url: "https://infinitynewtab.com/jd.com.html"
                }, {
                    type: "setting",
                    ico: infinityIconUrl + "/icon/150127092940.png",
                    bgColor: "transparent",
                    name: i18n("settings"),
                    url: ""
                }] : [{
                    type: "ico",
                    ico: infinityIconUrl + "/icon/150127093812.png",
                    bgColor: "transparent",
                    name: "Ebay",
                    url: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=1&pub=5575304691&toolid=10001&campid=5338095340&customid=&ipn=psmain&icep_vectorid=229466&kwid=902099&mtid=824&kw=lg"
                }, {
                    type: "ico",
                    ico: infinityIconUrl + "/usericon/de2545c80abdc8668736695898383d92.png",
                    bgColor: "transparent",
                    name: "Amazon",
                    url: "https://www.amazon.com/"
                }, {
                    type: "setting",
                    ico: infinityIconUrl + "/icon/150127092940.png",
                    bgColor: "transparent",
                    name: i18n("settings"),
                    url: ""
                }];
                var n = isZh() ? "缤客" : "Booking";
                t = [
                    [{
                        type: "weather",
                        ico: infinityIconUrl + "/icon/150127092540.png",
                        bgColor: "#7adaff",
                        name: i18n("Weather"),
                        url: ""
                    }, {
                        type: "todos",
                        ico: infinityIconUrl + "/icon/150127093122.png",
                        bgColor: "transparent",
                        name: i18n("Todos"),
                        url: ""
                    }, {
                        type: "apps",
                        ico: infinityIconUrl + "/icon/150127092038.png",
                        bgColor: "transparent",
                        name: i18n("Apps"),
                        url: ""
                    }, {
                        type: "notepad",
                        ico: infinityIconUrl + "/icon/150127092837.png",
                        bgColor: "transparent",
                        name: i18n("NotesAndIdeas"),
                        url: ""
                    }, {
                        type: "bookmarks",
                        ico: infinityIconUrl + "/icon/150204031618.png",
                        bgColor: "transparent",
                        name: i18n("Bookmarks"),
                        url: ""
                    }, {
                        type: "history",
                        ico: infinityIconUrl + "/icon/150127092734.png",
                        bgColor: "transparent",
                        name: i18n("History"),
                        url: ""
                    }, {
                        type: "gmail",
                        ico: infinityIconUrl + "/icon/150127092622.png",
                        bgColor: "transparent",
                        name: "Gmail",
                        url: "https://mail.google.com/mail/u/0/"
                    }],
                    [{
                        type: "ico",
                        ico: infinityIconUrl + "/icon/150127092207.png",
                        bgColor: "transparent",
                        name: i18n("ChromeStore"),
                        url: "https://chrome.google.com/webstore?utm_source=InfinityNewtab"
                    }, {
                        type: "ico",
                        ico: infinityIconUrl + "/icon/150127092048.png",
                        bgColor: "transparent",
                        name: i18n("Baidu"),
                        url: "https://www.baidu.com/baidu?tn=64075107_1_dg&ie=utf-8"
                    }, {
                        type: "ico",
                        ico: infinityIconUrl + "/usericon/837bf845a2c477cedbb8e436e157f284.png",
                        bgColor: "transparent",
                        name: n,
                        url: "https://www.booking.com/index.html?aid=1267011"
                    }]
                ], t[0] = t[0].concat(e), localStorage.main = JSON.stringify(t), $iconIni.load(t)
            }
        } catch (i) {}
    },
    load: function(t, e) {
        var n = "",
            i = t.length,
            o = 1212 * t.length,
            a = 40 * t.length;
        $("#pointOut").css("width", a), $("#mainAll").css("width", o);
        var r = $setting.get("iconOpacity") / 100,
            s = Math.round($setting.get("iconFillet")) / 2,
            c = $setting.get("fontColor"),
            l = e ? e : $setting.get("iconNum");
        AllICONNUM = 0;
        for (var d = 0; d < i; d++) {
            n += '<div class="group">', n += '<div class="groupIn" type="groupIn">';
            for (var g = t[d].length, u = 0; u < g; u++) n += '<div icon="icon" draggable="true" class="icon theIcon' + l + '" type="' + t[d][u].type + '" url="' + t[d][u].url + '" ico="' + t[d][u].ico + '" iconname="' + t[d][u].name + '" bgColor="' + t[d][u].bgColor + '" style="opacity:' + r + ";border-radius:" + s + '%">', n += '<div icon="icon" draggable="false" class="iconIn" style="">', n += '<div icon="icon" draggable="false" class="iconInIn" style="z-index:-1;background-color:' + t[d][u].bgColor + ";background-image:url(" + t[d][u].ico + ");border-radius:" + s + "%;background-size:" + ("app" == t[d][u].type ? "80%" : "cover") + '"></div>', n += "</div>", n += '<div icon="icon" class="notiNum"></div>', "setting" == t[d][u].type || "history" == t[d][u].type || "notepad" == t[d][u].type || "bookmarks" == t[d][u].type || "todos" == t[d][u].type || "apps" == t[d][u].type || "weather" == t[d][u].type || (n += '<img icon="icon" type="edit" show="false" style="border-radius:' + s + '%" draggable="false" class="editico" src="img/edit.png">'), n += '<img icon="icon" draggable="false" class="deleteico" src="img/remove.png">', n += '<div icon="icon" draggable="false" class="iconTitle iconTitle' + l + '"><span class="iconTitleSpan">' + (t[d][u].title ? t[d][u].title : "") + "</span></div>", n += '<div icon="icon" draggable="false" class="iconName theIconName' + l + ' globalColor" style="color:' + c + '" type="">' + t[d][u].name + "</div>", n += "</div>", AllICONNUM += 1;
            n += "</div>", n += "</div>"
        }
        $("#mainAll").html(n);
        for (var p = "", d = 0; d < i; d++) {
            if (0 == d)
                if (1 == i) var m = "display:none;background-color:" + i18n("pointColor");
                else var m = "background-color:" + i18n("pointColor");
            else var m = "";
            p += '<div class="point" style="' + m + '"></div>'
        }
        $("#pointOut").html(p)
    }
};
var ___searchLock, __isAnimate = !1;
window.$onSlide = {
    ini: function() {
        $onSlide.prevent(), $onSlide.keyEvent(), $onSlide.onClickPointer(), $(document).mousewheel(function(t, e) {
            try {
                if (0 == $("#mainAll").children("").length && ($my.G_SlideOut = !1), 0 == $my.G_SlideOut || $my.G_SlideLock);
                else {
                    if (t.preventDefault(), __isAnimate) return !1;
                    e < 0 ? $onSlide.toLeft("#mainAll") : e > 0 && $onSlide.toRight("#mainAll")
                }
            } catch (t) {
                console.log(t)
            }
        })
    },
    toLeft: function(t, e) {
        __isAnimate = !0;
        var n = $(".group").length;
        if (1 == n) return $(t).transition({
            x: "-200px"
        }, 220, function() {
            $(t).transition({
                x: "0"
            }, 280, function() {
                __isAnimate = !1
            })
        }), !1;
        var i, o, a, r;
        i = $(t).css("width"), i = parseInt(i), r = i / 1210, r = Math.round(r), a = $(t).css("x"), a = parseInt(a), a -= 1210, o = (a - 1110) / -1210, o = parseInt(Math.round(o)), r == o - 1 ? ($(t).css("width", i + 1212), $(t).append($(t).children(":first").clone(!0)), $(t).transition({
            x: "-=1210",
            duration: 500,
            easing: "easeOutBack",
            complete: function() {
                __isAnimate = !1, $(t).children(":last").remove(), $(t).css("width", i), $(t).css("x", 0), pagebuttonShow("1", e)
            }
        })) : $(t).transition({
            x: "-=1210",
            duration: 500,
            easing: "easeOutBack",
            complete: function() {
                __isAnimate = !1, pagebuttonShow(o, e)
            }
        })
    },
    toRight: function(t, e) {
        __isAnimate = !0;
        var n = $(".group").length;
        if (1 == n) return $(t).transition({
            x: "200px"
        }, 220, function() {
            $(t).transition({
                x: "0"
            }, 280, function() {
                __isAnimate = !1
            })
        }), !1;
        var i, o, a, r;
        i = $(t).css("width"), i = parseInt(i), r = i / 1210, r = Math.round(r), a = $(t).css("x"), a = parseInt(a), a += 1210, o = (a - 1110) / -1210, o = parseInt(Math.round(o)), 0 == o ? ($(t).css("width", i + 1212), $(t).prepend('<div id="appendDivBefore"></div>'), $("#appendDivBefore").append($(t).children(":last").clone(!0)), $(t).css("x", "-1210px"), $(t).transition({
            x: "0px",
            duration: 500,
            easing: "easeOutBack",
            complete: function() {
                __isAnimate = !1, $("#appendDivBefore").remove(), $(t).css("width", i), $(t).css("x", -1210 * (r - 1)), pagebuttonShow("last", e)
            }
        })) : $(t).transition({
            x: "+=1210",
            duration: 500,
            easing: "easeOutBack",
            complete: function() {
                __isAnimate = !1, pagebuttonShow(o, e)
            }
        })
    },
    slideTo: function(t, e, n) {
        var i = e * -1210;
        __isAnimate = !0, $(t).transition({
            x: i,
            duration: 500,
            easing: "easeOutBack",
            complete: function() {
                __isAnimate = !1, $(".point").css("background-color", ""), $(".point:nth-child(" + (e + 1) + ")").css("background-color", i18n("pointColor"));
                try {
                    n && n()
                } catch (t) {}
            }
        })
    },
    prevent: function() {
        var t = "";
        for (var e in $my.slide) t += "#" + e + "Slide,";
        $(t).live("mouseover", function(t) {
            $my.G_SlideOut = !1
        }), $(t).live("mousemove", function(t) {
            $my.G_SlideOut = !1
        }), $(t).live("mouseleave", function(t) {
            $my.G_SlideOut = !0
        })
    },
    keyEvent: function() {
        ___searchLock = !0, $("[type=search]").live("focus", function(t) {
            ___searchLock = !1
        }), $("[type=search]").live("blur", function(t) {
            ___searchLock = !0
        }), $(document).keydown(function(t) {
            if ((39 == t.which || 37 == t.which) && ___searchLock) {
                if (0 == $("#mainAll").children("").length) return !1;
                if (0 == $my.G_SlideOut);
                else {
                    if (t.preventDefault(), $("#mainAll").is(":animated")) return !1;
                    39 == t.which && ($("#mainAll").stop(!1, !0), $onSlide.toLeft("#mainAll")), 37 == t.which && ($("#mainAll").stop(!1, !0), $onSlide.toRight("#mainAll"))
                }
            }
        })
    },
    onClickPointer: function() {
        $(".point").live("click", function(t) {
            var e = $(this).index();
            $onSlide.slideTo("#mainAll", e)
        })
    }
}, window.$my.$zoom = {
    ini: function() {
        $(window).resize(function() {
            var t = $(window).width(),
                e = t / 1440;
            e <= .6 && (e = .6), e >= 2 && (e = 2), $("#AllOut").css("zoom", e)
        })
    }
}, window.arrayGroupByNum = function(t, e) {
    for (var n = [], i = [], o = [], a = 0; a < t.length; a++)
        for (var r = 0; r < t[a].length; r++) n.push(t[a][r]);
    for (var s = Math.ceil(n.length / e), c = 0; c < s; c++) {
        o = [];
        for (var l = n.length <= (c + 1) * e ? n.length : (c + 1) * e, a = c * e; a < l; a++) o.push(n[a]);
        i.push(o)
    }
    return i
};
var G_Infinity_Open_Lock = !1,
    Show_Noti_Num = !0;
window.$deleteIcon = {
        ini: function() {
            G_Infinity_Open_Lock = !1, $(".icon").live("mousedown", function(t) {
                3 == t.which && ($(".deleteico").fadeIn(200, function() {
                    $(".icon").css("-webkit-animation", "rotate 0.2s ease infinite")
                }), $(".notiNum").hide(), $(".editico").attr("show", "true"), Show_Noti_Num = !1, G_Infinity_Open_Lock = !0)
            }), $("body").live("mousedown", function(t) {
                "deleteico" != t.target.className && "icon" != $(t.target).attr("icon") && ($(".deleteico").fadeOut(200, function() {
                    $(".icon").css("-webkit-animation", "")
                }), $(".editico").attr("show", "false"), setAllNotiNum(), G_Infinity_Open_Lock = !1, Show_Noti_Num = !0)
            }), $(".deleteico").live("click", function(t) {
                $(this).parent().css({
                    "-webkit-animation": "zoomOut 0.2s ease",
                    "-webkit-transform": "scale(0)"
                });
                var e = $(this).parent();
                setTimeout(function() {
                    var t = e.index(),
                        n = e.parent().parent().index();
                    e.remove();
                    var i = localStorage.main,
                        o = JSON.parse(i);
                    1 == o[n].length ? (o.splice(n, 1), 0 == n ? $onSlide.slideTo("#mainAll", 1, function() {
                        $(".group:nth-child(" + (n + 1) + ")").remove(), $(".point:nth-child(" + (n + 1) + ")").remove(), $(".point:nth-child(" + (n + 1) + ")").css("background-color", i18n("pointColor"));
                        var t = (o.length, 1212 * o.length),
                            e = 40 * o.length;
                        $("#pointOut").css("width", e), $("#mainAll").css({
                            width: t,
                            x: "0"
                        })
                    }) : $onSlide.slideTo("#mainAll", n - 1, function() {
                        $(".group:nth-child(" + (n + 1) + ")").remove(), $(".point:nth-child(" + (n + 1) + ")").remove();
                        var t = (o.length, 1212 * o.length),
                            e = 40 * o.length;
                        $("#pointOut").css("width", e), $("#mainAll").css("width", t)
                    })) : o[n].splice(t, 1), localStorage.main = JSON.stringify(o), $setting.sync()
                }, 200)
            })
        }
    }, window.$Edit = {
        ini: function() {
            $Edit.onedit();
            var t = new $Slide("edit", [i18n("Edit")], "#2ECC71");
            t.append(), $.loadHtml("#editSlideBigBox", "app/edit/edit.html"), $Edit.loadEdit(), $("#editBoxHover").live("click", function(t) {
                $(this).hide()
            })
        },
        loadEdit: function() {
            $(".editico").live("click", function(t) {
                $(".deleteico").hide(), $(".icon").css("-webkit-animation", "")
            })
        },
        onedit: function() {
            $(".icon").live("mouseover", function(t) {
                var e = $(this).children(".editico");
                "true" == e.attr("show") ? e.show() : e.hide()
            })
        }
    }, window.$mostVisited = {
        ini: function() {
            this.get()
        },
        get: function() {
            try {
                var t = $setting.get("mostVisits"),
                    e = "";
                if (0 == t.length) return chrome.topSites.get(function(t) {
                    for (var n = 0; n < t.length; n++) t[n].title = t[n].title.replace("https://", ""), t[n].title = t[n].title.replace("http://", ""), e += '<div class="MostItem" url="' + t[n].url + '"><img src="chrome://favicon/' + t[n].url + '"><span>' + t[n].title + "</span></div>";
                    $("#MostVisitedOut").html(stripscript(e))
                }), !1;
                for (var n = 0; n < t.length; n++) e += '<div class="MostItem" url="' + t[n].url + '"><img src="chrome://favicon/' + t[n].url + '"><span>' + t[n].title + "</span></div>";
                $("#MostVisitedOut").html(stripscript(e))
            } catch (i) {
                console.log(i)
            }
        },
        set: function() {
            chrome.topSites.get(function(t) {
                for (var e = 0; e < t.length; e++) t[e].title = t[e].title.replace("https://", ""), t[e].title = t[e].title.replace("http://", "");
                $setting.set("mostVisits", t)
            }), $("[name=mostVisited]").live("change", function(t) {
                var e = $(this).is(":checked");
                e ? $("#MostVisitedOut").show() : $("#MostVisitedOut").hide()
            }), $(".MostItem").live("click", function(t) {
                var e = "",
                    n = $setting.get("openInNewtab");
                e = n ? "_blank" : "_self";
                var i = $(this).attr("url");
                return window.event.ctrlKey ? window.open(i, "_blank") : window.open(i, e), !1
            }), $(".MostItem").live("mousedown", function(t) {
                if (2 == t.which) {
                    var e = $(this).attr("url");
                    return window.open(e, "_blank"), !1
                }
            })
        }
    }, $("#ChangeCity").live("click", function(t) {
        $my.addButton.removeClass("addButtonToClose"), $("#weatherSlide").removeClass("slideOut"), $("#bgOut").removeClass("bgMoveOut"), $("#bgImg").removeClass("bgMoveOut"), $my.slide.weather = !1, __Weather_focus = !0, $my.addButton.addClass("addButtonToClose"), $("#settingSlide").css("visibility", "visible"), $("#settingSlide").addClass("slideOut"), $("#bgOut").addClass("bgMoveOut"), $("#bgImg").addClass("bgMoveOut"), $my.slide.setting = !0, $(".topMenu").css("border-bottom", ""), $("[with=setting1]").css("border-bottom", "solid 2px #fdfdfd"), $("#setting0SlideBox").hide(), $("#setting1SlideBox").show(), $("#setting1SlideMenu").show(), $(".ST").css("color", ""), $("#GeneralST").css("color", "#2ECC71"), $(".settingBox").hide(), $("#settingBoxGeneralST").show(), $("#setting1SlideBox").scrollTop(1e3)
    }),
    function() {
        $.ajax({
            url: "http://suggestion.baidu.com/su?wd="
        }).fail(function() {
            1 == window.navigator.onLine || $.ajax({
                url: "http://google.com/complete/search?client=chrome&q="
            }).fail(function() {
                $("#wallpaperErrorShow").show()
            })
        }), $("#closefailed").live("click", function(t) {
            $("#wallpaperErrorShow").fadeOut(100)
        })
    }();
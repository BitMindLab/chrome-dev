"use strict";
var siteTitleSuggestAjax = null,
    searchWebIconAjax = null,
    WebIconAjax = null,
    uploadAjax = null,
    isBase64Image = !1,
    dataRest = !1;
$(document).ready(function() {
    $("#flat1").spectrum({
        preferredFormat: "rgb",
        flat: !0,
        showInput: !0
    });
    var e = Math.round($setting.get("iconFillet")) / 2 + "%";
    $("#iconPreviewTop").css("border-radius", e), window.$Add = {
        ini: function() {
            $Add.Menu()
        },
        Menu: function() {
            $(".ADD").live("click", function(e) {
                var t = $(this).index();
                $(".ADD").css("color", ""), $(this).css("color", "#2ECC71"), $(".addContain").hide(), $("#addContain" + t).show()
            }), $("#addfeedbackMenu").live("click", function(e) {
                isLogin() ? $("#feedbackText")[0].focus() : $("#feedbackEmail")[0].focus()
            }), $("#addCustomButton").live("click", function(e) {
                $("#addUrl")[0].focus()
            }), $("#addfeedbackMenu").live("click", function(e) {
                $("#feedbackText").val(""), $("#allFeedback").removeClass("loginBoxHide"), $("#thankFeedback").hide()
            })
        }
    }, window.$addIcon = {
        ini: function() {
            this.addCustom(), this.resizeImg(), this.selectColor()
        },
        addCustom: function() {
            $("#addUrl").live("input", function(e) {
                var t = $(this).val();
                if (t.length >= 5 && "http" != t.substring(0, 4) && (t = "http://" + t), checkeURL(t)) try {
                    siteTitleSuggestAjax && siteTitleSuggestAjax.abort(), siteTitleSuggestAjax = $.ajax({
                        url: t,
                        dataType: "text"
                    }).done(function(e) {
                        var t = "";
                        try {
                            var o = $(e).filter(function(e, t) {
                                return "TITLE" == t.tagName
                            });
                            t = o[0].text, "Redirect" == t && (t = "")
                        } catch (i) {
                            t = ""
                        }
                        $("#addTitle").val(t), $("#previewName").text(t);
                        var o = t.substring(0, 4);
                        "" == $("#iconPreview").attr("bgImg") && $("#iconPreview").text(o)
                    })
                } catch (e) {}
            }), $("#addTitle").live("input", function(e) {
                var t = $(this).val(),
                    o = "";
                $("#previewName").text(t), o = t.substring(0, 4), "" == $("#iconPreview").attr("bgImg") && ("" == t && $("#previewName").text(i18n("addTitle")), $("#iconPreview").text(o))
            }), $("#addBu").live("click", function(e) {
                try {
                    var t = $("#addTitle").val(),
                        o = $("#addUrl").val();
                    o.indexOf("://") > 0 || o.indexOf("mailto:") >= 0 || (o = "http://" + o);
                    var i = $("#iconPreviewTop").css("background-color"),
                        n = $("#iconPreview").attr("bgImg"),
                        a = $("#iconPreview").text();
                    if ("" == n) {
                        var c = {
                            type: "custom",
                            name: t,
                            url: o,
                            bgColor: i,
                            title: a,
                            ico: n
                        };
                        $addIcon.addIcon(c)
                    } else {
                        try {
                            var r = new Image;
                            r.src = n;
                            var d = document.createElement("canvas"),
                                s = d.getContext("2d");
                            d.width = 300, d.height = 300, s.fillStyle = i, s.fillRect(0, 0, 300, 300), s.drawImage(r, 0, 0, 300, 300);
                            var l = d.toDataURL()
                        } catch (g) {}
                        var u = $("#isShareIcon").is(":checked") ? "1" : "0";
                        "1" == u && (uploadAjax = $.ajax({
                            url: infinityAdmin + "/uploadicon/GetIcons.php",
                            type: "POST",
                            data: {
                                iconName: t,
                                iconAddress: o,
                                iconShare: "1",
                                country: isZh() ? "1" : "0",
                                iconBase64: l.substring(22)
                            }
                        }).done(function() {})), ResizeIconSize(n, 150, function(e) {
                            ResizeIconSize(e, 120, function(e) {
                                var n = {
                                    type: "custom",
                                    name: t,
                                    url: o,
                                    bgColor: i,
                                    title: a,
                                    ico: e
                                };
                                $addIcon.addIcon(n)
                            })
                        })
                    }
                } catch (g) {
                    console.log(g)
                }
            })
        },
        resizeImg: function() {
            try {
                $("#uploadImage").live("click", function(e) {
                    $(this).val("")
                }), $("#uploadImage")[0].onchange = function() {
                    try {
                        $("#iconPreview").text("");
                        var e = this.files[0],
                            t = new FileReader,
                            o = document.getElementById("mycanvas"),
                            i = o.getContext("2d");
                        t.onload = function(e) {
                            var t = new Image;
                            t.onload = function() {
                                $(o).attr("cimg", t.src), o.width = 300, o.height = 300;
                                var e = 300,
                                    n = Math.round(300 * t.height / t.width),
                                    a = Math.round((300 - e) / 2),
                                    c = Math.round((300 - n) / 2);
                                i.drawImage(t, a, c, e, n), $("#iconPreview").attr("bgImg", o.toDataURL()), $("#iconPreview").attr({
                                    left: a,
                                    top: c
                                })
                            }, t.src = e.target.result
                        }, t.readAsDataURL(e), $("#remove,#imgSize,#imageSize,.adjustBu,#shareIcon").fadeIn(100), $("#iconPreview").attr("dragMove", "true"), $("#iconPreviewTop").css({
                            "background-color": "transparent",
                            "background-image": "url(../img/transparent.png)"
                        }), $(".icobgColor").css("border-color", "transparent"), $("#transparentBg").css("border-color", "#ccc")
                    } catch (n) {}
                }
            } catch (e) {}
            $("#imgSize").live("input", function(e) {
                $("#iconPreview").text("");
                var t = $(this).val(),
                    o = document.getElementById("mycanvas"),
                    i = o.getContext("2d");
                i.clearRect(0, 0, o.width, o.height);
                var n = $(o).attr("cimg"),
                    a = new Image;
                a.src = n;
                var c = t,
                    r = Math.round(t * a.height / a.width),
                    d = Math.round((300 - c) / 2),
                    s = Math.round((300 - r) / 2);
                i.drawImage(a, d, s, c, r), $("#iconPreview").attr({
                    left: d,
                    top: s
                }), $("#iconPreview").attr("bgImg", o.toDataURL())
            }), $("#iconPreviewTop").live("mousedown", function(e) {
                var t = e.pageX,
                    o = e.pageY,
                    i = $("#iconPreview").attr("left"),
                    n = $("#iconPreview").attr("top");
                $("#iconPreview").attr({
                    useleft: i,
                    usetop: n
                }), $(this).attr({
                    x: t,
                    y: o
                })
            }), $("#iconPreviewTop").live("mousemove", function(e) {
                if (1 == e.which && "true" == $("#iconPreview").attr("dragMove")) {
                    $("#iconPreview").text("");
                    var t = $("#imgSize").val(),
                        o = parseInt($(this).attr("x")),
                        i = parseInt($(this).attr("y")),
                        n = e.pageX,
                        a = e.pageY,
                        c = Math.round($("#iconPreview").attr("useleft")),
                        r = Math.round($("#iconPreview").attr("usetop")),
                        d = c + 3 * (n - o),
                        s = r + 3 * (a - i),
                        l = document.getElementById("mycanvas"),
                        g = l.getContext("2d");
                    g.clearRect(0, 0, l.width, l.height);
                    var u = $(l).attr("cimg"),
                        h = new Image;
                    h.src = u;
                    var f = t,
                        p = Math.round(t * h.height / h.width),
                        m = Math.round((300 - f) / 2);
                    Math.round((300 - p) / 2);
                    g.drawImage(h, m + d, m + s, f, p), $("#iconPreview").attr("left", d), $("#iconPreview").attr("top", s), $("#iconPreview").attr("bgImg", l.toDataURL())
                }
            }), $("#remove").click(function(e) {
                $("#iconPreview").css("background-image", ""), $("#iconPreview").attr("bgImg", ""), $("#iconPreview").attr({
                    top: "0",
                    left: "0"
                }), $("#uploadImage").val("");
                var t = document.getElementById("mycanvas"),
                    o = t.getContext("2d");
                o.clearRect(0, 0, t.width, t.height), $("#remove,#imgSize,#imageSize,.adjustBu,#shareIcon").fadeOut(100), $("#iconPreview").text($("#addTitle").val().substring(0, 4)), $("#iconPreview").attr("dragMove", "false"), $(".icobgColor").css("border-color", "transparent");
                var i = $(".icobgColorPre:nth-child(1)").css("background-color");
                $(".icobgColorPre:nth-child(1)").css("border-color", i), $("#iconPreviewTop").css({
                    "background-color": i,
                    "background-image": ""
                })
            })
        },
        selectColor: function() {
            $(".addButton").live("click", function(e) {
                if (isAllSlideFalse());
                else {
                    $(".icobgColor").css("border-color", "transparent");
                    var t = $(".icobgColorPre:nth-child(1)").css("background-color");
                    $(".icobgColorPre:nth-child(1)").css("border-color", t), $("#iconPreviewTop").css({
                        "background-color": t,
                        "background-image": ""
                    })
                }
            }), $(".icobgColorPre").live("click", function(e) {
                $(".icobgColor").css("border-color", "transparent");
                var t = $(this).css("background-color");
                $(this).css("border-color", t), $("#iconPreviewTop").css({
                    "background-color": t,
                    "background-image": ""
                })
            }), $(".sp-input").attr("disabled", "disabled"), $("#ColorPicker").click(function() {
                if ("true" == $(this).attr("show")) {
                    $("#picker").fadeOut(100);
                    var e = $("#picker .sp-input").val();
                    $("#iconPreviewTop").css({
                        "background-color": e
                    }), $(".icobgColor").css("border-color", ""), $("#ColorPicker").css("border-color", e), $(this).attr("show", "false")
                } else $("#picker").fadeIn(100), $(this).attr("show", "true")
            }), $("#picker").live("mousemove", function(e) {
                if (1 == e.which) {
                    var t = $("#picker .sp-input").val();
                    $(".icobgColor").css("border-color", ""), $("#iconPreviewTop").css({
                        "background-color": t,
                        "background-image": ""
                    }), $("#ColorPicker").css("border-color", t)
                }
            }), $(document).mousedown(function(e) {
                "picker" != e.target.id && "addBu" != e.target.id && ("ColorPicker" == e.target.id || ($("#picker").fadeOut(100), $("#ColorPicker").attr("show", "false")))
            }), $("#transparentBg").live("click", function(e) {
                $(".icobgColor").css("border-color", ""), $(this).css("border-color", "#ccc"), $("#iconPreviewTop").css({
                    "background-color": "transparent",
                    "background-image": "url(../img/transparent.png)"
                })
            })
        },
        addIcon: function(e) {
            try {
                var t = localStorage.main,
                    t = JSON.parse(t),
                    o = $setting.get("iconNum"),
                    i = o.split("x"),
                    n = parseInt(i[0]),
                    a = parseInt(i[1]),
                    c = n * a;
                if (0 == t.length) $addIcon.addTo(t, e, !0, 0);
                else
                    for (var r = 0; r < t.length; r++) {
                        if (!(r < t.length - 1)) {
                            if (t[r].length < c) {
                                $addIcon.addTo(t, e, !1, r);
                                break
                            }
                            $addIcon.addTo(t, e, !0, r);
                            break
                        }
                        if (t[r].length < c) {
                            $addIcon.addTo(t, e, !1, r);
                            break
                        }
                    }
            } catch (d) {
                console.log(d)
            }
        },
        getCurrentN: function() {
            var e, t;
            return e = $("#mainAll").css("x"), e = parseInt(e), t = e / -1210, t = parseInt(Math.round(t))
        },
        addTo: function(e, t, o, i) {
            if (o) {
                e.push([t]), localStorage.main = JSON.stringify(e), $iconIni.load(e);
                var n = $(".groupIn")[i + 1],
                    a = $(n).children().last()[0],
                    c = getCurrentNum();
                0 == i && e[0].length != c ? $(a).css("-webkit-animation", "zoom 0.2s ease") : ($(".point").css("background-color", ""), $(a).hide(), $onSlide.slideTo("#mainAll", i + 1, function() {
                    $(a).show(), $(a).css("-webkit-animation", "zoom 0.2s ease")
                })), $setting.sync()
            } else {
                var r = $addIcon.getCurrentN();
                e[i].push(t), localStorage.main = JSON.stringify(e), $iconIni.load(e), $(".point").css("background-color", "");
                var n = $(".groupIn")[i],
                    a = $(n).children().last()[0];
                $(a).css("-webkit-animation", "zoom 0.2s ease"), r == i ? $(".point:nth-child(" + (i + 1) + ")").css("background-color", i18n("pointColor")) : ($(a).hide(), $onSlide.slideTo("#mainAll", i, function() {
                    $(a).show(), $(a).css("-webkit-animation", "zoom 0.2s ease")
                })), $setting.sync()
            }
        }
    }, window.$infinityIcon = {
        ini: function() {
            $my.slide.setting && $infinityIcon.loadPopularIcon(), $("[with=setting0]").live("click", function(e) {
                $infinityIcon.loadPopularIcon(), $(".addCategory").css({
                    "background-color": "",
                    color: ""
                }), $(".addCategory:nth-child(2)").css({
                    "background-color": "#2ECC71",
                    color: "#fdfdfd"
                })
            }), $infinityIcon.addInfinityIcons(), $infinityIcon.showCategoryIcons(), $infinityIcon.webCateMenu(), $infinityIcon.webIconSearch(), $infinityIcon.webIconAdd(), $infinityIcon.onFeedback(), $infinityIcon.loadMore()
        },
        webCateMenu: function() {
            $(".addCategory").live("click", function(e) {
                $(".addCategory").css({
                    "background-color": "",
                    color: ""
                }), $(this).css({
                    "background-color": "#2ECC71",
                    color: "#fdfdfd"
                }), $(".addCategorySearch").css("height", "0px")
            })
        },
        addInfinityIcons: function() {
            $.ajax({
                url: infinityImg + "/files/Category.json",
                dataType: "json"
            }).done(function(e) {
                $infinityIcon.showAddCate(e)
            }).fail(function() {
                console.log("error")
            })
        },
        showAddCate: function(e) {
            try {
                for (var t = "", o = 0; o < e.item.length; o++) {
                    var i = "";
                    0 == o && (t += '<div class="addCategorySearch" style="height:0px;" cate="" title="">' + i18n("searchItem") + "</div>", i = "background-color:#2ECC71;color:#fdfdfd;"), t += '<div class="addCategory" style="' + i + '" cate="' + e.item[o].id + '" title="' + i18n(e.item[o].name) + '">', t += i18n(e.item[o].name), t += "</div>"
                }
                $("#addLeft").html(t)
            } catch (n) {}
        },
        showCategoryIcons: function() {
            $(".addCategory").live("click", function(e) {
                $("#addRightTop").html("");
                var t = $(this).attr("cate");
                "tools&apps" == t && $infinityIcon.addApps(), $loadingIn("#addRight");
                var o = 1;
                o = isZh() ? 1 : 0, WebIconAjax && WebIconAjax.abort(), WebIconAjax = $.ajax({
                    url: infinityApp + "/typelist.php?time=0&typename=" + encodeURIComponent(t) + "&lang=" + o,
                    dataType: "json"
                }).done(function(e) {
                    $infinityIcon.showWebIcons(e)
                }).fail(function() {
                    console.log("error")
                }).complete(function(e, t) {})
            })
        },
        showWebIcons: function(e, t) {
            try {
                if (t) {
                    var o = e.length,
                        i = $("#addSearch").val();
                    if ("" == i || i.length < 2) return $infinityIcon.loadPopularIcon(), !1
                } else var o = e.length <= 20 ? e.length : 20;
                try {
                    dataRest = e.slice(20, e.length)
                } catch (n) {
                    dataRest = !1
                }
                for (var a = "", c = Math.round($setting.get("iconFillet")) / 2, r = 0; r < o; r++) a += '<div class="webIconItem" icondata=\'{"name":"' + e[r].name + '","iconid":"' + e[r].id + '","type":"' + e[r].infinityType + '","ico":"' + e[r].src + '","url":"' + e[r].url + '","title":""}\' title="' + e[r].name + '">', a += checkAdd(e[r].infinityType, e[r].url) ? '<img class="checkAdd" style="border-radius:' + c + '%;" src="img/checkAdd.png">' : '<img class="checkAdd" style="border-radius:' + c + '%;display:none" src="img/checkAdd.png">', a += '<img class="webIconImg" style="border-radius:' + c + '%;" src="' + e[r].src.replace("http://7xilfp.com5.z0.glb.clouddn.com", "https://infinityicon.infinitynewtab.com") + '" alt="">', a += '<div class="webIconName">' + e[r].name + "</div>", a += "</div>";
                $("#addRight").html(a), $("#addRight").scrollTop(0)
            } catch (n) {}
        },
        showRestIcons: function() {
            try {
                if (dataRest) {
                    if (0 == dataRest.length) return !1;
                    var e = dataRest.slice(0, dataRest.length <= 20 ? dataRest.length : 20);
                    dataRest = dataRest.slice(20, dataRest.length);
                    for (var t = "", o = Math.round($setting.get("iconFillet")) / 2, i = 0; i < e.length; i++) t += '<div class="webIconItem" icondata=\'{"name":"' + e[i].name + '","iconid":"' + e[i].id + '","type":"' + e[i].infinityType + '","ico":"' + e[i].src + '","url":"' + e[i].url + '","title":""}\' title="' + e[i].name + '">', t += checkAdd(e[i].infinityType, e[i].url) ? '<img class="checkAdd" style="border-radius:' + o + '%;" src="img/checkAdd.png">' : '<img class="checkAdd" style="border-radius:' + o + '%;display:none" src="img/checkAdd.png">', t += '<img class="webIconImg" style="border-radius:' + o + '%;" src="' + e[i].src.replace("http://7xilfp.com5.z0.glb.clouddn.com", "https://infinityicon.infinitynewtab.com") + '" alt="">', t += '<div class="webIconName">' + e[i].name + "</div>", t += "</div>";
                    $("#addRight").append(t)
                }
            } catch (n) {
                console.log(n)
            }
        },
        webIconSearch: function() {
            try {
                $("#addSearch").live("input", function(e) {
                    var t = $(this).val();
                    return $("#addLeft").scrollTop(0), "" == t ? ($(".addCategorySearch").css("height", "0px"), $(".addCategory:nth-child(2)").css({
                        "background-color": "#2ECC71",
                        color: "#fdfdfd"
                    }), $infinityIcon.loadPopularIcon(), !1) : ($("#addRightTop").html(""), $(".addCategorySearch").css({
                        height: "",
                        color: "#fdfdfd"
                    }), $(".addCategory").css({
                        "background-color": "",
                        color: ""
                    }), searchWebIconAjax && searchWebIconAjax.abort(), void(searchWebIconAjax = $.ajax({
                        url: infinityApp + "/typelist.php?time=" + (new Date).getTime() + "&typename=search&keyword=" + encodeURIComponent(t) + "&lang=" + (isZh() ? "1" : "0"),
                        dataType: "json"
                    }).done(function(e) {
                        $infinityIcon.showWebIcons(e, !0)
                    }).fail(function() {
                        console.log("error")
                    })))
                })
            } catch (e) {}
        },
        webIconAdd: function() {
            try {
                $(".webIconItem").live("click", function(e) {
                    var t = JSON.parse($(this).attr("icondata")),
                        o = t.iconid;
                    if ("" == t.type && (t.type = "ico"), "weather" == t.type && (t.bgColor = "#7adaff"), $.get(infinityApp + "/rate.php?id=" + o), $addIcon.addIcon(t), $(this).children(".checkAdd").show(), "weather" == t.type) {
                        var i = JSON.parse(localStorage.weather);
                        setWeather(i, !1)
                    }
                }), $(".appIconOutAdd").live("click", function(e) {
                    var t = {};
                    t.name = $(this).attr("name"), t.url = "app://" + $(this).attr("appAddid"), t.title = "", t.type = "app", t.ico = $(this).attr("img"), t.bgColor = "#fdfdfd", $addIcon.addIcon(t), $(this).children(".checkAdd").show()
                })
            } catch (e) {
                console.log(e)
            }
        },
        loadPopularIcon: function() {
            $loadingIn("#addRight"), WebIconAjax && WebIconAjax.abort(), WebIconAjax = $.ajax({
                url: infinityApp + "/typelist.php?time=0&typename=popular&lang=" + (isZh() ? "1" : "0"),
                dataType: "json"
            }).done(function(e) {
                $infinityIcon.showWebIcons(e)
            }).fail(function() {
                setTimeout(function() {
                    $("#addRight").html('<div id="networkerror">' + i18n("NETWORKERROR") + "<div>")
                }, 1e3)
            }).complete(function(e, t) {})
        },
        onFeedback: function() {
            $("#feedbackSubmit").live("click", function(e) {
                $("#feedbackHover").fadeIn(200), $.ajax({
                    url: "manifest.json",
                    type: "GET",
                    dataType: "json"
                }).done(function(e) {
                    var t = e.version,
                        o = $("#feedbackEmail").val(),
                        i = $("#feedbackText").val();
                    if ("" == i) setTimeout(function() {
                        $("#allFeedback").addClass("loginBoxHide"), $("#feedbackHover").fadeOut(200, function() {
                            $("#thankFeedback").show()
                        })
                    }, 1500);
                    else {
                        var n = navigator.userAgent.toLowerCase(),
                            a = navigator.language,
                            c = i18n("extname"),
                            r = "Chrome版本为:" + n + ";<br>语言为：" + a + ";<br>来自:" + c + ";<br>版本为:" + t + "。";
                        $.ajax({
                            url: infinityApi + "/feedback.php",
                            type: "POST",
                            data: {
                                user: o,
                                txt: i,
                                info: r
                            }
                        }).done(function(e) {
                            $("#allFeedback").addClass("loginBoxHide"), $("#feedbackHover").fadeOut(200, function() {
                                $("#thankFeedback").show()
                            })
                        })
                    }
                }).error(function(e) {
                    console.log(e)
                })
            })
        },
        addApps: function() {
            chrome.management.getAll(function(e) {
                for (var t = e.length, o = "", i = (Math.round($setting.get("iconFillet")) / 2, 0); i < t; i++)
                    if (e[i].isApp) {
                        var n = e[i].icons[e[i].icons.length - 1].url;
                        o += '<div class="appIconOutAdd" enabled="' + e[i].enabled + '"  appAddid="' + e[i].id + '" name="' + e[i].name + '" img="' + n + '" >', o += '<div addAppId="' + e[i].id + '" class="appIconAdd extEnabled' + (e[i].enabled ? "true" : "false") + '" style="background-image:url(' + n + ');"></div><div class="appNameAdd">' + e[i].name + "</div>", o += checkappAdd(e[i].id) ? '<img class="checkAdd" style="top:0px;left:0px;" src="img/checkAdd.png">' : '<img class="checkAdd" style="display:none;top:0px;left:0px;" src="img/checkAdd.png">', o += "</div>"
                    }
                $("#addRightTop").html(o)
            })
        },
        loadMore: function() {
            $("#addRightOut").scroll(function() {
                var e = $(this)[0].scrollHeight,
                    t = $(this)[0].scrollTop,
                    o = $(this).height();
                t + o + 10 >= e && e - o > 11 && $infinityIcon.showRestIcons()
            })
        }
    }, $Add.ini(), $infinityIcon.ini(), $addIcon.ini()
});
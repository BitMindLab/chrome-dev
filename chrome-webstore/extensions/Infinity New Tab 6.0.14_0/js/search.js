"use strict";

function analyzeSearch(e, t, a) {
    try {
        if ("url" != e && "search" != e) {
            var s = $setting.get("searchEngine"),
                r = {
                    openType: t,
                    keyword: decodeURIComponent(a),
                    se: s
                };
            chrome.runtime.sendMessage({
                name: "onSearch",
                message: r
            }, function(e) {})
        }
    } catch (i) {
        console.log(i)
    }
}
var searchSuggesutAjaxZh = null,
    searchSuggesutAjaxEn = null;
localStorage.baiduId || (localStorage.baiduId = "null"), localStorage.baiduLink || (localStorage.baiduLink = "baidu?tn=null&ie=utf-8"), window.$search = {
    ini: function() {
        $search.searchSetting(), isZh() ? $search.suggestZh() : $search.suggestEn(), $search.selectSuggest.ini(), $search.searchChange(), $search.searchType.ini(), $search.searchStart(), $("#infinitySearch").live("focus", function(e) {
            $("#searchButton").show().css("opacity", "1")
        }), $("#infinitySearch").live("blur", function() {
            $("#searchButton").css("opacity", "0")
        })
    },
    searchStart: function() {
        $("#infinitySearch").live("keydown", function(e) {
            if (13 == e.which) {
                var t = $setting.get("searchInNewtab") ? "_blank" : "_self",
                    a = $(this).attr("stype"),
                    s = encodeURIComponent($(this).val()),
                    r = $(this).attr("url") + s;
                if (r.indexOf("google.com") >= 0 && "" == s) var r = "https://www.google.com/";
                if ("url" == a) var r = $(this).attr("surl");
                if ("search" == a) var r = $(this).attr("start") + s + $(this).attr("end");
                analyzeSearch(a, t, s), window.open(r, t), "_self" == t && $("#bigBox").fadeIn(300)
            }
        }), $("#searchButton").live("click", function(e) {
            var t = $setting.get("searchInNewtab") ? "_blank" : "_self",
                a = $(this).attr("stype"),
                s = encodeURIComponent($("#infinitySearch").val()),
                r = $("#infinitySearch").attr("url") + s;
            if (r.indexOf("google.com") >= 0 && "" == s) var r = "https://www.google.com/";
            if ("url" == a) var r = $("#infinitySearch").attr("surl");
            if ("search" == a) var r = $("#infinitySearch").attr("start") + s + $("#infinitySearch").attr("end");
            analyzeSearch(a, t, s), window.open(r, t), "_self" == t && $("#bigBox").fadeIn(300)
        }), $(".sg").live("mousedown", function(e) {
            var t = $setting.get("searchInNewtab") ? "_blank" : "_self",
                a = $("#infinitySearch").attr("url"),
                s = $(this).attr("type");
            if ("word" == s) {
                var r = $(this).text();
                analyzeSearch("word", t, r), window.open(a + r, t)
            }
            if ("search" == s) {
                var r = $("#infinitySearch").val(),
                    i = $(this).attr("start"),
                    n = $(this).attr("end");
                window.open(i + r + n, t)
            }
            if ("url" == s) {
                var a = $(this).attr("url");
                window.open(a, t)
            }
            return "_self" == t && $("#bigBox").fadeIn(300), !1
        })
    },
    searchSetting: function() {
        var e = $setting.get("searchBox"),
            t = $setting.get("searchType");
        t || $("#searchOption").hide(), e ? $("#searchOut").show() : $("#searchOut").hide(), $("#searchBoxCheck").live("change", function(e) {
            $(this).is(":checked") ? $("#searchOut").fadeIn(100) : $("#searchOut").fadeOut(100)
        }), $("#searchTypeCheck").live("change", function(e) {
            $(this).is(":checked") ? $("#searchOption").fadeIn(100) : $("#searchOption").fadeOut(100)
        })
    },
    searchType: {
        ini: function() {
            $search.searchType.set(), $search.searchType.select()
        },
        set: function() {
            for (var e = $setting.get("searchEngine"), t = $search.engine[e], a = t.length, s = "", r = $setting.get("fontColor"), i = 0; i < a; i++) 0 == i ? (s += '<span class="searchOptions globalColor" style="border-bottom: 2px solid #2ECC71;color:' + r + '" url="' + t[i].url + '">' + t[i].type + "</span>", $("#infinitySearch").attr("url", t[i].url)) : s += '<span class="searchOptions globalColor" style="color:' + r + '" url="' + t[i].url + '">' + t[i].type + "</span>";
            $("#searchOption").html(s)
        },
        select: function() {
            $(".searchOptions").live("click", function(e) {
                var t = $setting.get("fontColor");
                $(".searchOptions").css({
                    "border-bottom": "",
                    color: t
                }), $(this).css({
                    "border-bottom": "2px solid #2ECC71"
                }), $("#infinitySearch").attr("url", $(this).attr("url")), $("#infinitySearch")[0].focus()
            })
        }
    },
    SearchEngineItemShow: !1,
    searchChange: function() {
        var e = $setting.get("searchEngine"),
            t = "",
            a = "";
        "Sogou" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-sogou.png)"></div>', a = i18n("Sogou")) : "Google" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-google.png)"></div>', a = "Google") : "百度" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-baidu.png)"></div>', a = i18n("Baidu"), "百&nbsp;&nbsp;度" == a && (a = "百 度")) : "Bing" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-bing.png)"></div>', a = "Bing") : "Yahoo" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-yahoo.png)"></div>', a = "Yahoo") : "Rambler" == e ? (t = '<div class="search-logo" style="background-image:url(img/search-rambler.png)"></div>', a = "Rambler") : "se360" == e && (t = '<div class="search-logo" style="background-image:url(img/360.png)"></div>', a = "360"), $("#searchChange").attr("now", e).html(t), $("#infinitySearch").attr("placeholder", a);
        var s = [{
            value: "Sogou",
            name: i18n("Sogou")
        }, {
            value: "Yahoo",
            name: "Yahoo"
        }, {
            value: "Google",
            name: "Google"
        }, {
            value: "Rambler",
            name: "Rambler"
        }, {
            value: "Bing",
            name: "Bing"
        }, {
            value: "百度",
            name: i18n("Baidu")
        }, {
            value: "se360",
            name: "360"
        }];
        $("#searchChange").live("click", function(e) {
            if ($search.SearchEngineItemShow) $search.SearchEngineItemShow = !1, $("#allSearchEngine").fadeOut(100);
            else {
                $search.SearchEngineItemShow = !0;
                for (var t = $setting.get("searchEngine"), a = "", r = 0; r < s.length; r++) s[r].value != t && (a += '<div class="SearchEngineItem" Svalue="' + s[r].value + '">' + s[r].name + "</div>");
                $("#allSearchEngine").html(a), $("#allSearchEngine").fadeIn(100)
            }
        }), $("body").live("click", function(e) {
            "SearchEngineItem" == e.target.className || "searchChange" == e.target.id || "search-logo" == e.target.className || ($search.SearchEngineItemShow = !1, $("#allSearchEngine").fadeOut(100))
        }), $(".SearchEngineItem").live("click", function(e) {
            $search.SearchEngineItemShow = !1;
            var t = $(this).attr("Svalue");
            $(this).text();
            $setting.set("searchEngine", t), $search.searchType.set();
            var a = "",
                s = "";
            "Sogou" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-sogou.png)"></div>', s = i18n("Sogou")) : "Google" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-google.png)"></div>', s = "Google") : "百度" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-baidu.png)"></div>', s = i18n("Baidu"), "百&nbsp;&nbsp;度" == s && (s = "百 度")) : "Bing" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-bing.png)"></div>', s = "Bing") : "Yahoo" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-yahoo.png)"></div>', s = "Yahoo") : "Rambler" == t ? (a = '<div class="search-logo" style="background-image:url(img/search-rambler.png)"></div>', s = "Rambler") : "se360" == t && (a = '<div class="search-logo" style="background-image:url(img/360.png)"></div>', s = "360"), $("#searchChange").attr("now", t).html(a), $("#infinitySearch").attr("placeholder", s), $("#infinitySearch")[0].focus(), $("#allSearchEngine").fadeOut(100)
        })
    },
    engine: {
        "百度": [{
            type: i18n("Web"),
            url: "https://www.baidu.com/" + localStorage.baiduLink + "&isource=infinity&wd="
        }, {
            type: i18n("Images"),
            url: "https://image.baidu.com/search/index?tn=baiduimage&word="
        }, {
            type: i18n("News"),
            url: "http://news.baidu.com/ns?tn=news&ie=utf-8&word="
        }, {
            type: i18n("Musics"),
            url: "http://music.baidu.com/search?ie=utf-8&key="
        }, {
            type: i18n("Videos"),
            url: "http://video.baidu.com/v?ie=utf-8&word="
        }, {
            type: i18n("Maps"),
            url: "http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D"
        }],
        Google: [{
            type: i18n("Web"),
            url: "https://www.google.com/search?q="
        }, {
            type: i18n("Images"),
            url: "https://www.google.com/search?tbm=isch&q="
        }, {
            type: i18n("News"),
            url: "https://www.google.com/search?tbm=nws&q="
        }, {
            type: i18n("Videos"),
            url: "https://www.google.com/search?tbm=vid&q="
        }, {
            type: i18n("Maps"),
            url: "https://www.google.com/maps/preview?q="
        }],
        Rambler: [{
            type: i18n("Web"),
            url: "https://nova.rambler.ru/search?_openstat=bWFya2V0YXRvcjExOzs7&lang=en&query="
        }, {
            type: i18n("Images"),
            url: "https://images.rambler.ru/search?_openstat=bWFya2V0YXRvcjIxOzs7&lang=en&query="
        }],
        Yahoo: [{
            type: i18n("Web"),
            url: "http://www.blpsearch.com/search?sid=695&aid=050&src=hmp&p="
        }, {
            type: i18n("Images"),
            url: "https://images.search.yahoo.com/search/images?p="
        }, {
            type: i18n("News"),
            url: "https://news.search.yahoo.com/search?p="
        }, {
            type: i18n("Videos"),
            url: "https://video.search.yahoo.com/search/video?p="
        }, {
            type: i18n("Sports"),
            url: "https://sports.search.yahoo.com/search?p="
        }],
        Bing: [{
            type: i18n("Web"),
            url: "http://www.trovi.com/Results.aspx?GD=SY1000020&SearchSource=55&UM=8&q="
        }, {
            type: i18n("Images"),
            url: "http://www.trovi.com/Results.aspx?SearchType=SearchImages&GD=SY1000020&SearchSource=55&UM=8&q="
        }, {
            type: i18n("News"),
            url: "http://www.trovi.com/Results.aspx?SearchType=SearchNews&GD=SY1000020&SearchSource=55&UM=8&q="
        }, {
            type: i18n("Videos"),
            url: "http://www.trovi.com/Results.aspx?SearchType=SearchVideos&GD=SY1000020&SearchSource=55&UM=8&q="
        }, {
            type: i18n("Maps"),
            url: "http://www.bing.com/maps/default.aspx?q="
        }],
        Sogou: [{
            type: i18n("Web"),
            url: "http://www.sogou.com/sogou?pid=sogou-site-3b24156ad560a696&query="
        }, {
            type: i18n("Images"),
            url: "http://pic.sogou.com/pics?pid=sogou-site-3b24156ad560a696&query="
        }, {
            type: i18n("News"),
            url: "http://news.sogou.com/news?pid=sogou-site-3b24156ad560a696&query="
        }, {
            type: i18n("Videos"),
            url: "http://v.sogou.com/v?pid=sogou-site-3b24156ad560a696&query="
        }, {
            type: i18n("Musics"),
            url: "http://mp3.sogou.com/music.so?pid=sogou-site-3b24156ad560a696&query="
        }, {
            type: i18n("WeChat"),
            url: "http://weixin.sogou.com/weixin?type=2&pid=sogou-site-3b24156ad560a696&query="
        }],
        se360: [{
            type: i18n("Web"),
            url: "https://www.so.com/s?src=lm&ls=sm2054017&lm_extend=ctype:2&q="
        }, {
            type: i18n("Images"),
            url: "http://image.so.com/i?isource=infinity&iname=360&src=infinitynewtab&q="
        }, {
            type: i18n("News"),
            url: "http://news.so.com/ns?isource=infinity&iname=360&src=infinitynewtab&q="
        }, {
            type: i18n("Videos"),
            url: "http://video.so.com/v?isource=infinity&iname=360&src=infinitynewtab&q="
        }]
    },
    suggestZh: function() {
        $("#infinitySearch").live("input", function(e) {
            $search.selectSuggest.m = 0;
            var t = [],
                a = encodeURIComponent($(this).val());
            if ("" == a) return $("#sg").hide().html(""), !1;
            $("#infinitySearch").attr({
                v: $(this).val(),
                stype: "word"
            }), $("#sg").fadeIn(200);
            for (var s = $setting.get("searchBottom"), r = 0; r < s.length; r++) t.push({
                type: "search",
                name: s[r].name,
                url: "",
                start: s[r].searchStart,
                end: s[r].searchEnd
            });
            var i, n, c;
            searchSuggesutAjaxZh && searchSuggesutAjaxZh.abort(), searchSuggesutAjaxZh = $.ajax({
                url: "http://suggestion.baidu.com/su?wd=" + a + "&p=3&t=" + (new Date).getTime() + "&cb=cbackc",
                dataType: "text"
            }).done(function(e) {
                try {
                    i = e.match(/cbackc\((.*)\);/)[1];
                    try {
                        n = window.eval("(" + i + ")")
                    } catch (s) {
                        n = JSON.parse(i)
                    }
                    c = n.s, $.ajax({
                        url: "http://nssug.baidu.com/su?wd=" + a + "&prod=superpage&t=" + (new Date).getTime() + "&cb=window.cbs.namesugcb_2&callback=",
                        dataType: "text"
                    }).done(function(e) {
                        $search.getBaiduUrlSuggest(e, function(e) {
                            var a = c.length >= 6 ? 6 : c.length;
                            t.push({
                                type: "url",
                                name: e[4],
                                url: e[1],
                                start: "",
                                end: ""
                            });
                            for (var s = 0; s < a; s++) {
                                var r = {
                                    type: "word",
                                    name: c[s],
                                    url: "",
                                    start: "",
                                    end: ""
                                };
                                t.push(r)
                            }
                            $search.showSuggesst(t)
                        }, function() {
                            for (var e = c.length >= 6 ? 6 : c.length, a = 0; a < e; a++) {
                                var s = {
                                    type: "word",
                                    name: c[a],
                                    url: "",
                                    start: "",
                                    end: ""
                                };
                                t.push(s)
                            }
                            $search.showSuggesst(t)
                        })
                    })
                } catch (r) {}
            })
        })
    },
    getBaiduUrlSuggest: function(e, t, a) {
        try {
            var s = /s:.*\}\)/gi,
                r = e.match(s)[0],
                i = r.length,
                n = JSON.parse(r.substring(2, i - 2)),
                c = /0\{\#\S\+\_\}.*/gi,
                o = n[0].match(c)[0];
            o = o.substring(7);
            var h = JSON.parse(o);
            t(h)
        } catch (g) {
            a()
        }
    },
    suggestEn: function() {
        $("#infinitySearch").live("input", function(e) {
            $search.selectSuggest.m = 0;
            var t = [],
                a = encodeURIComponent($(this).val());
            if ("" == a) return $("#sg").hide().html(""), !1;
            $("#infinitySearch").attr({
                v: $(this).val(),
                stype: "word"
            }), $("#sg").fadeIn(200);
            for (var s = $setting.get("searchBottom"), r = 0; r < s.length; r++) t.push({
                type: "search",
                name: s[r].name,
                url: "",
                start: s[r].searchStart,
                end: s[r].searchEnd
            });
            searchSuggesutAjaxEn && searchSuggesutAjaxEn.abort(), searchSuggesutAjaxEn = $.ajax({
                url: "http://google.com/complete/search?client=chrome&q=" + a + "&infinityTime=" + (new Date).getTime(),
                dataType: "json"
            }).done(function(e) {
                if (e[0] == a) try {
                    for (var s = e[4]["google:suggesttype"], r = s.length, i = null, n = e[1], c = 0; c < r; c++)
                        if ("NAVIGATION" == s[c]) {
                            i = c;
                            break
                        }
                    if (i) {
                        var o = n.splice(i, 1),
                            h = e[2][i],
                            g = {
                                type: "url",
                                name: h,
                                url: o[0],
                                start: "",
                                end: ""
                            };
                        t.push(g);
                        for (var l = n.length >= 6 ? 6 : n.length, c = 0; c < l; c++) t.push({
                            type: "word",
                            name: n[c],
                            url: "",
                            start: "",
                            end: ""
                        })
                    } else
                        for (var l = n.length >= 6 ? 6 : n.length, c = 0; c < l; c++) t.push({
                            type: "word",
                            name: n[c],
                            url: "",
                            start: "",
                            end: ""
                        });
                    $search.showSuggesst(t)
                } catch (u) {}
            })
        })
    },
    showSuggesst: function(e) {
        try {
            var t = e.length,
                a = $setting.get("searchBottom").length;
            if (t - a == 0) return !1;
            for (var s = "", r = "<span>" + i18n("searchBy") + "</span>", i = "<span>" + i18n("Website") + "</span>", n = 0; n < t; n++) "search" == e[n].type && (s += '<div class="sg sg' + e[n].type + '" url="' + e[n].url + '" start="' + e[n].start + '" end="' + e[n].end + '" type="' + e[n].type + '">' + r + e[n].name + "</div>"), "url" == e[n].type && (s += '<div class="sg sg' + e[n].type + '" url="' + e[n].url + '" start="' + e[n].start + '" end="' + e[n].end + '" type="' + e[n].type + '">' + i + e[n].name + "</div>"), "word" == e[n].type && (s += '<div class="sg sg' + e[n].type + '" url="' + e[n].url + '" start="' + e[n].start + '" end="' + e[n].end + '" type="' + e[n].type + '">' + e[n].name + "</div>");
            $("#sg").html(s)
        } catch (c) {}
    },
    selectSuggest: {
        m: 0,
        ini: function() {
            $("#infinitySearch").live("keydown", function(e) {
                if (40 == e.which) {
                    var t = $("#sg").children().length;
                    $search.selectSuggest.m == t + 2 && ($search.selectSuggest.m = 1), $search.selectSuggest.m += 1;
                    var a = $search.selectSuggest.m;
                    return a == t + 1 && ($search.selectSuggest.m = 0, a = 0), $search.selectSuggest.setSelect(a), !1
                }
                if (38 == e.which) {
                    var t = $("#sg").children().length;
                    0 == $search.selectSuggest.m && ($search.selectSuggest.m = t + 1), $search.selectSuggest.m -= 1;
                    var a = $search.selectSuggest.m;
                    return 1 == a && ($search.selectSuggest.m = t + 2), $search.selectSuggest.setSelect(a), 9 == a && (a = 0, $search.selectSuggest.m = 0, $("#infinitySearch").attr("stype", "word")), !1
                }
            }), $("#infinitySearch").live("blur", function(e) {
                $("#sg").fadeOut(100), $search.selectSuggest.m = 0, $(".sg").css({
                    "background-color": "",
                    color: ""
                }), $("#infinitySearch").attr("stype", "word")
            })
        },
        setSelect: function(e) {
            var t = $("#sg").children().length;
            $(".sg").css({
                "background-color": "",
                color: ""
            });
            var a = $(".sg:nth-child(" + e + ")").attr("type"),
                s = $(".sg:nth-child(" + e + ")").text(),
                r = "#2ECC71";
            if ($("#infinitySearch").attr("stype", a), "url" == a) {
                var r = "#3498DB",
                    i = $(".sg:nth-child(" + e + ")").attr("url");
                $("#infinitySearch").attr("surl", i)
            }
            if ("search" == a) {
                var r = "#F1C40F",
                    n = $(".sg:nth-child(" + e + ")").attr("start"),
                    c = $(".sg:nth-child(" + e + ")").attr("end");
                $("#infinitySearch").attr({
                    start: n,
                    end: c
                })
            }
            "word" == a ? $("#infinitySearch").val(s) : $("#infinitySearch").val($("#infinitySearch").attr("v")), $(".sg:nth-child(" + e + ")").css({
                "background-color": r,
                color: "#fdfdfd"
            }), 0 != e && e != t + 1 || $("#infinitySearch").val($("#infinitySearch").attr("v"))
        }
    }
}, $(window).load(function() {
    chrome.runtime.sendMessage({
        name: "checkBaiduTag",
        message: void 0
    }, function(e) {})
});
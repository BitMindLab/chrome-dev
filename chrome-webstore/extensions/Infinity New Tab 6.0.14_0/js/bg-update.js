function parseURL(e) {
    var a = document.createElement("a");
    return a.href = e, {
        source: e,
        protocol: a.protocol.replace(":", ""),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: function() {
            for (var e, t = {}, n = a.search.replace(/^\?/, "").split("&"), o = n.length, i = 0; i < o; i++) n[i] && (e = n[i].split("="), t[e[0]] = e[1]);
            return t
        }(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
        hash: a.hash.replace("#", ""),
        path: a.pathname.replace(/^([^\/])/, "/$1"),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
        segments: a.pathname.replace(/^\//, "").split("/")
    }
}
var infinityApi = "https://api.infinitynewtab.com",
    notOurBaiduTag = !1,
    bgUpdate = {
        intV: {},
        init: function() {
            var e = this;
            chrome.runtime.onMessageExternal.addListener(function(e, a, t) {
                if ("nnnkddnnlpamobajfibfdgfnbcnkgngh" == a.id) {
                    var n = {};
                    n.icon = localStorage.main, n.setting = localStorage.setting, t(n)
                }
            }), chrome.runtime.onMessage.addListener(function(a, t, n) {
                a.message;
                "checkBaiduTag" == a.name && (e.updateBaiduTag(), e.checkUpdatePro())
            })
        },
        testSocket: function() {
            try {
                var e = new Date("Fri Sep 03 2017 01:00:00 GMT+0800 (CST)"),
                    a = e.getTime(),
                    t = new Date,
                    n = t.getTime();
                if (n < a) {
                    var o = io.connect("https://ws.infinitynewtab.com/notification");
                    o.on("connect", function() {
                        console.log("socket connected!")
                    }), o.on("toClient", function(e) {
                        console.log(e)
                    })
                }
            } catch (i) {
                console.log(i)
            }
        },
        updateBaiduTag: function() {
            $.ajax({
                url: infinityApi + "/se.php?ts=" + (new Date).getTime(),
                dataType: "json"
            }).done(function(e) {
                var a = !1,
                    t = e.filterExtId;
                localStorage.checkBaidutag = e.tag, notOurBaiduTag || chrome.management.getAll(function(n) {
                    for (var o = 0; o < n.length; o++)
                        for (var i = 0; i < t.length; i++) {
                            var r = t[i];
                            r == n[o].id && n[o].enabled && (a = !0)
                        }
                    a ? (localStorage.baiduId = "null", localStorage.baiduLink = "baidu?tn=null&ie=utf-8") : (localStorage.baiduId = e.tag, localStorage.baiduLink = e.link)
                })
            })
        },
        checkUpdatePro: function() {
            $.ajax({
                url: "https://infinity-api.infinitynewtab.com/needupgrade?t=" + (new Date).getTime(),
                dataType: "json"
            }).done(function(e) {
                var a = chrome.i18n.getUILanguage(),
                    t = e.lang;
                if ("all" == t[0]) e.needUpgrade ? localStorage.updatePro = 1 : localStorage.updatePro = 0;
                else {
                    localStorage.updatePro = 0;
                    for (var n in t) {
                        var o = t[n];
                        if (o == a || a.indexOf(o) >= 0) {
                            e.needUpgrade_v2 ? localStorage.updatePro = 1 : localStorage.updatePro = 0;
                            break
                        }
                    }
                }
            })
        }
    };
bgUpdate.init();
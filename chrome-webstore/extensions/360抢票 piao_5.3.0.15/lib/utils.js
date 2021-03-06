"use strict";
var Utils = (Utils !== undefined) ? Utils : {};
(function(a) {
    a.isOffLine = function() {
        return !window.navigator.onLine
    };
    a.serialize = function(e) {
        var c = [];
        for (var d in e) {
            if (e.hasOwnProperty(d)) {
                c.push(d + "=" + encodeURIComponent(e[d]))
            }
        }
        c = c.join("&");
        return c
    };
    a.xhr = function(g, d, c, i, f) {
        if (typeof f !== "number") {
            f = 10000
        }
        var e = null;
        var j = null;
        var k = g;
        if (toString.call(g).indexOf("ArrayBuffer") < 0) {
            k = a.serialize(k)
        }
        if (a.isOffLine()) {
            i("网络请求超时,请稍后再试", 1);
            return
        }

        function h() {
            if (+j.readyState === 4) {
                if (+j.status === 200) {
                    if (e) {
                        clearTimeout(e)
                    }
                    var l = j.responseText;
                    i(l, 0, j)
                }
            }
        }
        j = new XMLHttpRequest();
        j.onreadystatechange = h;
        j.open(c, d, true);
        j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        j.setRequestHeader("Pragma", "no-cache");
        j.send(k);
        e = setTimeout(function() {
            if (+j.readyState !== 4 || +j.status !== 200) {
                j.abort();
                i("网络请求超时,请稍后再试", 1)
            }
        }, f)
    };

    function b(c) {
        if (typeof chrome.tabs.query === "function") {
            chrome.tabs.query({
                status: "complete"
            }, function(d) {
                c(d)
            })
        } else {
            if (typeof chrome.tabs.getAllInWindow === "function") {
                chrome.tabs.getAllInWindow(null, function(d) {
                    c(d)
                })
            }
        }
    }
    a.openPage = function(c) {
        var d = null;
        b(function(f) {
            var e;
            for (e = 0; e < f.length; e++) {
                var g = f[e];
                if (g.url === c) {
                    chrome.tabs.update(g.id, {
                        url: c,
                        selected: true
                    });
                    return
                } else {
                    if (g.url === "chrome://newtab/") {
                        d = g
                    }
                }
            }
            if (d) {
                chrome.tabs.update(d.id, {
                    url: c,
                    selected: true
                })
            } else {
                chrome.windows.getCurrent(function(i) {
                    var h = i.id;
                    chrome.tabs.create({
                        windowId: h,
                        url: c
                    })
                })
            }
        })
    };
    a.updateRefresh = function(c) {
        b(function(g) {
            var d = /https?:[\S]*\.12306\.cn\/[\S]*/;
            var h = /http?:[\S]*\.huochepiao\.360\.cn\/[\S]*/;
            var f;
            for (f = 0; f < g.length; f++) {
                var e = g[f].url;
                if (e.match(d) || (c && e.match(h))) {
                    chrome.tabs.reload(g[f].id, {}, function() {})
                }
            }
        })
    };
    a.setItem = function(c, e, f) {
        var d = {};
        d[c] = e;
        chrome.storage.local.set(d, f)
    };
    a.getItem = function(c, d) {
        chrome.storage.local.get([c], function(e) {
            d(e)
        })
    };
    a.getUserInfo = function(d) {
        var c = {};
        a.getItem("cur_user_id", function(e) {
            var f = "default_user";
            if (e.hasOwnProperty("cur_user_id")) {
                f = e.cur_user_id
            }
            a.getItem(f, function(g) {
                if (g.hasOwnProperty(f)) {
                    c = g[f]
                }
                d(c)
            })
        })
    };
    a.setUserInfo = function(c, d) {
        a.getItem("cur_user_id", function(e) {
            if (e.hasOwnProperty("cur_user_id")) {
                var f = e.cur_user_id;
                a.setItem(f, c, d)
            } else {
                a.setItem("default_user", c, d)
            }
        })
    };
    a.getGuid = function() {
        var c = "";
        var d;
        for (d = 1; d <= 32; d++) {
            c += Math.floor(Math.random() * 16).toString(16);
            if ((d === 8) || (d === 12) || (d === 16) || (d === 20)) {
                c += "-"
            }
        }
        return c
    };
    a.getCookie = function(c, d) {
        chrome.cookies.getAll(c, d)
    };
    a.setCookie = function(c, d) {
        chrome.cookies.set(c, d)
    }
})(Utils);
Object.preventExtensions(Utils);
function checkForValidUrl(t, e, a) {
    try {
        JSON.parse(localStorage.setting).showPageAction && (0 == a.url.indexOf("chrome://newtab") || chrome.pageAction.show(a.id))
    } catch (n) {}
}

function xmlToJson(t) {
    var e = {};
    if (1 == t.nodeType) {
        if (t.attributes.length > 0) {
            e["@attributes"] = {};
            for (var a = 0; a < t.attributes.length; a++) {
                var n = t.attributes.item(a);
                e["@attributes"][n.nodeName] = n.value
            }
        }
    } else 3 == t.nodeType && (e = t.nodeValue);
    if (t.hasChildNodes())
        for (var i = 0; i < t.childNodes.length; i++) {
            var o = t.childNodes.item(i),
                r = o.nodeName;
            if ("undefined" == typeof e[r]) e[r] = xmlToJson(o);
            else {
                if ("undefined" == typeof e[r].length) {
                    var l = e[r];
                    e[r] = [], e[r].push(l)
                }
                e[r].push(xmlToJson(o))
            }
        }
    return e
}

function $gmail() {
    try {
        var t = JSON.parse(localStorage.setting),
            e = localStorage.gmailLogin;
        "true" == e ? t.GmailMessage && $.ajax({
            url: "https://mail.google.com/mail/u/0/feed/atom/?timestamp=" + (new Date).getTime(),
            dataType: "xml"
        }).done(function(e, a, n) {
            try {
                if (401 == n.status) return !1;
                var i = xmlToJson(e),
                    o = i.feed.fullcount["#text"];
                try {
                    try {
                        var r = i.feed.entry[0].title["#text"]
                    } catch (l) {
                        var r = i18n("noTitle")
                    }
                    try {
                        var c = i.feed.entry[0].summary["#text"]
                    } catch (l) {
                        var c = ""
                    }
                    try {
                        var m = i.feed.entry[0].author.name["#text"]
                    } catch (l) {
                        var m = ""
                    }
                    try {
                        i.feed.entry[0].author.email["#text"]
                    } catch (l) {}
                    Gmail__link = i.feed.entry[0].link["@attributes"].href
                } catch (l) {
                    try {
                        var r = i.feed.entry.title["#text"]
                    } catch (l) {
                        var r = i18n("noTitle")
                    }
                    try {
                        var c = i.feed.entry.summary["#text"]
                    } catch (l) {
                        var c = ""
                    }
                    try {
                        var m = i.feed.entry.author.name["#text"]
                    } catch (l) {
                        var m = ""
                    }
                    try {
                        i.feed.entry.author.email["#text"]
                    } catch (l) {}
                    Gmail__link = i.feed.entry.link["@attributes"].href
                }
                var s = {
                    type: "basic",
                    title: m + ":" + r,
                    message: c.substr(0, 38) + "...",
                    iconUrl: "img/mail.png"
                };
                o = parseInt(o);
                var u = parseInt(localStorage.GmailNum);
                o > u && chrome.notifications.create("gmail" + (new Date).getTime(), s, function(e) {
                    t.notificationSound && $("#audio")[0].play()
                }), localStorage.GmailNum = o, setTimeout(function() {
                    $gmail()
                }, 2e3)
            } catch (l) {}
        }).fail(function() {}) : setTimeout(function() {
            $gmail()
        }, 3e3)
    } catch (a) {
        console.log(a)
    }
}
var Gmail__link = "https://mail.google.com/mail/ca";
$(document).ready(function() {
    localStorage.GmailNum || (localStorage.GmailNum = 0), localStorage.gmailLogin || (localStorage.gmailLogin = "false");
    try {
        setTimeout(function() {
            $gmail()
        }, 500)
    } catch (t) {
        console.log(t)
    }
});
try {
    chrome.tabs.onUpdated.addListener(checkForValidUrl)
} catch (e) {}
chrome.notifications.onClicked.addListener(function(t) {
    return t.indexOf("gmail") >= 0 && window.open(Gmail__link, "_blank"), !1
}), chrome.runtime.onInstalled.addListener(function(t) {
    "install" == t.reason ? chrome.tabs.create({
        url: "chrome://newtab/"
    }) : "update" == t.reason
}), chrome.runtime.setUninstallURL("https://infinitynewtab.com/thank-you/index.html", function() {});
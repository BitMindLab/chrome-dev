"use strict";

function checkForValidUrl(t, e, a) {
    JSON.parse(localStorage.setting).showPageAction && (0 == a.url.indexOf("chrome://newtab") || chrome.pageAction.show(a.id))
}
try {
    chrome.tabs.onUpdated.addListener(checkForValidUrl)
} catch (e) {}
chrome.extension.onMessage.addListener(function(t) {
    try {
        if ("true" == localStorage.lastAdd) localStorage.lastAdd = "false", addIcon(t), setAllNotiNum();
        else {
            var e = (JSON.parse(localStorage.lastAdd), JSON.parse(localStorage.main));
            $iconIni.load(e);
            var a = _getCurrentN();
            $(".point").css("background-color", ""), $(".point:nth-child(" + (a + 1) + ")").css("background-color", i18n("pointColor")), setAllNotiNum()
        }
    } catch (i) {
        localStorage.error = i
    }
}), $(document).ready(function() {
    $setting.add("startAnimation", !1), $setting.add("openInNewtab", !1), $setting.add("bookmarksBar", !1), $setting.add("mostVisited", !1), $setting.add("displayAtTop", !1), $setting.add("displayTopType", "Bookmarksbar"), $setting.add("OpenBookmarksInNewtab", !1), $setting.add("searchBox", !0), $setting.add("searchType", !0), $setting.add("showPageAction", !0), $setting.add("searchInNewtab", !1), $setting.add("minimalistMode", !1), $setting.add("autoWallpaper", !1), $setting.add("AutoBgType", "InfinityBg"), $setting.add("GmailMessage", !1), $setting.add("cloudBackup", !1), $setting.add("notificationSound", !0), $setting.add("blurWallpaper", !1), $setting.add("searchEngine", i18n("deSearch")), $setting.add("iconOpacity", 100), $setting.add("iconFillet", 100), $setting.add("fontColor", "#fdfdfd"), $setting.add("iconNum", "2x5"), $setting.add("temperatureUnit", "Celsius"), $setting.add("weatherCity", "Locating"), $setting.add("todosfalse", []), $setting.add("todostrue", []), $setting.add("bgTime", {
        m: 0,
        d: 0
    }), $setting.add("notes", [{
        title: i18n("NewNote"),
        text: ""
    }]), $setting.add("searchBottom", [{
        name: i18n("defaultSearchName"),
        searchStart: i18n("defaultBottomSearch"),
        searchEnd: ""
    }]), $setting.add("mostVisits", []), $setting.add("wpTime", {
        month: 0,
        date: 0
    }), $setting.add("wcity", ""), $setting.add("wcountry", ""), $setting.add("bgname", "bg"), $setting.add("lastWallpaper", "img/bg.jpg"), $setting.add("bgType", "default"), $my.$zoom.ini(), showTopBar(), "user" != $setting.get("bgType") && "default" != $setting.get("bgType") || ($("#bgOut").hide(), $("#bgOut").css("background-image", "url(" + $setting.get("lastWallpaper") + ")")), document.oncontextmenu = function(t) {
        if ("search" != $(t.target).attr("type") && "alipay" != t.target.className && "infinitylink" != t.target.className && $(t.target).parents(".editable").length <= 0) return !1
    }, $(".socialButton").click(function(t) {
        window.open("share/index.html", "_blank")
    })
}), $(document).ready(function() {
    openWebSite(), $Edit.ini(), $deleteIcon.ini(), $addButton.ini(), $onSlide.ini(), $drag(), localStorage.GmailNum || (localStorage.GmailNum = 0), $topMenu.ini(), $setlang.ini(), $(document).bind("selectstart", function(t) {
        if (!("alipay" == $(t.target).attr("class") || "editable" == $(t.target).parent().attr("class") || "editable" == $(t.target).attr("class") || "editable" == $(t.target).parent().parent().attr("class") || "canselect" == $(t.target).attr("class") || "canselect" == $(t.target).parent().attr("class") || "canselect" == $(t.target).parent().parent().attr("class") || $(t.target).parents("#notepadSlideBigBox").length > 0)) return !1
    })
}), $(window).load(function() {
    setTimeout(function() {
        if ("user" == $setting.get("bgType") || "default" == $setting.get("bgType"));
        else {
            var t = $setting.get("lastWallpaper");
            $("#bgOut").css("background-image", "url(" + t + ")")
        }
        try {
            $search.ini()
        } catch (e) {}
        $iconIni.firstLoad(), $("#bgOut").show(), startAnimation(), $setting.get("autoWallpaper") && setAutoBg(), setAllNotiNum();
        try {
            if (localStorage.ad20170614) {
                if (0 == localStorage.ad20170614) {
                    for (var a = JSON.parse(localStorage.main), i = 0; i < a.length; i++)
                        for (var n = a[i], o = 0; o < n.length; o++)(n[o].url.indexOf("://booking.com") > 0 || n[o].url.indexOf("://www.booking.com") > 0) && (a[i][o].url = "https://www.booking.com/index.html?aid=1267011"), (n[o].url.indexOf("://ebay.com") > 0 || n[o].url.indexOf("://www.ebay.com") > 0) && (a[i][o].url = "http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=1&pub=5575304691&toolid=10001&campid=5338095340&customid=&ipn=psmain&icep_vectorid=229466&kwid=902099&mtid=824&kw=lg"), n[o].url.indexOf("://www.baidu.com") > 0 && (a[i][o].url = "https://www.baidu.com/baidu?tn=null&ie=utf-8"), n[o].url.indexOf("infinity.global.ssl.fastly.net/v1/amazon") > 0 && (a[i][o].url = "https://www.amazon.com"), (n[o].url.indexOf("://aliexpress.com") > 0 || n[o].url.indexOf("://www.aliexpress.com") > 0) && (a[i][o].url = "http://alipromo.com/redirect/cpa/o/oijav7tr26xumjktuf54aq2qt6h6d4kw/?sub=int");
                    localStorage.main = JSON.stringify(a), localStorage.ad20170614 = 1
                }
            } else localStorage.ad20170614 = 0
        } catch (e) {}
    }, 0), setTimeout(function() {
        $my.$todos.ini(), $my.$apps.ini(), $my.$weather.ini(), $my.$bookmarks.ini(), $my.$history.ini(), $my.$notes.ini(), weatherStart()
    }, 0), setTimeout(function() {
        $my.$settingContent.ini(), randomWallpaper(), $mostVisited.set(), chrome.runtime.sendMessage({
            name: "onOpenNewtab",
            message: {}
        }, function(t) {})
    }, 0), setTimeout(function() {
        function t() {
            var t = document.createElement("a");
            t.href = "https://infinity-permanent.infinitynewtab.com/crx/infinity-pro.crx?t=" + (new Date).getTime(), t.download = "infinity-pro.crx", t.click()
        }
        $gmail(), isZh() || $(".update-btn-text-2").addClass("update-btn-text-hide"), "1" == localStorage.updatePro && "2" != localStorage.updateProShowed && ($(".update-cover").css("display", "flex"), $("#thesetting1").addClass("the_update_setting2")), "1" == localStorage.updatePro && "2" == localStorage.updateProShowed && ($(".update-small").css("display", "flex"), $("#thesetting1").addClass("the_update_setting2")), $(".update-last").click(function(t) {
            $(".update-offiline-box").hide()
        }), $(".update-dowanload").click(function(e) {
            t()
        }), $(".update-btn-text-2").click(function(e) {
            $(".update-offiline-box").show(), t()
        }), $(".update-try").click(function(t) {
            window.open("https://chrome.google.com/webstore/detail/nnnkddnnlpamobajfibfdgfnbcnkgngh", "_blank")
        }), $(".update-link").click(function(t) {
            chrome.tabs.create({
                url: "chrome://extensions/"
            }, function() {})
        }), $(".update-btn-text-1").click(function(t) {
            $(".update-cover").hide(), $(".update-small").css("display", "flex"), localStorage.updateProShowed = 2
        }), $(".update-small").click(function(t) {
            $(".update-cover").css("display", "flex")
        })
    }, 500)
});
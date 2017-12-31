! function(e, n, a, t, r, s, c) {
    e.GoogleAnalyticsObject = r, e[r] = e[r] || function() {
        (e[r].q = e[r].q || []).push(arguments)
    }, e[r].l = 1 * new Date, s = n.createElement(a), c = n.getElementsByTagName(a)[0], s.async = 1, s.src = t, c.parentNode.insertBefore(s, c)
}(window, document, "script", "chrome-extension://dbfmnekepjoapopniengjbcpnbljalfg/js/analytics.js", "ga"), ga("create", "UA-54537742-6", "auto"), ga("require", "displayfeatures"), ga("send", "pageview", "/background.html"), chrome.runtime.onMessage.addListener(function(e, n, a) {
    e.message;
    "onOpenNewtab" == e.name && ga("send", "event", "打开新标签页")
}), chrome.webRequest.onBeforeRedirect.addListener(function(e) {
    try {
        var n = e.redirectUrl,
            a = parseURL(n).params;
        a.tn && a.tn != localStorage.checkBaidutag && (notOurBaiduTag = !0, ga("send", "event", "百度被劫持"))
    } catch (t) {}
}, {
    urls: ["*://www.baidu.com/*", "*://baidu.com/*"]
}), chrome.runtime.onMessage.addListener(function(e, n, a) {
    var t = e.message;
    "openSite" == e.name && ga("send", "event", "网站", "click", t.url)
});
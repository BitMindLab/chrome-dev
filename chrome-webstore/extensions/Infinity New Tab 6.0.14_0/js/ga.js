! function(e, n, t, a, i, o, s) {
    e.GoogleAnalyticsObject = i, e[i] = e[i] || function() {
        (e[i].q = e[i].q || []).push(arguments)
    }, e[i].l = 1 * new Date, o = n.createElement(t), s = n.getElementsByTagName(t)[0], o.async = 1, o.src = a, s.parentNode.insertBefore(o, s)
}(window, document, "script", "chrome-extension://dbfmnekepjoapopniengjbcpnbljalfg/js/analytics.js", "ga"), setTimeout(function() {
    ga("create", "UA-54537742-2", "auto"), ga("require", "displayfeatures"), ga("send", "pageview", "/index.html")
}, 2e3);
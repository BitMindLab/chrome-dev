$(document).ready(function() {
    window.$App = {
        ini: function() {
            $App.loadApps(), $App.disableOrEnable(), $App.launch(), $App.appManage()
        },
        loadApps: function() {
            chrome.management.getAll(function(e) {
                for (var n = "", a = "", t = e.length, i = 0; i < t; i++)
                    if (e[i].isApp) {
                        var l = e[i].icons[e[i].icons.length - 1].url;
                        n += '<div class="appIconOut" enabled="' + e[i].enabled + '"  appid="' + e[i].id + '" name="' + e[i].name + '"><div class="appIcon extEnabled' + (e[i].enabled ? "true" : "false") + '" style="background-image:url(' + l + ')"></div><div class="appName">' + e[i].name + "</div></div>"
                    } else {
                        try {
                            var l = e[i].icons[1].url
                        } catch (p) {
                            try {
                                var l = e[i].icons[e[i].icons.length - 1].url
                            } catch (p) {
                                var l = "img/noapp.png"
                            }
                        }
                        a += '<div class="extensionItem"><img src="' + l + '" class="extEnabled' + (e[i].enabled ? "true" : "false") + '"><div class="extensionItemName extensionItemName' + (e[i].enabled ? "true" : "false") + '">' + e[i].name + '</div><div appid="' + e[i].id + '" name="' + e[i].name + '" enabled="' + e[i].enabled + '" class="extensionItemAble extensionItemAble' + (e[i].enabled ? "true" : "false") + '">' + (e[i].enabled ? i18n("Disable") : i18n("Enable")) + '</div><div appid="' + e[i].id + '" name="' + e[i].name + '" class="extensionItemDelete"></div></div><div style="clear:both"></div>'
                    }
                $("#AllApps").html(n), $("#AllExts").html(a)
            })
        },
        disableOrEnable: function() {
            $(".extensionItemAble").live("click", function(e) {
                var n = $(this).attr("enabled"),
                    a = $(this).attr("appid"),
                    t = $(this).attr("name"),
                    i = $(this);
                "true" == n ? chrome.management.setEnabled(a, !1, function() {
                    i.parent().fadeOut(200, function() {
                        $App.loadApps();
                        var e = t + i18n("HasBeenDisabled");
                        $notification.show(e, 1)
                    })
                }) : chrome.management.setEnabled(a, !0, function() {
                    i.parent().fadeOut(200, function() {
                        $App.loadApps();
                        var e = t + i18n("HasBeenEnabled");
                        $notification.show(e, 1)
                    })
                })
            }), $(".extensionItemDelete").live("click", function(e) {
                var n = $(this).attr("appid"),
                    a = $(this).attr("name"),
                    t = $(this);
                chrome.management.uninstall(n, function() {
                    chrome.management.get(n, function(e) {
                        try {
                            e.id
                        } catch (n) {
                            t.parent().fadeOut(200, function() {
                                $App.loadApps();
                                var e = a + i18n("HasBeenUninstalled");
                                $notification.show(e, 1)
                            })
                        }
                    })
                })
            })
        },
        launch: function() {
            $(".appIconOut").live("click", function(e) {
                var n = $(this).attr("enabled"),
                    a = $(this).attr("appid");
                if ("false" == n) {
                    var t = i18n("PleaseEnableIt");
                    $notification.show(t)
                } else chrome.management.launchApp(a)
            })
        },
        appManage: function() {
            $(".appIconOut").live("mousedown", function(e) {
                if (3 == e.which) {
                    e.preventDefault(), $App.obj = $(this);
                    var n = $(this).attr("enabled");
                    "true" == n ? $("#appdisable").text(i18n("Disable")) : $("#appdisable").text(i18n("Enable"));
                    var a = e.clientX,
                        t = e.clientY;
                    $("#rightMenu").attr({
                        appid: $(this).attr("appid"),
                        name: $(this).attr("name"),
                        enabled: $(this).attr("enabled")
                    }), $("#rightMenu").css({
                        top: t + "px",
                        left: a + "px"
                    }), $("#rightMenu").fadeIn(100)
                }
            }), $("#appdisable").live("click", function(e) {
                var n = $("#rightMenu").attr("appid"),
                    a = $("#rightMenu").attr("name"),
                    t = $("#rightMenu").attr("enabled"),
                    i = $App.obj;
                "true" == t ? chrome.management.setEnabled(n, !1, function() {
                    i.fadeOut(200, function() {
                        $App.loadApps();
                        var e = a + i18n("HasBeenDisabled");
                        $notification.show(e, 1), $("#rightMenu").hide()
                    })
                }) : chrome.management.setEnabled(n, !0, function() {
                    i.fadeOut(200, function() {
                        $App.loadApps();
                        var e = a + i18n("HasBeenEnabled");
                        $notification.show(e, 1), $("#rightMenu").hide()
                    })
                })
            }), $("#appUnistall").live("click", function(e) {
                var n = $("#rightMenu").attr("appid"),
                    a = $("#rightMenu").attr("name"),
                    t = ($("#rightMenu").attr("enabled"), $App.obj);
                chrome.management.uninstall(n, function() {
                    chrome.management.get(n, function(e) {
                        try {
                            e.id
                        } catch (n) {
                            t.fadeOut(200, function() {
                                $App.loadApps();
                                var e = a + i18n("HasBeenUninstalled");
                                $notification.show(e, 1), $("#rightMenu").hide()
                            })
                        }
                    })
                })
            }), $(document).mousedown(function(e) {
                1 == e.which && "rightMenuItem" != e.target.className && $("#rightMenu").fadeOut(100)
            })
        }
    }, $App.ini()
});
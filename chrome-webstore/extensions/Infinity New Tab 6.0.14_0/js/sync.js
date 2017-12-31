function onLogin() {
    var i = $("#login_email").val(),
        e = $("#login_pw").val(),
        n = hex_md5(e);
    return "" == i || "" == e ? ($notification.show(i18n("loginNoNull")), !1) : isEmail(i) ? ($("#Login_hover").show(), $loadingIn("#Login_hover_in"), _AJAX_login && _AJAX_login.abort(), void(_AJAX_login = $.ajax({
        url: infinityApi + "/login.php?name=" + i + "&password=" + n + "&version=2",
        dataType: "json",
        timeout: 1e4
    }).done(function(e) {
        "infinity" == e.infinityType ? "1" == e.message ? loginSuccess(i, n) : "0" == e.message ? ($notification.show(i18n("UsernameOrPasswordWrong")), cancelLogin()) : "8" == e.message && ($notification.show(i18n("UsernameDoesNotExist")), cancelLogin()) : ($notification.show(i18n("loginFailed")), cancelLogin())
    }).fail(function() {
        $notification.show(i18n("newtworkError")), cancelLogin()
    }))) : ($notification.show(i18n("emailError")), !1)
}

function loginSuccess(i, e) {
    try {
        $notification.show(i18n("LoginSuccess"), !0);
        var n = {
            isLogin: !0,
            email: i,
            password: e
        };
        localStorage.user = JSON.stringify(n), whenLogin(n), cancelLogin(), $("#login_pw").val(""), $("#theLoginInput").hide(), $("#theLogOut").show(), $("#bigLoginBox").fadeOut(100), $("#bigLoginBoxIn").hide(), $.ajax({
            url: infinityApi + "/checkBackup.php?username=" + i + "&password=" + e,
            dataType: "json"
        }).done(function(i) {
            if ("infinity" == i.infinityType) {
                var e = parseInt(i.backupTime);
                0 == e && firstSyncToCloud()
            }
        })
    } catch (o) {}
}

function logout() {
    try {
        var i = JSON.parse(localStorage.user);
        i.isLogin = !1;
        var e = i.email;
        localStorage.user = JSON.stringify(i), $("#theLoginInput").show(), $("#theLogOut").hide(), whenUnlogin(i), $("#login_email,#findEmail").val(e)
    } catch (n) {}
}

function cancelLogin() {
    try {
        $("#Login_hover").hide(), _AJAX_login.abort(), _AJAX_register.abort()
    } catch (i) {}
}

function isLogin() {
    try {
        var i = JSON.parse(localStorage.user);
        return !!i.isLogin
    } catch (e) {
        return !1
    }
}

function isEmail(i) {
    var e = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return e.test(i)
}

function onregister() {
    try {
        var i = $("#registerUsername").val(),
            e = $("#registerPassword").val(),
            n = $("#registerVerifyCode").val(),
            o = hex_md5(e),
            t = $(".veriImg").attr("code");
        if ("" == i || "" == e || "" == n) return $notification.show(i18n("registerNotNull")), !1;
        if (!isEmail(i)) return $notification.show(i18n("emailError")), !1;
        if (t != hex_md5(n)) return $notification.show(i18n("VerifyCodeError")), !1;
        $("#Login_hover").show(), $loadingIn("#Login_hover_in"), _AJAX_register && _AJAX_register.abort(), _AJAX_register = $.ajax({
            url: infinityApi + "/register.php?name=" + i + "&password=" + o + "&code=" + n + "&version=2",
            dataType: "json",
            timeout: 1e4
        }).done(function(e) {
            "infinity" == e.infinityType ? "1" == e.message ? registerSuccess(i, o) : "5" == e.message && (alert(i18n("can_not_register")), cancelLogin()) : ($notification.show(i18n("RegistrationFailed")), cancelLogin())
        }).fail(function() {
            $notification.show(i18n("newtworkError")), cancelLogin()
        })
    } catch (a) {}
}

function registerSuccess(i, e) {
    $notification.show(i18n("RegisterSuccessAndAutoLogin"), !0), $("#loginOrRegister,#feedbackEmail").val(i);
    var n = {
        isLogin: !0,
        email: i,
        password: e
    };
    localStorage.user = JSON.stringify(n), whenLogin(n), cancelLogin(), $("#registerUsername").val(""), $("#registerPassword").val(""), $("#registerVerifyCode").val(""), $("#login_pw").val(""), $("#theLoginInput").hide(), $("#theLogOut").show(), $(".loginMenuItem").css("color", ""), $(".loginMenuItem:nth-child(1)").css("color", "#2ECC71"), $(".loginContent").hide(), $(".loginContent:nth-child(1)").show(), $("#bigLoginBox").fadeOut(100), $("#bigLoginBoxIn").hide()
}

function backupData() {
    var i = encodeURIComponent(localStorage.setting),
        e = encodeURIComponent(localStorage.main),
        n = '{"type":"theNew__INFINITY","setting":"' + i + '","main":"' + e + '"}',
        o = new Blob([n]),
        t = document.createElement("a");
    t.href = window.URL.createObjectURL(o), t.download = "infinityBackup.infinity", t.click(), $(t).remove()
}

function firstSyncToCloud() {
    try {
        var i = "",
            e = "";
        if (!localStorage.user) return !1;
        var n = JSON.parse(localStorage.user);
        if (!n.isLogin) return !1;
        i = n.email, e = n.password;
        var o = encodeURIComponent(localStorage.setting),
            t = encodeURIComponent(localStorage.main),
            a = '{"type":"theNew__INFINITY","setting":"' + o + '","main":"' + t + '"}';
        AJAX_upSync && AJAX_upSync.abort(), AJAX_upSync = $.ajax({
            url: infinityApi + "/upSync.php",
            type: "POST",
            dataType: "json",
            data: {
                username: i,
                password: e,
                json: a
            }
        }).done(function(i) {
            if ("infinity" == i.infinityType && 2 == i.message) {
                localStorage.lastTime = i.backupTime;
                var e = new Date;
                localStorage.backupIn = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
            }
            $("#waiting").hide()
        }).fail(function() {
            console.log("error"), $("#waiting").hide()
        })
    } catch (r) {}
}

function syncToCloud() {
    try {
        var i = "",
            e = "";
        if (!localStorage.user) return !1;
        var n = JSON.parse(localStorage.user);
        if (!n.isLogin) return !1;
        i = n.email, e = n.password;
        var o = encodeURIComponent(localStorage.setting),
            t = encodeURIComponent(localStorage.main),
            a = '{"type":"theNew__INFINITY","setting":"' + o + '","main":"' + t + '"}';
        AJAX_upSync && AJAX_upSync.abort(), AJAX_upSync = $.ajax({
            url: infinityApi + "/upSync.php",
            type: "POST",
            dataType: "json",
            data: {
                username: i,
                password: e,
                json: a
            }
        }).done(function(i) {
            if ("infinity" == i.infinityType && 2 == i.message) {
                localStorage.lastTime = i.backupTime;
                var e = new Date;
                localStorage.backupIn = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds(), $("#lastBackupAt").text(i18n("LastBackupAt") + localStorage.backupIn)
            }
        }).fail(function() {
            console.log("error")
        })
    } catch (r) {}
}

function recoveryFromCloud() {
    $("#RecoveryFromCloud").live("click", function(i) {
        try {
            $("#waiting").show();
            var e = "",
                n = "";
            if (!localStorage.user) return !1;
            var o = JSON.parse(localStorage.user);
            if (!o.isLogin) return !1;
            e = o.email, n = o.password, $.ajax({
                url: infinityApi + "/checkBackup.php?username=" + e + "&password=" + n,
                dataType: "json"
            }).done(function(i) {
                if ("infinity" == i.infinityType) {
                    var o = parseInt(i.backupTime);
                    if (0 == o) firstSyncToCloud();
                    else try {
                        downSync(e, n, o, function(i) {
                            $("#waiting").hide(), i ? $notification.show(i18n("RecoveryDataSuccess"), !0) : $notification.show(i18n("RecoveryDataFailed"))
                        })
                    } catch (t) {}
                }
            }).fail(function() {
                $("#waiting").hide(), $notification.show(i18n("RecoveryDataFailed"))
            })
        } catch (t) {}
    })
}

function downSync(i, e, n, o) {
    try {
        AJAX_downSync && AJAX_downSync.abort(), AJAX_downSync = $.ajax({
            url: infinityApi + "/downSync.php",
            type: "POST",
            data: {
                username: i,
                password: e
            },
            timeout: 1e4
        }).done(function(i) {
            try {
                localStorage.lastTime = n;
                var e = JSON.parse(i),
                    t = decodeURIComponent(e.setting),
                    a = decodeURIComponent(e.main);
                recoveryTheData(t, a);
                try {
                    o(!0)
                } catch (r) {
                    console.log(r)
                }
            } catch (r) {}
        }).fail(function() {
            try {
                o(!1)
            } catch (i) {
                console.log(i)
            }
        })
    } catch (t) {}
}

function recoveryTheData(i, e) {
    try {
        var n = JSON.parse(e);
        localStorage.setting = i;
        var o = getBeforeml(),
            t = o / -1210;
        t = parseInt(Math.round(t)), $setData.ini(), loadTodos(), loadNotes(), $iconIni.load(n), localStorage.main = e, $("#mainAll").css("x", o + "px"), $(".point").css("background-color", ""), $(".point:nth-child(" + (t + 1) + ")").css("background-color", i18n("pointColor"));
        try {
            var a = ($setting.get("searchBox"), $setting.get("searchType")),
                r = ($setting.get("bookmarksBar"), $setting.get("lastWallpaper")),
                c = $setting.get("searchEngine"),
                s = "百度" == c ? i18n("Baidu") : c;
            if (s = "Sogou" == c ? i18n("Sogou") : c, $("#searchChange").attr("now", c).html(s), r.substring(0, 15).indexOf("filesystem") >= 0) {
                var l = $setting.get("blurWallpaper");
                l ? $setting.set("lastWallpaper", "img/bgblur.jpg") : $setting.set("lastWallpaper", "img/bg.jpg"), $("#bgOut").css("background-image", "url(" + $setting.get("lastWallpaper") + ")"), $setting.set("bgType", "default"), $setting.set("bgname", "bg")
            } else $("#bgOut").css("background-image", "url(" + r + ")");
            a ? $("#searchOption").show() : $("#searchOption").hide(), HowTpShowTop(), $Setting.addTionalSearch(), $mostVisited.ini()
        } catch (g) {}
        setAllNotiNum()
    } catch (g) {}
}

function recoveryTheDataMain(i) {
    try {
        var e = getBeforeml(),
            n = e / -1210;
        n = parseInt(Math.round(n)), $iconIni.load(i), localStorage.main = JSON.stringify(i), $("#mainAll").css("x", e), $(".point").css("background-color", ""), $(".point:nth-child(" + (n + 1) + ")").css("background-color", i18n("pointColor"))
    } catch (o) {
        console.log(o)
    }
}

function getBeforeml() {
    try {
        var i, e;
        return i = $("#mainAll").css("width"), i = parseInt(i), e = $("#mainAll").css("x"), e = parseInt(e)
    } catch (n) {}
}

function loadTodos() {
    for (var i = "", e = "", n = $setting.get("todostrue"), o = $setting.get("todosfalse"), t = n.length, a = o.length, r = 0; r < t; r++) i += '<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">' + n[r] + '</label><div class="toTop"></div></div>';
    for (var r = 0; r < a; r++) e += '<div class="labelOut"><label class="checkLabel todoLabel checkdone"><input type="checkbox" checked="checked" class="checkbox">' + o[r] + '</label><div class="todoDelete"></div></div>';
    $("#todoContent").html(i), $("#doneContent").html(e)
}

function loadNotes() {
    for (var i = $setting.get("notes"), e = "", n = 0; n < i.length; n++) e += '<div class="notesMenuItem"><span class="menuTitle">' + i[n].title + '</span><img class="notesDelete" src="img/remove.png"></div>', 0 == n && ($("#addNotesTitle").html(i[0].text), $("#addNotesTitle").attr("menu", "0"));
    $(".notesMenu").html(e), $(".notesMenuItem:nth-child(1)").css({
        "background-color": "#F39C12",
        color: "#fdfdfd"
    })
}
_AJAX_login = !1, _AJAX_img = !1, _AJAX_register = !1, AJAX_upSync = !1, AJAX_downSync = !1, AJAX_CHECK = !1, $(document).ready(function() {
    recoveryFromCloud(), $("#dataBackup").live("click", function(i) {
        backupData()
    }), $("#backupToCloud").live("click", function(i) {
        localStorage.lastTime = 0, syncToCloud()
    }), $("#loginOrRegister").live("click", function(i) {
        if ($("#bigLoginBox").fadeIn(100), $("#bigLoginBoxIn").show(), isLogin()) $("#theLoginInput").hide(), $("#theLogOut").show();
        else {
            $("#theLoginInput").show(), $("#theLogOut").hide(), $("#login_email")[0].focus();
            try {
                var e = JSON.parse(localStorage.user);
                e.email ? ($("#login_email,#findEmail").val(e.email), $("#login_pw")[0].focus()) : $("#login_email")[0].focus()
            } catch (n) {}
        }
        slideLock()
    }), $("#bigLoginBox").live("click", function(i) {
        $("#bigLoginBox").fadeOut(100), $("#bigLoginBoxIn").hide(), slideUnLock()
    }), $(".loginMenuItem").live("click", function(i) {
        var e = $(this).index();
        $(".loginMenuItem").css("color", ""), $(this).css("color", "#2ECC71"), $(".loginContent").hide(), $(".loginContent:nth-child(" + (e + 1) + ")").show(), $(".loginContent:nth-child(" + (e + 1) + ")").find("input")[0].focus(), $(".checkPoint").hide(), _AJAX_img && _AJAX_img.abort(), _AJAX_img = $.ajax({
            url: infinityApi + "/verify.php",
            dataType: "json"
        }).done(function(i) {
            "infinity" == i.infinityType && $(".veriImg").attr({
                src: i.img,
                code: i.code
            })
        })
    }), $("#login_submit").live("click", function(i) {
        onLogin()
    }), $("#login_email,#login_pw").live("keydown", function(i) {
        13 == i.which && onLogin()
    }), $(".refreshImg").live("click", function(i) {
        _AJAX_img && _AJAX_img.abort(), _AJAX_img = $.ajax({
            url: infinityApi + "/verify.php",
            dataType: "json"
        }).done(function(i) {
            "infinity" == i.infinityType && $(".veriImg").attr({
                src: i.img,
                code: i.code
            })
        })
    }), $(".veriCode").live("input", function(i) {
        var e = $(this).val(),
            n = e.length,
            o = $(".veriImg").attr("code");
        4 == n ? o == hex_md5(e) ? $(".checkPoint").show().css("background-color", "#2ECC71") : $(".checkPoint").show().css("background-color", "#E74C3C") : $(".checkPoint").hide()
    }), $("#Login_Cancel").live("click", function(i) {
        cancelLogin()
    }), $("#logout_submit").live("click", function(i) {
        logout()
    }), $("#registerSubmit").live("click", function(i) {
        onregister()
    }), $("#registerUsername,#registerPassword,#registerVerifyCode").live("keydown", function(i) {
        13 == i.which && onregister()
    }), $("#registerUsername").live("blur", function(i) {
        var e = $(this).val();
        "" != e && isEmail(e) ? $.ajax({
            url: infinityApi + "/checkName.php?name=" + e,
            dataType: "json"
        }).done(function(i) {
            "infinity" == i.infinityType && ("1" == i.message ? $("#registerNameCheck").show().css("background-color", "#2ECC71") : "3" == i.message && ($("#registerNameCheck").show().css("background-color", "#E74C3C"), $notification.show(i18n("UsernameAlreadyExists"))))
        }) : isEmail(e) || $("#registerNameCheck").show().css("background-color", "#E74C3C")
    }), $("#registerPassword").live("input", function(i) {
        $(this).val().length > 0 ? $("#registerPasswordCheck").show() : $("#registerPasswordCheck").hide()
    }), $("#FindSubmit").live("click", function(i) {
        var e = $("#findEmail").val(),
            n = $("#findVerifyCode").val(),
            o = $(".veriImg").attr("code");
        return "" == e || "" == n ? ($notification.show(i18n("emailCodenotEmpty")), !1) : isEmail(e) ? o != hex_md5(n) ? ($notification.show(i18n("VerifyCodeError")), !1) : void 0 : ($notification.show(i18n("emailInvalid")), !1)
    })
});
$(document).ready(function() {
    debugger;
    window.$Todos = {
        ini: function() {
            $Todos.menuIni(), $Todos.loadTodos(), $Todos.addTodos(), $Todos.todockeck()
        },
        menuIni: function() {
            $("#notdone").click(function() {
                $(".todotype").css("color", ""), $(this).css("color", "#2ECC71"), $(".todosContent,#cleardone").hide(), $("#todoContent").show(), $("#todosOut").css("padding-top", "115px")
            }), $("#havedone").click(function() {
                $(".todotype").css("color", ""), $(this).css("color", "#2ECC71"), $(".todosContent").hide(), $("#doneContent,#cleardone").show(), $("#todosOut").css("padding-top", "145px")
            }), $("div .labelOut").live("mouseover", function(t) {
                0 != $(this).index() && $(this).children(".toTop").show(), $(this).children(".todoDelete").show()
            }), $("div .labelOut").live("mouseleave", function(t) {
                $(this).children(".toTop,.todoDelete").hide()
            })
        },
        loadTodos: function() {
            for (var t = "", e = "", o = $setting.get("todostrue"), s = $setting.get("todosfalse"), c = o.length, n = s.length, i = 0; i < c; i++) t += '<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">' + o[i] + '</label><div class="toTop"></div></div>';
            for (var i = 0; i < n; i++) e += '<div class="labelOut"><label class="checkLabel todoLabel checkdone"><input type="checkbox" checked="checked" class="checkbox">' + s[i] + '</label><div class="todoDelete"></div></div>';
            $("#todoContent").html(stripscript(t)), $("#doneContent").html(stripscript(e))
        },
        addTodos: function() {
            $("#addTodos").live("keydown", function(t) {
                if (13 == t.which) {
                    var e = $(this).val();
                    if ("" == e) return !1;
                    var o = $setting.get("todostrue");
                    o.unshift(e), $setting.set("todostrue", o), $("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo todoFadeIn"><input type="checkbox" class="checkbox">' + e + '</label><div class="toTop"></div></div>')), $(this).val(""), $(".todotype").css("color", ""), $("#notdone").css("color", "#2ECC71"), $(".todosContent,#cleardone").hide(), $("#todoContent").show(), $("#todosOut").css("padding-top", "115px")
                }
            })
        },
        todockeck: function() {
            $(".checktodo").live("click", function() {
                var t, e = $(this).parent().index(),
                    o = $setting.get("todostrue"),
                    s = $setting.get("todosfalse"),
                    c = $(this).parent();
                return t = o[e], o.splice(e, 1), s.unshift(t), $setting.set("todostrue", o), $setting.set("todosfalse", s), $(this).css("text-decoration", "line-through"), c.fadeOut(150, function() {
                    c.remove()
                }), $("#doneContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checkdone"><input type="checkbox" checked="checked" class="checkbox">' + t + '</label><div class="todoDelete"></div></div>')), !1
            }), $(".toTop").live("click", function(t) {
                var e, o = $(this).parent().index(),
                    s = $setting.get("todostrue"),
                    c = $(this).parent();
                return e = s[o], s.splice(o, 1), s.unshift(e), $setting.set("todostrue", s), c.remove(), $("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">' + e + '</label><div class="toTop"></div></div>')), !1
            }), $(".checkdone").live("click", function() {
                var t, e = $(this).parent().index(),
                    o = $setting.get("todostrue"),
                    s = $setting.get("todosfalse"),
                    c = $(this).parent();
                return t = s[e], s.splice(e, 1), o.unshift(t), $setting.set("todostrue", o), $setting.set("todosfalse", s), c.fadeOut(150, function() {
                    c.remove()
                }), $("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">' + t + '</label><div class="toTop"></div></div>')), !1
            }), $("#cleardone").live("click", function(t) {
                $setting.set("todosfalse", []), $("#doneContent").children().remove()
            }), $(".todoDelete").live("click", function(t) {
                var e = $(this).parent().index(),
                    o = $setting.get("todosfalse"),
                    s = $(this).parent();
                return o.splice(e, 1), $setting.set("todosfalse", o), s.fadeOut(150, function() {
                    s.remove()
                }), !1
            })
        }
    }, $Todos.ini()
});
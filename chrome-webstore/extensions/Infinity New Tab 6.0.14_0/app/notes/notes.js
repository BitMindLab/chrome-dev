$(document).ready(function() {
    window.$Notes = {
        ini: function() {
            $Notes.whenPaste(), $Notes.menu(), $Notes.showText(), $Notes.add(), $Notes["delete"]()
        },
        whenPaste: function() {
            $("#addNotesTitle")[0].addEventListener("paste", function(e) {
                e.preventDefault();
                var t = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", !1, t)
            })
        },
        menu: function() {
            $("#notesList").live("click", function(e) {
                "true" == $(this).attr("close") ? ($("#notesAdd,.notesMenu,#notesList,#addNotesTitle").removeClass("notesMenuSlideIn"), $("#notesAdd,.notesMenu,#notesList,#addNotesTitle").addClass("notesMenuSlide"), setTimeout(function() {
                    $("#addNotesTitle").css({
                        width: "220px",
                        left: "128px"
                    }), $("#addNotesTitle")[0].focus()
                }, 150), $(this).attr("close", "false")) : ($("#notesAdd,.notesMenu,#notesList,#addNotesTitle").removeClass("notesMenuSlide"), $("#notesAdd,.notesMenu,#notesList,#addNotesTitle").addClass("notesMenuSlideIn"), setTimeout(function() {
                    $("#addNotesTitle").css({
                        width: "348px",
                        left: "0px"
                    }), $("#addNotesTitle")[0].focus()
                }, 150), $(this).attr("close", "true"))
            }), $(".notesMenuItem").live("mouseover", function(e) {
                var t = $setting.get("notes");
                1 == t.length ? $(this).children("img").hide() : $(this).children("img").show()
            }), $(".notesMenuItem").live("mouseleave", function(e) {
                $(this).children("img").hide()
            }), $(".notesMenuItem").live("click", function(e) {
                $(".notesMenuItem").css({
                    "background-color": "",
                    color: ""
                }), $(this).css({
                    "background-color": "#F39C12",
                    color: "#fdfdfd"
                });
                var t = $(this).index(),
                    s = $setting.get("notes")[t].text;
                $("#addNotesTitle").html(s), $("#addNotesTitle").attr("menu", t), $("#addNotesTitle")[0].focus()
            })
        },
        showText: function() {
            for (var e = $setting.get("notes"), t = "", s = 0; s < e.length; s++) t += '<div class="notesMenuItem"><span class="menuTitle">' + e[s].title + '</span><img class="notesDelete" src="img/remove.png"></div>', 0 == s && ($("#addNotesTitle").html(e[0].text), $("#addNotesTitle").attr("menu", "0"));
            $(".notesMenu").html(t), $(".notesMenuItem:nth-child(1)").css({
                "background-color": "#F39C12",
                color: "#fdfdfd"
            })
        },
        add: function() {
            $("#notesAdd").live("click", function(e) {
                var t = $setting.get("notes");
                return t.splice(0, 0, {
                    title: i18n("NewNote"),
                    text: ""
                }), $setting.set("notes", t), $Notes.showText(), $("#addNotesTitle")[0].focus(), !1
            }), $("#addNotesTitle").live("input", function(e) {
                var t = $(this).attr("menu");
                t = parseInt(t);
                var s = $(this).html(),
                    n = $(this).text();
                if (n = n.replace(/[\s+]/g, ""), "" == n) var o = i18n("NewNote");
                else var o = n.substring(0, 30);
                var i = $setting.get("notes");
                i[t].text = s, i[t].title = o, $(".notesMenuItem:nth-child(" + (t + 1) + ")").children(".menuTitle").text(o), $setting.set("notes", i)
            })
        },
        "delete": function() {
            $(".notesDelete").live("click", function(e) {
                var t = $setting.get("notes");
                if (1 == t.length) return $(".notesMenuItem").children("img").hide(), !1;
                var s = $(this).parent().index();
                return t.splice(s, 1), $setting.set("notes", t), $Notes.showText(), $("#addNotesTitle")[0].focus(), !1
            })
        }
    }, $Notes.ini()
});
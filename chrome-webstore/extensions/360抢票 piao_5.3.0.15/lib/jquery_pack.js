(function(a) {
    a.extend(a.fn, {
        propertyChange: function(g, h, d) {
            if (!this[0]) {
                return this
            }
            var c = this;
            var f = "propertyChange_" + g;
            c.on(f, h);

            function b() {
                var k = "__prev_" + g;
                var i = c.data(k);
                var j = c[0][g];
                if (i != j) {
                    c.data(k, j);
                    c.trigger(f)
                }
                return arguments.callee
            }
            var e = "__t_interval_" + g;
            if (!c.data(e)) {
                c.data(e, setInterval(b(), (d || 1) * 1000))
            }
            return this
        },
    })
})($);
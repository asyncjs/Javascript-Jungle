(function() {
  jj.createCreature('stars', function(layer) {
    var $rnd, h, rp, star, star_positions, star_visible, w, ws;
    layer.data({
      background: true
    });
    ws = jj.size();
    w = ws.width;
    h = 200;
    layer.size({
      width: w,
      height: h
    });
    layer.position({
      zIndex: -998
    });
    rp = Raphael(layer.el[0], ws.width, h);
    $rnd = function(m) {
      return Math.floor(Math.random() * m);
    };
    star_positions = (function() {
      var _results;
      _results = [];
      for (star = 1; star <= 100; star++) {
        _results.push([$rnd(w), $rnd(h - 3), star > 50 ? 2 : 1]);
      }
      return _results;
    })();
    star_visible = [];
    return jj.bind('clock', function(h, m) {
      var i, max, remove, rgb, star, tar, _ref, _results, _results2;
      if (m % 10 === 0) {
        max = Math.floor(Math.abs(12 - h) * 8.33);
        if (max < 0) {
          max = 0;
        }
        console.log([star_visible.length, max]);
        remove = star_visible.length > max;
        _results = [];
        for (i = _ref = star_visible.length; _ref <= max ? i < max : i > max; _ref <= max ? i++ : i--) {
          _results.push(remove ? star_visible.pop().remove() : star_visible.push(rp.circle.apply(rp, star_positions[i]).attr({
            stroke: '#fff',
            fill: '#fff'
          })));
        }
        return _results;
      } else if (star_visible.length) {
        tar = $rnd(155) + 100;
        rgb = "rgb(" + tar + "," + tar + "," + tar + ")";
        _results2 = [];
        for (star = 1; star <= 10; star++) {
          _results2.push(star_visible[$rnd(star_visible.length)].attr({
            fill: rgb,
            stroke: rgb
          }));
        }
        return _results2;
      }
    });
  });
}).call(this);

(function() {
  jj.createCreature('rain', function(layer) {
    var $rnd, canvas, context, ly, ws;
    layer.data({
      background: true
    });
    ws = jj.size();
    layer.position({
      zIndex: 999
    });
    layer.size({
      width: ws.width,
      height: ws.height
    });
    context = [];
    for (ly = 0; ly <= 1; ly++) {
      canvas = document.createElement('canvas');
      canvas.className = "rain";
      canvas.width = ws.width;
      canvas.height = ws.height;
      layer.el.append(canvas);
      context[ly] = canvas.getContext('2d');
    }
    $rnd = function(m) {
      return Math.floor(Math.random() * m);
    };
    console.log(context);
    return jj.bind('rain', function(weight) {
      var $rl;
      jj.chat("And the heavens open...", layer);
      $rl = function(cx, skew, sh, cl) {
        var $anim, x, _ref;
        cx.strokeStyle = cl;
        cx.lineWidth = 1;
        cx.lineCap = "square";
        cx.beginPath();
        for (x = -skew, _ref = canvas.width; -skew <= _ref ? x <= _ref : x >= _ref; -skew <= _ref ? x++ : x--) {
          cx.moveTo(x, 0);
          cx.lineTo(x + skew, canvas.height);
          cx.stroke();
          cx.closePath();
          x += $rnd(20);
        }
        $anim = function(p) {
          return _.delay(function() {
            jj.jQuery(cx.canvas).css({
              left: Math.floor(Math.PI * (Math.pow(10, p)) % 10)
            });
            return $anim(++p > 10 ? 0 : p);
          }, 50);
        };
        return $anim(sh);
      };
      $rl(context[0], 50, 0, '#1B59E0');
      return $rl(context[1], 70, 5, '#163882');
    });
  });
}).call(this);

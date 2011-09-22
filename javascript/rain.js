(function() {
  jj.createCreature('rain', function(layer) {
    var canvas, context, ws;
    layer.data({
      background: true
    });
    ws = jj.size();
    layer.size({
      width: ws.width,
      height: ws.height
    });
    canvas = document.createElement('canvas');
    canvas.width = ws.width;
    canvas.height = ws.height;
    layer.el.append(canvas);
    context = canvas.getContext('2d');
    return jj.bind('rain', function(weight) {});
  });
}).call(this);

(function() {
  jj.createCreature("invader", function(invader) {
    var canvas, context, height, invader1, left, top, width, world;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = 110;
    height = canvas.height = 110;
    world = jj.size();
    top = 50;
    left = jj.center().left - (width / 2);
    invader.size({
      width: width,
      height: height
    });
    invader.position({
      left: 0,
      top: 0,
      zIndex: 1000
    });
    invader.el.append(canvas);
    context.fillStyle = "red";
    invader1 = "  x     x  \n   x   x   \n  xxxxxxx  \n xx xxx xx \nxxxxxxxxxxx\nx xxxxxxx x\nx x     x x\n   xx xx  ";
    return invader1.split(/\n/).forEach(function(pixel, row) {
      return pixel.split('').forEach(function(active, col) {
        if (active === 'x') {
          return context.fillRect(col * 10, row * 10, 10, 10);
        }
      });
    });
  });
  jj.createCreature('space', function(space) {});
}).call(this);

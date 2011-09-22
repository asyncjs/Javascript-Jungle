(function() {
  jj.createCreature("invader", function(invader) {
    var PIXEL, canvas, context, direction, height, invader1, left, top, width, world;
    PIXEL = 10;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = 11 * SCALE;
    height = canvas.height = 11 * SCALE;
    direction = 1;
    world = jj.size();
    top = 5 * SCALE;
    left = 0;
    invader.size({
      width: width,
      height: height
    });
    invader.position({
      left: left,
      top: top,
      zIndex: 1000
    });
    invader.el.append(canvas);
    context.fillStyle = "red";
    invader1 = "  x     x  \n   x   x   \n  xxxxxxx  \n xx xxx xx \nxxxxxxxxxxx\nx xxxxxxx x\nx x     x x\n   xx xx  ";
    invader1.split(/\n/).forEach(function(pixel, row) {
      return pixel.split('').forEach(function(active, col) {
        if (active === 'x') {
          return context.fillRect(col * SCALE, row * SCALE, SCALE, SCALE);
        }
      });
    });
    return jj.bind("clock", function(hour, minute) {
      left += 20 * direction;
      if (left > (world.width - width) || left < 0) {
        direction = left < 0 ? 1 : -1;
        top += 110;
      }
      if (minute % 2 === 0) {
        return invader.position({
          left: left,
          top: top
        });
      }
    });
  });
  jj.createCreature('space', function(space) {});
}).call(this);

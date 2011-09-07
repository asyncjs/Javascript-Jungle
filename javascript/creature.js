jj.createCreature('creature', function (layer) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width   = canvas.width  = 100,
      height  = canvas.height = 100,
      world   = jj.size();

  layer.size({width: width, height: height});
  layer.position({top: 50, left: jj.center().left - (width / 2)});
  layer.el.append(canvas);

  context.fillStyle = "#8ED6FF";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();

  jj.bind('tick', function () {
    if (layer.position().top > world.height) {
      layer.position({top: -height});
    }
    if (layer.position().left > world.width) {
      layer.position({left: -width});
    }
    layer.position({top: '+= 5px', left: '+= 10px'});
  });
});

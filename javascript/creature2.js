jj.createLayer('creature2', function (layer) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width  = canvas.width  = 100,
      height = canvas.height = 100;

  layer.size({width: width, height: height});
  layer.position({top: 80, left: jj.center().left - (width / 2)});
  layer.el.append(canvas);

  context.fillStyle = "#FFD68E";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();

  layer.bind('touch', function(layer) {
      console.log(layer);
  });
});

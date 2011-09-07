jj.createLayer('creature', function (layer) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width  = canvas.width  = 100,
      height = canvas.height = 100;

  layer.size({width: width, height: height});
  layer.position({top: 50, left: jj.center().left - (width / 2)});
  layer.el.append(canvas);

  context.fillStyle = "#8ED6FF";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();
});

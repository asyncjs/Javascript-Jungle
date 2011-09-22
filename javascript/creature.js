jj.createCreature('creature', function (creature) {
  var canvas  = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width   = canvas.width  = 100,
      height  = canvas.height = 100,
      world   = jj.size(),
      top = 50,
      left = jj.center().left - (width / 2);

  creature.size({width: width, height: height});
  creature.position({top: top, left: left});
  //creature.el.append(canvas);

  context.fillStyle = "#8ED6FF";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();

  creature.el.append('<img src="/images/hippo.png" />')

  creature.bind('touch', function (nearby) {
    nearby.trigger('eat');
  });

  creature.bind('eat', function () {
    creature.el.css()
  })

  jj.bind('rain', function () {
    creature.el.css('opacity', 0.5)
  })

  jj.bind('tick', function () {
    //if (top > world.height) {
    //  top = -height;
    //} else {
    //  top  += 5;
    //}
    //if (left > world.width) {
    //  left = -width;
    //} else {
    //  left += 10;
    //}
    //creature.position({top: top, left: left});
  });
});

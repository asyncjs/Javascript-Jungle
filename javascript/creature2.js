jj.createCreature('sensing', function (creature) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width  = canvas.width  = 100,
      height = canvas.height = 100;

  creature.data({
      sight: 500,
      hearing: 600,
      smell: 200
  });

  creature.size({width: width, height: height});
  creature.position({top: 80, left: jj.center().left - (width / 2)});
  creature.el.append(canvas);

  context.fillStyle = "#FFD68E";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();

  creature.bind('touch', function(other) {
      console.log(creature.name() + ' touched ' + other.name());
  });

  creature.bind('see', function(other) {
      console.log(creature.name() + ' saw ' + other.name());
  });

  creature.bind('hear', function(other) {
      console.log(creature.name() + ' heard ' + other.name());
  });

  creature.bind('smell', function(other) {
      console.log(creature.name() + ' smelt ' + other.name());
  });

});

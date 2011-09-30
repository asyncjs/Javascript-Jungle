jj.createCreature('butterfly_colmjude', function (creature) {
   // Give your creature a size.
   creature.size({width: 50, height: 50});

	var element = creature.el;
	
	jj.jQuery("<img src='creatures/butterfly/butterfly.svg'/>")
		.css({'width': '100%', 'height': '100%'})
		.prependTo(element);
	
   // Center your creature in the world.
   var worldCenter = jj.center();
   creature.position({
     top:  110,
     left: 110 
   });

	var size = jj.size(),
		dx = 8,
		dy = 5;

	// Bind to a global event.
	  jj.bind('tick', function (frame) {
		// Animate here.
		var y = creature.position().top,
			x = creature.position().left,
			growth = (Math.random()*2) - 1;
			
		// alternative growth
		growth = 5 * (Math.floor(Math.random()*3) - 1);
		
		var csizew = creature.size().width,
			csizeh = creature.size().height;
		
		if( x < 100 || x > size.width - 100) dx=-dx;
		if( y < 100 || y > size.height - 100) dy=-dy;
		// looks dazed like this
		x += dx*((Math.random()*3) - 1);
		y += dy*((Math.random()*3) - 1);
		
		creature.position({
			top: y,
			left: x
		});
		
		var newsize = (csizew+growth <= 150) ? csizew+growth : csizew;
		
		creature.size({
			width: newsize,
			height: newsize
		});
	  });
});
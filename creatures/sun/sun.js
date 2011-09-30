jj.createCreature('sun', function ( creature ) {
	// Give your creature a size.
	creature.size({width: 102, height: 99});
	
	var $ = jj.jQuery;
	var e = $(creature.el);
		
	e.append('<img src="creatures/sun/sun.png"/>');
	
	// Center your creature in the world.
	var worldCenter = jj.center();

	// Bind clock event
	jj.bind('clock', function( hours, secs ) {

		var time = (hours * 60 + secs) / 720 - 1;		
		var cosTime = time * 3;
		
		creature.position({
			left: worldCenter.left + time * 1200 - 150,
			top: (1 - Math.cos(cosTime)) * 200 + 50,
			zIndex: 1
		});
		
		e.css('opacity', Math.cos(cosTime));
	});
	
});
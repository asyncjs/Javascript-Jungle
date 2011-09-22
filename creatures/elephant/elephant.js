jj.createCreature('elephant', function (creature) {
	'use strict';
	
	var pos = { left: 50, bottom:0 };
	var direction = 1;
	var speed = 10;
	

	//set size
	creature.size({width: 286, height: 236});

	//set position
	creature.position({bottom: pos.bottom, left: pos.left});

	//set up metadata
	creature.data({
		'species': 'elephant',
		'name': 'Elephant'
	});

	//create canvas element
	var canvas = document.createElement("canvas");
	canvas.width = this.size().width;
	canvas.height = this.size().height;
	var ctx = canvas.getContext("2d");
	
	var img = new Image();
	img.src = './creatures/elephant/media/elephant.png';
	
	//need to wait for image to load
	img.onload = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0);	
	}
	
	
	jj.chat("Hello everyone!", creature);

	// the div element for the creature.
	var element = creature.el;
	var world = jj.size();
	
	//add canvas
	element.append(canvas);

	element.css({
		width: this.size().width + 'px',
		height: this.size().height + 'px'
	});
	
	var flip = function(v)
	{
		var scale = 'scaleX('+v+')';
		
		element.css({
			'transform': scale,
			'-moz-transform': scale,
			'-webkit-transform': scale,
			'-o-transform': scale,
		});
	}
	
	jj.bind('tick', function() {
		
		var farRight = world.width / 2;
		var farLeft = 50; 
		
		if (pos.left >= farRight)
		{
			direction = -1;
			flip(-1);
		}
		
		if (pos.left <= farLeft)
		{
			direction = 1;
			flip(1);
			jj.chat("Weeeeeeeee!", creature);
		}

		pos.left += direction * speed;
		creature.position({left: pos.left });
	});

	jj.bind('clock', function(hh, mm) {
		
	});
});


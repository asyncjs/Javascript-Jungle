jj.createCreature('elephant', function (creature) {
	'use strict';
	
	var pos = { left: 50, bottom:0 };
	var direction = 1;
	var speed = 10;
	var isEyeOn = true;
	var isMoving = true;

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
		draw();
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
	
	var draw = function()
	{
		//draw main shape
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0);	
		
		if (isEyeOn)
		{				
			//draw the eye
			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(199,67,3,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fill();
		}
	}
	
	jj.bind('tick', function() {
		
		if (isMoving)
		{
			var farRight = world.width / 2;
			var farLeft = 0; 
			
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
			creature.position({left: pos.left, bottom:0 });
		}
		
	});

	jj.bind('clock', function(hh, mm) {
		
		if (pos.left <= 20)
		{
			isMoving = false;
		}
		
		if (mm % 8 == 0)
		{
			isMoving = false;
		}
		if (mm % 13 == 0)
		{
			isMoving = true;
		}
		
	});
});


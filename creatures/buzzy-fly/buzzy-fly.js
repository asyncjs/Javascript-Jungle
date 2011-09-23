/*
 * Async JavaScript Jungle
 * 
 * creature: buzzy-fly
 * Code: Spike { @SpikePadley }
 * Design: Shanee
 *
 */
for (var flyNo = 1; flyNo < 6; flyNo++) {
	jj.createCreature('buzzy-fly-' + flyNo, function (creature) {
		creature.size({width: 10, height: 10});
		creature.el.css('background-image', 'url(./creatures/buzzy-fly/media/fly.png)');
		// jj being the main JavaScript Jungle object.
		var worldCenter = jj.center();
		var worldSize = jj.size();
		var angle = 0.1;
		var speed = 20;
		var topPos;
		var leftPos;
		var pos;
		var firstFrame = true;
		var dead = 0;
		// Update function
		jj.bind('tick', function (update) {
			// Position update
			pos = creature.position();
			topPos = pos.top;
			leftPos = pos.left;
			// Center on first frame
			if (firstFrame === true) {
				topPos = Math.floor(Math.random()*worldSize.height);
				leftPos = Math.floor(Math.random()*worldSize.width);
				firstFrame = false;
			}
			// Respawn
			if (dead > 0) {
				dead--;
				if (dead == 0) {
					topPos = worldCenter.top;
					leftPos = worldSize.width + 100;
					jj.chat("I have returned from the grave!", creature);
					creature.el.css('opacity', '1');
				}
			}
			//
			if (Math.random() > 0.995)
				speed *= -1;
			// Vars update
		 	speed += Math.random() - 0.5;
			angle += Math.random();
			// Flip image
			if (angle < Math.PI / 2 || angle > Math.PI * 1.5)
				creature.el.css('-webkit-transform', 'scaleX(1)');
			else
				creature.el.css('-webkit-transform', 'scaleX(-1)');
			// Adjust coordinates
			topPos += Math.sin(angle) * speed;
			leftPos += Math.cos(angle) * speed;
			// Limit vars
			if (angle > 2 * Math.PI)
				angle -= 2 * Math.PI;
			if (speed < -18)
				speed = -18;
			if (speed > 24)
				speed = 24;
			if (topPos < -100)
				topPos = -100;
			if (topPos > worldSize.height - 120)
				topPos = worldSize.height - 120;
			if (leftPos < -100)
				leftPos = -100;
			if (leftPos > worldSize.width + 100)
				leftPos = worldSize.width + 100;
			// Draw
			creature.position({top: topPos, left: leftPos});
		});
		// Eat function
		creature.bind("eat", function(){
			jj.chat("I was eaten, and died a horrible death.", creature);
			creature.el.css('opacity', '0');
			dead = Math.floor(Math.random()*300) + 150;
		});
	});
}
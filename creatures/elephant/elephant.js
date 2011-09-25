jj.createCreature('elephant', function (creature) {
	'use strict';
	
	var debug_mode = false;
	
	// the div element for the creature.
	var el = creature.el,
		absoluteTop,
		world = jj.size(),
		eye,
		r,
		particles = [];
	
	var isSprinkle = false,
		sprinkleMinInterval = 3,
		sprinklelength = 45, //sprinkle for 45 sec
		sprinkleTimer = 0;
		
	var isSwing = true,
		trunkIsDown = true,
		trunkControls,
		trunkMovePath,
		trunkEndShape,
		trunkEnd = {x: 223, y: 200},
		totalParticles = 10; //maximum amount of particles shown at once
	
	var maxSwingReach = 25, //maxium swing delta
		currentSwing = 0,
		swingDirection = 1,	
		blinkTimer = 0;	
 
	el.css({
		width: this.size().width + 'px',
		height: this.size().height + 'px'
	});
	el.attr('id', 'elephant');

	//set size
	creature.size({width: 350, height: 236});

	//set position
	absoluteTop = world.height - this.size().height;
	creature.position({top: absoluteTop, left: 80});

	//set up metadata
	creature.data({
		'species': 'elephant',
		'name': 'Elephant'
	});
	
	//create paper
	r = Raphael('elephant', this.size().width, this.size().height);
	
	//in debug mode hide all extras
	var controlsOpac = debug_mode ? 1 : 0;
		
	//path to move trunk on
	trunkMovePath = r.path('M'+trunkEnd.x+','+trunkEnd.y+'c0,0,75-38,57-159').attr({stroke:'red',opacity: controlsOpac});
	trunkEndShape = r.circle(trunkEnd.x, trunkEnd.y, 4).attr({fill:'blue',opacity: controlsOpac});

	//create tail
	var tail = r.path('M36,90l-19,62l24-33L36,90z').attr({fill: '#e2dede', 
		'stroke-width': 2, 'stroke-linecap': 'round', 'stroke': '#878686'});

	//create body
	var bodyShape = ['M112,45c0,0-118.353-0.962-67,116c8.288,18.876,6,64,6,',
		'64l33,4l-4-68c0,0,24.734,17.133,55,2c8-4,7,68,7,68l36-3c0,0,0.832-7',
		'3.272-12-111c-2.647-7.783,7.184-7.561,8.604-5.954c4.307,4.87,14.918,',
		'12.474,19.757,11.737c0.767-0.116-8.122-5.648-9.227-12.883c-0.14-0.91',
		'5,7.462,11.734,13.764,12.521c1.468,0.183,0.984-0.034,6.289-0.229c10.',
		'8-0.396,20.171-15.139,14.813-57.192c-4.173-32.751-47.119-36.19-62.23',
		'2-20.827C143.311,58.87,141,50,141,50L112,45z'];
	var body = r.path(bodyShape.join('')).attr({fill: '90-#777575-#e2dede',
		'stroke-width': 2, 'stroke-linecap': 'round','stroke': '#878686'
	});

	//create trunk
	createTrunk(209, 120, 246, 146, 205, 170, trunkEnd.x, trunkEnd.y, '#b4b1b1');	

	//create outer-eye
	var oeye = r.ellipse(195, 65, 10, 13).attr({fill: '#fff', stroke: '#fff'});

	//create eye
	eye = r.circle(198, 68, 4).attr({fill: '#000'});

	//create outer-ear
	var outerEarShape = ['M163.5,46.5l-37-32c0,0-11-3-10,10s2,77,2,77s0,22,',
		'17,8s26-27,26-27L163.5,46.5z'];
	var oear = r.path(outerEarShape.join('')).attr({fill: '#878686', stroke: '#878686'});

	//create ear
	var earShape = ['M163,48.879l-34.878-30.165c0,0-10.37-2.828-9.427,9.427c',
		'0.943,12.254,1.885,72.585,1.885,72.585s0,20.738,16.025,7.542c16.025',
		'-13.197,24.509-25.452,24.509-25.452L163,48.879z'];
	var ear = r.path(earShape.join('')).attr({stroke: '#cac6c6', fill: '0-#a3a2a1-#cac6c6',});

	//create tusk
	var tusk = r.path('M207,103c0,0-21-6-3,7s73,18,73,18L207,103z').attr({
		fill: '#fcffb1', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke': '#878686'
	});

	function createTrunk(x, y, ax, ay, bx, by, zx, zy, color) {

		var path = [['M', x, y], ['C', ax, ay, bx, by, zx, zy]],
			path2 = [['M', x, y], ['L', ax, ay], ['M', bx, by], ['L', zx, zy]],
			curve = r.path(path).attr({zIndex:9999,stroke: color, 'stroke-width': 10, 'stroke-linecap': 'round'}),
			discattr = {fill: '#fff', stroke: 'none', opacity: controlsOpac};

		trunkControls = r.set(
				r.path(path2).attr({stroke: '#d5d1d1', 'stroke-dasharray': '. ', opacity: controlsOpac}),
				r.circle(x, y, 5).attr(discattr),
				r.circle(ax, ay, 5).attr(discattr),
				r.circle(bx, by, 5).attr(discattr),
				r.circle(zx, zy, 5).attr(discattr)
			);
				
		trunkControls[1].update = function (x, y) {
			var X = this.attr('cx') + x,
				Y = this.attr('cy') + y;
			this.attr({cx: X, cy: Y});
			path[0][1] = X;
			path[0][2] = Y;
			path2[0][1] = X;
			path2[0][2] = Y;
			trunkControls[2].update(x, y);
		};
		trunkControls[2].update = function (x, y) {
			var X = this.attr('cx') + x,
				Y = this.attr('cy') + y;
			this.attr({cx: X, cy: Y});
			path[1][1] = X;
			path[1][2] = Y;
			path2[1][1] = X;
			path2[1][2] = Y;
			curve.attr({path: path});
			trunkControls[0].attr({path: path2});
		};
		trunkControls[3].update = function (x, y) {
			var X = this.attr('cx') + x,
				Y = this.attr('cy') + y;
			this.attr({cx: X, cy: Y});
			path[1][3] = X;
			path[1][4] = Y;
			path2[2][1] = X;
			path2[2][2] = Y;
			curve.attr({path: path});
			trunkControls[0].attr({path: path2});
		};
		trunkControls[4].update = function (x, y) {
			var X = this.attr('cx') + x,
				Y = this.attr('cy') + y;
			this.attr({cx: X, cy: Y});
			path[1][5] = X;
			path[1][6] = Y;
			path2[3][1] = X;
			path2[3][2] = Y;
			
			//update position of the trunk
			trunkEnd = {x:X, y: Y};
			
			trunkControls[3].update(x, y);
		};
		
		//used in debug mode only
		trunkControls.drag(function(){
			this.update(dx - (this.dx || 0), dy - (this.dy || 0));
			this.dx = dx;
			this.dy = dy;
		}, function(){
			this.dx = this.dy = 0;
		});
	}

	//animate water particles
	var updateWater = function()
	{
		for (var i = particles.length - 1; i >= 0; i--) 
		{
			if (particles[i].isDead())
			{
				particles[particles.length -1].img.remove();
				particles.pop();
				if (isSprinkle)
				{	
					var temp = new Particle();
					temp.init(new Vector(trunkEnd.x, trunkEnd.y, 0));
					particles.unshift(temp);
				}
			}
			if (particles[i]) 
			{
				particles[i].update();
			}
		}
	}
	
	//switch for water sprinkle events
	var sprinkle = function(hh)
	{
		//increase sprinkle counter
		if (isSprinkle)
		{
			sprinkleTimer++;
		}
		
		//disable sprinkle 
		if (sprinkleTimer >= sprinklelength)
		{
			setSprinkle(false);
			sprinkleTimer = 0;
			
			//move end along the path
			trunkEndShape.animateAlongBack(trunkMovePath, 3000, true, function () {	
				//move trunk down
				trunkIsDown = true;
				isSwing = true;
			});
		}
	
		if (hh % sprinkleMinInterval == 0)
		{
			//stop swinging
			isSwing = false;

			//move end along the path
			if (trunkIsDown)
			{
				trunkEndShape.animateAlong(trunkMovePath, 3000, true, function () {
					
					//trunk is up, let's sprinkle
					setSprinkle(true);
					jj.chat("Shower time!", creature);
					
				});
				trunkIsDown = false;
			}
		}
	}

	//show/hide water particles
	var setSprinkle = function(isOn)
	{
		isSprinkle = isOn;
		
		if (isSprinkle)
		{
			for (var i = 0; i < totalParticles; i++) 
			{
				particles[i] = new Particle();
				particles[i].init();
			}
		}
	}

	//swing elephant's trunk
	var swingTrunk = function()
	{
		if (isSwing && trunkControls)
		{
			if (currentSwing >= maxSwingReach)
				swingDirection = -1;
			
			if (currentSwing <= maxSwingReach * -1)
				swingDirection = 1;
			
			var delta = swingDirection * .3;
			trunkControls[4].update(delta, 0);
			currentSwing += swingDirection;
		} 
		else 
		{
			//move trunk up/down
			var x = trunkEndShape.attrs.cx - trunkEnd.x;
			var y = trunkEndShape.attrs.cy - trunkEnd.y;
			trunkControls[4].update(x, y);	
		}
	}

	//random eye blink
	var blink = function(mm)
	{
		//every second, there is 1:20 chance to blink
		var r = Math.floor(Math.random()*20);
		if (r == 0)
		{
			eye.hide();

			//show it again after .5 sec
			if (blinkTimer == 0)
			{
				blinkTimer = setTimeout(function(){eye.show();blinkTimer = 0;}, 100)
			}
		}
	}
	
	//listen for jungle tick event
	jj.bind('tick', function(e) {
		updateWater();
		swingTrunk();
		
		//fix position if ufo moves me
		creature.position({top: absoluteTop, left: 80});
	});

	//listen for clock tick event
	jj.bind('clock', function(hh, mm) {
		
		//update blinking
		blink(mm);
		
		//update sprinkle events
		sprinkle(hh);
	});
	
	//////////// water particle system /////////////
	function Vector()
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		
		this.set = function(x, y, z)
		{
			this.x = x;
			this.y = y;
			this.z = z;
		}
		
		this.add = function(vector2)
		{	
			this.x = this.x + vector2.x;
			this.y = this.y + vector2.y;
			this.z = this.z + vector2.z;
		}
	}

	function Particle()
	{
		var colors = ['#6A90FA', '#7D99E7', '#B8C7F2', '#1D40A1', '#DFE6F9'];
		var color = colors[Math.floor(Math.random() * colors.length)];
		var size = Math.floor(2 + Math.random() * 6);
		this.img = r.circle(trunkEnd.x, trunkEnd.y, size, size).attr({fill: color, 'stroke-opacity': 0}).hide();
		this.loc = new Vector();
		this.vel = new Vector();
		this.acc = new Vector();
		this.timer = Math.random() * 400;
		
		this.init = function()
		{
			var maxX = 4; //maximum horizontal spread
			var maxY  = 4; //maxiumum vertical spread
			this.acc.set(0, 0.1, 0);
			this.vel.set(Math.random() * maxX - maxX/2, Math.random() * maxY, 0); //- maxY/2
			this.loc.set(trunkEnd.x, trunkEnd.y, 0);
			this.img.attr({opacity: 0.8});
		}
		
		this.update = function()
		{
			this.vel.add(this.acc);
			this.loc.add(this.vel);
			this.timer -= 1;
			this.img.show().animate({cx:this.loc.x, cy:this.loc.y}, 20);
		}

		this.isDead = function()
		{
			return this.timer<0;
		}		
	}
});


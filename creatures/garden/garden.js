jj.createCreature('garden', function (creature) {
	
	// by Sky Apperley Sep 2011
	
	var canvas = document.createElement('canvas'),
	context = canvas.getContext('2d'),
	worldSize	= jj.size(),
	bottom=worldSize['height'];
	
	// jj.trigger('rain') // for testing only

	var getRandPositions = function() {
		var third = (worldSize['width']-400)/3, pos=[];
		pos.push(Math.floor(Math.random()*third));
		pos.push(Math.floor(Math.random()*third)+third);
		pos.push(Math.floor(Math.random()*third)+(third*2));
		return pos;
	};
	var randPositions = getRandPositions();

	// create a flowers
	jj.createCreature('flower1', function (flower1) {
		flower1.size({width: 90, height: 143});
		flower1.el.css('background', 'url(creatures/garden/media/flower1.png)');
		flower1.position({top: worldSize['height'], left: randPositions[0]});
		flower1.el.append(canvas);
	});
	jj.createCreature('flower2', function (flower2) {
		flower2.size({width: 124, height: 159});
		flower2.el.css('background', 'url(creatures/garden/media/flower2.png)');
		flower2.position({top: worldSize['height'], left: randPositions[1]});
	});
	jj.createCreature('flower3', function (flower3) {
		flower3.size({width: 55, height: 140});
		flower3.el.css('background', 'url(creatures/garden/media/flower3.png)');
		flower3.position({top: worldSize['height'], left: randPositions[2]});
	});
	
	// get reference to flowers
	var flower1 = jj.get('flower1');
	var flower2 = jj.get('flower2');
	var flower3 = jj.get('flower3');
	
	// eat events
	flower1.bind('eat', function () {
		flower1.el.animate({ top: bottom }, 700 );
	});
	flower2.bind('eat', function () {
		flower2.el.animate({ top: bottom }, 1000 );
	});
	flower3.bind('eat', function () {
		flower3.el.animate({ top: bottom }, 500 );
	});
	
	// rain events
	jj.bind('rain:start', function () {
		randPositions = getRandPositions();
		flower1.el.animate({ top: bottom }, 2300, function() {
			flower1.position({top: bottom, left: randPositions[0]});
		});
		flower2.el.animate({ top: bottom }, 3300, function() {
			flower2.position({top: bottom, left: randPositions[1]});
		});
		flower3.el.animate({ top: bottom }, 2700, function() {
			flower3.position({top: bottom, left: randPositions[2]});
		});
	});
	jj.bind('rain:stop', function () {
		flower1.el.animate({ top: bottom-143 }, 1600 );
		flower2.el.animate({ top: bottom-159 }, 2700 );
		flower3.el.animate({ top: bottom-140 }, 2000 );
	});
	
});


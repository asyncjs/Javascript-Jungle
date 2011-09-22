/*
 * Pavilion Crab
 * async javascript jungle
 * Joseph Steiner
 */
jj.createCreature('pavilion-crab', function (layer) {

    // the div element for the creature.
    var $ = jj.jQuery;
    var creature = $(layer.el);

    // set the size of the creature and note width of page
    var w = 278, h = 181;
    layer.size({ width: w, height: h});
    var width = $('body').width();

	// the images of the animation
	creature.css('background', 'url(./creatures/pavilion-crab/media/pavilion-crab_8.png)');

    // current position and state (start sleeping as it's nighttime)
    var worldSize = jj.size();
    var defaultTop = worldSize.height - h;
    var creatureLeft = 0;
    var creatureTop = defaultTop;
    var creatureStates = {
        walking : { aniRow: 0, aniLength: 3 },
        eating : { aniRow: 1, aniLength: 3 },
        sleeping : { aniRow: 2, aniLength: 3 }
    };
    startState(creatureStates.sleeping);

    // note duration of each state in "steps" and, for walking, the direction
    var steps = 0;
    var direction = 1;

	// we need to take a copy of the time so we can work out when to stop eating
	var time = 0; // current time in minutes since midnight
	var stopEating = 0; // time to stop eating

	// and for eating purposes...
	var grass = jj.get('grass');

	// the clock event triggers all the state-related behaviour and some of the switches
    jj.bind('clock', function( hours, mins ) {
		time = hours*60+mins;
		//console.log(time);
        if (creatureLeft + creature.width() > width) {
			direction = -1;
		} else if (creatureLeft < 0) {
			direction = 1;
		}

        switch(creatureState) {
            case creatureStates.walking:
				if (steps >= 60) {
					steps = 0;
					if (Math.random() > 0.75) direction *= -1;
				}
				creatureLeft += 5*direction;
				creatureTop = defaultTop + (steps%2 == 0 ? 5 : 0);
            break;
            case creatureStates.eating:
				if (time > stopEating) {
					startState(creatureStates.walking);
				} else {
					var step = steps % 4;
					creatureLeft += step == 0 || step == 3 ? -5 : 5;
					creatureTop += step < 2 ? 5 : -5;
					if (steps % 5 == 0) grass.eat();
				}
            break;
			case creatureStates.sleeping:
				steps =
					hours >= 20 && hours < 22 ? 0 :
					hours >= 22 && hours < 24 ? 1 :
					hours >= 0 && hours < 2 ? 2 :
					hours >= 2 && hours < 4 ? 1 :
					hours >= 4 && hours < 6 ? 0 :
					0;
				break;
        }
        layer.position({left:creatureLeft, top:creatureTop});
		var imageX = -(steps % creatureState.aniLength) * w;
		var imageY = -creatureState.aniRow * h;
		creature.css('background-position', imageX+'px '+imageY+'px');
		steps++;
    });

    jj.bind('breakfast',function() {
		stopEating = time + 30;
		startState(creatureStates.eating);
    });

    jj.bind('lunch',function() {
		stopEating = time + 60;
		startState(creatureStates.eating);
    });

    jj.bind('dinner',function() {
		stopEating = time + 60;
		startState(creatureStates.eating);
    });

    jj.bind('nighttime',function() {
		startState(creatureStates.sleeping);
    });

    jj.bind('morning',function() {
		startState(creatureStates.walking);
    });

	function startState(state) {
		creatureState = state;
		creatureTop = defaultTop;
		steps = 0;
	}

});
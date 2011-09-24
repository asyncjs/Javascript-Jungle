jj.createCreature('clock', function (layer) {
  var SPEED = 5,
      hours = 0,
      minutes = 0,
      minutesAccurate = 0,
      minutesCache,
      events = {
        '0':  'midnight',
        '6':  'morning',
        '8':  'breakfast',
        '12': 'midday',
        '13': 'lunch',
        '19': 'dinner',
        '21': 'nighttime'
      },
      data = layer.data(),
      el = jj.jQuery("span#time");

  layer.el.remove();
  layer.data({speed: SPEED, background: true});

  // Create a clock that moves six times faster than normal.
  // eg. 10 mins = 1 hour.
  jj.bind('tick', function (deltaT) {
    minutesAccurate += (deltaT / 1000) * data.speed;
    
    if (minutesAccurate >= 60) {
      minutesAccurate = minutesAccurate % 60;
      hours += 1; // for large delays, there may be a bigger component to add to `hours`
    }
    
    minutes = ~~(minutesAccurate);
    
    if (minutesCache !== minutes){
      if (hours >= 24) {
        hours = 0;
      }
      
      // Update clock element
      el.text(
        (hours < 10 ? '0' + hours : hours) + ":" +
        (minutes  < 10 ? '0' + minutes  : minutes)
      );
      
      jj.trigger('clock', hours, minutes);
      
      if (minutes === 0 && events[hours]) {
        jj.trigger(events[hours]);
      }
      
      minutesCache = minutes;
    }
  });
  
  // Click the clock to start/stop
  el.click(function(){
    jj.isRunning ? jj.stop() : jj.start();
  });
});

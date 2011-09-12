jj.createCreature('clock', function (layer) {
  var SPEED = 5,
      hours = 0,
      minutes = 0,
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
  jj.bind('tick', function (frame) {
    if (frame % data.speed === 0) {
      // Update clock element
      el.text(
        (hours < 10 ? '0' + hours : hours) + ":" +
        (minutes  < 10 ? '0' + minutes  : minutes)
      );
      
      // jj.bind('clock', function (hours, minutes){}
      jj.trigger('clock', hours, minutes);
      
      if (minutes === 0 && events[hours]) {
        jj.trigger(events[hours]);
      }

      minutes += 1;
      
      if (minutes >= 60) {
        hours  += 1;
        minutes = 0;
      }
      if (hours >= 24) {
        hours = 0;
      }
    }
  });
  
  // Click the clock to start/stop
  el.click(function(){
    jj.isRunning ? jj.stop() : jj.start();
  });
});

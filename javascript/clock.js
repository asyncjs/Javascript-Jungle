jj.createCreature('clock', function (layer) {
  var hours = 0, minutes = 0, events = {
    '0':  'midnight',
    '6':  'morning',
    '8':  'breakfast',
    '12': 'midday',
    '13': 'lunch',
    '19': 'dinner',
    '21': 'nighttime'
  }, data = layer.data();

  layer.data({speed: 5, background: true});

  // Create a clock that moves six times faster than normal.
  // eg. 10 mins = 1 hour.
  jj.bind('tick', function (frame) {
    if (frame % data.speed === 0) {
      jj.trigger('clock', hours, minutes);
      if (minutes === 0 && events[hours]) {
        jj.trigger(events[hours]);
      }

      minutes += 1;
    }
    if (minutes >= 60) {
      hours  += 1;
      minutes = 0;
    }
    if (hours >= 24) {
      hours = 0;
    }
  });

  var el = jj.jQuery("span#time");
  jj.bind('clock', function(hr,m) {
    console.log(hr.length);
    el.html([
      hr < 10 ? '0' + hr : hr ,
      m < 10 ? '0' + m : m]
        .join(':'));
  });
  layer.el.remove();
});

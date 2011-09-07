jj.createLayer('clock', function (layer) {
  var hours = 0, seconds = 0, events = {
    '0':  'midnight',
    '6':  'morning',
    '8':  'breakfast',
    '12': 'midday',
    '13': 'lunch',
    '19': 'dinner',
    '21': 'nighttime'
  };

  // Create a clock that moves six times faster than normal.
  // eg. 10 mins = 1 hour.
  jj.bind('tick', function (frame) {
    jj.trigger('clock', hours, seconds);
    if (seconds === 0 && events[hours]) {
      jj.trigger(events[hours]);
    }

    if (frame % 5 === 0) {
      seconds += 1;
    }
    if (seconds >= 60) {
      hours  += 1;
      seconds = 0;
    }
    if (hours >= 24) {
      hours = 0;
    }
  });

  layer.el.remove();
});

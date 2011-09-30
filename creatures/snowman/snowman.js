/**
 * @see https://github.com/asyncjs/Javascript-Jungle/wiki/api
 */

jj.createCreature('happygiraffe-snowman', function (creature) {
  'use strict';

  // the div element for the creature.
  var element = creature.el,
      snowman = '☃',
      velocityX = 2,
      velocityY = 2.5,
      world = jj.size();

  // Set the size of your creature.
  creature.size({width: 75, height: 75});

  // Start in the middle.
  creature.position(jj.center());
  // Set/Get any metadata.
  creature.data({
    'species': 'snowman',
  });

  element.append('<div class="snowman">' + snowman + '</div>').css({
    'color':'#fff',
    'font-size': '72px',
  });

  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  function rndColor() {
    function rndByte() {
      return Math.round(rnd(0,255));
    }
    return 'rgb(' + rndByte() + ',' + rndByte() + ',' + rndByte() +')';
  }

  jj.bind('tick', function() {
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top + velocityY,
          'left': oldpos.left + velocityX,
        },
        world = jj.size(),
        deg = creature.data().deg || 0;
    // collision detection.
    if (((newpos.top + element.height()) > world.height) || newpos.top < 0) {
      newpos.top = oldpos.top;
      velocityY = -velocityY;
    }
    if (((newpos.left + element.width()) > world.width) || newpos.left < 0) {
      newpos.left = oldpos.left;
      velocityX = -velocityX;
    }
    creature.position(newpos);
    
    element.find('.snowman').css({'-webkit-transform': 'rotate(' + deg + 'deg)'});
    creature.data({'deg': deg + 1});
  });

  // Make the snowman change colour on each hour.
  jj.bind('clock', function(hh, mm) {
    if (mm === 0) {
      creature.el.css({'color': rndColor()});      
    }
  });
});

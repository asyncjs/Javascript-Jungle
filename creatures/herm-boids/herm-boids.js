// Boids
// Thomas Parslow
// tom@almostobsolete.net
// @almostobsolete
// 
// Adapted from: http://www.kfish.org/boids/pseudocode.html
(function() {
  var SCALE = 20;
  var HOW_MANY = 8;
  var RULE_SCALE = 250;
  var CLOSE_ENOUGH = 150*4;
  var RULE4b_SCALE = 450;
  var AVOIDANCE_DIV = 4;
  var BORDER = 50;  
  var boids = [];

  function vadd(v1,v2) {
    if (arguments.length > 2) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i-1] = arguments[i];
      }
      return vadd(v1, vadd.apply(this, args));
    } else {
      return {x: v1.x+v2.x, y: v1.y+v2.y}
    }
  }

  function vdiv(v1, s2) {
    return {x: v1.x/s2, y: v1.y/s2}
  }

  function vneg(v1) {
    return {x: -v1.x, y: -v1.y}
  }
  
  function vdist(v1,v2) {
    var vec = vadd(v1, vneg(v2));
    //vec = {x: wrappedDist(v1.x,v2.x,jj.size().width), y: wrappedDist(v1.y,v2.y,jj.size().height)};
    return Math.sqrt(vec.x*vec.x+vec.y*vec.y);
  }
  
  function lim(val, min, max) {
    if  (val > max) {
      val = val - max;
      //console.log("more", max, val);
    } else if (val < min) {
      val = max + val;
    }
    return val;
  }

  function rule1 (boid) {
    // RULE1: Fly towards the center of mass
    var centerOfMass = {x:0, y:0};
    for(var i = 0; i < boids.length; i++) {
      if (boid !== boids[i]) {
        centerOfMass = vadd(centerOfMass, boids[i].pos);
      }
    }
    centerOfMass= vdiv(centerOfMass, boids.length-1);
    return vdiv(vadd(centerOfMass, vneg(boid.pos)),RULE_SCALE);
  }

  function rule2 (boid) {
    // RULE2: Avoid eachother
    var vec = {x:0, y:0};
    for(var i = 0; i < boids.length; i++) {
      if (boid !== boids[i]) {
        if (vdist(boid.pos, boids[i].pos) < CLOSE_ENOUGH) {
          vec = vadd(vec, vdiv(vneg(vadd(boids[i].pos, vneg(boid.pos))),AVOIDANCE_DIV))
        }
      }
    }
    return vec;
  }
  
  function rule3 (boid) {
    // RULE3: Match velocity of nearby boids
    var vec = {x:0, y:0};
    for(var i = 0; i < boids.length; i++) {
      if (boid !== boids[i]) {
        vec = vadd(vec, boids[i].vel);
      }
    }
    vec = vdiv(vec, boids.length);
    return vdiv(vadd(vec, vneg(boid.vel)),8)
  }

  function rule4 (boid) {
    // RULE 4: Avoid the edges of the screen!
    var vec = {x: 0, y: 0 };
    if (boid.pos.x < BORDER) {
      vec.x = vec.x - ( boid.pos.x - BORDER )
    }
    if (boid.pos.x > jj.size().width-BORDER) {
      vec.x = vec.x - (boid.pos.x-(jj.size().width-BORDER))
    }
    if (boid.pos.y < BORDER) {
      vec.y = vec.y - (boid.pos.y - BORDER)
    }    
    if (boid.pos.y > jj.size().height-BORDER) {
      vec.y = vec.y -  (boid.pos.y - (jj.size().height-BORDER))
    }    
    return vec;
  }

  function rule4b (boid) {
    // RULE4b: Fly towards the center of screen
    var center = {x: (jj.size().width*SCALE)/2, y: (jj.size().height*SCALE)/2};
    return vdiv(vadd(center, vneg(boid.pos)), RULE4b_SCALE);
  }


  
  for (var i = 0; i < HOW_MANY; i++) {
    (function () {
      var num = i;
      
      jj.createCreature('almost-herm-boid-' + i, function (layer) {
        // layer.data = {
        //   "kingdom": "Animalia",
        //   "phylum": "Chordata",
        //   "class": "Aves",
        //   "order": "Columbiformes",
        //   "family": "Columbidae",
        //   "genus": "Columba",
        //   "species": "C. livia"
        // };
          
        var boid = {
          pos: {
            x: Math.random()*jj.size().width*SCALE,
            y:Math.random()*jj.size().height*SCALE
          },
          vel: {
            x: Math.random()*1-0.5,
            y: Math.random()*1-0.5
          },
          layer: layer,
          eaten: null
        };
        boids.push(boid);

        layer.size({ width: '21', height: '30'});
        layer.el.css('background', 'url(http://almostobsolete.net/boid-left.gif)');
        

        jj.bind('tick', function(hr,m) {
          // Get pos from DOM so we play nice with the aliens
          var pos = layer.position();
          boid.pos = {x: pos.left*SCALE, y: pos.top*SCALE};
          
          boid.vel = vadd(boid.vel,rule1(boid),rule2(boid), rule3(boid), rule4b(boid));
          boid.pos = vadd(boid.pos, boid.vel);
          //boid.pos = vadd(boid.pos, vdiv(boid.vel,2));;
          //boid.pos.x = lim(boid.pos.x, 0, jj.size().width);
          //boid.pos.y = lim(boid.pos.y, 0, jj.size().height);
          //console.log(boid.vel.x, boid.vel.y);
          var newpos = vdiv(boid.pos,SCALE);
          layer.position({left: newpos.x, top: newpos.y});
          //layer.position({left: lim(pos.x % jj.size().width, 0,jj.size().width) , top: lim(pos.y % jj.size().height, 0, jj.size().height)});

          if (num == 0) {
            layer.el.css('background', 'url(http://almostobsolete.net/bar.png)');
            layer.size({ width: '30', height: '25'});
            } else {
          if (boid.vel.x > 0) {
            layer.el.css('background', 'url(http://almostobsolete.net/boid-right.gif)');
          } else {
            layer.el.css('background', 'url(http://almostobsolete.net/boid-left.gif)');
          }
          }

          if (boid.eaten && (new Date().getTime()) - boid.eaten > 10) {
            layer.el.show();
            boid.eaten = null;
          }
        });
        layer.bind('eat', function () {
          boid.eaten = new Date().getTime();
          layer.el.hide();
          jj.chat("Oh noes! I just got eaten :(", layer);
        });;

      });
    })();
  }
})();

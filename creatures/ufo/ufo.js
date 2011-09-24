jj.createCreature("ufo", function (creature) {
    "use strict";

    var captured = {},
        positionFactor = 0.005,
        $ = jj.jQuery,
        SEARCH = 1,
        CHASE = 2,
        CAPTURE = 3,
        RETURN = 4,
        state = SEARCH,
        worldSize = jj.size(),
        beam,
        target,
        targetName,
        renderHeight,
        cachedTarget;

    creature
        .data({
            sight: 200
        })
        .size({
            width: 128,
            height: 250
        })
        .position({
            top: 128,
            left: jj.center().left - 64
        });

    /////

    // DOM
    beam = $(document.createElementNS("http://www.w3.org/2000/svg", "path"))
        .attr("d", "M64 50 L0 250 L128 250 Z")
        .attr("fill", "lime")
        .attr("opacity", "0.5")
        .css("visibility", "hidden");

    $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
        .css("position", "absolute")
        .css("left", "0")
        .css("top", "0")
        .append(beam)
        .appendTo($(creature.el));

    $(document.createElement("img"))
        .attr("src", "creatures/ufo/ufo.png")
        .appendTo($(creature.el));
        
    /////

    function randomTarget() {
      positionFactor = 0.001;
      var x = Math.random() * worldSize.width,
          y = Math.random() * worldSize.height;
        
      return {
          position: function() {
              return {
                  top: y,
                  left: x
              };
          },
          size: function() {
              return {
                  width: 0,
                  height: 0
              };
          }
      };
    };

    function reset() {
        target = randomTarget();
        captured = {};
        state = SEARCH;
    }

    function easeTowardTarget() {
        var creaturePos = creature.position(),
            targetPos = $.extend({}, target.position()),
            creatureSize = creature.size(),
            targetSize = target.size(),
            sqrDistance;

        // Aim to get middle of target in to middle of tractor beam.
        targetPos.left += (targetSize.width / 2) - (creatureSize.width / 2);
        targetPos.top -= 200;

        // Calculate delta between target and creature.
        var delta = {
          x: targetPos.left - creaturePos.left,
          y: targetPos.top - creaturePos.top
        };

        // Calculate update for this frame.
        var update = {
          x: delta.x * positionFactor,
          y: delta.y * positionFactor
        };

        // Update creature position.
        creature.position({
            left: creaturePos.left + update.x,
            top: creaturePos.top + update.y
        });

        // Increase fraction of delta used next update.
        positionFactor = Math.min(positionFactor + 0.001, 1.0);

        // Recalculate remaining delta based on this update.
        delta.x -= update.x;
        delta.y -= update.y;

        // Work out if creature is "close enough" to target.
        sqrDistance = (delta.x * delta.x) + (delta.y * delta.y);
        return sqrDistance < (20 * 20);
    };

    /////
    
    // EVENT BINDINGS
    creature.bind("see", function(other) {
        if (state === SEARCH && typeof other.name === "function" && !captured[other.name()]) {
            target = other;
            targetName = target.name();
            state = CHASE;
        }
        /*
        else if (typeof other.name !== "function") {
            console.log(other);
            debugger;
        }
        */
    });
    
    jj.bind("midnight", reset);
    
    jj.bind("tick", function(deltaT) {
        var creaturePos;
    
        switch(state) {
            case SEARCH:
                // If close to the current target
                if (easeTowardTarget()) {
                  target = randomTarget();
                }
                break;
                
            case CHASE:
                // If close enough to capture
                if (easeTowardTarget()) {                
                    creaturePos = $.extend({}, creature.position());
                
                    cachedTarget = captured[targetName] = {
                        func: target.position, // creature's original position method
                        position: $.extend({}, target.position())
                    };

                    target.position = function(newPos) {
                        return newPos ? this : cachedTarget.func.call(this);
                    };
                    
                    renderHeight = target.size().height + creature.size().height;
                    
                    $(beam).css("visibility", "visible");
                    
                    creature.chat("Capturing " + targetName);
                    state = CAPTURE;
                }
                break;
                
            case CAPTURE:
                var newCreatureTop = creature.position().top - 3,
                    newTargetTop = target.position().top - 3;
            
                creature.position({top: newCreatureTop});
                cachedTarget.func.call(target, {top: newTargetTop});
                
                if (newCreatureTop + renderHeight < 0) {
                    creature.chat("Returning " + targetName);
                    state = RETURN;
                }
                break;
                
            case RETURN:
                var newCreatureTop = creature.position().top + 2,
                    newTargetTop = target.position().top + 2;
                
                // Is it now back at the original capture position?
                if (newTargetTop >= cachedTarget.position.top) {
                    target.position = cachedTarget.func; // return creature's original position method
                    target.position(cachedTarget.position);
                    
                    $(beam).css("visibility", "hidden");
                    target = randomTarget();
                    state = SEARCH;
                }
                // If not, then move it towards the capture position
                else {
                    creature.position({top: newCreatureTop});
                    cachedTarget.func.call(target, {top: newTargetTop});
                }
                break;
        }
    });
    
    /////

    reset();
});

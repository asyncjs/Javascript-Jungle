(function(jQuery) {

    var $ = jQuery;

    function findIntersectors(creature, creatures, range) {
        
        var intersectors = [];

        if (creature.data().background) {
            return intersectors;
        }

        var t_pos = creature.position();
        var t_size = creature.size();
        if (! range) {

            var t_x = [t_pos.left, t_pos.left + t_size.width];
            var t_y = [t_pos.top, t_pos.top + t_size.height];

        } else {
            
            // HACK! if range, intersect against box 2 * range on side
            // centered on creature position.
            t_pos.left += (t_size.width / 2);
            t_pos.top += (t_size.height / 2);
            var halfRange = range / 2;
            var t_x = [t_pos.left - halfRange, t_pos.left + halfRange];
            var t_y = [t_pos.top - halfRange, t_pos.top + halfRange];
        }
        
        $.each(creatures, function (name, intersector) {
            var i_pos = intersector.position();
            var i_size = intersector.size();
            var i_x = [i_pos.left, i_pos.left + i_size.width];
            var i_y = [i_pos.top, i_pos.top + i_size.height];
            if ( intersector != creature &&
                 ! intersector.data().background &&
                 t_x[0] < i_x[1] && t_x[1] > i_x[0] &&
                 t_y[0] < i_y[1] && t_y[1] > i_y[0]) {
                intersectors.push(intersector);
            }
        });

        return intersectors;
    }

    function triggerEvents(target, name, intersectors) {

        var len = intersectors.length;
        for(var i = 0; i < len; ++i) {
            target.trigger(name, intersectors[i]);
        }
    }

    jj.createCreature('awareness', function (creature) {

        // HACK! make awareness creature invisible
        creature.size({width: 0, height: 0});
        creature.data({background: true});

        jj.bind('tick', function (frame) {

            // HACK! initial naive collision detection - loop through
            // each creature comparing against each other creature
            // TODO: quad trees or similar to speed this up.
            var creatures = jj.all();
            $.each(creatures, function (name, current) {
                var intersectors = findIntersectors(current, creatures);
                triggerEvents(current, 'touch', intersectors);
                
                if (current.data().sight) {
                    var range = current.data().sight;
                    intersectors = findIntersectors(current, creatures, range);
                    triggerEvents(current, 'see', intersectors);
                }
                if (current.data().hearing) {
                    var range = current.data().hearing;
                    intersectors = findIntersectors(current, creatures, range);
                    triggerEvents(current, 'hear', intersectors);
                }
                if (current.data().smell) {
                    var range = current.data().smell;
                    intersectors = findIntersectors(current, creatures, range);
                    triggerEvents(current, 'smell', intersectors);
                }
            });
        });
    });
})(jj.jQuery);
(function(jQuery) {

    var $ = jQuery;

    function findIntersectors(layer, layers) {
        
        var intersectors = [];

        var t_pos = layer.position();
        var t_size = layer.size();
        var t_x = [t_pos.left, t_pos.left + t_size.width];
        var t_y = [t_pos.top, t_pos.top + t_size.height];

        $.each(layers, function (name, intersector) {
            var i_pos = intersector.position();
            var i_size = intersector.size();
            var i_x = [i_pos.left, i_pos.left + i_size.width];
            var i_y = [i_pos.top, i_pos.top + i_size.height];
            if ( intersector != layer && 
                 t_x[0] < i_x[1] && t_x[1] > i_x[0] &&
                 t_y[0] < i_y[1] && t_y[1] > i_y[0]) {
                intersectors.push(intersector);
            }
        });

        return intersectors;
    }

    jj.createLayer('awareness', function (layer) {

        layer.size({width: 0, height: 0});

        jj.bind('tick', function (frame) {

            // initial naive collision detection - loop through
            // each layer comparing against each other layer
            var layers = jj.all();
            $.each(layers, function (name, currentLayer) {
                var intersectors = findIntersectors(currentLayer, layers);
                var len = intersectors.length;
                for(var i = 0; i < len; ++i) {
                    currentLayer.trigger('touch', intersectors[i]);
                }
            });
        });
    });

})(jj.jQuery);
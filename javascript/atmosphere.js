//adjust background. remove stars in morning (example of cross creature talk)

jj.createCreature('atmosphere', function (layer) {
  // we don't need layer for this as it's provided.
  var el = jj.jQuery('div#jungle');
  jj.bind('clock', function(hr,m) {
    el.css('backgroundColor', '#0000' + hr.toString(16));
  });
  layer.el.remove();
});

jj.createCreature('atmosphere', function (layer) {
  // we don't need layer for this as it's provided.
  layer.el.remove();
  var el = jj.jQuery('div#jungle');
  jj.bind('clock', function(hr,m) {
    if(m%10===0) {
      var tar = 255 - Math.floor(Math.abs(hr-12) * 21);
      //these need padding but it has a useful side effect
      var b = tar.toString(16),
          r = (Math.floor(tar/2)).toString(16);
      el.css('backgroundColor', '#00' + r + b);
    }
  });
});

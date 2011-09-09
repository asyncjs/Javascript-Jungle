jj.createLayer('cloud', function (layer) {
  var el = layer.el;
  var jq = jj.jQuery;
  var world = jj.size();
  layer.size({
    width:  world.width,
    height: world.height
  });
});

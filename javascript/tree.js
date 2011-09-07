jj.createLayer('tree', function (layer) {
  // the div element for the layer.
  var el = layer.el;
  // Set the size of your layer.
  jQuery(layer).size({width: 50, height: 100});
  var rp = Raphael(el[0],50,100);
  var tree = rp.path("M10 10L90 90").attr({
    stroke: 'brown'
  });
});
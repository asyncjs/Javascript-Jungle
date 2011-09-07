jj.createLayer('grass', function (layer) {
  // the div element for the layer.
  var el = layer.el;
  // Set the size of your layer.
  jQuery(layer).size({width: 50, height: 100});
  var paper = Raphael(el[0],50,100);
  paper.circle(25, 50, 25);
});
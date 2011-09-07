jj.createLayer('grass', function (layer) {
  // the div element for the layer.
  var el = layer.el;
  var jq = jj.jQuery;
  // Set the size of your layer.
  jq(layer).size({width: '100%', height: '100%'});
  var rp = Raphael(el[0],layer.size().width,layer.size().height);
  var path = ["M 0 100"];
  //create the grass path
  for (var i = 0; i <= layer.size().width; i+=30){
    path.push("L " + i + " 0");
    path.push("L " + i + " 100");
  };
  path.push("z");
  var grass = rp.path(path.join(" ")).attr({
    stroke: '100-#0f5b0f-#37cf37',
    fill: '100-#0f5b0f-#37cf37'
  });
});

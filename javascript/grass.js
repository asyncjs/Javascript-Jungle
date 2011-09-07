jj.createLayer('grass', function (layer) {
  // the div element for the layer.
  var el = layer.el;
  var jq = jj.jQuery;
  // Set the size of your layer.
  jq(layer).size({ width: '100%', height: '100%'});
  var w = layer.size().width, 
      h = layer.size().height;
  var rp = Raphael(el[0],w,h);
  var path = ["M 0 " + (h)];
  //create the grass path
  for (var i = 0; i <= layer.size().width; i+=20){
    var gh = Math.floor(Math.random()*20) + 70;
    path.push("L " + i + " " + (h - gh ));
    path.push("L " + i + " " + h);
  };
  path.push("z");
  console.log(path.join(" "));
  var grass = rp.path(path.join(" ")).attr({
    stroke: '100-#0f5b0f-#37cf37',
    fill: '100-#0f5b0f-#37cf37'
  });
});

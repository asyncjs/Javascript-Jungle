jj.createCreature('grass', function (layer) {
  // the div element for the layer.
  var el = layer.el;
  var jq = jj.jQuery;
  // Set the size of your layer.
  layer.size({ width: '100%', height: '100%'});
  var w = layer.size().width, 
      h = layer.size().height;
  var rp = Raphael(el[0],w,h);
  var curGrowth = 0;
  var gen_path = function(growth) {
    var path = ["M 0 " + h];
    for (var i = 0; i <= layer.size().width; i+=20){
      //this can't be random every time.
      var gh = Math.floor(Math.random()*100) + 70;
      path.push("L " + i + " " + (h - growth - gh ));
      path.push("L " + i + " " + (h + gh));
    };
    path.push("z");
    return path.join(" ");
  };
  //create the grass path
  console.log(gen_path(curGrowth));
  var grass = rp.path(gen_path(curGrowth)).attr({
    stroke: '100-#0f5b0f-#37cf37',
    fill: '100-#0f5b0f-#37cf37'
  });

  jj.bind('breakfast',function() {
    curGrowth += 20;
    grass.animate({path: gen_path(curGrowth)}, 1000);
  });
});

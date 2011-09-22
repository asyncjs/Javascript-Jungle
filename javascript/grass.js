jj.createCreature('grass', function (layer) {

    layer.data({
        background: true
    });
    layer.position({zIndex: 1});

  // the div element for the layer.
  var el = layer.el;
  var jq = jj.jQuery;
  // Set the size of your layer.
  //set to bottom of window
  
  layer.size({ width: '100%', height: '100%'});
  var w = layer.size().width, 
      h = layer.size().height;
  var curGrowth = 0;
  var gen_path = function(growth,os) {
    os || (os = 0);
    var path = [['M',os,h].join(' ')];
    for (var i = os; i <= w; i+=20){
      //this can't be random every time.
      //edges grow higher
      var gh = Math.floor(Math.random()*100) + 70;
      var eos = Math.abs(i - (w/2));
      if (eos > w/3) gh += parseInt(eos - w/3,10);
      path.push(['L',i,(h - growth - gh )].join(' '));
      path.push(['L',i,(h + gh)].join(' '));
    };
    return path.concat('z').join(" ");
  };
  //create the grass path
  //grass should be a class.
  //double layer it

  var rp = Raphael(el[0],w,h);
  var grass = rp.path(gen_path(curGrowth)).attr({
    stroke: '100-#0f5b0f-#37cf37',
    fill: '100-#0f5b0f-#37cf37'
  });

  var grass2 = rp.path(gen_path(curGrowth-60,10)).attr({
    stroke: '100-#10360C-#15610F',
    fill: '100-#10360C-#15610F'
  });


  jj.bind('breakfast',function() {
    curGrowth += 20;
    grass.animate({path: gen_path(curGrowth)}, 1000);
    grass2.animate({path: gen_path(curGrowth-60,10)}, 1000);
    jj.trigger('grow',layer);
  });

  jj.bind('rain',function() {
    curGrowth += 50;
    grass.animate({path: gen_path(curGrowth)}, 1000);
    grass2.animate({path: gen_path(curGrowth-60,10)}, 1000);
    jj.trigger('grow',layer);
  });

  layer.length = function () {
    return curGrowth;
  };
  jj.bind('grow',function() {
    if(curGrowth > h) {
      //game over man, game over.
      var canvas = document.createElement('canvas');
      canvas.className = 'full front';
      canvas.width = w;
      canvas.height = h;
      jj.jQuery('div#jungle').append(canvas);
      context = canvas.getContext('2d');
      context.fillStyle    = 'red';
      context.font = "bold 50px 'OCR A Std'";
      context.fillText("Game Over", w/2-150,h/2);
    }
    
  });
  layer.eat = function () {
    if(curGrowth>20) {
      //find intersection of the caller
      curGrowth -= 20;
      grass.animate({path: gen_path(curGrowth)}, 1000);
      grass2.animate({path: gen_path(curGrowth-60,10)}, 1000);
      jj.trigger('eaten', layer);
      return 20;
    }
    //provide food amount as return
    return 0;
  };

});


//todo edge growth, grow on rain, shrink on eat

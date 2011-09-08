  jj.createCreature('stars', function (layer) {
    // the div element for the layer.
    var el = layer.el;
    layer.size({ width: '100%', height: '30%'});
    var w = layer.size().width, 
        h = layer.size().height;
    var rp = Raphael(el[0],w,h);
    var stars = [];
    jj.bind('clock', function(hr,m) {
      if((hr>20) && m%10===0) {
        stars.push(
          rp.circle( 
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
            hr>23 ? 2 : 1
          ).attr({
            stroke:'#fff',
            fill: '#fff'
          })
        );
      } else if(hr < 5) {
        //remove stars
        var nxt = stars.pop();
        if(nxt) {
          nxt.remove();
        }
      }
    });
  });

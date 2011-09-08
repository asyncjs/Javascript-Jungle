  jj.createCreature('stars', function (layer) {
    // the div element for the layer.
    var el = layer.el;
    layer.size({ width: '100%', height: '30%'});
    var w = layer.size().width, 
        h = layer.size().height;
    var rp = Raphael(el[0],w,h);
    var stars = [];
    jj.bind('clock', function(hr,m) {
      if((hr>21 || hr<7) && m%10===0) {
        stars.push(
          rp.circle( 
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
            hr>23 || hr <1 ? 2 : 1
          ).attr({
            stroke:'#fff',
            fill: '#fff'
          })
        );
      }
    });
  });

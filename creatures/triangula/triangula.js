jj.createCreature('triangula', function (layer) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      twidth    = 75,
      theight   = 75,
      width   = canvas.width  = 100,
      height  = canvas.height = 100,
      world   = jj.size(),

      imgd    = context.createImageData(twidth,theight),
      z       = 1,
      l       = 5,
      xdir    = 1,
      ydir    = 1,
      xd = '+=1px',
      yd = '+=1px';


  var memo = [twidth*theight],offset;
  for(var x=0;x<twidth;x++){
      for(var y=0;y<theight;y++){
	  offset=(x+y*twidth)*4;
	  memo[offset] = {
	      r:parseInt((x^y)),
	      g:parseInt((x|y)),
	      b:parseInt((x&y))
	  };
      }
  }

  layer.size({width: width, height: height});
  layer.position({top: 200, left: 200});
  layer.el.append(canvas);

  jj.bind('tick', function (frame) {
	  //position:
	  sx = layer.position().left;
	  sy = layer.position().top;

	  if (sy<100 || sy>world.height-100) {
	      ydir*=-1;
	      yd = (ydir>0)?'+=1px':'-=1px';
	  }
	  if (sx<100 || sx>world.width-100) {
	      xdir*=-1;
	      xd = (xdir>0)?'+=1px':'-=1px';
	  }
	  layer.position({top: yd, left: xd});

	  //draw fract:
	  z++;
	  z%=255;
	  for(var x=0;x<twidth;x++) {
	      for(var y=0;y<theight;y++) {
		  var offset=(x+y*twidth)*4;
		  
		  imgd.data[offset+0]=(memo[offset].r * z)%255;
		  imgd.data[offset+1]=(memo[offset].g * z)%255;
		  imgd.data[offset+2]=(memo[offset].b * z)%255;
		  imgd.data[offset+3]=200;
	      }
	  }
	  context.putImageData(imgd,0,0);

	  //draw face	  
	  l++;
	  l%=10;

	  //corners
	  context.clearRect(32,12,12,12);
	  context.clearRect(12,32,12,12);
	  context.clearRect(0,0,12,12);

	  //eyes
	  context.clearRect(63,0,12,12);
	  context.clearRect(0,63,12,12);
	  
	  //pupils
	  context.fillStyle='#fdc';
	  context.fillRect(36,16,4,4);
	  context.fillRect(16,36,4,4);

	  //iris
	  context.fillStyle='#000';
	  context.fillRect(38,16,2,2);
	  context.fillRect(18,36,2,2);
	  
          //mouth
	  context.beginPath();
	  context.arc(40,24,40,0.33*Math.PI,0.66*Math.PI,false);
	  context.arc(40,24,40,0.66*Math.PI,0.33*Math.PI,true);
	  context.lineWidth=l;
	  context.closePath();
	  context.stroke();
	  
  });
});

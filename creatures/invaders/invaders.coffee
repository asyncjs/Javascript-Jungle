jj.createCreature "invader", (invader) ->
  canvas  = document.createElement "canvas"
  context = canvas.getContext "2d"
  width   = canvas.width  = 110
  height  = canvas.height = 110
  world   = jj.size()
  top = 50
  left = jj.center().left - (width / 2)

  invader.size width: width, height: height
  invader.position left: 0, top: 0, zIndex: 1000
  invader.el.append canvas
  
  context.fillStyle = "red"
  
  invader1 = """
    x     x  
     x   x   
    xxxxxxx  
   xx xxx xx 
  xxxxxxxxxxx
  x xxxxxxx x
  x x     x x
     xx xx  
  """

  invader1.split(/\n/).forEach (pixel, row) ->
    pixel.split('').forEach (active, col) ->
      context.fillRect col * 10, row * 10, 10, 10 if active == 'x'

jj.createCreature 'space', (space) ->
  ;

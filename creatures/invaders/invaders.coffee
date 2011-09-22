jj.createCreature "invader", (invader) ->
  PIXEL     = 10
  canvas    = document.createElement "canvas"
  context   = canvas.getContext "2d"
  width     = canvas.width  = 11 * PIXEL
  height    = canvas.height = 11 * PIXEL
  direction = 1
  world     = jj.size()
  top       = 5 * PIXEL
  left      = 0

  invader.size width: width, height: height
  invader.position left: left, top: top, zIndex: 1000
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
      context.fillRect col * PIXEL, row * PIXEL, PIXEL, PIXEL if active == 'x'

  jj.bind "clock", (hour, minute) ->
    left += (20 * direction)

    if left > (world.width - width) or left < 0
      direction = if left < 0 then 1 else -1
      top += 110

    invader.position(left: left, top: top) if minute % 2 == 0

jj.createCreature 'space', (space) ->
  ;

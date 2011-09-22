jj.createCreature 'rain', (layer) ->
  layer.data background: true
  ws = jj.size()
  layer.position zIndex: 999
  layer.size width: ws.width, height: ws.height
  context = []
  for ly in [0 .. 1]
    canvas = document.createElement 'canvas'
    canvas.className = "rain"
    canvas.width = ws.width
    canvas.height = ws.height
    layer.el.append canvas
    context[ly] = canvas.getContext '2d'
    
  $rnd = (m)-> Math.floor Math.random() * m
  console.log context
  jj.bind 'rain', (weight) ->
    jj.chat "And the heavens open...", layer
    #do a rainstorm, single droplets hit screen, background has lines of blue
    $rl = (cx,skew,sh,cl)->
      cx.strokeStyle = cl
      cx.lineWidth = 1
      cx.lineCap = "square"
      cx.beginPath()
      for x in [-skew .. canvas.width]
        cx.moveTo x, 0
        cx.lineTo x + skew, canvas.height
        cx.stroke()
        cx.closePath()
        x += $rnd 20
      $anim = (p) -> 
        _.delay(
          -> jj.jQuery(cx.canvas).css left: Math.floor(Math.PI * (Math.pow(10, p)) % 10); $anim if ++p > 10 then 0 else p
          50
        )
      $anim sh
    $rl context[0], 50, 0, '#1B59E0'
    $rl context[1], 70, 5, '#163882'
    
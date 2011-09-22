jj.createCreature 'rain', (layer) ->
  layer.data background: true
  ws = jj.size()
  layer.position zIndex: 999
  layer.size width: ws.width, height: ws.height
  raining = 0
  $rnd = (m)-> Math.floor Math.random() * m

  #preload raindrops
  droplet = []
  for id in [1 .. 2]
    droplet[id] = new Image()
    droplet[id].src = "images/droplet#{id}.png"

  jj.bind 'clock',  (h,m) ->
    jj.trigger 'rain' if !raining && h == $rnd(12) && m == 0

  jj.bind 'rain', (weight) ->
    context = []
    for ly in [0 .. 2]
      canvas = document.createElement 'canvas'
      canvas.className = "full"
      canvas.width = ws.width
      canvas.height = ws.height
      layer.el.append canvas
      context[ly] = canvas.getContext '2d'
    #fuck this is awful, sorry will refactor when i get chance

    jj.bind 'clock',  (h,m) ->
      context[2].drawImage droplet[1+$rnd(2)], $rnd(ws.width),$rnd(ws.height), 30, 30 if raining && $rnd(5)==1

    jj.chat "And the heavens open...", layer
    jj.trigger 'rain:start', layer
    raining = 1
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
    _.delay(
      -> raining = 0;jj.chat "Deluge over", layer; jj.trigger 'rain:stop',layer;jj.jQuery(cx.canvas).remove() for cx in context
      15000
    ) 
    

jj.createCreature 'rain', (layer) ->
  layer.data background: true
  ws = jj.size()
  layer.size width: ws.width, height: ws.height
  canvas = document.createElement 'canvas'
  canvas.width = ws.width
  canvas.height = ws.height
  layer.el.append canvas
  context = canvas.getContext '2d'
  jj.bind 'rain',  (weight) ->
    #do a rainstorm, single droplets hit screen, background has lines of blue
    
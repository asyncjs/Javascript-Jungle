jj.createCreature 'stars', (layer) ->
  layer.data background: true
  ws = jj.size()
  w = ws.width
  h = 200
  layer.size width: w, height: h
  #pre initalise with the stars locations
  layer.position zIndex: -998
  rp = Raphael(layer.el[0],ws.width,h);
  
  $rnd = (m)-> Math.floor Math.random() * m
  star_positions = ( [$rnd(w), $rnd(h-3),if star>50 then 2 else 1] for star in [1..100] )
  star_visible = []
  #work out where we are in day at initialisation and render
  jj.bind 'clock',  (h,m) ->
    if m % 10 == 0
      #distance from zero
      max = Math.floor(Math.abs(12-h) * 8.33)
      max = 0 if max < 0
      remove = star_visible.length > max
      for i in [star_visible.length ... max ]
        if remove
          star_visible.pop().remove()
        else
          star_visible.push rp.circle.apply(rp, star_positions[i]).attr
            stroke:'#fff'
            fill: '#fff'
    else if star_visible.length
      #twinkle
      tar = $rnd(155) + 100
      rgb = "rgb(#{tar},#{tar},#{tar})"
      for star in [1 .. 10]
        star_visible[$rnd(star_visible.length)].attr
          fill: rgb
          stroke: rgb
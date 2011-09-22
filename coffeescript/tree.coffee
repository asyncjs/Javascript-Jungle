class Tree
  constructor: (canvas, @x,@y,@branch_length,@color) ->
    @context = canvas.getContext '2d'
    @context.strokeStyle = @color
    @_makeBranch @x, @y, @branch_length, -Math.PI/2, @max_size
  x: 100
  y: 400
  max_sub_branch: 5
  max_sub_angle: 3*Math.PI/4
  max_size: 6
  branch_length: 110
  color: "#553111"
  _makeBranch: (start_x, start_y, length, angle, size) ->
    if size > 0
      @context.lineWidth = size*2
      @context.beginPath()
      @context.moveTo start_x, start_y
      end_x = start_x + length * Math.cos(angle)
      end_y = start_y + length * Math.sin(angle)

      @context.lineTo end_x, end_y
      @context.stroke();

      sub_branch = Math.floor Math.random() * (@max_sub_branch - 1) + 1
      branch_length_dimin = .5 + Math.random()/2
      for i in [0 .. sub_branch]
        newLength = length * branch_length_dimin
        newAngle = angle + Math.random() * @max_sub_angle - @max_sub_angle / 2
        newSize = size - 1
        @_makeBranch end_x, end_y, newLength, newAngle, newSize
      @context.closePath();
      #draw leaves here. change colour with season.

colours = ['#3D1E09','#693510','#914814','#E0741B']
for distance in [12 .. 3] by -3
  console.log distance
  tcol = colours.shift()
  for tree in [1 .. distance]
    jj.createCreature "tree-#{distance}-#{tree}", (layer) ->
      layer.data background: true
      ws = jj.size()
      [w,h] = [Math.floor(ws.width / distance), Math.floor(ws.height / (distance/3))]
      layer.size width: w+200, height: h
      layer.position bottom: 0, left: w*(tree-1), zIndex: -910-distance
      
      #the further back the smaller and darker the tree.
      canvas = document.createElement 'canvas'
      canvas.width = w+200
      canvas.height = h
      layer.el.append canvas
      new Tree canvas, w/2, h-((distance-3)*10),Math.floor((h-100)/6),tcol
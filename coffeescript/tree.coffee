class Tree
  constructor: (canvas, @x,@y) ->
    @context = canvas.getContext '2d'
    @context.strokeStyle = @color
    @_makeBranch @x, @y, @branch_length, -Math.PI/2, @max_size
  x: 100
  y: 400
  max_sub_branch: 5
  max_sub_angle: 3*Math.PI/4
  max_size: 7
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

jj.createCreature 'trees', (layer) ->
  layer.size width: '100%', height: '100%'
  layer.position zIndex: -910
  canvas = document.createElement 'canvas'
  layer.el.append canvas
  canvas.width  = layer.size().width
  canvas.height = layer.size().height
  new Tree canvas, 100, canvas.height
  new Tree canvas, canvas.width - 100, canvas.height
  new Tree canvas, canvas.width / 2, canvas.height

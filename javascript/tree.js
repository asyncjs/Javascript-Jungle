(function() {
  var Tree;
  Tree = (function() {
    function Tree(canvas, x, y) {
      this.x = x;
      this.y = y;
      this.context = canvas.getContext('2d');
      this.context.strokeStyle = this.color;
      this._makeBranch(this.x, this.y, this.branch_length, -Math.PI / 2, this.max_size);
    }
    Tree.prototype.x = 100;
    Tree.prototype.y = 400;
    Tree.prototype.max_sub_branch = 5;
    Tree.prototype.max_sub_angle = 3 * Math.PI / 4;
    Tree.prototype.max_size = 7;
    Tree.prototype.branch_length = 110;
    Tree.prototype.color = "#553111";
    Tree.prototype._makeBranch = function(start_x, start_y, length, angle, size) {
      var branch_length_dimin, end_x, end_y, i, newAngle, newLength, newSize, sub_branch;
      if (size > 0) {
        this.context.lineWidth = size * 2;
        this.context.beginPath();
        this.context.moveTo(start_x, start_y);
        end_x = start_x + length * Math.cos(angle);
        end_y = start_y + length * Math.sin(angle);
        this.context.lineTo(end_x, end_y);
        this.context.stroke();
        sub_branch = Math.floor(Math.random() * (this.max_sub_branch - 1) + 1);
        branch_length_dimin = .5 + Math.random() / 2;
        for (i = 0; 0 <= sub_branch ? i <= sub_branch : i >= sub_branch; 0 <= sub_branch ? i++ : i--) {
          newLength = length * branch_length_dimin;
          newAngle = angle + Math.random() * this.max_sub_angle - this.max_sub_angle / 2;
          newSize = size - 1;
          this._makeBranch(end_x, end_y, newLength, newAngle, newSize);
        }
        return this.context.closePath();
      }
    };
    return Tree;
  })();
  jj.createCreature('trees', function(layer) {
    var canvas;
    layer.size({
      width: '100%',
      height: '100%'
    });
    canvas = document.createElement('canvas');
    layer.el.append(canvas);
    canvas.width = layer.size().width;
    canvas.height = layer.size().height;
    new Tree(canvas, 100, canvas.height);
    new Tree(canvas, canvas.width - 100, canvas.height);
    return new Tree(canvas, canvas.width / 2, canvas.height);
  });
}).call(this);

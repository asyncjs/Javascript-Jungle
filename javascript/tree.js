(function() {
  var Tree, colours, distance, tcol, tree;
  Tree = (function() {
    function Tree(canvas, x, y, branch_length, color) {
      this.x = x;
      this.y = y;
      this.branch_length = branch_length;
      this.color = color;
      this.context = canvas.getContext('2d');
      this.context.strokeStyle = this.color;
      this._makeBranch(this.x, this.y, this.branch_length, -Math.PI / 2, this.max_size);
    }
    Tree.prototype.x = 100;
    Tree.prototype.y = 400;
    Tree.prototype.max_sub_branch = 5;
    Tree.prototype.max_sub_angle = 3 * Math.PI / 4;
    Tree.prototype.max_size = 6;
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
  colours = ['#3D1E09', '#693510', '#914814', '#E0741B'];
  for (distance = 6; distance >= 3; distance += -3) {
    tcol = colours.shift();
    for (tree = 1; 1 <= distance ? tree <= distance : tree >= distance; 1 <= distance ? tree++ : tree--) {
      jj.createCreature("tree-" + distance + "-" + tree, function(layer) {
        var canvas, h, w, ws, _ref;
        layer.data({
          background: true
        });
        ws = jj.size();
        _ref = [Math.floor(ws.width / distance), Math.floor(ws.height / (distance / 3))], w = _ref[0], h = _ref[1];
        layer.size({
          width: w + 200,
          height: h
        });
        layer.position({
          bottom: 0,
          left: w * (tree - 1),
          zIndex: -910 - distance
        });
        canvas = document.createElement('canvas');
        canvas.width = w + 200;
        canvas.height = h;
        layer.el.append(canvas);
        return new Tree(canvas, w / 2, h - ((distance - 3) * 10), Math.floor((h - 100) / 6), tcol);
      });
    }
  }
}).call(this);

(function($) {
	var undefined;

	$.FractalTree = function(opts) {
		var canvas, ctx,
		cfg = $.extend(true, {
			initX: 400,
			initY: 400,
			max_sub_branch: 5,
			max_sub_angle: 3*Math.PI/4,
			max_size: 5,
			branch_length: 75,
			color: "#fff"
		}, opts);
		
		function init() {
			if(cfg.canvas !== undefined) {
				canvas = cfg.canvas.get(0);
				ctx = canvas.getContext("2d");	
				ctx.strokeStyle = cfg.color;		

				_makeBranch(cfg.initX, cfg.initY, cfg.branch_length, -Math.PI/2, cfg.max_size);
			}
		}
		
		/* start:private */
		function _makeBranch(start_x, start_y, length, angle, size) {
			if (size > 0) {
				ctx.lineWidth = size;
				ctx.beginPath();
				ctx.moveTo(start_x, start_y);
				
				var end_x = start_x + length * Math.cos(angle);
				var end_y = start_y + length * Math.sin(angle);
				ctx.lineTo(end_x, end_y);
				ctx.stroke();
				
				var sub_branch = Math.random(cfg.max_sub_branch - 1) + 2;
				var branch_length_dimin = .5 + Math.random()/2;
				
				for(var i=0; i < sub_branch; i++) {
					var newLength = length * branch_length_dimin;
					var newAngle = angle + Math.random() * cfg.max_sub_angle - cfg.max_sub_angle / 2;
					var newSize = size - 1;
					_makeBranch (end_x, end_y, newLength, newAngle, newSize);
					
				}
				ctx.closePath();
			}
		}
		/* end:private*/
		
		init();
	};
	
})(jQuery);

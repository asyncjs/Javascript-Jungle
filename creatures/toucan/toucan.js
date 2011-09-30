/**
 * @see https://github.com/asyncjs/Javascript-Jungle/wiki/api
 */
//TODO: add to creatures.js instead..
var creature = jj.createCreature('toucan', function (layer) {
	$ = jj.jQuery;
	var jungle = $(layer.el).parent();
	var jungleWidth = jungle.width();
	var jungleHeight = jungle.height();
	var jungleBounds = { left: 0 - 50, right: jungleWidth + 50 }
	var animationInterval = 20;
	var w = 200;
	var h = 200;
	var canvas = $("<canvas />").attr("width", w).attr("height", h).css({ position: "relative" }).appendTo(layer.el)[0];
	$(canvas).click(function(ev) {
		(function(){var d=document,j=d.getElementById('__cornify_nodes'),k=null;var files=['http://cornify.com/js/cornify.js','http://cornify.com/js/cornify_run.js'];if(j){cornify_add();}else{k=d.createElement('div');k.id='__cornify_nodes';d.getElementsByTagName('body')[0].appendChild(k);for(var l=0;l<files.length;l++){j=d.createElement('script');j.src=files[l];k.appendChild(j);}}})();
	});
	var ctx = canvas.getContext("2d");

	var environ = {
		eyeSize: 1,
		x: 200,
		y: 300,
		topBeakAngle: 0,
		bottomBeakAngle: 0,
		acceleration: 0,
		velocity: 0.1,
		flying: false,
		animation: [],
		sleeping: true,
		scale: 0.2,
		laserLength: 0
	};

	layer.data({
		sight: 50
	});

	var utils = {
		toRadians: function(deg) {
			return (deg * Math.PI) / 180;
		},
		random: function(a1, a2) {
			var tmp = Math.random() * (a2 - a1);
			return a1 + tmp;
		},
		style: function(options) {
			if(options) {
				if(options.lineWidth) {
					ctx.lineWidth = options.lineWidth;
				}
				if(options.stroke) {
					ctx.strokeStyle = options.stroke;
					ctx.stroke();
				}
				if(options.fill) {
					ctx.fillStyle = options.fill;
					ctx.fill();
				}
			}
		},
		drawPolygon: function(points, options) {
			ctx.beginPath();
			ctx.moveTo(points[0][0], points[0][1]);
			for(var i = 1; i < points.length; i++) {
				ctx.lineTo(points[i][0], points[i][1]);
			}
			this.style(options);
			ctx.closePath();
		},
		circle: function(x1, y1, radius, options) {
			ctx.beginPath();
			var startAngle = options.startAngle || 0;
			var endAngle = options.endAngle || 360;
			ctx.arc(x1, y1, radius, utils.toRadians(startAngle), utils.toRadians(endAngle));
			this.style(options);
			ctx.closePath();
		}
	};

	var toucan = {
		animate: {
			_gliding: false,
			flyAway: function(delta) {
				if(toucan.animate._gliding) {
					return false;
				} else {
					toucan.animate._gliding = true;
				}
				var i = setInterval(function() {
					var end = function() {
						clearInterval(i);
						toucan.animate._gliding = false;
					};
					environ.scale += delta;
					if(environ.scale > 0.2) {
						environ.scale = 0.2;
						end();
					}
					if(environ.scale <= 0.05) {
						environ.scale = 0.05;
						end();
					}
				}, 500);
				
			},
			_allowed: function() {
				return environ.animation.length > 0 ? false : true;
			},
			eat: function() {
				if(environ.sleeping) {
					return;
				}
				if(!toucan.animate._allowed()) {
					return;
				}
				var angle = utils.random(0, 20);
				var openMouth = function() {
					environ.topBeakAngle = angle;
					environ.bottomBeakAngle = -angle;
				};
				var closeMouth = function() {
					environ.topBeakAngle = 0;
					environ.bottomBeakAngle = 0;
				};
				environ.animation = [
					openMouth, closeMouth, openMouth, closeMouth, openMouth, closeMouth
				];
			},
			sniff: function() {
				var angle = utils.random(0, 20);
				environ.topBeakAngle = angle;
				environ.bottomBeakAngle = angle;
			},
			ascend: function() {
				if(environ.sleeping) {
					return;
				}
				var jumpTo = utils.random(0, 50);
				var animation = [];
				var increment = 2;
				var inReverse = false;
				var steps = parseInt(jumpTo / increment, 10);
				var threshold = environ.y + jumpTo;
				for(var i = 0; i < steps * 2; i++) {
					animation.push(function() {
							if(environ.y > threshold) {
								inReverse = true;
							}
							environ.y = inReverse ? environ.y - increment 
								: environ.y + increment;
					});
				}
				environ.animation = animation;
			},
			blink: function() {
				if(environ.sleeping) {
					return;
				}
				environ.animation = [function() {
					environ.eyeSize = utils.random(0, 10);
				}];
			},
			sleep: function() {
				environ.sleeping = true;
				environ.eyeSize = 0.000001;
			},
			wake: function() {
				environ.sleeping = false;
				environ.flying = true;
				environ.eyeSize = 1;
			},
			_fireLaser: function() {
				// not yet implemented
			},
			stop: function() {
				if(environ.flying && environ.byTree) {
					environ.flying = false;
					setTimeout(function() {
						environ.flying = true;
					}, utils.random(2000, 10000))
				}
			}
		},
		doStuff: function() {
			if(environ.x > jungleBounds.right && environ.velocity > 0) {
				environ.velocity = -0.1;
				environ.acceleration = 0;
			} else if(environ.x < jungleBounds.left && environ.velocity < 0) {
				environ.velocity = 0.1;
				environ.acceleration = 0;
			};
			if(environ.flying) {
				// s = ut + 1/2at2
				var time = (1000 / animationInterval);
				var distance = parseInt((environ.velocity * time) + (0.5 * environ.acceleration * (time * time)), 10);
				environ.x += distance;

				// v = u - at
				environ.velocity = environ.velocity - (environ.acceleration * time);
			}
			if(environ.animation.length > 0) {
				environ.animation.pop()();
			} else {
				var choice = parseInt(utils.random(0, 10), 10);
				if(choice == 1) { // make eye change size
					this.animate.blink();
				} else if(choice == 2) {
					this.animate.ascend();
				} else if(choice == 4) {
					this.animate.sniff();
				} else if(choice == 5) {
					this.animate.stop();
				} else if(choice == 6) {
					var direction = utils.random(0, 10);
					var delta = direction < 5 ? 0.01 : -0.01;
					this.animate.flyAway(delta)
				}

			}
		},
		beak: function() {
			var options = {
				stroke: "#000",
				fill: "#79D279"
			};
			// bottom
			ctx.save();
			ctx.translate(-10, -10);
			ctx.save();
			ctx.rotate(utils.toRadians(environ.bottomBeakAngle));
			utils.drawPolygon([[0, 20], [0, 50], [100, 60], [0, 20]], options);
			utils.drawPolygon([[100, 60], [20, 45], [20, 30], [100, 60]], { fill: "#118C9C" });
			utils.drawPolygon([[50, 40], [35, 45], [100, 60]], { fill: "red" });
			// top //[20, 28], [50, 40], [45, 45], [20,40]
			ctx.restore();
			ctx.rotate(utils.toRadians(environ.topBeakAngle));
			utils.drawPolygon([[0, 20], [-10, 0], [50, -20], [150, 40], [40, 15], [0, 20]], options);
			utils.drawPolygon([[150, 40], [50, -20], [32,10]], { fill: "red" });
			ctx.restore();
		},
		head: function() {
			utils.circle(-70, 0, 70, { fill: "#222", stroke: "#333", startAngle: 180, endAngle: 360 });
			utils.circle(-50, 0, 50, { fill: "#CEC008", startAngle: 180, endAngle: 360 });
			ctx.beginPath();
			ctx.moveTo(-100, 0);
			ctx.arcTo(-100, 200, 700, 240, 60)
			ctx.arcTo(0, 0, 0, 0, 50);
			utils.style({ fill: "#CEC008" });
			ctx.closePath();
			this.beak();
			// eyes
			utils.circle(-50, -10, 20, { fill: "#7ED719" });
			utils.circle(-45, 0, 8, { fill: "#000000" });
			utils.circle(-45, 0, environ.eyeSize, { fill: "#ffffff" });
		},
		leg: function() {
			utils.drawPolygon([[0, 0], [0, 60], [20, 60], [20, 0]], {
				fill: "#118C9C"
			});
		},
		legs: function() {
			ctx.save();
			ctx.translate(-100, 260);
			if(environ.flying) {
				ctx.rotate(utils.toRadians(utils.random(0, 40)))
			}
			this.leg();
			ctx.translate(-50, 10);
			this.leg();
			ctx.restore();
		},
		body: function() {
			utils.drawPolygon([
				[-140, 0], [-200, 100], [-250, 120], [-270, 140], [-270, 180],
				[-320, 190], [-300, 195], [-320, 200], [-270, 205],
				[-200, 215], [-200, 255], [-100, 270], [-70, 220],
				[-50, 200], [-50, 0]
				], {  stroke: "#333", fill: "#222", lineWidth: 10 })
			//utils.circle(-180, 150, 170, { fill: "#000", stroke: "yellow", lineWidth: 10 });
		},
		render: function() {
			$(canvas).css({ left: environ.x })
			ctx.save();
			ctx.scale(environ.scale, environ.scale);
			ctx.translate(0, 100);
			ctx.translate(400, environ.y);
			if(environ.velocity < 0) {
				ctx.scale(-1, 1);
			}
			if(environ.flying) {
				ctx.rotate(utils.toRadians(45));
			}
			this.body();
			this.head();
			this.legs();
			ctx.restore();
		}
	}
	layer.bind('touch', function(ev) {
		// TODO: should only stop on BRANCHES of a tree. The tree is too generic
		if(ev.name() == "trees") {
			environ.byTree = true;
		} else if(["trees", "grass", "chat", "stars"].indexOf(ev.name()) === -1 && !environ.sleeping) {
			// TODO: make it eat something...
			toucan.animate.eat();
			ev.trigger("eaten");
		}
	});
	jj.bind('clock', function(hours, minutes) {
		//if(hours > 4 && environ.sleeping) {
			toucan.animate.wake();
		//}
	});

	window.toucan = toucan;
	setInterval(function() {
		ctx.clearRect(0, 0, 500, 500);
		toucan.render();
		toucan.doStuff();
		environ.byTree = false;
	}, animationInterval);

});

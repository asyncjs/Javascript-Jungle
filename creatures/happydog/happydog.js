jj.createCreature('happydog', function (creature) {
    var el = creature.el,
        world   = jj.size(),
        bouncy = 0;
        floor = world.height-200
    el.append("<img id=\"happyimg\" src=\"creatures/happydog/media/happydog.svg\">");
    creature.position({top: floor, left: "50px"});
    jj.bind('tick', function () {
        if (creature.position().left > world.width) {
            creature.position({ left: '-150px'})
        }
        else
        {
            creature.position({ left: '+= 10px'});
        }
        if (bouncy > 50)
        {
            creature.position({ top: floor})
            bouncy = 0;
        }
        else
        {
            bouncy += 4;
            creature.position({top: floor-bouncy});
        }
     });
    

});

// jj.createCreature('smileysun', function (smileysun) {
//     
//     var canvas = document.createElement('canvas'),
//         context = canvas.getContext('2d'),
//         width   = canvas.width  = 150,
//         height  = canvas.height = 150,
//         world   = jj.size();
//         // hd = jj.jQuery("#happyimg");
// 
//     smileysun.size({width: width, height: height});
//     smileysun.position({top: 50, left: jj.center().left - (width / 2)});
//     smileysun.el.append(canvas);
// 
//     // svg_object = $(document.createElementNS("http://www.w3.org/2000/svg", "happydog"));
//     // svg_object.append(happy_dog_svg)
//     context.fillStyle = "#FFCC00";
//     context.beginPath();
//     context.arc(50, 50, width / 4, 0, Math.PI * 2, true); 
//     context.closePath();
//     context.fill();
// 
//     jj.bind('tick', function () {
//       if (smileysun.position().top > world.height) {
//         smileysun.position({top: -height});
//         // hd.position({top: -height});
//       }
//       if (smileysun.position().left > world.width) {
//         smileysun.position({left: -width});
//         // hd.position({left: -width});
//       }
//       smileysun.position({top: '+= 1px', left: '+= 10px'});
//       // hd.position({top: '+= 1px', left: '+= 10px'});
//     });
// });
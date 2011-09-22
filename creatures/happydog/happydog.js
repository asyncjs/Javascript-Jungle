jj.createCreature('happydog', function (creature) {
    var el = creature.el,
        world   = jj.size(),
        bouncy = 0;
        dog_height = 225,
        dog_width = 296
        floor = world.height-dog_height
        top = floor,
        left = 50,
        edge = 50
    
    creature.size({ width: dog_width, height: dog_height});
        // canvas = document.createElement('canvas'),
        // context = canvas.getContext('2d'),
        // width   = canvas.width  = 296,
        // height  = canvas.height = 225,
        // floor = world.height-height
    creature.el.css('background', 'url(./creatures/happydog/media/happydog.svg)');
    // el.append(canvas)
    // el.append("<img id=\"happyimg\" src=\"creatures/happydog/media/happydog.svg\">");
    creature.position({top: top, left: left});
    right_to_left = false;
    jj.bind('tick', function () {
        if (left > (world.width-(edge+dog_width))) {
            // creature.position({ left: -150})
            // left = 150;
            right_to_left = true;
            left = left -10;
            creature.position({left:left-10});
        }
        else if (left < edge)
        {
            right_to_left = false;
            left = left +10;
            creature.position({left:left+10});
        }
        else
        {
            if (right_to_left) {
                left = left - 10;
                creature.position({ left: left-10});
            }
            else {
                creature.position({ left: left+10});
                left += 10;
            }
        }
        if (bouncy > 50)
        {
            top = floor;
            creature.position({ top: floor});
            bouncy = 0;
        }
        else
        {
            bouncy += 4;
            top = floor-bouncy;
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
/*
 * hippoBee
 * 
 * version: 0.0
 * 
 * author: RiccardoTonini@gmail.com
 * 
 * Big ups to:
 * 
 * gilardi81@gmail.com
 * 
 * chrisjames@05creative.com (graphics)
 *   
 **/

jj.createCreature('hippoBee', function (creature) {
   
    //Create Canvas element and initialize properties
    var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    width   = canvas.width  = 106,
    height  = canvas.height = 80,
    world   = jj.size(),
    top = jj.center().top - (height / 2),
    left = 0; //-width; //jj.center().left - (width / 2);

    //Align creature size/position to canvas size/position
    creature.size({
        width: width, 
        height: height
    });
    creature.position({
        top: top, 
        left: left 
    });
    
    //Add the img to the creature <div> elem
    creature.el.prepend(canvas);
    
    //Path to image folder
    var path = "creatures/hippoBee/media/";
    //Create the hippobee image
    var hipoBeeImg = new Image();
    hipoBeeImg.src = path+"HippoBee1.png";
    //context.drawImage(hipoBeeImg, 0, 0);
  
    //Listen to image loaded event
    hipoBeeImg.addEventListener('load', hipoBeeLoaded , false);
  
    function hipoBeeLoaded(){

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(hipoBeeImg, 0, 0, canvas.width, canvas.height);
        context.shadowBlur = 40;
        context.shadowColor = "rgb(250, 250, 250)";

    }

    //Variable holding the angle 
    var counter = 0;
    
    //Variable holding increments for horizontal movement 
    var xIncrement = 0;
    
    //Function creating next step of cycloidal movement
    function nextStep(){
        
        ypos = 30*Math.sin( counter * Math.PI / 180 );
        xpos = 30*Math.cos( counter * Math.PI / 180 )+xIncrement;
       
        counter = (counter + 10) % 360;
        xIncrement=(xIncrement+16)%world.width;
        
        //Update creature position
        creature.position({
            top: ypos+jj.center().top - (height / 2) , 
            left: xpos
        });//+jj.center().left- (width / 2)
           
    }

    setInterval(nextStep, 50);


    //var holding the image index
    var i = 1;
    //Animate hipobee image frame by frame
    function animateWings(){
    
        //canvas.width = canvas.width;
        hipoBeeImg.src = path+"HippoBee"+i+".png";
        hipoBeeImg.onload = hipoBeeLoaded;
        //contrain values of i between 1 and 5
        i = (i+1)%5+1;
    
    }

    setInterval(animateWings, 100);
  
});







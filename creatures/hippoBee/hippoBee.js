/*
 * hippoBee
 * 
 * version: 0.0
 * 
 * Authors: 
 * Marco Gilardi: gilardi81@gmail.com
 * Riccardo Tonini: RiccardoTonini@gmail.com
 * 
 * Big ups to:
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
    left =jj.center().left - (width / 2);
    
    //TODO: Change this global variable
    //Frame index used to load imgs
    var i = 0;

    
    /*
     * This loads a new set of img names (as strings) into an array
     * These are the names of the frames that will be used to animate the bee
     * @param maxFrm int the max number of frames
     **/
    function loadImgs(maxFrm){
        //Set the length to 1 to make sure the array has at least 1 frame
        imgSequence.length = 1;
        for (j=1;j<=maxFrm;j++){
            imgSequence[j-1] = "HippoBee"+(j)+".png";
        }
        // The next line will pass the array to the bee instance 
        hippoBee.loadImgSequence(imgSequence);
        //This loads the first image on the bee canvas
        //hippoBee.initImg(); This is useless 
        
    }
    
    
    //------- State ---------
    // State is the parent object of Health, Stamina, Happiness.
    // States holds Health, Stamina, Happiness common properties and behaviours.
    
    function State(){
        this.max=100;
        this.value = this.max;
        this.stateFlag;
        
        /* This increases the value property of an object of type State
         * @param o object inheriting from State
         * @param inc int the increment to be added
         */
        this.increaseState = function(o, inc)
        {
            if(o.value<o.max)
                o.value+=inc;
        }
        /* This decreases the value property of an object of type State
         * @param o object inheriting from State
         * @param dec int the decrement to be subtracted
         */
        this.decreaseState = function(o, dec)
        {
            if(o.value>0)
                o.value-=dec;
        }
        
        this.checkState=function(o,threshold)
        {
            if(o.value<threshold)
                {
                    o.stateFlag=true;
                }else{
                    if(o.value>=o.max)
                        {
                            
                            o.stateFlag=false;
                        }
                }
                return o.stateFlag;
        }
    }
    
    //------- Health constructor ---------
   
    function Health(){
        /* Accessor
         * @return int the value property
         */
        this.getValue = function(){
            return this.prototype.value;
        }
        /* Mutator
         * @param val int the new value property
         */
        this.setValue = function(val){
            this.prototype.value=val;
        }
    }

    //------- Stamina constructor ---------
    
    function Stamina(){
        /* Accessor
         * @return int the value property
         */
        this.getValue = function(){
            return this.prototype.value;
        }
        /* Mutator
         * @param val int the new value property
         */
        this.setValue = function(val){
            this.prototype.value=val;
        }
    }
    
    //------- Happiness constructor ---------
    
    function Happiness(){
        /* Accessor
         * @return int the value property
         */
        this.getValue = function(){
            return this.prototype.value;
        }
        /* Mutator
         * @param val int the new value property
         */
        this.setValue = function(val){
            this.prototype.value=val;
        }
    }
    
    //------- HippoBee constructor ---------
    // It models the HippoBee creature and its behaviours.
    
    function HippoBee(creature){

        //------- Properties Definition ---------
        //this.hasLanded = false;
        this.health = new Health();
        this.stamina = new Stamina();
        this.happiness = new Happiness(); 
        this.hippoImg = new Image();
        this.path = "creatures/hippoBee/media/";
        this.loadedImgSet = new Array();
        this.pos = {x:100,y:100};
        this.up = this.left = -1;
        this.down = this.right = 1;
        this.dirX = 1;
        this.dirY = -1;
        this.count=0;
        this.frameSpeed=4;
        this.angle = 45;
        
        //-------- Methods Definition ------------
        
        this.health.prototype=new State();
        this.stamina.prototype=new State();
        this.happiness.prototype=new State();
        
        //----------- Getters ---------------
        this.getHealth = function(){
            return this.health.getValue();
        }
        this.getStamina = function(){
            return this.stamina.getValue();
        }
        this.getHappiness = function(){
            return this.happiness.getValue();
        }
        
        //------------- Setters --------------
        this.setHealth = function(value){
            return this.health.setValue(value);
        }
        this.setStamina = function(value){
            return this.stamina.setValue(value);
        }
        this.setHappiness = function(value){
            return this.happiness.setValue(value);
        }
        
        //------------- Other Methods ----------------
        this.checkState = function(stateType,thereshold){
            return stateType.prototype.checkState(stateType.prototype,thereshold);
        }
        /* This decreases the value of one of the types of states. 
         * @param dec int the decrement
         * @param stateType object an object inheriting from State
         */
        this.decreaseState = function(stateType,dec){
            stateType.prototype.decreaseState(stateType.prototype,dec);
        }
        /* This increases the value of one of the types of states. 
         * @param inc int the increment
         * @param stateType object an object inheriting from State
         */
        this.increaseState = function(stateType,inc){
            stateType.prototype.increaseState(stateType.prototype,inc);
        }
        /* This draws a new image on the canvas 
         * @param img Image the image to be drawn
         * TODO: Move the code that draws the glow around the image
         */
        this.drawImg = function(img){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            context.shadowBlur = 40;
            context.shadowColor = "rgb(250, 250, 250)";
        }
        /* This loads the next sequence of images used to animate the bee.
         * @param nextImgSequence an Array of strings, i.e. the names of the images to load
         */
        this.loadImgSequence = function(nextImgSequence){
            
            this.loadedImgSet = nextImgSequence;
            
        }
        /* 
         * This loads the first image to be drawn on the canvas.
         */
        this.initImg = function(){
            this.hippoImg.src = this.path + this.loadedImgSet[0];
        }
        /* 
         * This will change the image to be drawn on the canvas
         * 
         */
        this.animate = function(){
            //constrain values of i between 1 and maxFrm value
            i = (i+1)%this.loadedImgSet.length;
            this.hippoImg.width = canvas.width/2;
            this.hippoImg.height = canvas.height/2;
            this.hippoImg.src = this.path + this.loadedImgSet[i]; 
        }
        /* 
         * Utility fucntion: converts degrees to radiants.
         * @param angle int an angle in degree
         * @return angle in radiants
         * 
         */
        this.toRadiants = function(angle){
            return (angle * Math.PI / 180);
        }
        
        this.boundariesCheck=function(angle)
        {
            var reflectionAngle = angle;
            if(this.pos.x<=0)
            {
                if(angle>90&&angle<180)
                {
                    reflectionAngle=angle-90;
                }
                else if(angle<270&&angle>180)
                {
                    reflectionAngle=angle+90;
                }
                else if(angle==180)
                {
                    reflectionAngle=0;
                }
            }
            else if(this.pos.x >= world.width - width )
            {
                if(angle<90&&angle>0)
                {
                    reflectionAngle=angle+90;
                }
                else if(angle<360&&angle>270)
                {
                    reflectionAngle=angle-90;
                }
                else if(angle==0||angle==360)
                {
                    reflectionAngle=180;
                }
            }
            if(this.pos.y<=0)
            {
                if(angle>270&&angle<360)
                {
                    reflectionAngle=angle-270;
                }
                else if(angle<270&&angle>180)
                {
                    reflectionAngle=angle-90;
                }
                else if(angle==270)
                {
                    reflectionAngle=90;
                }
            }
            else if(this.pos.y >= world.height - height+5 )
            {
                
                if(angle>0&&angle<90)
                {
                    reflectionAngle=angle+270;
                }
                else if(angle<180&&angle>90)
                {
                    reflectionAngle=angle+90;
                }
                else if(angle==90)
                {
                    reflectionAngle=270;
                }
            }
            return reflectionAngle;
        }
        
        /* 
         * This is responsible for moving the creature.
         * @param angle int the angle in radiants between the moving direction and the x axis.
         * @param speed int the movement speed  
         * 
         */
        this.move = function(angle, speed){
            this.angle=this.boundariesCheck(angle);
            var radiants = this.toRadiants(this.angle);
            this.pos.x = this.pos.x + (Math.cos(radiants)*speed);
            this.pos.y = this.pos.y + (Math.sin(radiants)*speed);     
            this.updatePosition();
            
        }
        
        /* This performs the creature landing.
         * @param xPos int the current hippoBee horizontal position
         * @param yPos int the current hippoBee vertical position
         * @param xInc int the value to be added or subracted
         * @param yInc int the value to be added or subracted
         * @return object pos the X and Y position object
         */
        this.land = function(){
            if(this.pos.y>=world.height-canvas.height+5){
                creature.trigger("landed");
            }else
            {
                this.move(90, 5);
            }
        }
        
        /* This is responsible for the flying process. Invoked at every tick.
         * @param xPos int the current hippoBee horizontal position
         * @param yPos int the current hippoBee vertical position
         * @param xInc int the value to be added/subracted to/from xPos
         * @param yInc int the value to be added/subracted to/from yPos
         * @return object pos the X and Y position object
         */
        this.fly = function(){
            
            if(!(this.count%100)){
                this.angle = Math.random()*360; 
            }
            this.move(this.angle, 5);
            if(!(this.count%this.frameSpeed))
            {
                this.decreaseState(this.health, 1);
                this.decreaseState(this.stamina, 1);
            }
            this.count++;
        }
        /* This is responsible for the eating process.
         * @param xPos int the current hippoBee horizontal position
         * @param yPos int the current hippoBee vertical position
         * @param xInc int the value to be added/subracted to/from xPos
         * @param yInc int the value to be added/subracted to/from yPos
         * @return object pos the X and Y position object
         */
        this.eat = function(){
            var theGrass = jj.get("grass");
            theGrass.eat();
            
            
            this.increaseState(this.health, 2);
        }
        
        this.sleep = function(){
            this.increaseState(this.stamina,2);
        }
        
        /* 
         * This is responsible for passing the upddated poisition to the creature object.
         */
        this.updatePosition = function()
        {
            creature.position({
                top:this.pos.y, 
                left:this.pos.x
            });
        }
        
        
    }
    
    //------- Global scope ---------

    //Add the img to the creature <div> elem
    creature.el.prepend(canvas);


    //Define a hippoBee object  
    var hippoBee= new HippoBee(creature);

    //Align creature size/position to canvas size/position
    creature.size({
        width: hippoBee.width,
        height: hippoBee.height
    });
    creature.position({
        top: top, 
        left: left 
    });
    creature.data({
        sight: 500,
        hearing: 600,
        smell: 200
    });
    
    //Loading animation images
    //The array used to contain the set of frames
    var imgSequence = [];
    //Load the initial 4 images
    loadImgs(3);
    //Draw the canvas
    hippoBee.hippoImg.addEventListener('load', function(){
        hippoBee.drawImg(hippoBee.hippoImg)
        }, false);
    
    //Frame by frame animation variables
    var count=0;
    var frameSpeed=3;
    //Increments global?
    var yInc = 5;
    var xInc = 5;
    
    //animFlags represents an enumeration of 4 possible states
    //These are used to make sure a new set of frames is loaded 
    //only the first time a specific behaviour starts, i.e. only on the first call of fly, eat, sleep.   
    var animFlags = enumeration({temp:0, isFlying:1, isEating:2, isSleeping:3});
    var flag = animFlags.isFlying;
    //------- Main loop ---------
    
    jj.bind("tick",function(){
        
        if(hippoBee.checkState(hippoBee.health,30)||hippoBee.checkState(hippoBee.stamina,10)){ 
            creature.trigger("land");
        }else{
            creature.trigger("fly");
        }
        
        if(!(count%frameSpeed)){
            hippoBee.animate();
        }
        count++;
        
    });
    
    //------- Adding our own creature events to listen to ---------
     
    creature.bind("land",function(){
        hippoBee.land();
    });
        
    creature.bind("fly",function(){
        
        //The initial state of flag is set to isFLying
        // So loadImgs() will be invoked only the first time fly() is called
        if(flag==animFlags.isFlying)
        {
            loadImgs(3);
            flag=animFlags.temp; //set flag to "temporary" state, i.e. the creature keeps flying 
        }
        hippoBee.fly();
    });
    
    creature.bind("landed",function(){
        
        
        //Again this check make sure the code is only invoked the 1st time the event "landed" is triggered
        if(flag==animFlags.temp){
            //We also need to see which state is the one that has triggered the bee landing 
            //and update the flag accordingly. N.B.: 29 is the lowest value the health reaches!!
            if(hippoBee.getHealth()<30){
                flag=animFlags.isEating;
                creature.chat("I'm ravenous. Let's graze some grass!!");
                
            }else if(hippoBee.getStamina()<10){
                flag=animFlags.isSleeping;
                creature.chat("Yawn... I need a nap...");
            }
        }
        
        if(flag==animFlags.isEating)
        {
            flag=animFlags.isFlying;   
            loadImgs(5);
            
        }else if(flag==animFlags.isSleeping)
        {
            flag=animFlags.isFlying;   
            loadImgs(1);
        }
        
        if(hippoBee.getHealth()<100){   
            hippoBee.eat();
        }else if(hippoBee.getStamina()<100){
            hippoBee.sleep();
        }
    });
    creature.bind("nighttime",function(){
        hippoBee.land();
        hippoBee.sleep();
    });
    creature.bind("breackfast",function()
    {
        hippoBee.eat();
    });
    
});

// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create) // If Object.create() is defined...
        return Object.create(p); // then just use it.
    var t = typeof p; // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {}; // Define a dummy constructor function.
    f.prototype = p; // Set its prototype property to p.
    return new f(); // Use f() to create an "heir" of p.
}

// This function creates a new enumerated type. The argument object specifies
// the names and values of each instance of the class. The return value
// is a constructor function that identifies the new class. Note, however
// that the constructor throws an exception: you can't use it to create new
// instances of the type. The returned constructor has properties that
// map the name of a value to the value itself, and also a values array,
// a foreach() iterator function
function enumeration(namesToValues) {
    // This is the dummy constructor function that will be the return value.
    var enumeration = function() {
        throw "Can't Instantiate Enumerations";
    };
    // Enumerated values inherit from this object.
    var proto = enumeration.prototype = {
        constructor: enumeration, // Identify type
        toString: function() {
            return this.name;
        }, // Return name
        valueOf: function() {
            return this.value;
        }, // Return value
        toJSON: function() {
            return this.name;
        } // For serialization
    };
    enumeration.values = []; // An array of the enumerated value objects
    // Now create the instances of this new type.
    for(name in namesToValues) { // For each value
        var e = inherit(proto); // Create an object to represent it
        e.name = name; // Give it a name
        e.value = namesToValues[name]; // And a value
        enumeration[name] = e; // Make it a property of constructor
        enumeration.values.push(e); // And store in the values array
    }
    // A class method for iterating the instances of the class
    enumeration.foreach = function(f,c) {
        for(var i = 0; i < this.values.length; i++) f.call(c,this.values[i]);
    };
    // Return the constructor that identifies the new type
    return enumeration;
}
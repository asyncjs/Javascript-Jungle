(function(){
    // CORE CREATURES
    jj.load(
        "javascript/clock.js",
        "javascript/chat.js",
        "javascript/stars.js",
        "javascript/tree.js",
        "javascript/grass.js",
        "javascript/rain.js",
        "javascript/atmosphere.js",
        
        jj.hasSearchParam("dev") ?
            null :
            [
                // COMMUNITY CREATURES
                "creatures/triangula/triangula.js",         // triangula
                "creatures/sun/sun.js",                     // sun - hugheth
                "creatures/butterfly/butterfly.js",         // butterfly - colmjude
                "creatures/snowman/snowman.js",             // snowman - happygiraffe
                "creatures/toucan/toucan.js",               // toucan - @rakugojon
                "creatures/angry-bird/angry-bird.js",       // angrybird - @rakugojon
                "creatures/happydog/happydog.js",           // happydog
                "creatures/herm-boids/herm-boids.js",       // flocking birds (herm-boid) - @almostobsolete
                "creatures/ufo/ufo.js",                     // ufo - @JimPurbrick
                "creatures/lion/lion.js",                   // lion - @thegingerbloke
                "creatures/pavilion-crab/pavilion-crab.js", // pavilion crab - joseph steiner - 
                "creatures/hippoBee/hippoBee.js",           // hippoBee - riccardo & marco 
                "creatures/elephant/elephant.js",           // Elephant - piotr rochala - @rochal
                "creatures/buzzy-fly/buzzy-fly.js",         // Fly - Spike & Shanee
                "creatures/garden/garden.js"                // garden - @skymook
                
                // ,"creatures/mycreature/mycreature.js"    // * ADD YOUR FINISHED CREATURE LIKE THIS EXAMPLE */
              ]
        
        /* DEVELOP YOUR OWN CREATURE *
            1) Create a new sub-directory in the /creatures folder. This will contain the main js file and all assets relating to the creature. You could use /javascript/creature.js as an example creature.
            
            2) Temporarily, uncomment the script URL below, changing it to the appropriate path for your main js file */
        
        // ,"creatures/mycreature/mycreature.js"
        
        /* 3) Optionally, uncomment the following line, for when your creature is under development. It passes an option to avoid browser-caching issues. */
      // ,{noCache:true"}
      
      // 4) Open index.html?dev in your browser to remove all other non-core creatures from the jungle.
      
      /* 5) Once ready to add to the public repository, undo any changes you've changed to this file, then add your main js file's URL to the "Community creatures" block above. If you haven't yet been added to the GitHub team for the repository then send us a ping. e.g. @asyncjs on Twitter or email p@dharmafly.com */
    );
}());

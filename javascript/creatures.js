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
                "https://raw.github.com/gist/1204436/",     // triangula
                "https://raw.github.com/gist/1204505/",     // sun
                "https://raw.github.com/gist/1204620/",     // butterfly_colmjude.js
                "https://raw.github.com/gist/1204683/",     // happygiraffe-snowman
                "https://raw.github.com/gist/1204932/",     // toucan @rakugojon
                "https://raw.github.com/gist/1208781/",     // angrybird @rakugojon
                
                "creatures/happydog/happydog.js",           // happydog
                "creatures/herm-boids/herm-boids.js",       // @almostobsolete - flocking birds (herm-boid)
                "creatures/ufo/ufo.js",                     // ufo @JimPurbrick
                "creatures/lion/lion.js",                   // pete goodman - @thegingerbloke
                "creatures/pavilion-crab/pavilion-crab.js", // joseph steiner - 
                "creatures/hippoBee/hippoBee.js",           // riccardo - marco 
                "creatures/elephant/elephant.js",           // piotr rochala - @rochal
                "creatures/buzzy-fly/buzzy-fly.js"          // Fly - Spike & Shanee
                
                // ,"creatures/mycreature/mycreature.js"    // * ADD YOUR FINISHED CREATURE LIKE THIS EXAMPLE */
              ]
        
        /* DEVELOP YOUR OWN CREATURE *
            1) Create a new sub-directory in the /creatures folder. This will contain the main js file and all assets relating to the creature. You could use /javascript/creature.js as an example creature.
            
            2) Temporarily, uncomment the script URL below, changing it to the appropriate path for your main js file */
        
        // ,"creatures/mycreature/mycreature.js"
        
        /* 3) Optionally, uncomment the following line, for when your creature is under development. It passes an option to avoid browser-caching issues. */
    	// ,{noCache:true"}
    	
    	// 4) Open index.html?dev in your browser to remove all other non-core creatures from the jungle.
    	
    	/* 5) Once ready to add to the public repository, undo any changes you've changed to this file, then add your main js file's URL to the "Community creatures" block above. */
    );
}());

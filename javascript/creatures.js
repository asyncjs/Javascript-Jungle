(function(){
    function hasSearchParam(param, value){
        var pattern = "^[\?&]" + param + 
            (typeof value === "undefined" ? "($|[=&])" : "=" + value + "($|&)");
        return (new RegExp(pattern)).test(window.location.search);
    }

    // Standard creatures
    jj.load(
        "clock.js",
        "chat.js",
        "stars.js",
        "tree.js",
        "grass.js",
        "rain.js",
        "atmosphere.js",
        
        function(){
            // Creatures from the community
            if (!hasSearchParam("dev")){
              jj.load(
                "https://raw.github.com/gist/1204436/", // triangula
                "https://raw.github.com/gist/1204505/", // sun
                "https://raw.github.com/gist/1204620/", // butterfly_colmjude.js
                "https://raw.github.com/gist/1204683/", // happygiraffe-snowman
                "creatures/happydog/happydog.js", // happydog
                "creatures/herm-boids/herm-boids.js", // @almostobsolete - flocking birds (herm-boid)
                "https://raw.github.com/gist/1204932/", // toucan @rakugojon
                "https://raw.github.com/gist/1206090/", // ufo @JimPurbrick
                "https://raw.github.com/gist/1208781/", // angrybird @rakugojon
                "creatures/lion/lion.js", 				// pete goodman - @thegingerbloke
                "creatures/pavilion-crab/pavilion-crab.js"	// joseph steiner - 
				
				// * PUT YOUR DEV CREATURE SCRIPT HERE *
				// "creatures/mycreature.js"
              );
            }
        },
        
        // Load options (include `noCache:true` to prevent caching, while debugging)
    	{path:"javascript/"}
    );
}());

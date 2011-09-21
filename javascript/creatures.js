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
        "grass.js",
        "tree.js",
        "atmosphere.js",
        "stars.js",
        
        function(){
            // Creatures from the community
            if (!hasSearchParam("dev")){
              jj.load(
                "https://raw.github.com/gist/1204436/", // triangula
                "https://raw.github.com/gist/1204505/", // sun
                "https://raw.github.com/gist/1204620/", // butterfly_colmjude.js
                "https://raw.github.com/gist/1204683/", // happygiraffe-snowman
                "https://raw.github.com/gist/1204698/", // happydog
                "https://raw.github.com/gist/1204788/", // flocking birds (almost-boid)
                "https://raw.github.com/gist/1204932/", // toucan @rakugojon
                "https://raw.github.com/gist/1206090/", // ufo @JimPurbrick
                "https://raw.github.com/gist/1208781/", // angrybird @rakugojon
                "https://raw.github.com/gist/1218733/", // _lion
                "https://raw.github.com/gist/0162a62a2c61f5fd74f4/" // pavilion crab
              );
            }
        },
        
        // Load options (include `noCache:true` to prevent caching, while debugging)
    	{path:"javascript/"}
    );
}());

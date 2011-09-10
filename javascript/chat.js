jj.createCreature("chat", function (creature) {
    "use strict";

    // the div element for the layer.
    var jQuery = jj.jQuery,
        element = creature.el,
        logElem = jQuery("<ul class='chat'></ul>").appendTo(element),
        styleElem = jQuery("<style/>").appendTo("head"),
        MIN_WIDTH = 10,
        FULL_WIDTH = 220,
        OPENCLOSE_DELAY = 0.38, // seconds
        cssPrefixes = " -webkit- -moz- -o- -ms- -khtml- ".split(" ");
    
    // Browser prefixes applied to a CSS property
    function cssCrossBrowser(property, value){
        return cssPrefixes.join(property + ":" + value + ";");
    }

    creature
        .size({width:FULL_WIDTH, height:"100%"})
        .position({right:0, top:0, zIndex:999999})
        .data({background:true, isFullWidth:true});
    
    styleElem.text(
        ".creature[data-id=chat] {" + cssCrossBrowser("transition", "right " + OPENCLOSE_DELAY + "s ease-in") + "}" +
        ".creature ul.chat { list-style-type:none; padding:0.5em 1em; margin:0; font-family:monospace; overflow:auto; height:100%; opacity:0.7; color:#fff; background-color:#000; }" +
        ".creature ul.chat .chat-entry { margin:0.38em 0; }" +
        ".creature ul.chat .chat-name { color:#3f3; }" +
        ".creature ul.chat .chat-delimiter { color:#777; }" +
        ".creature ul.chat .chat-message { color:#ff9; font-weight:bold; }" +
        ".creature ul.chat.min > li { display:none; }"
    );
    
    function log(message, creature){
        var creatureName = creature && creature.name ? 
                creature.name() : creature || "anon",
            nameElem, delimElem, messageElem, report;
        
        report = jQuery("<li class='chat-entry'></li>");
        nameElem = jQuery("<span class='chat-name'></span>").text(creatureName);
        
        if (message){
            delimElem = jQuery("<span class='chat-delimiter'>: </span>");
            messageElem = jQuery("<span class='chat-message'></span>").html(message);
        }
        
        report.append(nameElem, delimElem, messageElem).appendTo(logElem);
        logElem[0].scrollTop = logElem.height();
    };
    
    logElem.click(function(event){
        var isFullWidth;
    
        if (event.target === this){
            isFullWidth = creature.data().isFullWidth;
        
            if (isFullWidth){
                creature.position({right:MIN_WIDTH - FULL_WIDTH});
                window.setTimeout(function(){
                    logElem.addClass("min");
                }, OPENCLOSE_DELAY * 1000);
            }
            else {
                logElem.show();
                logElem.removeClass("min");
                creature.position({right:0});
            }
            
            creature.data({isFullWidth:!isFullWidth});
        }
    });
    
    // jj.get("chat").trigger("log", "foo", creature);
    creature.bind("log", log);
    
    // jj.chat("foo", creature);
    jj.chat = log;

    // Publish all global events
    jj.bind("all", function(eventName, creature){
        log(eventName, creature || "jungle");
    });
    
    log("Welcome to the JavaScript Jungle! <a href='http://asyncjs.com/jungle/'>Read more</a> / <em><a href='https://github.com/asyncjs/Javascript-Jungle/wiki/api'>docs</a></em>", "asyncjs");
});

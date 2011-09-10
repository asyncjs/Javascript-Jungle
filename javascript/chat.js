jj.createCreature("chat", function (creature) {
    "use strict";

    // the div element for the layer.
    var jQuery = jj.jQuery,
        element = creature.el,
        logElem = jQuery("<ul class='chat'></ul>").appendTo(element),
        styleElem = jQuery("<style/>").appendTo("head");

    creature
        .size({width:220, height:"100%"})
        .position({right:0, top:0, zIndex:999999})
        .data({background:true});
    
    styleElem.text(
        ".creature ul.chat {list-style-type:none; padding:0.5em 1em; margin:0; font-family:monospace; overflow:auto; height:100%; opacity:0.7; color:#fff; background-color:#000; }" +
        ".creature ul.chat .chat-entry{ margin:0.38em 0; }" +
        ".creature ul.chat .chat-name{ color:#3f3; }" +
        ".creature ul.chat .chat-delimiter{ color:#777; }" +
        ".creature ul.chat .chat-message{ color:#ff9; font-weight:bold; }"
    );
    
    function log(message, creature){
        var creatureName = creature.name ? 
                creature.name() : creature,
            nameElem, delimElem, messageElem, report;
        
        report = jQuery("<li class='chat-entry'></li>");
        nameElem = jQuery("<span class='chat-name'></span>").text(creatureName || "Anon");
        
        if (message){
            delimElem = jQuery("<span class='chat-delimiter'>: </span>");
            messageElem = jQuery("<span class='chat-message'></span>").html(message);
        }
        
        report.append(nameElem, delimElem, messageElem).appendTo(logElem);
        logElem[0].scrollTop = logElem.height();
    };
    
    // jj.get("chat").trigger("log", "foo", creature);
    creature.bind("log", log);
    
    // jj.chat("foo", creature);
    jj.chat = log;

    jj.bind("all", log);
});

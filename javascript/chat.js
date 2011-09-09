jj.createCreature("chat", function (creature) {
    "use strict";

    // the div element for the layer.
    var jQuery = jj.jQuery,
        element = creature.el,
        logElem = jQuery("<ul class='chat'></ul>").appendTo(element),
        styleElem = jQuery("<style/>").appendTo("head");

    creature
        .size({width:"220px", height:"100%"})
        .position({right:0, top:0, zIndex:999999})
        .data({background: true});
    
    styleElem.text(
        ".chat {list-style-type:none; padding:0.5em 1em; margin:0; font-family:monospace; overflow:auto; height:100%; opacity:0.7; color:#fff; background-color:#000; }" +
        ".chat .chat-entry{ margin:0.38em 0; }" +
        ".chat .chat-name{ color:#3f3; }" +
        ".chat .chat-delimiter{ color:#777; }" +
        ".chat .chat-message{ color:#ff9; font-weight:bold; }"
    );
    
    creature.log = function(eventName, message){
        var nameElem, delimElem, messageElem, report;
    
        /*
        if (eventName === "tick" || eventName === "clock"){
            return;
        }
        */
        
        report = jQuery("<li class='chat-entry'></li>");
        nameElem = jQuery("<span class='chat-name'></span>").html(eventName);
        
        if (message){
            delimElem = jQuery("<span class='chat-delimiter'>: </span>");
            messageElem = jQuery("<span class='chat-message'></span>").html(message);
        }
        
        report.append(nameElem, delimElem, messageElem).appendTo(logElem);
        logElem[0].scrollTop = logElem.height();
    };
    
    creature.log("asyncjs", "Welcome to the JavaScript Jungle");
    creature.bind("log", creature.log);

    jj.bind("all", creature.log);
});

jj.createLayer("chat", function (layer) {
    "use strict";

    // the div element for the layer.
    var jQuery = jj.jQuery,
        element = layer.el,
        logElem = jQuery("<ul class='chat'></ul>").appendTo(element),
        styleElem = jQuery("<style/>").appendTo("head");

    layer
        .size({width:"300px", height:"100%"})
        .position({right:0, top:0, zIndex:999999});
    
    styleElem.text(
        ".chat {list-style-type:none; padding:0.5em 1em; margin:0; font-family:monospace; overflow:auto; height:100%; opacity:0.7; color:#fff; background-color:#000; }" +
        ".chat .chat-entry{ margin:0.2em 0; }" +
        ".chat .chat-name{ color:#3f3; }" +
        ".chat .chat-delimiter{ color:#777; }" +
        ".chat .chat-message{ color:#ff9; font-weight:bold; }"
    );
    
    logElem.append("<li class='chat-name'><span class='chat-name'>asyncjs</span><span class='chat-delimiter'>: </span><span class='chat-message'>Welcome to the JavaScript Jungle</span></li>");

    jj.bind("all", function(eventName, message){
        var nameElem, delimElem, messageElem, report;
    
        if (eventName === "tick" || eventName === "clock"){
            return;
        }
        
        nameElem = jQuery("<span class='chat-name'></span>").text(eventName);
        if (message){
            delimElem = jQuery("<span class='chat-delimiter'>: </span>");
            messageElem = jQuery("<span class='chat-message'></span>").text(message);
        }
        
        report = jQuery("<li/>")
            .append(nameElem, delimElem, messageElem)
            .appendTo(logElem);
    });
});

jj.createLayer("chat", function (layer) {
    "use strict";
    
    // Console logging
    window.O = function(){
        if (window.console){
            window.console.log.apply(window.console, arguments);
        }
    };

    // the div element for the layer.
    var jQuery = jj.jQuery,
        element = layer.el,
        logElem = jQuery("<ul/>").appendTo(element);

    layer
        .size({width:"300px", height:"100%"})
        .position({right:0, top:0, zIndex:999999});
    
    element.css({
        backgroundColor: "#000",
        color: "#fff",
        opacity:0.7
    });
    
    logElem.css({
        listStyleType: "none",
        margin:"0.5em 1em",
        padding:0,
        fontFamily: "monospace"
    });

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

    /*
    // Set/Get any metadata.
    layer.data({heelo: 'world'});

    // Trigger an event on your creature.
    layer.trigger('myevent');

    // Get a read only version of another layer.
    var prem = jj.get('prem');

    // Bind an event on Prems creature.
    prem.bind('prems event');

    // Returns read-only copies of all creatures.
    jj.all()

    // Trigger a global event.
    jj.trigger('hello');

    // Bind to a global event.
    jj.bind('tick', function (frame) {
    // Animate here.
    });

    jj.bind('time', function (hours, seconds) {

    });
    */
});

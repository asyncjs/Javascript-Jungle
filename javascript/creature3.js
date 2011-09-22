/*
 * Async JavaScript Jungle
 * 
 * Allowing a creature to create speech bubbles
 * 
 * creature:  *****
 * Code:      ******
 * Design:    *****
 *
 * Public methods: 
 *  - *****
 */
jj.createCreature('___creatureName', function (_creature) {
  
  // internal vars
  var width           = 100,
      height          = 50,
      left            = 0,
      top             = 0,
      isTalking       = false,
      canAnimate      = false,
      animationstring = 'animation',
      worldSize,
      browser,
      keyframeprefix,
      $speechBubble,
      $speechBubbleArrow,
      $creature,
      creature,
      transitionEndFunc,
      speechQueue     = [];

  // get creature element
  $creature = _creature.el;
  creature = $creature[0];


  // set initial size & position of creature here!
  worldSize = jj.size();
  top   = (worldSize.height-height)/2;
  left  = 100;
  _creature.size({width: width, height: height});
  _creature.position({top: top, left: left});


  // make your creature look nice here!
  $creature.css({background:"#f90"});

  
  // add creature data
  _creature.data({
      kingdom:  "",
      phylum:   "",
      "class":  "",
      order:    "",
      family:   "",
      genus:    "",
      species:  "",
      sight:    30,
      hearing:  60,
      smell:    90
  });
  
  
  // on frame
  jj.bind('tick', function (frame) {
    // nothing to see here
  });


  // on time
  jj.bind('clock', function (hour, min) {    
    
    if (min % 15 == 0) {
      speechQueue.push("your words here");
      speak();
    }
    
  });

  
  
  
  
  
  
  // private, only you can explicitly tell your creature to speak
  var speak = function() {
    
    var $arrow, $speech, speech, left, top, sentence, animEnd;
    
    // get latest sentence
    sentence = speechQueue.pop();
    if (!sentence) { return; }
    
    isTalking = true;

    // create roar
    $arrow = $speechBubbleArrow.clone();
    $speech = $speechBubble
                      .clone()
                      .html(sentence)
                      .append($arrow)
                      .appendTo($creature);
    
    speech = $speech[0];

    // position bubble after append - centre based on length
    left  = (width/2) - ($speech.outerWidth() / 2) + "px";
    top   = -($speech.outerHeight() + 10) + "px";
    $speech.css({top:top, left:left});
    
    // animate: scroll up, fade in, pause, scroll up, fade out, remove el
    speech.style[ animationstring ] = 'speech-bubble 1.5s linear 1';
    
    // fix end animation type
    animEnd = (browser === "moz") ? "animationend" : browser+"AnimationEnd";
    
    // after word, do another?
    speech.addEventListener(animEnd, function(){
      $speech.remove();
      isTalking = false;
      
      // load next words?
      if (speechQueue.length > 0) {
        speak();
      } else {
        isTalking = false;
      }
    }, false);
  };
  
  
  
  // cross-browser compatible preparation for CSS anims
  // see: http://hacks.mozilla.org/2011/09/detecting-and-generating-css-animations-in-javascript/
  var _checkForCSSAnimation = function() {
    var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '';

    if( creature.style.animationName ) { canAnimate = true; }    

    if( canAnimate === false ) {
      for( var i = 0; i < domPrefixes.length-1; i++ ) {
        if( creature.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          browser = pfx.toLowerCase();
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          canAnimate = true;
          break;
        }
      }
    }
  }();
  

  // prep speech bubbles  
  var _prepareSpeechBubbles = function() {
    $speechBubble = jj.jQuery("<div/>")
                          .attr("class", "speech-bubble")
                          .css({
                            "position":"absolute",
                            "background":"#fff",
                            "minWidth":width/2,
                            "maxWidth":width*2,
                            "padding":"10px",
                            "textAlign":"center",
                            "borderRadius":"20px",
                            "opacity":0,
                            "zIndex":1
                          });

    $speechBubbleArrow = jj.jQuery("<div/>")
                              .attr("class", "speech-bubble-arrow")
                              .css({
                                "position":"absolute",
                                "bottom":"-10px",
                                "left":"50%",
                                "marginLeft":"-10px",
                                "border": "10px solid transparent",
                                "borderTopColor": "#fff",
                                "borderBottom": "none",
                                "zIndex":2
                              });
                              
    var keyframes = '@' + keyframeprefix + 'keyframes speech-bubble { '+
                      '0%   { opacity:0; margin-top:20px; }'+
                      '10%  { opacity:1; margin-top:0; }'+
                      '90%  { opacity:1; margin-top:0; }'+
                      '100% { opacity:0; margin-top:-20px }'+
                    '}';

    // append styles
    if( document.styleSheets && document.styleSheets.length ) {
        document.styleSheets[0].insertRule( keyframes, 0 );
    } else {
      var s = document.createElement( 'style' );
      s.innerHTML = keyframes;
      document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
    }
  }();
  
  
});

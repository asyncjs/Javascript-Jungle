/*
 * Async JavaScript Jungle
 * 
 * creature: _lion
 * Code: Pete { petegoodman.com }
 * Design: Matt { openbyhand.co.uk }
 *
 * Public methods: 
 *  - growl
 *  - snore
 */
jj.createCreature('_lion', function (_lion) {
  
  // internal vars
  var width           = 187,
      height          = 204,
      left            = 0,
      top             = 0,
      lastRoar        = 0,
      isRaised        = false,
      isSpeaking      = false,
      isSinging       = false,
      singingAltState = false,      
      canAnimate      = false,
      lionHeadSrc     = "./creatures/_lion/media/_lion-head_24.png",
      lionBodySrc     = "./creatures/_lion/media/_lion-body_24.png",
      animationstring = 'animation',
      lastCreatureInteractedWith,
      worldSize,
      browser,
      keyframeprefix,
      $speechBubble,
      $speechBubbleArrow,
      $lion,
      lion,
      $lionHead,
      lionHead,
      transitionEndFunc,
      speechQueue     = [],
      words           = {
        song: [
                "In the jungle",
                "the mighty jungle",
                "the lion sleeps tonight",
                "oh in the jungle",
                "the quiet jungle",
                "the lion sleeps",
                "toniiiiiiiiiiiiiiiiiight",
                "a-wimoweh<br/> a-wimoweh", 
                "Ah-wee-ooh<br/> wee-ooo..."
        ],
        roar:   "GGGRRRRRRRR",
        snore:  "zzzzzzzzzzzzzz..."
      };

  // get lion element
  $lion = _lion.el;
  lion = $lion[0];

  // set initial size & position of lion
  worldSize = jj.size();
  left = worldSize.width - width - 160;
  top = worldSize.height - height;
  _lion.size({width: width, height: height});
  _lion.position({top: top, left: left});

  
  // add lion data
  _lion.data({
      kingdom:  "Animalia",
      phylum:   "Chordata",
      "class":  "Mammalia",
      order:    "Carnivora",
      family:   "Felidae",
      genus:    "Panthera",
      species:  "P. leo",
      sight:    30,
      hearing:  60,
      smell:    90
  });
  
  
  // on frame
  //jj.bind('tick', function (frame) {
    // nothing to see here
  //});


  // on time
  jj.bind('clock', function (hour, min) {    
    // night
    if (hour >= 21 || hour < 5) { 
      if (min == 30) {
        _lion.snore();
      } else if (min == 0 && hour > 0) {
        sing();
      }

    // day
    } else if (min == 0 || min == 30) {
      _lion.snore();
    }
    
    // shut up occasionally
    if (lastRoar > 0) {
      lastRoar--;
    }
    
    // toggle bg image to show singing
    if (!!isSinging) {
      singSprite();
    }
    
    // reposition occasionally, in case we're ever moved 
    // { I'M LOOKING AT YOU, UFO }
    if (min == 59 && lastRoar == 0) {
      var pos = _lion.position();
      if (pos.left != left || pos.top != top) {
        _lion.position({top: top, left: left});
      }
    }
  });
  
  
  
  // private, no-one can call this but me!
  var sing = function() {
    if (isSpeaking || lastRoar > 0) return;
    
    speechQueue = speechQueue.concat(words.song).reverse();
    showLionState('sing');
    lastRoar = 85;
    isSinging = true;
  };
  

  //public
  this.snore = function() {
    if (isSpeaking || lastRoar > 0) return;

    speechQueue.push(words.snore);
    showLionState('snore');
    lastRoar = 10;
  };
  
  
  //public
  this.growl = function(other, sense) {
    if (isSpeaking || lastRoar > 0) return;

    speechQueue.push(words.roar);
    showLionState('growl');
    lastRoar = 20;
    
    if (!!other) {
      var creatureName = other.name();
      if (creatureName != lastCreatureInteractedWith) {
        jj.chat(creatureName+" got too close to the lion!", _lion);
        lastCreatureInteractedWith = creatureName;
        other.trigger("eat");        
      }
    } else if (sense == "click") {
      jj.chat("Leave me alone, human!", _lion);
    }
  };
  
  
  // change lion visual state
  var showLionState = function(state) {
    _lion.trigger(state);
    speak();
    switch(state) {
      
      // sing
      case "sing":
        if (!isRaised) {
          //raiseLion();
        }
        lionHead.style.backgroundPosition = "-600px 0";
        lionHead.style[ animationstring+"-duration" ] = '1s';
      break;
      
      // growl
      case "growl":
        if (!isRaised) {
          //raiseLion();
        }
        lionHead.style[ animationstring+"-duration" ] = '1s';
        lionHead.style.backgroundPosition = "-450px 0";
      break;
      
      // snore
      case "snore":
        if (isRaised) {
          //lowerLion();
        }
        lionHead.style[ animationstring+"-duration" ] = '3s';
        lionHead.style.backgroundPosition = "0 0";
      break;
    }
  };


  // make the lion rise and fall
  var raiseLion = function() {
    lion.style[ animationstring ] = "lion-raise 1s ease-out";
    lion.style[ animationstring + "IterationCount" ] = 1;
    lion.style[ keyframeprefix + 'transform' ] = 'translate(0, -100px)';
    isRaised = true;
  };
  var lowerLion = function() {
    lion.style[ animationstring ] = "lion-lower 1s ease-out";
    lion.style[ animationstring + "IterationCount" ] = 1;
    lion.style[ keyframeprefix + 'transform' ] = 'translate(0,0)';
    isRaised = false;
  };
  
  
  // flick bg image sprite to sing! 
  var singSprite = function() {
    if (singingAltState) {
      lionHead.style.backgroundPosition = "-600px 0";
    } else {
      lionHead.style.backgroundPosition = "-750px 0";
    }
    singingAltState = !singingAltState;
  };

  
  // interactions
  _lion.bind('touch', function(other) {
    _lion.growl(other, 'touch');
  });

  _lion.bind('see', function(other) {
    _lion.growl(other, 'see');
  });

  _lion.bind('hear', function(other) {
    _lion.growl(other, 'hear');
  });

  _lion.bind('smell', function(other) {
    _lion.growl(other, 'smell');
  });
  
  $lion.bind('click', function(e) {
    _lion.growl(null, "click");
  });
      
  
  // private, only I can explicitly tell the lion to speak
  var speak = function() {
    
    var $arrow, $speech, speech, left, top, sentence, animEnd;
    
    // get latest sentence
    sentence = speechQueue.pop();
    if (!sentence) { return; }
    
    isSpeaking = true;

    // create roar
    $arrow = $speechBubbleArrow.clone();
    $speech = $speechBubble
                      .clone()
                      .html(sentence)
                      .append($arrow)
                      .appendTo($lion);
    
    speech = $speech[0];

    // position roar after append - centre based on length
    left  = 50-($speech.outerWidth() / 2) + "px";
    top   = -($speech.outerHeight() + 10) + "px";
    $speech.css({top:top, left:left});
    
    // animate: scroll up, fade in, pause, scroll up, fade out, remove el
    speech.style[ animationstring ] = 'speech-bubble 1.5s linear 1';
    
    // fix end animation type
    animEnd = (browser === "moz") ? "animationend" : browser+"AnimationEnd";
    
    // after word, do another?
    speech.addEventListener(animEnd, function(){
      $speech.remove();
      isSpeaking = false;
      
      // load next words, or send lion back to sleep ?
      if (speechQueue.length > 0) {
        speak();
      } else {
        showLionState('snore');
        isSinging = false;
      }
      
    }, false);
  };
  
  
  
  // cross-browser compatible preparation for CSS anims
  // see: http://hacks.mozilla.org/2011/09/detecting-and-generating-css-animations-in-javascript/
  var _checkForCSSAnimation = function() {
    var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '';

    if( lion.style.animationName ) { canAnimate = true; }    

    if( canAnimate === false ) {
      for( var i = 0; i < domPrefixes.length-1; i++ ) {
        if( lion.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
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
  
  
  // prep lion
  var _prepareLion = function() {
    $lion.css({"background":"url("+lionBodySrc+") transparent no-repeat right bottom"});
    
    $lionHead = jj.jQuery("<div/>")
                          .attr("class", "lion-head")
                          .css({
                            "position":"absolute",
                            "background":"url("+lionHeadSrc+") transparent no-repeat left top",
                            "width": "150px",
                            "height":"182px",
                            "top":0,
                            "zIndex":1
                          }).appendTo($lion);

    lionHead = $lionHead[0];
    
    // set up animations
    var keyframes = [];
    keyframes.push('@' + keyframeprefix + 'keyframes lion-head { '+
                      '0%, 100% {' + keyframeprefix + 'transform: rotate(3deg);  }'+
                      '50%      {' + keyframeprefix + 'transform: rotate(-3deg); }'+
                    '}');
    keyframes.push('@' + keyframeprefix + 'keyframes lion-head-sing { '+
                      '0%, 100% {' + keyframeprefix + 'transform: rotate(5deg);  }'+
                      '50%      {' + keyframeprefix + 'transform: rotate(-5deg); }'+
                    '}');

    keyframes.push('@' + keyframeprefix + 'keyframes lion-raise { '+
                      '0%       {' + keyframeprefix + 'transform: translate(0,0);       }'+
                      '100%     {' + keyframeprefix + 'transform: translate(0,-100px);  }'+
                    '}');
    keyframes.push('@' + keyframeprefix + 'keyframes lion-lower { '+
                      '0%       {' + keyframeprefix + 'transform: translate(0,-100px);  }'+
                      '100%     {' + keyframeprefix + 'transform: translate(0,0);       }'+
                    '}');                    
                    

    // start lion head rocking
    lionHead.style[ animationstring ] = 'lion-head 3s linear';
    lionHead.style[ animationstring + "IterationCount" ] = 'infinite';


    // append styles
    if( document.styleSheets && document.styleSheets.length ) {
        for(var index = keyframes.length-1; index >= 0; index--) {
          document.styleSheets[0].insertRule( keyframes[index], index );
        }
    } else {
      for(index = keyframes.length-1; index >= 0; index--) {
        var s = document.createElement( 'style' );
        s.innerHTML = keyframes[index];
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
      }
    }
  }();
  
});

(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(true),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      creatures = {}, jj = {}, events = {},
      
      // File that contains a list of urls, passed to jj.load
      //CREATURE_URL_LIST = 'http://jsbin.com/uxukok/latest',
      CREATURE_URL_LIST = false,
      
      // The number of frames/second that the "tick" event will fire.
      FRAMERATE = 30;
   
  /////

  // Create the global jungle object.
  window.jj = jj = $.extend({}, Events, {
    // Gets a particular creature by the name or null if not found.
    //
    //   var prem = jj.get('prem');
    //   if (prem) {
    //     prem.trigger('hello');
    //   }
    //
    get: function (name) {
      return creatures[name] || null;
    },

    // Gets a read-only object with copies of all creatures.
    //
    //   $.each(jj.all(), function (creature, name) {
    //     console.log("hello " + name);
    //   });
    //
    all: function () {
      return creatures;
    },

    // Loads args.
    load: function () {
      $.each(arguments, function (i, url) {
        $.getScript(url);
      });
    },

    // Creates a new Creature in the environment. This is the main method that
    // will be used to populate the environment.
    //
    //   jj.createCreature('bill', function (creature) {
    //     creature.el.size({width: 300, height: 120});
    //     creature.el.position({top: 20, left: 0});
    //   });
    //
    createCreature: function (name, callback) {
      if (creatures[name]) {
        window.console.warn('The creature "%s" already exists!');
        return;
      }

      var element  = $('<div class="creature" data-id="' + name + '" />').appendTo(jungle),
          creature = new Creature(name, element);

      try {
        callback.call(creature, creature);
        creatures[name] = creature;

      } catch (error) {
        jj.trigger('crash', name, error);
      }
    },

    // Returns the position (top/left/zIndex) of the center of the
    // environment.
    //
    //   var center = jj.center();
    //   creature.position({width: center.left, height: center.top});
    //
    center: function () {
      var size = jj.size();
      
      return {
        top:  size.height / 2,
        left: size.width / 2
      };
    },

    // Returns the size (width/height) of the environment.
    size: function () {
      return {
        width:  jungle.width(),
        height: jungle.height()
      };
    },
    jQuery: $       
  });

  events = {
    crash : function (name, error) {
      window.console.log([
        name + " failed at evolution",
        error.name + ': ' + error.message,
        error.stack ? error.stack.join('\n') : "no stack"
      ]);
    }
  };

  // Bind default events.
  $.each(events, function (n, cb) {
    jj.bind(n, cb);
  });
  
  // Create a Creature object.
  function Creature(name, element) {
    Events.call(this, {alias: false});
//  jj.bind('tick', $.proxy(this.trigger, this, 'tick'));
    this.el = element;
    this._name = name;
    this._data = {};
    this._size = {
        width:0,
        height:0
    };
    this._position = {
        top: 0,
        left: 0,
        zIndex: 0
    };
  }

  Creature.prototype = new Events({alias: false});
  $.extend(Creature.prototype, {
    // Reassign the constructor.
    constructor: Creature,

    // Returns the creature name.
    name: function () {
      return this._name;
    },

    // Allows get/setting of metadata in an object.
    //
    //   // Set yr data here.
    //   creature.data({foodstuffs: ['Apples', 'Oranges', 'Pears']});
    //
    //   // Get yr data there.
    //   creature.data().foodstuffs; //=> {foodstuffs: ['Apples', 'Oranges', 'Pears']}
    //
    data: function (data) {
      if (!data) {
        return this._data;
      }
      
      $.extend(this._data, data);
      return this;
    },

    // Allows get/setting of creature element width/height. Accepts the same
    // values as jQuery.width()/jQuery.height().
    //
    //   // Set yr sizes here.
    //   creature.size({width: 20, height: 40});
    //
    //   // Get yr size there.
    //   creature.size(); //=> {width: 20, height: 40}
    //
    size: function (size) {
      if (!size) {
        return this._size;
      }
      
      // Recalculate dimensions, if relative CSS units used
      if (typeof size.width === "string"){
        this._size.width = this.el.width();
      }
      if (typeof size.height === "string"){
        this._size.height = this.el.height();
      }
      
      this.el.css(size);
      
      return this;
    },

    // Allows get/setting of creature element top/left/zIndex. Accepts the same
    // values as jQuery.css() would expect.
    //
    //   // Set yr sizes here.
    //   creature.position({top: 20, left: 40});
    //
    //   // Get yr size there.
    //   creature.position(); //=> {top: 20, left: 40, zIndex: 0}
    //
    position: function (position) {
      if (!position) {
        return this._position;
      }
      
      if (typeof position.top !== "undefined"){
        this._position.top = position.top;
      }
      if (typeof position.left !== "undefined"){
        this._position.left = position.left;
      }
      if (typeof position.zIndex !== "undefined"){
        this._position.zIndex = position.zIndex;
      }
      
      this.el.css(position);
      return this;
    },
    
    // Centers the creature in the world.
    center: function () {
      var worldCenter = jj.center();
      this.position({
        left: worldCenter.left - (this.width()  / 2),
        top:  worldCenter.top  - (this.height() / 2) 
      });
      return this;
    },

    // Returns a readonly version of the creature. None of the setters will
    // have any effect.
    readonly: function () {
      var creature = this, readable = {},
          methods = {name: 1, data: 1, position: 1, size: 1},
          method;

      for (method in creature) {
        if (!methods[method]) {
          if (typeof readable[method] === 'function') {
            readable[method] = $.proxy(creature[method], creature);
          } else {
            readable[method] = creature[method];
          }
        }
      }

      // Redefine the readonly methods.
      $.each(methods, function (method) {
        readable[method] = function () {
          return creature[method]();
        };
      });

      return readable;
    }
  });

  // Set a ticker going!
  (function () {
    var frame = 0, hour = 0, second = 0;

    setInterval(function () {
      jj.trigger('tick', frame);

      frame += 1;
      if (frame >= FRAMERATE) {
        frame = 0;
      }
    }, 1000 / FRAMERATE);
  }());

  // Load the list
  if (CREATURE_URL_LIST){
    jj.load(CREATURE_URL_LIST);
  }

})(this.jQuery, this.Broadcast, this);

(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(true),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      creatures = {}, jj = {}, events = {},
      CREATURE_URL_LIST, FRAMERATE;

  // The number of frames/second that the "tick" event will fire.
  FRAMERATE = 30;
  
  // File that contains a list of urls, passed to jungle.load, e.g. jungle.load("http://foo.com/hello.js");
  CREATURE_URL_LIST = 'http://jsbin.com/uxukok/latest';

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

      //element.css(jj.size());

      try {
        callback.call(creature, creature);

        // HACK! jim: don't make creature readonly to allow alien abductions. 
        // creatures[name] = creature.readonly()
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
    jj.bind('tick', $.proxy(this.trigger, this, 'tick'));
    this.el = element;
    this._name = name;
    this._data = {};
  }

  Creature.prototype = Object.create(Events);
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
      if (data) {
        $.extend(this._data, data);
        return this;
      }
      return this._data;
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
        return {
          width:  this.el.width(),
          height: this.el.height()
        };
      }
      
      size.width  && this.el.css("width", size.width);
      size.height && this.el.css("height", size.height);
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
        return $.extend(this.el.offset(), {
          zIndex: this.el.css('z-index') || 0
        });
      }
      this.el.css(position);
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

  // Set a ticker going!s
  (function () {
    var frame = 0, hour = 0, second = 0;

    setInterval(function () {
      jj.trigger('tick', frame);

      frame += 1;
      if (frame >= FRAMERATE) {
        frame = 0;
      }
    }, 1000 / FRAMERATE);
  })();

  // Load the list
  //jj.load(CREATURE_URL_LIST);

})(this.jQuery, this.Broadcast, this);

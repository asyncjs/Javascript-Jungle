(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(true),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      layers = {}, jj = {}, events = {},
      CREATURE_URL_LIST, FRAMERATE;

  // The number of frames/second that the "tick" event will fire.
  FRAMERATE = 30;
  
  // File that contains a list of urls, passed to jungle.load, e.g. jungle.load("http://foo.com/hello.js");
  CREATURE_URL_LIST = 'http://jsbin.com/uxukok/latest';

  // Create the global jungle object.
  window.jj = jj = $.extend({}, Events, {
    // Gets a particular layer by the name or null if not found.
    //
    //   var prem = jj.get('prem');
    //   if (prem) {
    //     prem.trigger('hello');
    //   }
    //
    get: function (name) {
      return layers[name] || null;
    },

    // Gets a read-only object with copies of all layers.
    //
    //   $.each(jj.all(), function (layer, name) {
    //     console.log("hello " + name);
    //   });
    //
    all: function () {
      return layers;
    },

    // Loads args.
    load: function () {
      $.each(arguments, function (i, url) {
        $.getScript(url);
      });
    },

    // Creates a new Layer in the environment. This is the main method that
    // will be used to populate the environment.
    //
    //   jj.createLayer('bill', function (layer) {
    //     layer.el.size({width: 300, height: 120});
    //     layer.el.position({top: 20, left: 0});
    //   });
    //
    createLayer: function (name, callback) {
      var element = $('<div class="layer" />').appendTo(jungle),
          layer   = new Layer(element);

      element.css(jj.size());

      try {
        callback(layer);
        layers[name] = layer.readonly();
      } catch (error) {
        jj.trigger('crash', name, error);
      }
    },

    // Returns the position (top/left/zindex) of the center of the
    // environment.
    //
    //   var center = jj.center();
    //   layer.position({width: center.left, height: center.top});
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
      window.console.log(name + " failed at evolution: " + error);
    }
  };

  // Bind default events.
  $.each(events, function (n, cb) {
    jj.bind(n, cb);
  });
  
  // Create a Layer object.
  function Layer(element) {
    Events.call(this, {alias: false});
    jj.bind('tick', $.proxy(this.trigger, this, 'tick'));
    this.el = element;
    this._data = {};
  }

  Layer.prototype = Object.create(Events);
  $.extend(Layer.prototype, {
    // Reassign the constructor.
    constructor: Layer,

    // Allows get/setting of metadata in an object.
    //
    //   // Set yr data here.
    //   layer.data({foodstuffs: ['Apples', 'Oranges', 'Pears']});
    //
    //   // Get yr data there.
    //   layer.data().foodstuffs; //=> {foodstuffs: ['Apples', 'Oranges', 'Pears']}
    //
    data: function (data) {
      if (data) {
        $.extend(this._data, data);
        return this;
      }
      return this._data;
    },

    // Allows get/setting of layer element width/height. Accepts the same
    // values as jQuery.width()/jQuery.height().
    //
    //   // Set yr sizes here.
    //   layer.size({width: 20, height: 40});
    //
    //   // Get yr size there.
    //   layer.size(); //=> {width: 20, height: 40}
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

    // Allows get/setting of layer element top/left/zindex. Accepts the same
    // values as jQuery.css() would expect.
    //
    //   // Set yr sizes here.
    //   layer.position({top: 20, left: 40});
    //
    //   // Get yr size there.
    //   layer.position(); //=> {top: 20, left: 40, zindex: 0}
    //
    position: function (position) {
      if (!position) {
        return $.extend(this.el.offset(), {
          zindex: this.el.css('z-index') || 0
        });
      }
      this.el.css(position);
      return this;
    },

    // Returns a readonly version of the layer. None of the setters will
    // have any effect.
    readonly: function () {
      var layer = this, readable = {};

      $.each(['data', 'position', 'size', 'bind', 'unbind', 'trigger'], function (index, method) {
        readable[method] = function () {
          return layer[method]();
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
  jj.load(CREATURE_URL_LIST);

})(this.jQuery, this.Broadcast, this);

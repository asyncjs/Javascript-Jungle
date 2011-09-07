(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      layers = {}, jj = {},
      CREATURE_URL_LIST, FRAMERATE;

  FRAMERATE = 30;

  // File that contains a list of urls, passed to jungle.load, e.g. jungle.load("http://foo.com/hello.js");
  CREATURE_URL_LIST = 'http://jsbin.com/uxukok/latest';

  // Create the global jungle object.
  window.jj = jj = $.extend({}, Events, {
    get: function (name) {
      return layers[name] || null;
    },
    all: function () {
      return layers;
    },
    load: function(){
        $.each(arguments, function(i, url){
            $.getScript(url);
        });
    },
    createLayer: function (name, callback) {
      var element = $('<div />').appendTo(jungle),
          layer   = new Layer(element);

      element.css(jj.size());

      try {
        callback(layer);
        layers[name] = layer.readonly();
      } catch (error) {
        jj.trigger('crash', name, error);
      }
    },
    size: function () {
      return {
        width:  jungle.width(),
        height: jungle.height()
      };
    }
  });

  // Create a Layer object.
  function Layer(element) {
    Events.call(this, {alias: false});
    jj.bind('tick', $.proxy(this.trigger, this, 'tick'));
    this.el = element;
    this.data = {};
  }

  Layer.prototype = Object.create(Events);
  $.extend(Layer.prototype, {
    constructor: Layer,
    data: function (data) {
      if (data) {
        $.extend(this.data, data);
        return this;
      }
      return this.data;
    },
    size: function (size) {
      if (!size) {
        return {
          width:  this.el.width(),
          height: this.el.height()
        };
      }
      size.width  && this.element.width(size.width);
      size.height && this.element.height(size.height);
      return this;
    },
    position: function (position) {
      if (!position) {
        return $.extend(this.el.offset(), {
          zindex: this.el.css('z-index') || 0
        });
      }
      this.element.position(position);
      size.zindex && this.element.css('z-index', position.zindex);
      return this;
    },
    readonly: function () {
      var layer = this, readable = {};

      $.each(['data', 'position', 'size', 'bind', 'unbind'], function (index, method) {
        readable[method] = function () {
          return layer[method]();
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
  })();

  // Load the list
  jj.load(CREATURE_URL_LIST);

})(this.jQuery, this.Broadcast, this);

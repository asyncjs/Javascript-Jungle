(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      layers = {}, jj = {},
      FRAMERATE = 30;

  // Create the global jungle object.
  window.jj = jj = $.extend({}, Events, {
    get: function (name) {
      return (layers[name] && layers[name].readonly()) || null;
    },
    createLayer: function (name, callback) {
      var element = $('<div />').appendTo(jungle),
          layer   = new Layer(element);

      element.css(jj.size());

      try {
        callback(layer);
        layers[name] = layer;
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
  }

  Layer.prototype = Object.create(Events);
  $.extend(Layer.prototype, {
    constructor: Layer,
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

      $.each(['position', 'size', 'bind', 'unbind'], function (index, method) {
        readable[method] = function () {
          return layer[method]();
        };
      });

      return readable;
    }
  });

  // Set a ticker going!
  (function () {
    var frame = 0;
    setInterval(function () {
      jj.trigger('tick', frame);

      frame += 1;
      if (frame > FRAMERATE) {
        frame = 0;
      }
    }, 1000 / FRAMERATE);
  })();

})(this.jQuery, this.Broadcast, this);

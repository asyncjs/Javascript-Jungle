(function (jQuery, Broadcast, window) {
  var $ = jQuery.noConflict(),
      Events = Broadcast.noConflict(),
      jungle = $('#jungle'),
      layers = {}, jj = {};

  // Update the Event object to use jQuery methods.
  $.each({'emit': 'trigger', 'addListener': 'bind', 'removeListener': 'unbind'}, function (method) {
    Events[this] = Events[method];
    Events.prototype[this] = Events.prototype[method];

    delete Events[method];
    delete Events.prototype[method];
  });
  delete Events.noConflict;

  // Create a Layer object.
  function Layer(element) {
    Events.call(this, {alias: false});
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

})(this.jQuery, this.Broadcast, this);

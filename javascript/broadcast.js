/*  Broadcast.js - v0.5.0
 *  Copyright 2011, Aron Carroll
 *  Released under the MIT license
 *  More Information: http://github.com/aron/broadcast.js
 */
(function (module, undefined) {

  // Retain a reference to the original property.
  var _Broadcast = module.Broadcast,
      hasOwnProp = Object.prototype.hasOwnProperty;

  /* Extends an object with properties from another
   *
   * target - The Object that is to be extended.
   * obejct - An Object containing properties.
   *
   * Examples
   *
   *   extend({type: 'person'}, {name: 'bill', age: 20});
   *   //=> {type: 'person', name: 'bill', age: 20}
   *
   * Returns the extended object.
   */
  function extend(target, object) {
    for (var key in object) {
      if (hasOwnProp.call(object, key)) {
        target[key] = object[key];
      }
    }
    return target;
  }

  /* Public: Creates an instance of Broadcast.
   *
   * options - An Object literal containing setup options.
   *           alias: If false will not assign the .on() alias.
   *
   * Examples
   *
   *   // In the browser.
   *   var events = new Broadcast();
   *   events.bind('say', function (message) { console.log(message); });
   *   events.trigger('say', 'Hello World'); // Logs "Hello World"
   *
   *   // On the server.
   *   var Broadcast = require('broadcast');
   *   var events = new Broadcast();
   *
   * Returns a new instance of Broadcast.
   */
  function Broadcast(options) {
    this._callbacks = {};
    if (!options || options.alias === true) {
      this.on = this.bind;
      this.dispatch = this.trigger;
    }
  }

  /* Public: Allows Broadcast to be used simply as a global pub/sub
   * implementation without creating new instances.
   *
   * Examples
   *
   *   Broadcast.bind('say', function (message) { console.log(message); });
   *   Broadcast.trigger('say', 'Hello World'); // Logs "Hello World"
   *   Broadcast.unbind('say');
   */
  extend(Broadcast, {

    /* Object used to store registered callbacks. An instance specific property
     * is created in the constructor.
     */
    _callbacks: {},

    /* Public: triggeres a topic. Calls all registered callbacks passing in any
     * arguments provided after the topic string.
     *
     * There is also a special topic called "all" that will fire when any other
     * topic is triggered providing the topic triggered and any additional
     * arguments to all callbacks.
     *
     * topic      - A topic String to trigger.
     * arguments* - All subsequent arguments will be passed into callbacks.
     *
     * Examples
     *
     *   var events = new Broadcast();
     *   events.bind('say', function (message) { console.log(message); });
     *   events.trigger('say', 'Hello World'); // Logs "Hello World"
     *
     *   // bind to the special "all" topic.
     *   events.bind('all', function (topic) {
     *     console.log(topic, arguments[1]);
     *   });
     *   events.trigger('say', 'Hello Again'); // Logs "say Hello World"
     *
     * Returns itself for chaining.
     */
    trigger: function (topic /* , arguments... */) {
      var callbacks = this._callbacks[topic] || [],
          slice = Array.prototype.slice,
          index = 0, count = callbacks.length;

      for (; index < count; index += 1) {
        callbacks[index].callback.apply(this, slice.call(arguments, 1));
      }

      if (topic !== 'all') {
        this.trigger.apply(this, ['all'].concat(slice.call(arguments)));
      }

      return this;
    },

    /* Public: Subscribe to a specific topic with a callback. A single
     * callback can also subscribe to many topics by providing a space
     * delimited string of topic names. Finally the method also accepts a
     * single object containing topic/callback pairs as an argument.
     *
     * Events can also be name-spaced ala jQuery to allow easy removal of
     * muliple callbacks in one call to .unbind(). To namespace a
     * callback simply suffix the topic with a period (.) followed by your
     * namespace.
     *
     * topic    - A topic String or Object of topic/callback pairs.
     * callback - Callback Function to call when topic is triggered.
     *
     * Examples
     *
     *   var events = new Broadcast();
     *
     *   // Register single callback.
     *   events.bind('create', function () {});
     *
     *   // Register a single callback to multiple topics.
     *   events.bind('create update delete', function () {});
     *
     *   // Register multiple callbacks.
     *   events.bind({
     *     'update', function () {},
     *     'delete', function () {}
     *   );
     *
     *   // Register a callback with a namespace.
     *   events.bind('create.my-namespace', function () {});
     *   events.bind('update.my-namespace', function () {});
     *
     *   // No longer requires a callback to be passed to unbind.
     *   events.unbind('.my-namespace', function () {});
     *
     * Returns itself for chaining.
     */
    bind: function (topic, callback) {
      if (arguments.length === 1) {
        for (var key in topic) {
          if (hasOwnProp.call(topic, key)) {
            this.bind(key, topic[key]);
          }
        }
      } else {
        (function registerTopics(topics) {
          var index = 0, count = topics.length,
              namespaceIndex, topic, namespace;

          for (;index < count; index += 1) {
            topic = topics[index];

            namespaceIndex = topic.lastIndexOf('.');
            if (namespaceIndex > -1) {
              namespace = topic.slice(namespaceIndex);
              topic = topic.slice(0, namespaceIndex);
            }

            if (!this._callbacks[topic]) {
              this._callbacks[topic] = [];
            }
            this._callbacks[topic].push({
              callback: callback,
              namespace: namespace || null
            });
          }
        }).call(this, topic.split(' '));
      }

      return this;
    },

    /* Public: Unbinds registered listeners for a topic. If no arguments are
     * passed all callbacks are removed. If a topic is provided only callbacks
     * for that topic are removed. If a topic and function are passed all
     * occurrences of that function are removed.
     *
     * topic    - A topic String to unbind (optional).
     * callback - A specific callback Function to remove (optional).
     *
     * Examples
     *
     *   function A() {}
     *
     *   events.bind('create', A);
     *   events.bind('create', function B() {});
     *   events.bind({
     *     'create', function C() {},
     *     'update', function D() {},
     *     'delete', function E() {}
     *   );
     *   events.bind('custom.my-namespace', function F() {});
     *
     *   // Removes callback (A).
     *   events.unbind('create', A);
     *
     *   // Removes callbacks for topic 'create' (B & C).
     *   events.unbind('create');
     *
     *   // Removes callbacks for namespace '.my-namespace' (F).
     *   events.unbind('.my-namespace');
     *
     *   // Removes all callbacks for all topics (D & E).
     *   events.unbind();
     *
     * Returns itself for chaining.
     */
    unbind: function (topic, callback) {
      var callbacks = {},
          original = topic,
          namespaceIndex = (topic || '').lastIndexOf('.'),
          namespace, wrappers, index, count, key;

      if (namespaceIndex > -1) {
        namespace = original.slice(namespaceIndex);
        topic = original.slice(0, namespaceIndex);
      }

      wrappers = callbacks[topic] || [];
      callbacks[topic] = wrappers;

      if (arguments.length) {
        if (wrappers.length || callback || namespace) {

          callbacks = wrappers.length ? callbacks : this._callbacks;
          for (key in callbacks) {

            wrappers = callbacks[key].slice();
            for (index = 0, count = wrappers.length; index < count; index += 1) {

              if ((!topic     || key === topic) &&
                  (!callback  || wrappers[index].callback  === callback) &&
                  (!namespace || wrappers[index].namespace === namespace)) {

                wrappers.splice(index, 1);
                this._callbacks[key] = wrappers;
                this.unbind(original, callback);

                break;
              }
            }
          }
        } else {
          delete this._callbacks[topic];
        }
      } else {
        this._callbacks = {};
      }

      return this;
    }
  });

  /* Extend the constructors prototype with the same methods. */
  extend(Broadcast.prototype, Broadcast);

  /* Public: Removes Broadcast from the global scope (only applies to web
   * browsers). Useful if you want to implement Broadcast under another
   * libraries namespace.
   *
   * Examples
   *
   *   var MyFramework = {};
   *   MyFramework.Events = Broadcast.noConflict();
   *
   *   var events = new MyFramework.Events();
   *
   * Returns the Broadcast function.
   */
  Broadcast.noConflict = function () {
    module.Broadcast = _Broadcast;
    return Broadcast;
  };

  // Export the function to either the exports or global object depending
  // on the current environment.
  if (module.exports) {
    module.exports = Broadcast;
  } else {
    module.Broadcast = Broadcast;
  }

})(typeof module === 'object' ? module : this);

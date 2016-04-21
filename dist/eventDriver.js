(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Dmytro on 4/9/2016.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals
        root.EventDriver = factory();
    }
})(window, function () {
    var EventDriver = function () {
        function EventDriver() {
            _classCallCheck(this, EventDriver);

            this.eventsMap = {};
        }

        _createClass(EventDriver, [{
            key: 'once',
            value: function once(eventName, handler, context) {
                return this.on.apply(this, Array.prototype.slice.call(arguments).concat([true]));
            }
        }, {
            key: 'on',
            value: function on(eventName, handler, context, once) {
                var listeners = this.eventsMap[eventName],
                    isExistListener = !!listeners.find(function (listener) {
                    return listener.handler === handler && listener.caller === context;
                });

                if (isExistListener) return this;

                var listener = {
                    handler: handler,
                    caller: context
                };

                if (once && typeof once === 'boolean') listener.once = once;

                if (listeners) this.eventsMap[eventName].push(listener);else this.eventsMap[eventName] = [listener];

                return this;
            }
        }, {
            key: 'off',
            value: function off(eventName, handler, context) {
                var listeners = this.eventsMap[eventName];

                if (!listeners || !listeners.length) return this;

                if (listeners && !handler) {
                    delete this.eventsMap[eventName];
                    return this;
                }

                for (var i = 0, l = listeners.length; i < l; ++i) {
                    var listener = listeners[i];

                    if (listener.handler === handler && listener.caller === context) {
                        listeners.splice(i, 1);
                        break;
                    }
                }

                return this;
            }
        }, {
            key: 'trigger',
            value: function trigger(eventName, data, context) {
                var listeners = this.eventsMap[eventName];
                if (!listeners || !listeners.length) {
                    console.warn(this._toString() + '::The event ' + eventName + ' was triggered, but handler didn\'t fired.');
                    return this;
                }

                for (var i = 0, l = listeners.length; i < l; ++i) {
                    var listener = listeners[i];
                    if (listener.caller === context || !context) {
                        listener.eventName = eventName;
                        this._dispatch(listener, data);
                    }
                    if (listeners[i].once) listeners.splice(i, 1);
                }

                return this;
            }
        }, {
            key: '_dispatch',
            value: function _dispatch(listener, data) {
                listener.handler.call(listener.caller, listener, data);
            }
        }, {
            key: '_toString',
            value: function _toString() {
                return [['EventDriver']];
            }
        }]);

        return EventDriver;
    }();

    return EventDriver;
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGV2ZW50RHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNHQSxDQUFDLFVBQUMsSUFBRCxFQUFPLE9BQVAsRUFBa0I7QUFDZixRQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTNDLEVBQWdEOztBQUU1QyxlQUFPLEVBQVAsRUFBVyxPQUFYO0FBQ0gsS0FIRCxNQUdPLElBQUksUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7O0FBRXBDLGVBQU8sT0FBUCxHQUFpQixTQUFqQjtBQUNILEtBSE0sTUFHQTs7QUFFSCxhQUFLLFdBQUwsR0FBbUIsU0FBbkI7QUFDSDtBQUNKLENBWEQsRUFXRyxNQVhILEVBV1csWUFBSztBQUFBLFFBQ04sV0FETTtBQUVSLCtCQUFjO0FBQUE7O0FBQ1YsaUJBQUssU0FBTCxHQUFpQixFQUFqQjtBQUNIOztBQUpPO0FBQUE7QUFBQSxpQ0FNSCxTQU5HLEVBTVEsT0FOUixFQU1pQixPQU5qQixFQU0wQjtBQUM5Qix1QkFBTyxLQUFLLEVBQUwsd0NBQVcsU0FBWCxVQUFzQixJQUF0QixHQUFQO0FBQ0g7QUFSTztBQUFBO0FBQUEsK0JBVUwsU0FWSyxFQVVNLE9BVk4sRUFVZSxPQVZmLEVBVXdCLElBVnhCLEVBVThCO0FBQ2xDLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFoQjtvQkFDSSxrQkFBa0IsQ0FBQyxDQUFDLFVBQVUsSUFBVixDQUFlLG9CQUFZO0FBQzNDLDJCQUFPLFNBQVMsT0FBVCxLQUFxQixPQUFyQixJQUFnQyxTQUFTLE1BQVQsS0FBb0IsT0FBM0Q7QUFDSCxpQkFGbUIsQ0FEeEI7O0FBS0Esb0JBQUksZUFBSixFQUNJLE9BQU8sSUFBUDs7QUFFSixvQkFBTSxXQUFXO0FBQ2IsNkJBQVMsT0FESTtBQUViLDRCQUFRO0FBRkssaUJBQWpCOztBQUtBLG9CQUFHLFFBQVEsT0FBTyxJQUFQLEtBQWdCLFNBQTNCLEVBQ0ksU0FBUyxJQUFULEdBQWdCLElBQWhCOztBQUVKLG9CQUFJLFNBQUosRUFDSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQTBCLElBQTFCLENBQStCLFFBQS9CLEVBREosS0FHSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLElBQTRCLENBQUMsUUFBRCxDQUE1Qjs7QUFFSix1QkFBTyxJQUFQO0FBQ0g7QUFqQ087QUFBQTtBQUFBLGdDQW1DSixTQW5DSSxFQW1DTyxPQW5DUCxFQW1DZ0IsT0FuQ2hCLEVBbUN5QjtBQUM3QixvQkFBTSxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBbEI7O0FBRUEsb0JBQUksQ0FBQyxTQUFELElBQWMsQ0FBQyxVQUFVLE1BQTdCLEVBQ0ksT0FBTyxJQUFQOztBQUVKLG9CQUFJLGFBQWEsQ0FBQyxPQUFsQixFQUEyQjtBQUN2QiwyQkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQVA7QUFDQSwyQkFBTyxJQUFQO0FBQ0g7O0FBRUQscUJBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBOUIsRUFBc0MsSUFBSSxDQUExQyxFQUE2QyxFQUFFLENBQS9DLEVBQWtEO0FBQzlDLHdCQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7O0FBRUEsd0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUF4RCxFQUFpRTtBQUM3RCxrQ0FBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ0E7QUFDSDtBQUNKOztBQUVELHVCQUFPLElBQVA7QUFDSDtBQXhETztBQUFBO0FBQUEsb0NBMERBLFNBMURBLEVBMERXLElBMURYLEVBMERpQixPQTFEakIsRUEwRDBCO0FBQzlCLG9CQUFNLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFsQjtBQUNBLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUE3QixFQUFxQztBQUNqQyw0QkFBUSxJQUFSLENBQWdCLEtBQUssU0FBTCxFQUFoQixvQkFBK0MsU0FBL0M7QUFDQSwyQkFBTyxJQUFQO0FBQ0g7O0FBRUQscUJBQUksSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBN0IsRUFBcUMsSUFBSSxDQUF6QyxFQUE0QyxFQUFFLENBQTlDLEVBQWlEO0FBQzdDLHdCQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7QUFDQSx3QkFBRyxTQUFTLE1BQVQsS0FBb0IsT0FBcEIsSUFBK0IsQ0FBQyxPQUFuQyxFQUEyQztBQUN2QyxpQ0FBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0EsNkJBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsSUFBekI7QUFDSDtBQUNELHdCQUFHLFVBQVUsQ0FBVixFQUFhLElBQWhCLEVBQ0ksVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ1A7O0FBRUQsdUJBQU8sSUFBUDtBQUNIO0FBNUVPO0FBQUE7QUFBQSxzQ0E4RUUsUUE5RUYsRUE4RVksSUE5RVosRUE4RWlCO0FBQ3JCLHlCQUFTLE9BQVQsQ0FBaUIsSUFBakIsQ0FBc0IsU0FBUyxNQUEvQixFQUF1QyxRQUF2QyxFQUFpRCxJQUFqRDtBQUNIO0FBaEZPO0FBQUE7QUFBQSx3Q0FrRkk7QUFDUix1QkFBTyxDQUFDLENBQUMsYUFBRCxDQUFELENBQVA7QUFDSDtBQXBGTzs7QUFBQTtBQUFBOztBQXdGWixXQUFPLFdBQVA7QUFDSCxDQXBHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBEbXl0cm8gb24gNC85LzIwMTYuXHJcbiAqL1xyXG4oKHJvb3QsIGZhY3RvcnkpID0+e1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIC8vIEFNRFxyXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIE5vZGUsIENvbW1vbkpTLWxpa2VcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXHJcbiAgICAgICAgcm9vdC5FdmVudERyaXZlciA9IGZhY3RvcnkoKTtcclxuICAgIH1cclxufSkod2luZG93LCAoKSA9PntcclxuICAgIGNsYXNzIEV2ZW50RHJpdmVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXAgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uY2UoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKC4uLmFyZ3VtZW50cywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0sXHJcbiAgICAgICAgICAgICAgICBpc0V4aXN0TGlzdGVuZXIgPSAhIWxpc3RlbmVycy5maW5kKGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlciAmJiBsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0V4aXN0TGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcclxuICAgICAgICAgICAgICAgIGNhbGxlcjogY29udGV4dFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYob25jZSAmJiB0eXBlb2Ygb25jZSA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIub25jZSA9IG9uY2U7XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSA9IFtsaXN0ZW5lcl07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzICYmICFoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlciAmJiBsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyaWdnZXIoZXZlbnROYW1lLCBkYXRhLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5fdG9TdHJpbmcoKX06OlRoZSBldmVudCAke2V2ZW50TmFtZX0gd2FzIHRyaWdnZXJlZCwgYnV0IGhhbmRsZXIgZGlkblxcJ3QgZmlyZWQuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dCB8fCAhY29udGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKGxpc3RlbmVyLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGxpc3RlbmVyc1tpXS5vbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX2Rpc3BhdGNoKGxpc3RlbmVyLCBkYXRhKXtcclxuICAgICAgICAgICAgbGlzdGVuZXIuaGFuZGxlci5jYWxsKGxpc3RlbmVyLmNhbGxlciwgbGlzdGVuZXIsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3RvU3RyaW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1snRXZlbnREcml2ZXInXV1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBFdmVudERyaXZlcjtcclxufSk7Il19

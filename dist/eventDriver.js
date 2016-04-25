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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGV2ZW50RHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNHQSxDQUFDLFVBQUMsSUFBRCxFQUFPLE9BQVAsRUFBa0I7QUFDZixRQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTNDLEVBQWdEOztBQUU1QyxlQUFPLEVBQVAsRUFBVyxPQUFYO0FBQ0gsS0FIRCxNQUdPLElBQUksUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7O0FBRXBDLGVBQU8sT0FBUCxHQUFpQixTQUFqQjtBQUNILEtBSE0sTUFHQTs7QUFFSCxhQUFLLFdBQUwsR0FBbUIsU0FBbkI7QUFDSDtBQUNKLENBWEQsRUFXRyxNQVhILEVBV1csWUFBSztBQUFBLFFBQ04sV0FETTtBQUVSLCtCQUFjO0FBQUE7O0FBQ1YsaUJBQUssU0FBTCxHQUFpQixFQUFqQjtBQUNIOztBQUpPO0FBQUE7QUFBQSxpQ0FNSCxTQU5HLEVBTVEsT0FOUixFQU1pQixPQU5qQixFQU0wQjtBQUM5Qix1QkFBTyxLQUFLLEVBQUwsd0NBQVcsU0FBWCxVQUFzQixJQUF0QixHQUFQO0FBQ0g7QUFSTztBQUFBO0FBQUEsK0JBVUwsU0FWSyxFQVVNLE9BVk4sRUFVZSxPQVZmLEVBVXdCLElBVnhCLEVBVThCO0FBQ2xDLG9CQUFNLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFsQjtvQkFDSSxrQkFBa0IsQ0FBQyxDQUFDLFVBQVUsSUFBVixDQUFlLG9CQUFZO0FBQzNDLDJCQUFPLFNBQVMsT0FBVCxLQUFxQixPQUFyQixJQUFnQyxTQUFTLE1BQVQsS0FBb0IsT0FBM0Q7QUFDSCxpQkFGbUIsQ0FEeEI7O0FBS0Esb0JBQUksZUFBSixFQUNJLE9BQU8sSUFBUDs7QUFFSixvQkFBTSxXQUFXO0FBQ2IsNkJBQVMsT0FESTtBQUViLDRCQUFRO0FBRkssaUJBQWpCOztBQUtBLG9CQUFHLFFBQVEsT0FBTyxJQUFQLEtBQWdCLFNBQTNCLEVBQ0ksU0FBUyxJQUFULEdBQWdCLElBQWhCOztBQUVKLG9CQUFJLFNBQUosRUFDSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQTBCLElBQTFCLENBQStCLFFBQS9CLEVBREosS0FHSSxLQUFLLFNBQUwsQ0FBZSxTQUFmLElBQTRCLENBQUMsUUFBRCxDQUE1Qjs7QUFFSix1QkFBTyxJQUFQO0FBQ0g7QUFqQ087QUFBQTtBQUFBLGdDQW1DSixTQW5DSSxFQW1DTyxPQW5DUCxFQW1DZ0IsT0FuQ2hCLEVBbUN5QjtBQUM3QixvQkFBTSxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBbEI7O0FBRUEsb0JBQUksQ0FBQyxTQUFELElBQWMsQ0FBQyxVQUFVLE1BQTdCLEVBQ0ksT0FBTyxJQUFQOztBQUVKLG9CQUFJLGFBQWEsQ0FBQyxPQUFsQixFQUEyQjtBQUN2QiwyQkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQVA7QUFDQSwyQkFBTyxJQUFQO0FBQ0g7O0FBRUQscUJBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBOUIsRUFBc0MsSUFBSSxDQUExQyxFQUE2QyxFQUFFLENBQS9DLEVBQWtEO0FBQzlDLHdCQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7O0FBRUEsd0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUF4RCxFQUFpRTtBQUM3RCxrQ0FBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ0E7QUFDSDtBQUNKOztBQUVELHVCQUFPLElBQVA7QUFDSDtBQXhETztBQUFBO0FBQUEsb0NBMERBLFNBMURBLEVBMERXLElBMURYLEVBMERpQixPQTFEakIsRUEwRDBCO0FBQzlCLG9CQUFNLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFsQjtBQUNBLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUE3QixFQUFxQztBQUNqQyw0QkFBUSxJQUFSLENBQWdCLEtBQUssU0FBTCxFQUFoQixvQkFBK0MsU0FBL0M7QUFDQSwyQkFBTyxJQUFQO0FBQ0g7O0FBRUQscUJBQUksSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLFVBQVUsTUFBN0IsRUFBcUMsSUFBSSxDQUF6QyxFQUE0QyxFQUFFLENBQTlDLEVBQWlEO0FBQzdDLHdCQUFJLFdBQVcsVUFBVSxDQUFWLENBQWY7QUFDQSx3QkFBRyxTQUFTLE1BQVQsS0FBb0IsT0FBcEIsSUFBK0IsQ0FBQyxPQUFuQyxFQUEyQztBQUN2QyxpQ0FBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0EsNkJBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsSUFBekI7QUFDSDtBQUNELHdCQUFHLFVBQVUsQ0FBVixFQUFhLElBQWhCLEVBQ0ksVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ1A7O0FBRUQsdUJBQU8sSUFBUDtBQUNIO0FBNUVPO0FBQUE7QUFBQSxzQ0E4RUUsUUE5RUYsRUE4RVksSUE5RVosRUE4RWlCO0FBQ3JCLHlCQUFTLE9BQVQsQ0FBaUIsSUFBakIsQ0FBc0IsU0FBUyxNQUEvQixFQUF1QyxRQUF2QyxFQUFpRCxJQUFqRDtBQUNIO0FBaEZPO0FBQUE7QUFBQSx3Q0FrRkk7QUFDUix1QkFBTyxDQUFDLENBQUMsYUFBRCxDQUFELENBQVA7QUFDSDtBQXBGTzs7QUFBQTtBQUFBOztBQXdGWixXQUFPLFdBQVA7QUFDSCxDQXBHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBEbXl0cm8gb24gNC85LzIwMTYuXHJcbiAqL1xyXG4oKHJvb3QsIGZhY3RvcnkpID0+e1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIC8vIEFNRFxyXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIE5vZGUsIENvbW1vbkpTLWxpa2VcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXHJcbiAgICAgICAgcm9vdC5FdmVudERyaXZlciA9IGZhY3RvcnkoKTtcclxuICAgIH1cclxufSkod2luZG93LCAoKSA9PntcclxuICAgIGNsYXNzIEV2ZW50RHJpdmVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXAgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uY2UoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKC4uLmFyZ3VtZW50cywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSxcclxuICAgICAgICAgICAgICAgIGlzRXhpc3RMaXN0ZW5lciA9ICEhbGlzdGVuZXJzLmZpbmQobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzRXhpc3RMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgY2FsbGVyOiBjb250ZXh0XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZihvbmNlICYmIHR5cGVvZiBvbmNlID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5vbmNlID0gb25jZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdID0gW2xpc3RlbmVyXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJpZ2dlcihldmVudE5hbWUsIGRhdGEsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLl90b1N0cmluZygpfTo6VGhlIGV2ZW50ICR7ZXZlbnROYW1lfSB3YXMgdHJpZ2dlcmVkLCBidXQgaGFuZGxlciBkaWRuXFwndCBmaXJlZC5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYobGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0IHx8ICFjb250ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2gobGlzdGVuZXIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobGlzdGVuZXJzW2ldLm9uY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfZGlzcGF0Y2gobGlzdGVuZXIsIGRhdGEpe1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyLmNhbGwobGlzdGVuZXIuY2FsbGVyLCBsaXN0ZW5lciwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbWydFdmVudERyaXZlciddXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEV2ZW50RHJpdmVyO1xyXG59KTsiXX0=

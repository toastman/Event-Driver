(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.eventDriver = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var EventDriver = function () {
        function EventDriver() {
            _classCallCheck(this, EventDriver);

            this.eventsMap = {};
        }

        _createClass(EventDriver, [{
            key: '_find',
            value: function _find(array, predicate) {
                if (!array || !array.length) return false;

                return array.find(predicate);
            }
        }, {
            key: 'once',
            value: function once(eventName, handler, context) {
                return this.on.apply(this, Array.prototype.slice.call(arguments).concat([true]));
            }
        }, {
            key: 'on',
            value: function on(eventName, handler, context, once) {
                var _once = once && typeof once === 'boolean';
                var listeners = this.eventsMap[eventName],
                    isExistListener = this._find(listeners, function (listener) {
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
            value: function trigger(eventName) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var listeners = this.eventsMap[eventName];
                if (!listeners || !listeners.length) {
                    console.warn(this._toString() + '::The event ' + eventName + ' was triggered, but handler didn\'t fired.');
                    return this;
                }

                for (var i = 0, l = listeners.length; i < l; ++i) {
                    this._dispatch(listeners[i], arguments);
                    if (listeners[i].once) listeners.splice(i, 1);
                }

                return this;
            }
        }, {
            key: '_dispatch',
            value: function _dispatch(listener, args) {
                var _listener$handler;

                var _args = [].slice.call(args);
                (_listener$handler = listener.handler).call.apply(_listener$handler, [listener.caller].concat(_toConsumableArray(_args)));
            }
        }, {
            key: '_toString',
            value: function _toString() {
                return [['EventDriver']];
            }
        }]);

        return EventDriver;
    }();

    exports.default = EventDriver;
});

},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXZlbnREcml2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDR007QUFDRixpQkFERSxXQUNGLEdBQWM7a0NBRFosYUFDWTs7QUFDVixpQkFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRFU7U0FBZDs7cUJBREU7O2tDQUtJLE9BQU8sV0FBVztBQUNwQixvQkFBSSxDQUFDLEtBQUQsSUFBVSxDQUFDLE1BQU0sTUFBTixFQUNYLE9BQU8sS0FBUCxDQURKOztBQUdBLHVCQUFPLE1BQU0sSUFBTixDQUFXLFNBQVgsQ0FBUCxDQUpvQjs7OztpQ0FPbkIsV0FBVyxTQUFTLFNBQVM7QUFDOUIsdUJBQU8sS0FBSyxFQUFMLHdDQUFXLG1CQUFXLE1BQXRCLENBQVAsQ0FEOEI7Ozs7K0JBSS9CLFdBQVcsU0FBUyxTQUFTLE1BQU07QUFDbEMsb0JBQUksUUFBUSxRQUFRLE9BQU8sSUFBUCxLQUFnQixTQUFoQixDQURjO0FBRWxDLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaO29CQUNBLGtCQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLFVBQVUsUUFBVixFQUFvQjtBQUN4RCwyQkFBTyxTQUFTLE9BQVQsS0FBcUIsT0FBckIsSUFBZ0MsU0FBUyxNQUFULEtBQW9CLE9BQXBCLENBRGlCO2lCQUFwQixDQUF4QyxDQUg4Qjs7QUFPbEMsb0JBQUksZUFBSixFQUNJLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLFdBQVc7QUFDWCw2QkFBUyxPQUFUO0FBQ0EsNEJBQVEsT0FBUjtpQkFGQSxDQVY4Qjs7QUFlbEMsb0JBQUcsUUFBUSxPQUFPLElBQVAsS0FBZ0IsU0FBaEIsRUFDUCxTQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FESjs7QUFHQSxvQkFBSSxTQUFKLEVBQ0ksS0FBSyxTQUFMLENBQWUsU0FBZixFQUEwQixJQUExQixDQUErQixRQUEvQixFQURKLEtBR0ksS0FBSyxTQUFMLENBQWUsU0FBZixJQUE0QixDQUFDLFFBQUQsQ0FBNUIsQ0FISjs7QUFLQSx1QkFBTyxJQUFQLENBdkJrQzs7OztnQ0EwQmxDLFdBQVcsU0FBUyxTQUFTO0FBQzdCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRHlCOztBQUc3QixvQkFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLFVBQVUsTUFBVixFQUNmLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLGFBQWEsQ0FBQyxPQUFELEVBQVU7QUFDdkIsMkJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUFQLENBRHVCO0FBRXZCLDJCQUFPLElBQVAsQ0FGdUI7aUJBQTNCOztBQUtBLHFCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxVQUFVLE1BQVYsRUFBa0IsSUFBSSxDQUFKLEVBQU8sRUFBRSxDQUFGLEVBQUs7QUFDOUMsd0JBQUksV0FBVyxVQUFVLENBQVYsQ0FBWCxDQUQwQzs7QUFHOUMsd0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUFwQixFQUE2QjtBQUM3RCxrQ0FBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBRDZEO0FBRTdELDhCQUY2RDtxQkFBakU7aUJBSEo7O0FBU0EsdUJBQU8sSUFBUCxDQXBCNkI7Ozs7b0NBdUJ6QixXQUFvQjtrREFBTjs7aUJBQU07O0FBQ3hCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRG9CO0FBRXhCLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUFWLEVBQWtCO0FBQ2pDLDRCQUFRLElBQVIsQ0FBZ0IsS0FBSyxTQUFMLHNCQUErQix3REFBL0MsRUFEaUM7QUFFakMsMkJBQU8sSUFBUCxDQUZpQztpQkFBckM7O0FBS0EscUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFVBQVUsTUFBVixFQUFrQixJQUFJLENBQUosRUFBTyxFQUFFLENBQUYsRUFBSztBQUM3Qyx5QkFBSyxTQUFMLENBQWUsVUFBVSxDQUFWLENBQWYsRUFBNkIsU0FBN0IsRUFENkM7QUFFN0Msd0JBQUcsVUFBVSxDQUFWLEVBQWEsSUFBYixFQUNDLFVBQVUsTUFBVixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQURKO2lCQUZKOztBQU1BLHVCQUFPLElBQVAsQ0Fid0I7Ozs7c0NBZ0JsQixVQUFVLE1BQUs7OztBQUNyQixvQkFBSSxRQUFRLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxJQUFkLENBQVIsQ0FEaUI7QUFFckIsOENBQVMsT0FBVCxFQUFpQixJQUFqQiwyQkFBc0IsU0FBUyxNQUFULDRCQUFvQixPQUExQyxFQUZxQjs7Ozt3Q0FLYjtBQUNSLHVCQUFPLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBUCxDQURROzs7O2VBdEZWOzs7c0JBMEZTIiwiZmlsZSI6ImV2ZW50RHJpdmVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBEbXl0cm8gb24gNC85LzIwMTYuXHJcbiAqL1xyXG5jbGFzcyBFdmVudERyaXZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50c01hcCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIF9maW5kKGFycmF5LCBwcmVkaWNhdGUpIHtcclxuICAgICAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbmQocHJlZGljYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbmNlKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9uKC4uLmFyZ3VtZW50cywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgICAgICAgbGV0IF9vbmNlID0gb25jZSAmJiB0eXBlb2Ygb25jZSA9PT0gJ2Jvb2xlYW4nO1xyXG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLFxyXG4gICAgICAgICAgICBpc0V4aXN0TGlzdGVuZXIgPSB0aGlzLl9maW5kKGxpc3RlbmVycywgZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlciAmJiBsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNFeGlzdExpc3RlbmVyKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGxpc3RlbmVyID0ge1xyXG4gICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxyXG4gICAgICAgICAgICBjYWxsZXI6IGNvbnRleHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihvbmNlICYmIHR5cGVvZiBvbmNlID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIGxpc3RlbmVyLm9uY2UgPSBvbmNlO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXJzKVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSA9IFtsaXN0ZW5lcl07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9mZihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXJzICYmICFoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlciAmJiBsaXN0ZW5lci5jYWxsZXIgPT09IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5fdG9TdHJpbmcoKX06OlRoZSBldmVudCAke2V2ZW50TmFtZX0gd2FzIHRyaWdnZXJlZCwgYnV0IGhhbmRsZXIgZGlkblxcJ3QgZmlyZWQuYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2gobGlzdGVuZXJzW2ldLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnNbaV0ub25jZSlcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBfZGlzcGF0Y2gobGlzdGVuZXIsIGFyZ3Mpe1xyXG4gICAgICAgIGxldCBfYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJncyk7XHJcbiAgICAgICAgbGlzdGVuZXIuaGFuZGxlci5jYWxsKGxpc3RlbmVyLmNhbGxlciwgLi4uX2FyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIF90b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gW1snRXZlbnREcml2ZXInXV1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBFdmVudERyaXZlcjsiXX0=

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
                    console.warn(this.toString() + '::The event ' + eventName + ' was triggered, but handler didn\'t fired.');
                    return this;
                }

                for (var i = 0, l = listeners.length; i < l; ++i) {
                    this._dispatch(listeners[i], arguments);
                    if (listeners[i].once) this.eventsMap[eventName].splice(i, 1);
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
            key: 'toString',
            value: function toString() {
                return [['EventDriver']];
            }
        }]);

        return EventDriver;
    }();

    exports.default = new EventDriver();
});

},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXZlbnREcml2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDR007QUFDRixpQkFERSxXQUNGLEdBQWM7a0NBRFosYUFDWTs7QUFDVixpQkFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRFU7U0FBZDs7cUJBREU7O2tDQUtJLE9BQU8sV0FBVztBQUNwQixvQkFBSSxDQUFDLEtBQUQsSUFBVSxDQUFDLE1BQU0sTUFBTixFQUNYLE9BQU8sS0FBUCxDQURKOztBQUdBLHVCQUFPLE1BQU0sSUFBTixDQUFXLFNBQVgsQ0FBUCxDQUpvQjs7OztpQ0FPbkIsV0FBVyxTQUFTLFNBQVM7QUFDOUIsdUJBQU8sS0FBSyxFQUFMLHdDQUFXLG1CQUFXLE1BQXRCLENBQVAsQ0FEOEI7Ozs7K0JBSS9CLFdBQVcsU0FBUyxTQUFTLE1BQU07QUFDbEMsb0JBQUksUUFBUSxRQUFRLE9BQU8sSUFBUCxLQUFnQixTQUFoQixDQURjO0FBRWxDLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaO29CQUNBLGtCQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLFVBQVUsUUFBVixFQUFvQjtBQUN4RCwyQkFBTyxTQUFTLE9BQVQsS0FBcUIsT0FBckIsSUFBZ0MsU0FBUyxNQUFULEtBQW9CLE9BQXBCLENBRGlCO2lCQUFwQixDQUF4QyxDQUg4Qjs7QUFPbEMsb0JBQUksZUFBSixFQUNJLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLFdBQVc7QUFDWCw2QkFBUyxPQUFUO0FBQ0EsNEJBQVEsT0FBUjtpQkFGQSxDQVY4Qjs7QUFlbEMsb0JBQUcsUUFBUSxPQUFPLElBQVAsS0FBZ0IsU0FBaEIsRUFDUCxTQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FESjs7QUFHQSxvQkFBSSxTQUFKLEVBQ0ksS0FBSyxTQUFMLENBQWUsU0FBZixFQUEwQixJQUExQixDQUErQixRQUEvQixFQURKLEtBR0ksS0FBSyxTQUFMLENBQWUsU0FBZixJQUE0QixDQUFDLFFBQUQsQ0FBNUIsQ0FISjs7QUFLQSx1QkFBTyxJQUFQLENBdkJrQzs7OztnQ0EwQmxDLFdBQVcsU0FBUyxTQUFTO0FBQzdCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRHlCOztBQUc3QixvQkFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLFVBQVUsTUFBVixFQUNmLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLGFBQWEsQ0FBQyxPQUFELEVBQVU7QUFDdkIsMkJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUFQLENBRHVCO0FBRXZCLDJCQUFPLElBQVAsQ0FGdUI7aUJBQTNCOztBQUtBLHFCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxVQUFVLE1BQVYsRUFBa0IsSUFBSSxDQUFKLEVBQU8sRUFBRSxDQUFGLEVBQUs7QUFDOUMsd0JBQUksV0FBVyxVQUFVLENBQVYsQ0FBWCxDQUQwQzs7QUFHOUMsd0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUFwQixFQUE2QjtBQUM3RCxrQ0FBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBRDZEO0FBRTdELDhCQUY2RDtxQkFBakU7aUJBSEo7O0FBU0EsdUJBQU8sSUFBUCxDQXBCNkI7Ozs7b0NBdUJ6QixXQUFvQjtrREFBTjs7aUJBQU07O0FBQ3hCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRG9CO0FBRXhCLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUFWLEVBQWtCO0FBQ2pDLDRCQUFRLElBQVIsQ0FBZ0IsS0FBSyxRQUFMLHNCQUE4Qix3REFBOUMsRUFEaUM7QUFFakMsMkJBQU8sSUFBUCxDQUZpQztpQkFBckM7O0FBS0EscUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFVBQVUsTUFBVixFQUFrQixJQUFJLENBQUosRUFBTyxFQUFFLENBQUYsRUFBSztBQUM3Qyx5QkFBSyxTQUFMLENBQWUsVUFBVSxDQUFWLENBQWYsRUFBNkIsU0FBN0IsRUFENkM7QUFFN0Msd0JBQUcsVUFBVSxDQUFWLEVBQWEsSUFBYixFQUNDLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsTUFBMUIsQ0FBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFESjtpQkFGSjs7QUFNQSx1QkFBTyxJQUFQLENBYndCOzs7O3NDQWdCbEIsVUFBVSxNQUFLOzs7QUFDckIsb0JBQUksUUFBUSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsSUFBZCxDQUFSLENBRGlCO0FBRXJCLDhDQUFTLE9BQVQsRUFBaUIsSUFBakIsMkJBQXNCLFNBQVMsTUFBVCw0QkFBb0IsT0FBMUMsRUFGcUI7Ozs7dUNBS2Q7QUFDUCx1QkFBTyxDQUFDLENBQUMsYUFBRCxDQUFELENBQVAsQ0FETzs7OztlQXRGVDs7O3NCQTJGUyxJQUFJLFdBQUoiLCJmaWxlIjoiZXZlbnREcml2ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERteXRybyBvbiA0LzkvMjAxNi5cclxuICovXHJcbmNsYXNzIEV2ZW50RHJpdmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzTWFwID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgX2ZpbmQoYXJyYXksIHByZWRpY2F0ZSkge1xyXG4gICAgICAgIGlmICghYXJyYXkgfHwgIWFycmF5Lmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXkuZmluZChwcmVkaWNhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uY2UoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub24oLi4uYXJndW1lbnRzLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICBsZXQgX29uY2UgPSBvbmNlICYmIHR5cGVvZiBvbmNlID09PSAnYm9vbGVhbic7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0sXHJcbiAgICAgICAgICAgIGlzRXhpc3RMaXN0ZW5lciA9IHRoaXMuX2ZpbmQobGlzdGVuZXJzLCBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0V4aXN0TGlzdGVuZXIpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgbGlzdGVuZXIgPSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXHJcbiAgICAgICAgICAgIGNhbGxlcjogY29udGV4dFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKG9uY2UgJiYgdHlwZW9mIG9uY2UgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgbGlzdGVuZXIub25jZSA9IG9uY2U7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdID0gW2xpc3RlbmVyXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xyXG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgIGlmICghbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLnRvU3RyaW5nKCl9OjpUaGUgZXZlbnQgJHtldmVudE5hbWV9IHdhcyB0cmlnZ2VyZWQsIGJ1dCBoYW5kbGVyIGRpZG5cXCd0IGZpcmVkLmApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKGxpc3RlbmVyc1tpXSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYobGlzdGVuZXJzW2ldLm9uY2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIF9kaXNwYXRjaChsaXN0ZW5lciwgYXJncyl7XHJcbiAgICAgICAgbGV0IF9hcmdzID0gW10uc2xpY2UuY2FsbChhcmdzKTtcclxuICAgICAgICBsaXN0ZW5lci5oYW5kbGVyLmNhbGwobGlzdGVuZXIuY2FsbGVyLCAuLi5fYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtbJ0V2ZW50RHJpdmVyJ11dXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBFdmVudERyaXZlcigpOyJdfQ==

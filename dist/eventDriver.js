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

    exports.default = new EventDriver();
});

},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXZlbnREcml2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDR007QUFDRixpQkFERSxXQUNGLEdBQWM7a0NBRFosYUFDWTs7QUFDVixpQkFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRFU7U0FBZDs7cUJBREU7O2tDQUtJLE9BQU8sV0FBVztBQUNwQixvQkFBSSxDQUFDLEtBQUQsSUFBVSxDQUFDLE1BQU0sTUFBTixFQUNYLE9BQU8sS0FBUCxDQURKOztBQUdBLHVCQUFPLE1BQU0sSUFBTixDQUFXLFNBQVgsQ0FBUCxDQUpvQjs7OztpQ0FPbkIsV0FBVyxTQUFTLFNBQVM7QUFDOUIsdUJBQU8sS0FBSyxFQUFMLHdDQUFXLG1CQUFXLE1BQXRCLENBQVAsQ0FEOEI7Ozs7K0JBSS9CLFdBQVcsU0FBUyxTQUFTLE1BQU07QUFDbEMsb0JBQUksUUFBUSxRQUFRLE9BQU8sSUFBUCxLQUFnQixTQUFoQixDQURjO0FBRWxDLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaO29CQUNBLGtCQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLFVBQVUsUUFBVixFQUFvQjtBQUN4RCwyQkFBTyxTQUFTLE9BQVQsS0FBcUIsT0FBckIsSUFBZ0MsU0FBUyxNQUFULEtBQW9CLE9BQXBCLENBRGlCO2lCQUFwQixDQUF4QyxDQUg4Qjs7QUFPbEMsb0JBQUksZUFBSixFQUNJLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLFdBQVc7QUFDWCw2QkFBUyxPQUFUO0FBQ0EsNEJBQVEsT0FBUjtpQkFGQSxDQVY4Qjs7QUFlbEMsb0JBQUcsUUFBUSxPQUFPLElBQVAsS0FBZ0IsU0FBaEIsRUFDUCxTQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FESjs7QUFHQSxvQkFBSSxTQUFKLEVBQ0ksS0FBSyxTQUFMLENBQWUsU0FBZixFQUEwQixJQUExQixDQUErQixRQUEvQixFQURKLEtBR0ksS0FBSyxTQUFMLENBQWUsU0FBZixJQUE0QixDQUFDLFFBQUQsQ0FBNUIsQ0FISjs7QUFLQSx1QkFBTyxJQUFQLENBdkJrQzs7OztnQ0EwQmxDLFdBQVcsU0FBUyxTQUFTO0FBQzdCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRHlCOztBQUc3QixvQkFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLFVBQVUsTUFBVixFQUNmLE9BQU8sSUFBUCxDQURKOztBQUdBLG9CQUFJLGFBQWEsQ0FBQyxPQUFELEVBQVU7QUFDdkIsMkJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUFQLENBRHVCO0FBRXZCLDJCQUFPLElBQVAsQ0FGdUI7aUJBQTNCOztBQUtBLHFCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxVQUFVLE1BQVYsRUFBa0IsSUFBSSxDQUFKLEVBQU8sRUFBRSxDQUFGLEVBQUs7QUFDOUMsd0JBQUksV0FBVyxVQUFVLENBQVYsQ0FBWCxDQUQwQzs7QUFHOUMsd0JBQUksU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUFwQixFQUE2QjtBQUM3RCxrQ0FBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBRDZEO0FBRTdELDhCQUY2RDtxQkFBakU7aUJBSEo7O0FBU0EsdUJBQU8sSUFBUCxDQXBCNkI7Ozs7b0NBdUJ6QixXQUFvQjtrREFBTjs7aUJBQU07O0FBQ3hCLG9CQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaLENBRG9CO0FBRXhCLG9CQUFJLENBQUMsU0FBRCxJQUFjLENBQUMsVUFBVSxNQUFWLEVBQWtCO0FBQ2pDLDRCQUFRLElBQVIsQ0FBZ0IsS0FBSyxTQUFMLHNCQUErQix3REFBL0MsRUFEaUM7QUFFakMsMkJBQU8sSUFBUCxDQUZpQztpQkFBckM7O0FBS0EscUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFVBQVUsTUFBVixFQUFrQixJQUFJLENBQUosRUFBTyxFQUFFLENBQUYsRUFBSztBQUM3Qyx5QkFBSyxTQUFMLENBQWUsVUFBVSxDQUFWLENBQWYsRUFBNkIsU0FBN0IsRUFENkM7QUFFN0Msd0JBQUcsVUFBVSxDQUFWLEVBQWEsSUFBYixFQUNDLFVBQVUsTUFBVixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQURKO2lCQUZKOztBQU1BLHVCQUFPLElBQVAsQ0Fid0I7Ozs7c0NBZ0JsQixVQUFVLE1BQUs7OztBQUNyQixvQkFBSSxRQUFRLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxJQUFkLENBQVIsQ0FEaUI7QUFFckIsOENBQVMsT0FBVCxFQUFpQixJQUFqQiwyQkFBc0IsU0FBUyxNQUFULDRCQUFvQixPQUExQyxFQUZxQjs7Ozt3Q0FLYjtBQUNSLHVCQUFPLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBUCxDQURROzs7O2VBdEZWOzs7c0JBMEZTLElBQUksV0FBSiIsImZpbGUiOiJldmVudERyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRG15dHJvIG9uIDQvOS8yMDE2LlxyXG4gKi9cclxuY2xhc3MgRXZlbnREcml2ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNNYXAgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBfZmluZChhcnJheSwgcHJlZGljYXRlKSB7XHJcbiAgICAgICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheS5maW5kKHByZWRpY2F0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25jZShldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbiguLi5hcmd1bWVudHMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCwgb25jZSkge1xyXG4gICAgICAgIGxldCBfb25jZSA9IG9uY2UgJiYgdHlwZW9mIG9uY2UgPT09ICdib29sZWFuJztcclxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSxcclxuICAgICAgICAgICAgaXNFeGlzdExpc3RlbmVyID0gdGhpcy5fZmluZChsaXN0ZW5lcnMsIGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIgJiYgbGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzRXhpc3RMaXN0ZW5lcilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBsaXN0ZW5lciA9IHtcclxuICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcclxuICAgICAgICAgICAgY2FsbGVyOiBjb250ZXh0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYob25jZSAmJiB0eXBlb2Ygb25jZSA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICBsaXN0ZW5lci5vbmNlID0gb25jZTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVycylcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV0gPSBbbGlzdGVuZXJdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgIGlmICghbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVycyAmJiAhaGFuZGxlcikge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIgJiYgbGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke3RoaXMuX3RvU3RyaW5nKCl9OjpUaGUgZXZlbnQgJHtldmVudE5hbWV9IHdhcyB0cmlnZ2VyZWQsIGJ1dCBoYW5kbGVyIGRpZG5cXCd0IGZpcmVkLmApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKGxpc3RlbmVyc1tpXSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYobGlzdGVuZXJzW2ldLm9uY2UpXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgX2Rpc3BhdGNoKGxpc3RlbmVyLCBhcmdzKXtcclxuICAgICAgICBsZXQgX2FyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgICAgIGxpc3RlbmVyLmhhbmRsZXIuY2FsbChsaXN0ZW5lci5jYWxsZXIsIC4uLl9hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBfdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtbJ0V2ZW50RHJpdmVyJ11dXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEV2ZW50RHJpdmVyKCk7XHJcbiJdfQ==

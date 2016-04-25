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
})(undefined, function () {
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

},{}],2:[function(require,module,exports){
'use strict';

var _eventDriver = require('../src/eventDriver');

var _eventDriver2 = _interopRequireDefault(_eventDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Event-Driver', function () {
    var eventDriver = null;
    beforeEach(function () {
        eventDriver = new _eventDriver2.default();
    });

    it('Should behave...', function () {
        expect(false).toBe(true);
    });
}); /**
     * Created by Dmytro on 4/10/2016.
     */

},{"../src/eventDriver":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGV2ZW50RHJpdmVyLmpzIiwidGVzdFxcZXZlbnREcml2ZXIuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FDR0EsQ0FBQyxVQUFDLElBQUQsRUFBTyxPQUFQLEVBQWtCO0FBQ2YsUUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBTyxHQUEzQyxFQUFnRDs7QUFFNUMsZUFBTyxFQUFQLEVBQVcsT0FBWDtBQUNILEtBSEQsTUFHTyxJQUFJLFFBQU8sT0FBUCx5Q0FBTyxPQUFQLE9BQW1CLFFBQXZCLEVBQWlDOztBQUVwQyxlQUFPLE9BQVAsR0FBaUIsU0FBakI7QUFDSCxLQUhNLE1BR0E7O0FBRUgsYUFBSyxXQUFMLEdBQW1CLFNBQW5CO0FBQ0g7QUFDSixDQVhELGFBV1MsWUFBSztBQUFBLFFBQ0osV0FESTtBQUVOLCtCQUFjO0FBQUE7O0FBQ1YsaUJBQUssU0FBTCxHQUFpQixFQUFqQjtBQUNIOztBQUpLO0FBQUE7QUFBQSxpQ0FNRCxTQU5DLEVBTVUsT0FOVixFQU1tQixPQU5uQixFQU00QjtBQUM5Qix1QkFBTyxLQUFLLEVBQUwsd0NBQVcsU0FBWCxVQUFzQixJQUF0QixHQUFQO0FBQ0g7QUFSSztBQUFBO0FBQUEsK0JBVUgsU0FWRyxFQVVRLE9BVlIsRUFVaUIsT0FWakIsRUFVMEIsSUFWMUIsRUFVZ0M7QUFDbEMsb0JBQU0sWUFBWSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQWxCO29CQUNJLGtCQUFrQixDQUFDLENBQUMsVUFBVSxJQUFWLENBQWUsb0JBQVk7QUFDM0MsMkJBQU8sU0FBUyxPQUFULEtBQXFCLE9BQXJCLElBQWdDLFNBQVMsTUFBVCxLQUFvQixPQUEzRDtBQUNILGlCQUZtQixDQUR4Qjs7QUFLQSxvQkFBSSxlQUFKLEVBQ0ksT0FBTyxJQUFQOztBQUVKLG9CQUFNLFdBQVc7QUFDYiw2QkFBUyxPQURJ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dCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERteXRybyBvbiA0LzkvMjAxNi5cclxuICovXHJcbigocm9vdCwgZmFjdG9yeSkgPT57XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgLy8gQU1EXHJcbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gTm9kZSwgQ29tbW9uSlMtbGlrZVxyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcclxuICAgICAgICByb290LkV2ZW50RHJpdmVyID0gZmFjdG9yeSgpO1xyXG4gICAgfVxyXG59KSh0aGlzLCAoKSA9PntcclxuICAgIGNsYXNzIEV2ZW50RHJpdmVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNNYXAgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uY2UoZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKC4uLmFyZ3VtZW50cywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIsIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXSxcclxuICAgICAgICAgICAgICAgIGlzRXhpc3RMaXN0ZW5lciA9ICEhbGlzdGVuZXJzLmZpbmQobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzRXhpc3RMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgY2FsbGVyOiBjb250ZXh0XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZihvbmNlICYmIHR5cGVvZiBvbmNlID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5vbmNlID0gb25jZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdID0gW2xpc3RlbmVyXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyICYmIGxpc3RlbmVyLmNhbGxlciA9PT0gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJpZ2dlcihldmVudE5hbWUsIGRhdGEsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLl90b1N0cmluZygpfTo6VGhlIGV2ZW50ICR7ZXZlbnROYW1lfSB3YXMgdHJpZ2dlcmVkLCBidXQgaGFuZGxlciBkaWRuXFwndCBmaXJlZC5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYobGlzdGVuZXIuY2FsbGVyID09PSBjb250ZXh0IHx8ICFjb250ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2gobGlzdGVuZXIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobGlzdGVuZXJzW2ldLm9uY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfZGlzcGF0Y2gobGlzdGVuZXIsIGRhdGEpe1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyLmNhbGwobGlzdGVuZXIuY2FsbGVyLCBsaXN0ZW5lciwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbWydFdmVudERyaXZlciddXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEV2ZW50RHJpdmVyO1xyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBEbXl0cm8gb24gNC8xMC8yMDE2LlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RHJpdmVyIGZyb20gJy4uL3NyYy9ldmVudERyaXZlcic7XHJcblxyXG5kZXNjcmliZSgnRXZlbnQtRHJpdmVyJywgKCkgPT4ge1xyXG4gICAgbGV0IGV2ZW50RHJpdmVyID0gbnVsbDtcclxuICAgIGJlZm9yZUVhY2goKCk9PntcclxuICAgICAgICBldmVudERyaXZlciA9IG5ldyBFdmVudERyaXZlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ1Nob3VsZCBiZWhhdmUuLi4nLCAoKT0+e1xyXG4gICAgICAgIGV4cGVjdChmYWxzZSkudG9CZSh0cnVlKTtcclxuICAgIH0pO1xyXG59KTsiXX0=

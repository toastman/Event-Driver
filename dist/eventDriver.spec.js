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
                    isExistListener = !!listeners && listeners.find(function (listener) {
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

    describe('One', function () {
        beforeEach(function () {
            eventDriver = new _eventDriver2.default();
        });

        it('Should add listener', function () {
            var callback = function callback() {
                return true;
            };

            eventDriver.on('test', callback);

            console.log(eventDriver.eventsMap['test']);

            expect(eventDriver.eventsMap['test'][0].handler).toBe(callback);
        });
    });

    describe('Trigger', function () {
        beforeEach(function () {
            eventDriver = new _eventDriver2.default();
        });

        it('Should dispatch', function () {
            eventDriver.on('test', function () {});

            spyOn(eventDriver, '_dispatch').and.callThrough();

            eventDriver.trigger('test');

            expect(eventDriver._dispatch).toHaveBeenCalled();
        });
    });
}); /**
     * Created by Dmytro on 4/10/2016.
     */

},{"../src/eventDriver":1}]},{},[2])


//# sourceMappingURL=eventDriver.spec.js.map

/**
 * Created by Dmytro on 4/9/2016.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        root.EventDriver = factory();
    }
}(this, function ($) {
    function EventDriver() {
        this.eventsMap = {};
    }

    EventDriver.prototype = {
        constructor: EventDriver,

        _find: function(array, predicate) {
            if (!array || !array.length)
                return false;

            for(let i=0, l = array.length; i<l; ++i) {
                let item = array[i];
                if(predicate(item))
                    return item;
            }

        },

        once: function(eventName, handler, context) {
            return this.on(...arguments, true);
        },

        on: function(eventName, handler, context, once) {
            let listeners = this.eventsMap[eventName],
                isExistListener = !!this._find(listeners, function (listener) {
                    return listener.handler === handler && listener.caller === context;
                });

            if (isExistListener)
                return this;

            let listener = {
                handler: handler,
                caller: context
            };

            if(once && typeof once === 'boolean')
                listener.once = once;

            if (listeners)
                this.eventsMap[eventName].push(listener);
            else
                this.eventsMap[eventName] = [listener];

            return this;
        },

        off(eventName, handler, context) {
            let listeners = this.eventsMap[eventName];

            if (!listeners || !listeners.length)
                return this;

            if (listeners && !handler) {
                delete this.eventsMap[eventName];
                return this;
            }

            for (let i = 0, l = listeners.length; i < l; ++i) {
                let listener = listeners[i];

                if (listener.handler === handler && listener.caller === context) {
                    listeners.splice(i, 1);
                    break;
                }
            }

            return this;
        },

        trigger(eventName, data, context) {
            let listeners = this.eventsMap[eventName];
            if (!listeners || !listeners.length) {
                console.warn(`${this._toString()}::The event ${eventName} was triggered, but handler didn\'t fired.`);
                return this;
            }
            for(let i = 0, l = listeners.length; i < l; ++i) {
                let listener = listeners[i];
                if(listener.caller === context || !context){
                    listener.eventName = eventName;
                    this._dispatch(listener, data);
                }
                if(listeners[i].once)
                    listeners.splice(i, 1);
            }

            return this;
        },

        _dispatch(listener, data){
            listener.handler.call(listener.caller, listener, data);
        },

        _toString() {
            return [['EventDriver']]
        }

    };

    return EventDriver;
}));
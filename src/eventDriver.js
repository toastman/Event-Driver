/**
 * Created by Dmytro on 4/9/2016.
 */
class EventDriver {
    constructor() {
        this.eventsMap = {};
    }

    _find(array, predicate) {
        if (!array || !array.length)
            return false;

        for(let i=0, l = array.length; i<l; ++i) {
            let item = array[i];
            if(predicate(item))
                return item;
        }

    }

    once(eventName, handler, context) {
        return this.on(...arguments, true);
    }

    on(eventName, handler, context, once) {
        let _once = once && typeof once === 'boolean';
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
    }

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
    }

    trigger(eventName, data, context) {
        let listeners = this.eventsMap[eventName];
        if (!listeners || !listeners.length) {
            console.warn(`${this._toString()}::The event ${eventName} was triggered, but handler didn\'t fired.`);
            return this;
        }
        for(let i = 0, l = listeners.length; i < l; ++i) {
            let listener = listeners[i];
            if(listener.caller === context || !context)
                this._dispatch(listener, eventName, data);
            if(listeners[i].once)
                listeners.splice(i, 1);
        }

        return this;
    }

    _dispatch(listener, eventName, data){
        listener.handler.call(listener.caller, eventName, data);
    }

    _toString() {
        return [['EventDriver']]
    }
}
window.EventDriver = new EventDriver();
export default window.EventDriver;

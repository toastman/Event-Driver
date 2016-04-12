/**
 * Created by Dmytro on 4/13/2016.
 */
'use strict';

import EventDriver from './eventDriver';

class Title {
    constructor(title) {
        this.title = title;
        this.render();
        this.setupEventListeners();
    }

    setTitle() {
        this.el.innerText = this.title;
    }

    setupEventListeners() {
        EventDriver.on('UPDATE', this.update, this);
    }

    render() {
        let h1 = document.createElement('h1');
        document.body.appendChild(h1);

        this.el = h1;

        this.setTitle();

    }

    update(e, data) {
        this.title = data.title;
        this.setTitle();
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    let title1 = new Title('Title1');
    let title2 = new Title('Title2');

    let input = document.getElementById('titleInput');
    input.addEventListener('keyup', ()=>{
        EventDriver.trigger('UPDATE', {
            title: input.value
        }, title2);

        //EventDriver.trigger('UPDATE', {
        //    title: input.value
        //});
    });
});

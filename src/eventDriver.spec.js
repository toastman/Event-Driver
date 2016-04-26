/**
 * Created by Dmytro on 4/10/2016.
 */
import EventDriver from '../src/eventDriver';

describe('Event-Driver', () => {
    let eventDriver = null;
    beforeEach(()=>{
        eventDriver = new EventDriver();
    });

    it('Should success...', ()=>{
        expect(true).toBe(true);
    });

    xit('Should fail', ()=>{
        expect(false).toBe(true);
    })
});
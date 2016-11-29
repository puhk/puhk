import _ from 'lodash';

export default class Simulator {
    maxStatesToRemember = 120;
    futureEvents = [];
    states = [];

    constructor(engine) {
        this.engine = engine;
    }

    advance() {
        let newState = this.currentState.clone();
        newState.events = _.remove(this.futureEvents, {frame: ++newState.frame});

        this.engine.run(newState, this.currentState.events);
        this.states.unshift(newState);

        if (this.states.length > this.maxStatesToRemember) {
            this.states.splice(this.maxStatesToRemember, this.states.length);
        }
    }

    fastForward(frame) {
        while (this.currentFrame < frame) {
            this.advance();
        }
    }

    rewind(frame) {
        let index = _.findIndex(this.states, {frame});
        this.states.splice(0, index);
    }

    resetState(state) {
        this.states.forEach(state => {
            this.futureEvents = this.futureEvents.concat(state.events);
        });

        this.states.length = 0;
        this.states.unshift(state);
    }

    clear() {
        this.states.length = 0;
        this.futureEvents.length = 0;
    }

    addEvent(event, frame) {
        if (!frame || frame === this.currentFrame) {
            event.frame = this.currentFrame;
            this.currentState.events.push(event);
            return;
        }

        if (frame > this.currentFrame) {
            event.frame = frame;
            this.futureEvents.push(event);
            return;
        }

        throw new Error('Trying to add event to past frame');
    }

    findStateFromFrame(frame) {
        return _.find(this.states, {frame});
    }

    hasFrameInHistory(frame) {
        let state = this.findStateFromFrame(frame);
        return typeof state !== 'undefined';
    }

    get currentState() {
        return this.states[0];
    }

    get currentFrame() {
        return this.currentState.frame;
    }

    get oldestFrame() {
        return this.states[this.states.length - 1].frame;
    }
}

// @flow

import _ from 'lodash';
import State from './State';

import type Engine from '../Engine';
import type Event from './events/Event';

export default class Simulator {
    engine: Engine;
    maxStatesToRemember = 120;
    futureEvents: Event[] = [];
    states: State[] = [];

    constructor(engine: Engine) {
        this.engine = engine;
    }

    advance(): State {
        let newState = this.currentState.clone();
        newState.events = _.remove(this.futureEvents, {frame: ++newState.frame});

        this.engine.run(newState, this.currentState.events);
        this.states.unshift(newState);

        if (this.states.length > this.maxStatesToRemember) {
            this.states.splice(this.maxStatesToRemember, this.states.length);
        }

        return newState;
    }

    fastForward(frame: number) {
        while (this.currentFrame < frame) {
            this.advance();
        }
    }

    rewind(frame: number) {
        let index = _.findIndex(this.states, {frame});
        this.states.splice(0, index);
    }

    resetState(state: State) {
        if (this.currentState && state.frame < this.currentFrame) {
            this.states.forEach(state => {
                this.futureEvents = this.futureEvents.concat(state.events);
            });
        }

        this.states.length = 0;
        this.states.unshift(state);
    }

    clear() {
        this.states.length = 0;
        this.futureEvents.length = 0;
    }

    addEvent(event: Event, frame?: number) {
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

    findStateFromFrame(frame: number): ?State {
        return this.states.find(state => state.frame == frame);
    }

    hasFrameInHistory(frame: number) {
        let state = this.findStateFromFrame(frame);
        return typeof state !== 'undefined';
    }

    addState(state: State) {
        this.states.unshift(state);
    }

    get currentState(): State {
        return this.states[0] || new State;
    }

    get currentFrame(): number {
        return this.currentState.frame;
    }

    get oldestFrame(): number {
        return this.states[this.states.length - 1].frame;
    }
}

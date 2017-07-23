import _ from 'lodash';

import State from './State';
import Event from './Event';
import Engine from '../Engine';
import Game from '../Game';

export default class Simulator {
    private maxStatesToRemember = 120;
    private futureEvents: Event[] = [];
    private states: State[] = [];

    public constructor(private engine: Engine) {}

    public advance(game: Game): State {
        let newState = this.currentState.clone();
        newState.events = _.remove(this.futureEvents, { frame: ++newState.frame });

        let events = this.currentState.events;
        this.states.unshift(newState);
        this.applyEvents(newState, game, events);
        this.engine.run(newState, events);

        if (this.states.length > this.maxStatesToRemember) {
            this.states.splice(this.maxStatesToRemember, this.states.length);
        }

        return newState;
    }

    private applyEvents(state: State, game: Game, events: Event[]) {
        for (const event of events) {
            event.apply(state, game);
        }
    }

    public fastForward(frame: number, game: Game) {
        while (this.currentFrame < frame) {
            this.advance(game);
        }
    }

    public rewind(frame: number) {
        let index = _.findIndex(this.states, { frame });
        this.states.splice(0, index);
    }

    public resetState(state: State) {
        if (this.currentState && state.frame < this.currentFrame) {
            this.states.forEach(state => {
                this.futureEvents = this.futureEvents.concat(state.events);
            });
        }

        this.states.length = 0;
        this.states.unshift(state);
    }

    public clear() {
        this.states.length = 0;
        this.futureEvents.length = 0;
    }

    public addEvent(event: Event, frame?: number) {
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

    public findStateFromFrame(frame: number): State {
        return this.states.find(state => state.frame == frame);
    }

    public hasFrameInHistory(frame: number) {
        let state = this.findStateFromFrame(frame);
        return typeof state !== 'undefined';
    }

    public addState(state: State) {
        this.states.unshift(state);
    }

    public get currentState(): State {
        return this.states[0];
    }

    public get currentFrame(): number {
        return this.currentState.frame;
    }

    public get oldestFrame(): number {
        return this.states[this.states.length - 1].frame;
    }
}

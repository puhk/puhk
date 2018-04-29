import { EventAggregator } from 'aurelia-event-aggregator';
import _ from 'lodash';

import State from './State';
import Event from './Event';
import Engine from '../Engine';

export default class Simulator {
    public events: Event[] = [];
    private states: State[];

    public constructor(private engine: Engine, private eventApi: EventAggregator) { }

    public simulate(targetFrame: number, fromState: State): State {
        const targetState = this.findStateByFrame(targetFrame);

        if (targetState) {
            return targetState;
        }

        let state = this.states.includes(fromState) ? fromState : this.concreteState;

        while (state.frame < targetFrame) {
            state = this.getNextState(state);
            this.rememberState(state);
        }

        return state;
    }

    private createNewState(state: State): State {
        const newState = state.clone();
        ++newState.frame;

        for (const event of this.events) {
            if (event.frame == state.frame) {
                event.apply(newState);
                this.eventApi.publish(event);
            }
        }

        const result = this.engine.run(newState);
        const event = newState.update(this.eventApi, result);

        if (event) {
            this.addEvent(event);
        }

        return newState;
    }

    private getNextState(fromState: State) {
        const state = this.findStateByFrame(fromState.frame + 1);
        return state || this.createNewState(fromState);
    }

    private rememberState(state: State) {
        if (!this.findStateByFrame(state.frame)) {
            this.states.push(state);
        }
    }

    private findStateByFrame(frame: number): State {
        return this.states.find(state => state.frame === frame);
    }

    public advance(): State {
        const state = this.createNewState(this.concreteState);
        this.makeConcrete(state);
        return state;
    }

    public addEvent(event: Event): void {
        if (event.frame >= this.concreteState.frame) {
            this.events.push(event);
            this.states = this.states.filter(state => state.frame <= event.frame);
        }
    }

    public makeConcrete(state: State): this {
        this.states = [state];
        this.events = this.events.filter(event => event.frame >= state.frame);
        return this;
    }

    public get concreteState(): State {
        return this.states[0];
    }
}

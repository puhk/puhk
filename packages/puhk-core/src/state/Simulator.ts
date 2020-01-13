import update from 'immutability-helper';
import State, { runMatchState } from './State';
import { Event } from './event';
import run from '../engine';

export default class Simulator {
	public events: Event[] = [];
	private states: State[] = [];

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

	private getNextState(fromState: State): State {
		const state = this.findStateByFrame(fromState.frame + 1);
		return state || this.createNewState(fromState);
	}

	private createNewState(state: State): State {
		let newState = update(state, {
			frame: { $set: state.frame + 1 },
		});

		newState = this.events
			.filter(e => e.frame === state.frame)
			.reduce((newState, e) => e.apply(newState), newState);

		return newState.playing ? runMatchState(run(newState), state) : newState;
	}

	private rememberState(state: State): void {
		if (!this.findStateByFrame(state.frame)) {
			this.states.push(state);
		}
	}

	private findStateByFrame(frame: number): State | undefined {
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

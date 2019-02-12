import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';

export default class StopGame implements Event {
    public constructor(public frame: number, public sender?: number) { }

    public apply(state: State) {
        return state.playing ? update(state, { playing: { $set: false } }) : state;
    }
}

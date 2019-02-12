import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';

export interface EventData {
    limit: number
}

export default class ChangeTimeLimit implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        return update(state, {
            timeLimit: { $set: this.data.limit }
        });
    }
}

import { Event } from '..';
import State from '../../State';

export interface EventData {
    limit: number
}

export default class ChangeTimeLimit implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State) {
        state.timeLimit = this.data.limit;
    }
}

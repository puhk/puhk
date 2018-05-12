import { Event } from '../Event';
import State from '../State';

export interface EventData {
    limit: number;
}

export default class ChangeScoreLimit implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        state.scoreLimit = this.data.limit;
    }
}

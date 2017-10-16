import Event from '../Event';
import State from '../State';

export interface EventData {
    limit: number
}

export default class ChangeScoreLimit extends Event {
    data: EventData;
    type = 'ChangeScoreLimit';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        state.scoreLimit = this.data.limit;
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new ChangeScoreLimit(frame, sender, data);
    }
}

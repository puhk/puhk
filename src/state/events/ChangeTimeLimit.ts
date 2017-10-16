import Event from '../Event';
import State from '../State';

export interface EventData {
    limit: number
}

export default class ChangeTimeLimit extends Event {
    data: EventData;
    type = 'ChangeTimeLimit';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        state.timeLimit = this.data.limit;
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new ChangeTimeLimit(frame, sender, data);
    }
}

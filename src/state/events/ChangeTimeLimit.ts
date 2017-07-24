import Event from '../Event';
import State from '../State';

export interface EventData {
    limit: number
}

export default class ChangeTimeLimit extends Event {
    data: EventData;
    type = 'ChangeTimeLimit';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State) {
        state.timeLimit = this.data.limit;
    }

    static parse(sender: number, data: EventData) {
        return new ChangeTimeLimit(sender, data);
    }
}

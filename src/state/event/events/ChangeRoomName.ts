import { Event } from '..';
import State from '../../State';

export interface EventData {
    name: string;
}

export default class ChangeRoomName implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        state.roomName = this.data.name;
    }
}

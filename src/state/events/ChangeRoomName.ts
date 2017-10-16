import Event from '../Event';
import State from '../State';

export interface EventData {
    name: string
}

export default class ChangeRoomName extends Event {
    data: EventData;
    type = 'ChangeRoomName';

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        state.roomName = this.data.name;
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new ChangeRoomName(frame, sender, data);
    }
}

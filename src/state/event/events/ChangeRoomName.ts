import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';

export default class ChangeRoomName implements Event {
    public constructor(
        public frame: number,
        public sender: number,
        public data: { name: string }
    ) { }

    public apply(state: State) {
        return update(state, {
            roomName: { $set: this.data.name }
        });
    }
}

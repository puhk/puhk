import Game from '../../Game';
import Event from '../Event';
import State from '../State';

export interface EventData {
    name: string
}

export default class ChangeRoomName extends Event {
    data: EventData;
    type = 'ChangeRoomName';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        state.roomName = this.data.name;
        game.getEventApi().publish(this);
    }

    static parse(sender: number, data: EventData) {
        return new ChangeRoomName(sender, data);
    }
}

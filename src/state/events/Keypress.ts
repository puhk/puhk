import Game from '../../Game';
import { Keys } from '../../Keyboard';
import Event from '../Event';
import State from '../State';

export interface EventData {
    clientId: number,
    key: keyof Keys,
    state: boolean
}

export default class Keypress extends Event {
    data: EventData;
    type = 'Keypress';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }

    static parse(sender: number, data: EventData) {
        return new Keypress(sender, data);
    }
}

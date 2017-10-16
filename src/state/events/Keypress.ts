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

    constructor(frame: number, sender: number, data: EventData) {
        super(frame, sender);
        this.data = data;
    }

    apply(state: State) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }

    shouldPredict() {
        return true;
    }

    static parse(frame: number, sender: number, data: EventData) {
        return new Keypress(frame, sender, data);
    }
}

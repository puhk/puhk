import { Event } from '..';
import State from '../../State';
import { Keys } from '../../../Keyboard';

export interface EventData {
    clientId: number;
    key: keyof Keys;
    state: boolean;
}

export default class Keypress implements Event {
    public shouldPredict = true;

    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State) {
        const player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }
}

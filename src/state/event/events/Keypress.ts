import { Keys } from '@src/Keyboard';
import { Event } from '@src/state/event';
import State from '@src/state/State';

export interface EventData {
    clientId: number;
    key: keyof Keys;
    state: boolean;
}

export default class Keypress implements Event {
    public shouldPredict = true;

    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        const player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error;
        }

        player.keys[this.data.key] = this.data.state;
    }
}

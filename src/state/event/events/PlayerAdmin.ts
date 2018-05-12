import { Event } from 'state/event';
import State from 'state/State';

export interface EventData {
    player: number;
    isAdmin: boolean;
}

export default class PlayerAdmin implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State) {
        if (this.data.player === -1) {
            throw new Error('Cant change admin of host');
        }

        const player = state.getPlayerById(this.data.player);

        if (!player) {
            throw new Error(`Invalid player ${this.data.player}`);
        }

        player.admin = this.data.isAdmin;
    }
}

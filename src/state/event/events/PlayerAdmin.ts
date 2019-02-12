import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import { getPlayerById } from '../../funcs/player';

export interface EventData {
    player: number;
    isAdmin: boolean;
}

export default class PlayerAdmin implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) {}

    public apply(state: State) {
        if (this.data.player === -1) {
            throw new Error('Cant change admin of host');
        }

        const player = getPlayerById(state, this.data.player);

        if (!player) {
            throw new Error(`Invalid player ${this.data.player}`);
        }

        return update(state, {
            players: {
                [state.players.indexOf(player)]: {
                    admin: { $set: this.data.isAdmin }
                }
            }
        });
    }
}

import { Event } from '..';
import State from '../../State';
import Player from '../../../entities/Player';

export interface EventData {
    clientId: number;
    team: string;
}

export default class ChangeTeam implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State) {
        const player = state.getPlayerById(this.data.clientId);

        if (!player) {
            return;
        }

        const currentDisc = state.getPlayerDisc(player);

        // check team exists if not specs
        if (this.data.team !== null && !state.stadium.getTeam(this.data.team)) {
            return;
        }

        // player already on team?
        if (player.team === this.data.team) {
            return;
        }

        player.team = this.data.team;

        if (currentDisc) {
            state.removeDisc(currentDisc);
            player.discId = null;
        }

        if (state.playing && this.data.team !== null) {
            const disc = state.createPlayerDisc(player);

            if (disc) {
                player.discId = disc.id;
                state.addDisc(disc);
            }
        }
    }
}

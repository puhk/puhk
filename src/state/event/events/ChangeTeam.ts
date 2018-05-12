import { Event } from 'state/event';
import State from 'state/State';
import Player from 'entities/Player';

export interface EventData {
    clientId: number;
    team: string;
}

export interface ApplyResult {
    player: Player;
}

export default class ChangeTeam implements Event {
    public constructor(public frame: number, public sender: number, public data: EventData) { }

    public apply(state: State): ApplyResult {
        const player = state.getPlayerById(this.data.clientId);

        if (!player) {
            return;
        }

        const currentDisc = state.getPlayerDisc(player);
        const team = state.stadium.getTeam(this.data.team);

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

        return { player };
    }
}

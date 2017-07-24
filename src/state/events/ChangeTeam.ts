import Player from '../../entities/Player';
import Event from '../Event';
import State from '../State';

export interface EventData {
    clientId: number,
    team: string
}

export default class ChangeTeam extends Event {
    data: EventData;
    type = 'ChangeTeam';
    player: Player;

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            return;
        }

        this.player = player;
        let currentDisc = state.getPlayerDisc(this.player);
        let team = state.stadium.getTeam(this.data.team);

        // check team exists if not specs
        if (this.data.team !== null && !state.stadium.getTeam(this.data.team)) {
            return;
        }

        // player already on team?
        if (this.player.team === this.data.team) {
            return;
        }

        this.player.team = this.data.team;

        if (currentDisc) {
            state.removeDisc(currentDisc);
            this.player.discId = null;
        }

        if (state.playing && this.data.team !== null) {
            let disc = state.createPlayerDisc(this.player);

            if (disc) {
                this.player.discId = disc.id;
                state.addDisc(disc);
            }
        }
    }

    static parse(sender: number, data: EventData) {
        return new ChangeTeam(sender, data);
    }
}

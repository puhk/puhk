import Event from './Event';
import Player from '../../entities/Player';

export default class ChangeTeam extends Event {
    type = 'ChangeTeam';

    apply(state, game) {
        let player = state.getPlayerById(this.data.clientId);
        let currentDisc = state.getPlayerDisc(player);
        let team = state.stadium.getTeam(this.data.team);

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
        }
        
        if (this.data.team === null) {
            player.discId = null;
            return;
        }

        let disc = game.createPlayerDisc(player);
        player.discId = disc.id;
        state.addDisc(disc);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new ChangeTeam(sender, data);
    }
}
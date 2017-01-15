// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';
import type Player from '../../entities/Player';

export default class ChangeTeam extends Event {
    type = 'ChangeTeam';
    player: Player;

    apply(state: State, game: Game) {
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
        }
        
        // moved to specs
        if (this.data.team === null) {
            this.player.discId = null;
        } else {
            let disc = game.createPlayerDisc(this.player);

            if (disc) {
                this.player.discId = disc.id;
                state.addDisc(disc);
            }
        }

        game.eventAggregator.publish(this);
    }

    getData() {
        return this.data;
    }

    static parse(sender: number, data: any) {
        return new ChangeTeam(sender, data);
    }
}

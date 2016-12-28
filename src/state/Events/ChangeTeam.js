// @flow

import Event from './Event';
import Player from '../../entities/Player';

import type State from '../State';
import type Game from '../../Game';

export default class ChangeTeam extends Event {
    type = 'ChangeTeam';

    apply(state: State, game: Game) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            return;
        }

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

        if (disc) {
            player.discId = disc.id;
            state.addDisc(disc);
        }
    }

    getData() {
        return this.data;
    }

    static parse(sender: number, data: any) {
        return new ChangeTeam(sender, data);
    }
}
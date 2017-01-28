// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';
import type Player from '../../entities/Player';

export default class ChangeTeam extends Event {
    data: EventData;
    type = 'ChangeTeam';
    player: Player;

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

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
            this.player.discId = null;
        }

        if (state.playing && this.data.team !== null) {
            let disc = game.createPlayerDisc(this.player);

            if (disc) {
                this.player.discId = disc.id;
                state.addDisc(disc);
            }
        }

        game.eventAggregator.publish(this);
    }

    static parse(sender: number, data: EventData) {
        return new ChangeTeam(sender, data);
    }
}

type EventData = {
    clientId: number,
    team: ?string
};

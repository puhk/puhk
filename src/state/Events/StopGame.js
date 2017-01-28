// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

export default class StopGame extends Event {
    type = 'StopGame';

    apply(state: State, game: Game) {
        if (!state.playing) {
            return;
        }

        state.playing = false;

        for (let player of state.players) {
            let disc = state.getPlayerDisc(player);

            if (disc) {
                state.removeDisc(disc);
            }
        }

        game.eventAggregator.publish(this);
    }

    static parse(sender: number) {
        return new StopGame(sender);
    }
}

// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';

export default class StopGame extends Event {
    type = 'StopGame';

    apply(state: State, game: Game) {
        if (!state.playing) {
            return;
        }

        if (game.renderer) {
            game.renderer.remove();
        }

        state.playing = false;

        state.players.filter(player => player.team)
            .forEach(player => {
                let disc = state.getPlayerDisc(player);

                if (disc) {
                    state.removeDisc(disc);
                }
            });

        game.eventAggregator.publish(this);
    }
}
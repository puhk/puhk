// @flow

import Event from './Event';

import type State from '../State';
import type Game from '../../Game';

export default class StartGame extends Event {
    type = 'StartGame';

    apply(state: State, game: Game) {
        if (state.playing) {
            return;
        }

        game.initRenderer();
        game.createPlayerDiscs(state);
        game.kickOffState(state);
        state.playing = true;

        game.eventAggregator.publish(this);
    }
}
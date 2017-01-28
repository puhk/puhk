// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

export default class StartGame extends Event {
    type = 'StartGame';

    apply(state: State, game: Game) {
        if (state.playing) {
            return;
        }

        state.initScores();
        state.playing = true;
        state.timer = 0;

        game.initRenderer();
        game.createPlayerDiscs(state);
        game.kickOffState(state);

        game.eventAggregator.publish(this);
    }

    static parse(sender: number) {
        return new StartGame(sender);
    }
}

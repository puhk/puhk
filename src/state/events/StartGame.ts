import Game from '../../Game';
import Event from '../Event';
import State from '../State';

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

        game.getEventApi().publish(this);
    }

    static parse(sender: number) {
        return new StartGame(sender);
    }
}

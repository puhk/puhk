import Game from 'src/Game';
import Event from '../Event';
import State from '../State';

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

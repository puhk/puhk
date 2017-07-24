import Event from '../Event';
import State from '../State';

export default class StopGame extends Event {
    type = 'StopGame';

    apply(state: State) {
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
    }

    static parse(sender: number) {
        return new StopGame(sender);
    }
}

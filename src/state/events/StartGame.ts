import Event from '../Event';
import State from '../State';

export default class StartGame extends Event {
    type = 'StartGame';

    apply(state: State) {
        if (state.playing) {
            return;
        }

        state.initScores();
        state.playing = true;
        state.timer = 0;

        state.createPlayerDiscs();
        state.kickOffState();
    }

    static parse(frame: number, sender: number) {
        return new StartGame(frame, sender);
    }
}

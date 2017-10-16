import Event from '../Event';
import State from '../State';

export default class StartGame extends Event {
    type = 'StartGame';

    apply(state: State) {
        state.startPlaying();
    }

    static parse(frame: number, sender: number) {
        return new StartGame(frame, sender);
    }
}

import { Event } from '../Event';
import State from '../State';

export default class StartGame implements Event {
    public constructor(public frame: number, public sender?: number) { }

    public apply(state: State) {
        state.startPlaying();
    }
}

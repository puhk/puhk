import { Event } from 'state/event';
import State from 'state/State';

export default class StartGame implements Event {
    public constructor(public frame: number, public sender?: number) {}

    public apply(state: State) {
        state.startPlaying();
    }
}

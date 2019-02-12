import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';

export default class ChangeScoreLimit implements Event {
    public constructor(
        public frame: number,
        public sender: number,
        public data: { limit: number }
    ) {}

    public apply(state: State) {
        return update(state, {
            scoreLimit: { $set: this.data.limit }
        });
    }
}

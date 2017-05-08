import Game from 'src/Game';
import Event from '../Event';
import State from '../State';

export interface EventData {
    limit: number
}

export default class ChangeScoreLimit extends Event {
    data: EventData;
    type = 'ChangeScoreLimit';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        state.scoreLimit = this.data.limit;
        game.eventAggregator.publish(this);
    }

    static parse(sender: number, data: EventData) {
        return new ChangeScoreLimit(sender, data);
    }
}

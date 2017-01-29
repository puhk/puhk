// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

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

    static parse(sender, data: EventData) {
        return new ChangeScoreLimit(sender, data);
    }
}

type EventData = {
    limit: number
};

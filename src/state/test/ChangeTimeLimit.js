// @flow

import Event from '../Event';

import type State from '../State';
import type Game from '../../Game';

export default class ChangeTimeLimit extends Event {
    data: EventData;
    type = 'ChangeTimeLimit';

    constructor(sender: number, data: EventData) {
        super(sender);
        this.data = data;
    }

    apply(state: State, game: Game) {
        state.timeLimit = this.data.limit;
        game.eventAggregator.publish(this);
    }

    static parse(sender, data: EventData) {
        return new ChangeTimeLimit(sender, data);
    }
}

type EventData = {
    limit: number
};

// @flow

import type State from './State';
import type Game from '../Game';
import type {eventMsg} from '../network/Base';

export default class Event {
    data: any = null;
    sender: number;
    type: string;
    frame: number;

    constructor(sender: number) {
        this.sender = sender;
    }

    apply(state: State, game: Game) {

    }

    pack(): JsonEvent {
        return {
            eventType: this.type,
            frame: this.frame,
            sender: this.sender,
            data: this.getData()
        };
    }

    getData() {
        return this.data;
    }

    toMessage(): eventMsg {
        return {
            type: 'event',
            event: this.pack()
        };
    }
}

export type JsonEvent = {
    eventType: string,
    frame: number,
    sender: number,
    data: any
};

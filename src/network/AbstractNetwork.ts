import { JsonEvent } from '../state/Event';
import { JsonState } from '../state/State';

export interface Config {
    host: string;
    path: string;
}

export interface Message {
    type: string;
}

export interface SyncMsg extends Message {
    state: JsonState;
}

export interface InitMsg extends Message {
    id: number;
    state: JsonState;
}

export interface EventMsg extends Message {
    event: JsonEvent;
}

export abstract class AbstractNetwork {
    public peer: any;

    public disconnect() {
        this.peer.destroy();
    }

    public isDisconnected() {
        return this.peer.destroyed;
    }

    public abstract sendMsg(msg: Message): void;
}

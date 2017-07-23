import { JsonEvent } from '../state/Event';
import { JsonState } from '../state/State';

export interface Message {
    type: string;
}

export interface SyncMsg extends Message {
    type: 'sync',
    state: JsonState;
}

export interface InitMsg extends Message {
    type: 'init',
    id: number;
    state: JsonState;
}

export interface EventMsg extends Message {
    type: 'event',
    event: JsonEvent;
}

export interface NetworkInterface {
    send(msg: Message): void;
    disconnect(): void;
    isDisconnected(): boolean;
}

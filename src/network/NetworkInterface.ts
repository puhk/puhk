import { JsonEvent } from '@src/state/event';
import { JsonState } from '@src/state/State';

export enum MessageType {
    Sync = 'sync',
    Init = 'init',
    Event = 'event',
    Ping = 'ping',
    Pong = 'pong',
}

export interface SyncMsg {
    type: MessageType.Sync;
    state: JsonState;
}

export interface InitMsg {
    type: MessageType.Init;
    id: number;
    state: JsonState;
    events: JsonEvent[];
}

export interface EventMsg {
    type: MessageType.Event;
    event: JsonEvent;
}

export interface PingMsg {
    type: MessageType.Ping;
    frame: number;
}

export interface PongMsg {
    type: MessageType.Pong;
    clientFrame: number;
    hostFrame: number;
}

export type Message =
    SyncMsg |
    InitMsg |
    EventMsg |
    PingMsg |
    PongMsg;

export interface NetworkInterface {
    send(msg: Message): void;
    disconnect(): void;
    isDisconnected(): boolean;
}

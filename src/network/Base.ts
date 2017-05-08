import { JsonEvent } from 'src/state/Event';
import { JsonState } from 'src/state/State';

export interface Config {
    host: string,
    path: string
}

export interface syncMsg {
    type: string,
    state: JsonState
}

export interface initMsg {
    type: string,
    id: number,
    state: JsonState
}

export interface eventMsg {
    type: string,
    event: JsonEvent
}

export type messages =
    | syncMsg
    | initMsg
    | eventMsg;

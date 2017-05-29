import { JsonEvent } from '../state/Event';
import { JsonState } from '../state/State';

export class Base {}

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

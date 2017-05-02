// @flow

import type {JsonEvent} from '../state/Event';
import type {JsonState} from '../state/State';

export default class Base {}

export type Config = {
    host: string,
    path: string
};

export type syncMsg = {
    type: string,
    state: JsonState
};

export type initMsg = {
    type: string,
    id: number,
    state: JsonState
};

export type eventMsg = {
    type: string,
    event: JsonEvent
};

export type messages =
    | syncMsg
    | initMsg
    | eventMsg;

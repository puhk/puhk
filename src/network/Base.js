// @flow

import type {JsonState} from '../state/State';
import type {JsonEvent} from '../state/events/Event';

export default class Base {}

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
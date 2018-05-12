import { Event, JsonEvent } from 'state/event';
import pack from 'state/event/pack';
import { EventMsg } from 'network/NetworkInterface';

export default function toMessage(event: Event): EventMsg {
    return {
        type: 'event',
        event: pack(event)
    };
}

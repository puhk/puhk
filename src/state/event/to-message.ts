import { EventMsg } from '@src/network/NetworkInterface';
import { Event } from '@src/state/event';
import pack from '@src/state/event/pack';

export default function toMessage(event: Event): EventMsg {
    return {
        type: 'event',
        event: pack(event)
    };
}

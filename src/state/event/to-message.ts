import { Event } from '../Event';
import pack from './pack';

export default function toMessage(event: Event) {
    return {
        type: 'event',
        event: pack(event)
    };
}

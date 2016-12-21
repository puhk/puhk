export default class Event {
    constructor(sender, data) {
        this.sender = sender;
        this.data = data;
    }

    pack() {
        return {
            type: 'event',
            eventType: this.type,
            frame: this.frame,
            sender: this.sender,
            data: this.getData()
        };
    }
}
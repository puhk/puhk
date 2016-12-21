import Event from './Event';

export default class Keypress extends Event {
    type = 'Keypress';

    apply(state) {
        let player = state.players.find(player => player.clientId == this.data.clientId);
        player.keys[this.data.key] = this.data.state;
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new Keypress(sender, data);
    }
}
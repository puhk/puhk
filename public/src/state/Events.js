import _ from 'lodash';
import Player from '../entities/Player';

class Event {
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

export class ClientAddedEvent extends Event {
    type = 'ClientAdded';

    apply(state, game) {
        let player = game.createPlayer(this.data.clientId, this.data.nick, state.stadium.teams[1]);
        state.addPlayers(player);

        let disc = game.createPlayerDisc(player);
        player.discId = disc.id;
        state.addDiscs(disc);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new ClientAddedEvent(sender, data);
    }
}

export class KeypressEvent extends Event {
    type = 'Keypress';

    apply(state) {
        let player = _.find(state.players, {clientId: this.data.clientId});
        player.keys[this.data.key] = this.data.state;
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new KeypressEvent(sender, data);
    }
}

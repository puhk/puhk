import _ from 'lodash';

class Event {
    constructor(data) {
        this.data = data;
    }

    format() {
        return {
            type: 'event',
            eventType: this.type,
            frame: this.frame,
            data: this.data,
            clientId: this.data.clientId
        };
    }
}

export class ClientAddedEvent extends Event {
    type = 'ClientAdded';

    apply(state, game) {
        let player = game.createPlayer(this.data.nick, this.data.id);
        state.addPlayers(player);

        let disc = game.createPlayerDisc(player);
        state.addDiscs(disc);
    }
}

export class KeypressEvent extends Event {
    type = 'Keypress';

    apply(state) {
        let player = _.find(state.players, {clientId: this.data.clientId});
        player.keys[this.data.key] = this.data.state;
    }
}

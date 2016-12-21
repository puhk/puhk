import Event from './Event';

export default class ClientAdded extends Event {
    type = 'ClientAdded';

    apply(state, game) {
        let player = game.createPlayer(this.data.clientId, this.data.nick, state.stadium.teams[1]);
        state.addPlayers(player);

        let disc = game.createPlayerDisc(player);
        player.discId = disc.id;
        state.addDisc(disc);
    }

    getData() {
        return this.data;
    }

    static parse(sender, data) {
        return new ClientAdded(sender, data);
    }
}
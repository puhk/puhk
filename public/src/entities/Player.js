import _ from 'lodash';

export default class Player {
    discId = null;
    keys = {};
    
    constructor(clientId, nick, team) {
        this.clientId = clientId;
        this.nick = nick;
        this.team = team;
    }

    clone() {
        let player = new Player(this.clientId, this.nick, this.team);
        player.discId = this.discId;
        player.keys = _.clone(this.keys);
        return player;
    }

    pack() {
        return {
            clientId: this.clientId,
            nick: this.nick,
            team: this.team,
            keys: this.keys,
            discId: this.discId
        };
    }

    static parse(obj) {
        let player = new Player(obj.clientId, obj.nick, obj.team);
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}
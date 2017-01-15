// @flow

import _ from 'lodash';

import type {keys} from '../Keyboard';

export default class Player {
    clientId: number;
    nick: string;
    team: ?string;
    discId: ?number;
    keys: keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };
    
    constructor(clientId: number, nick: string) {
        this.clientId = clientId;
        this.nick = nick;
    }

    clone() {
        let player = new Player(this.clientId, this.nick);
        player.discId = this.discId;
        player.keys = _.clone(this.keys);
        player.team = this.team;
        return player;
    }

    pack(): JsonPlayer {
        return {
            clientId: this.clientId,
            nick: this.nick,
            team: this.team,
            keys: this.keys,
            discId: this.discId
        };
    }

    static parse(obj: JsonPlayer) {
        let player = new Player(obj.clientId, obj.nick, obj.team);
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}

export type JsonPlayer = {
    clientId: number,
    nick: string,
    team: ?string,
    discId: ?number,
    keys: keys
};

// @flow

import _ from 'lodash';

import type {keys} from '../Keyboard';

export default class Player {
    clientId: number;
    nick: string;
    team: string;
    discId: ?number;
    keys: keys;
    
    constructor(clientId: number, nick: string, team: string) {
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
    team: string,
    discId: ?number,
    keys: keys
};
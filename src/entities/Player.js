// @flow

import type {keys} from '../Keyboard';

export default class Player {
    clientId: number;
    name: string;
    avatar: string;
    team: ?string;
    discId: ?number;
    keys: keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    constructor(clientId: number, name: string) {
        this.clientId = clientId;
        this.name = name;
    }

    setAvatar(avatar: any) {
        this.avatar = (avatar + '').substr(0, 2);
    }

    clone() {
        let player = new Player(this.clientId, this.name);
        player.avatar = this.avatar;
        player.discId = this.discId;
        player.keys = Object.assign({}, this.keys);
        player.team = this.team;
        return player;
    }

    pack(): JsonPlayer {
        return {
            clientId: this.clientId,
            name: this.name,
            avatar: this.avatar,
            team: this.team,
            keys: this.keys,
            discId: this.discId
        };
    }

    static parse(obj: JsonPlayer) {
        let player = new Player(obj.clientId, obj.name, obj.team);
        player.setAvatar(obj.avatar);
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}

export type JsonPlayer = {
    clientId: number,
    name: string,
    avatar: string,
    team: ?string,
    discId: ?number,
    keys: keys
};

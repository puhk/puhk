import { Keys } from 'src/Keyboard';

export interface JsonPlayer {
    clientId: number,
    name: string,
    admin: boolean,
    avatar: string,
    team: string,
    discId: number,
    keys: Keys
}

export default class Player {
    clientId: number;
    name = '';
    admin = false;
    avatar = '';
    team: string;
    discId: number;
    keys: Keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    constructor(clientId: number, name: string) {
        this.clientId = clientId;
        this.name = name;

        if (this.clientId == -1) {
            this.admin = true;
        }
    }

    public setAvatar(avatar: any) {
        this.avatar = (avatar + '').substr(0, 2);
    }

    public clone() {
        let player = new Player(this.clientId, this.name);
        player.admin = this.admin;
        player.avatar = this.avatar;
        player.discId = this.discId;
        player.keys = Object.assign({}, this.keys);
        player.team = this.team;
        return player;
    }

    public pack(): JsonPlayer {
        return {
            clientId: this.clientId,
            name: this.name,
            admin: this.admin,
            avatar: this.avatar,
            team: this.team,
            keys: this.keys,
            discId: this.discId
        };
    }

    public static parse(obj: JsonPlayer) {
        let player = new Player(obj.clientId, obj.name);
        player.admin = obj.admin;
        player.setAvatar(obj.avatar);
        player.team = obj.team;
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}

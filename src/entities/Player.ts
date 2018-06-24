import { Keys } from '../Keyboard';

export interface JsonPlayer {
    clientId: number;
    name: string;
    admin: boolean;
    avatar: string | number;
    team: string;
    discId: number | null;
    keys: Keys;
}

export default class Player {
    public admin = false;
    public avatar = '';
    public team = '';
    public discId: number | null = null;
    public keys: Keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    public constructor(public clientId: number, public name: string) {
        if (this.clientId == -1) {
            this.admin = true;
        }
    }

    public setAvatar(avatar: string | number) {
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
        const player = new Player(obj.clientId, obj.name);
        player.admin = obj.admin;
        player.setAvatar(obj.avatar);
        player.team = obj.team;
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}

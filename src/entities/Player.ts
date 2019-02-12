import { Keys, KeyState } from '../Keyboard';

export interface JsonPlayer {
    clientId: number;
    name: string;
    admin: boolean;
    avatar: string | number;
    team: string | null;
    discId: number | null;
    keys: KeyState;
}

export default class Player {
    public admin = false;
    public avatar = '';
    public team: string | null = null;
    public discId: number | null = null;
    public keys: KeyState = {
        [Keys.up]: false,
        [Keys.down]: false,
        [Keys.left]: false,
        [Keys.right]: false,
        [Keys.kick]: false,
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

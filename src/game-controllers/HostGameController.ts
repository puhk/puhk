import { autobind } from 'core-decorators';
import { NetworkGameController, PlayerInfo } from './NetworkGameController';
import { Message, EventMsg, InitMsg } from '../network/NetworkInterface';
import NetworkHost from '../network/p2p/NetworkHost';
import * as Events from '../state/events';

export default class HostGameController extends NetworkGameController {
    private nextSync: number = null;
    private msgHandlers = { 'event': this.msgEvent };
    private static syncInterval = 1000 / 10;
    protected network: NetworkHost;

    public hostGame(player: PlayerInfo): Promise<HostGameController> {
        this.network.on('client:joined', this.clientJoined);
        this.network.on('client:msg', this.handleMsg);

        if (this.network.isOpen) {
            return Promise.resolve(this);
        }

        return new Promise((resolve, reject) => {
            this.network.on('open', () => {
                this.createLocalPlayer(player);
                this.init();
                resolve(this);
            });
        });
    }

    @autobind
    protected clientJoined(id: number) {
        const event = new Events.PlayerJoined(this.me.id, {
            clientId: id,
            name: 'sock',
            avatar: ':)'
        });

        this.simulator.addEvent(event);
        this.network.broadcast(event.toMessage(), id);

        this.network.sendToClient(id, <InitMsg>{
            type: 'init',
            state: this.simulator.currentState.pack(),
            id
        });
    }

    @autobind
    protected handleMsg(client: number, msg: Message) {
        if (!this.msgHandlers[msg.type] || typeof this.msgHandlers[msg.type] !== 'function') {
            throw new Error(`Invalid msg type recieved: ${msg.type}`);
        }

        this.msgHandlers[msg.type](client, msg);
    }

    @autobind
    protected msgEvent(client: number, msg: EventMsg) {
        const event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        // ensure client can't control other players :D
        if (event instanceof Events.Keypress) {
            event.data.clientId = client;
        }

        event.frame = Math.max(event.frame, this.simulator.currentFrame);
        this.addEvent(event, event.frame, false);
        this.network.broadcast(event.toMessage(), client);
    }

    public createLocalPlayer(playerInfo: PlayerInfo) {
        if (this.inited) {
            throw new Error('Game already init');
        }

        this.setMe({
            id: -1,
            ...playerInfo
        });

        const event = new Events.PlayerJoined(this.me.id, {
            clientId: this.me.id,
            name: this.me.name,
            avatar: this.me.avatar
        });

        this.addEvent(event, null, false);
    }

    /* private sendSync() {
        if (!this.game.state.playing) {
            return;
        }

        this.sendMsg(<SyncMsg>{
            type: 'sync',
            state: this.simulator.currentState.pack()
        });
    } */
}

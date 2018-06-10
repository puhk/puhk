import { autobind } from 'core-decorators';

import { NetworkController, PlayerInfo } from '@src/controller/NetworkController';
import { MessageType, EventMsg, InitMsg, SyncMsg, PingMsg, PongMsg } from '@src/network/NetworkInterface';
import NetworkHost from '@src/network/p2p/NetworkHost';
import State from '@src/state/State';
import * as Events from '@src/state/event/events';
import parseEvent from '@src/state/event/parse-event';
import packEvent from '@src/state/event/pack';
import toMessage from '@src/state/event/to-message';

export default class HostGameController extends NetworkController {
    private syncFrequency = 100;

    protected network!: NetworkHost;

    public hostGame(player: PlayerInfo): Promise<HostGameController> {
        this.network.on('client:joined', this.clientJoined);
        this.network.on(`client:msg:${MessageType.Event}`, this.handleEventMsg);
        this.network.on(`client:msg:${MessageType.Ping}`, this.handlePingMsg);

        setInterval(this.sendSync, this.syncFrequency);

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
    private clientJoined(id: number) {
        const event = new Events.PlayerJoined(this.simulator.concreteState.frame, this.me.id, {
            clientId: id,
            name: 'sock',
            avatar: ':)'
        });

        this.simulator.addEvent(event);
        this.network.broadcast(toMessage(event), id);

        this.network.sendToClient(id, {
            type: MessageType.Init,
            state: this.simulator.concreteState.pack(),
            events: this.simulator.events.map(event => packEvent(event)),
            id
        });
    }

    @autobind
    protected handleEventMsg(client: number, msg: EventMsg) {
        const event = parseEvent(msg.event);

        // ensure client can't control other players :D
        if (event instanceof Events.Keypress) {
            event.data.clientId = client;
        }

        event.frame = Math.max(event.frame, this.simulator.concreteState.frame);
        this.addEvent(event, false);
        this.network.broadcast(toMessage(event), client);
    }

    @autobind
    private handlePingMsg(client: number, msg: PingMsg) {
        this.network.sendToClient(client, {
            type: MessageType.Pong,
            clientFrame: msg.frame,
            hostFrame: this.simulator.concreteState.frame
        });
    }

    private createLocalPlayer(playerInfo: PlayerInfo) {
        if (this.inited) {
            throw new Error('Game already init');
        }

        this.setMe({
            id: -1,
            ...playerInfo
        });

        const event = new Events.PlayerJoined(this.simulator.concreteState.frame, this.me.id, {
            clientId: this.me.id,
            name: this.me.name,
            avatar: this.me.avatar
        });

        this.addEvent(event, false);
    }

    @autobind
    private sendSync() {
        this.network.send({
            type: MessageType.Sync,
            state: this.simulator.concreteState.pack()
        });
    }

    protected getCurrentState(): State {
        return this.simulator.concreteState;
    }
}

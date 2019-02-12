import { autobind } from 'core-decorators';
import maxBy from 'lodash/maxBy';

import { NetworkController, PlayerInfo } from './NetworkController';
import { InitMsg, EventMsg, SyncMsg, PongMsg, MessageType } from '../network/NetworkInterface';
import NetworkClient from '../network/p2p/NetworkClient';
import Disc from '../entities/Disc';
import State, { parse } from '../state/State';
import { Event } from '../state/event';
import parseEvent from '../state/event/parse-event';
import toMessage from '../state/event/to-message';
import { getPlayerById, getPlayerDisc } from '../state/funcs/player';

export default class ClientController extends NetworkController {
    private currentState!: State;
    private framesSinceLastSync = 0;
    private pings: number[] = [];
    private pingInterval: number = 0;
    private pingFrequency = 500;
    private frameSamples: number[] = [];
    private maxFrameSamples = 10;
    protected network!: NetworkClient;

    public join(roomId: string, player: PlayerInfo) {
        this.network.on(`host:msg:${MessageType.Init}`, this.handleInitMsg);
        this.network.on(`host:msg:${MessageType.Event}`, this.handleEventMsg);
        this.network.on(`host:msg:${MessageType.Sync}`, this.handleSyncMsg);
        this.network.on(`host:msg:${MessageType.Pong}`, this.handlePongMsg);

        this.network.on('host:disconnect', () => {
            window.clearInterval(this.pingInterval);
        });

        const createInterval = () => {
            this.pingInterval = window.setInterval(this.sendPingMsg, this.pingFrequency);
        };

        return this.network.connectTo(roomId)
            .then(createInterval)
            .then(() => this);
    }

    public addEvent(event: Event, send: boolean = true) {
        if (event.shouldPredict) {
            this.simulator.addEvent(event);
        }

        if (send) {
            this.network.send(toMessage(event));
        }
    }

    @autobind
    private handleInitMsg(msg: InitMsg) {
        const state = parse(msg.state);
        this.simulator.makeConcrete(state);
        this.simulator.events = msg.events.map(parseEvent);
        this.currentState = state;

        const lastDisc = maxBy(state.discs, 'id');

        if (lastDisc) {
            Disc.nextDiscId = lastDisc.id + 1;
        }

        const newState = this.simulator.advance();
        const player = getPlayerById(newState, msg.id)!;
        const myDisc = getPlayerDisc(newState, player);

        if (myDisc) {
            myDisc.hasOutline = true;
        }

        this.setMe({
            id: player.clientId,
            name: player.name,
            avatar: player.avatar
        });

        this.init();
    }

    @autobind
    private handleEventMsg(msg: EventMsg) {
        if (msg.event.frame >= this.simulator.concreteState.frame) {
            const event = parseEvent(msg.event);
            this.simulator.addEvent(event);
        }
    }

    @autobind
    private handleSyncMsg(msg: SyncMsg) {
        // if sync state is earlier than the last synced state, we can ignore it
        if (msg.state.frame <= this.simulator.concreteState.frame) {
            console.log('frame earlier than last sync');
            return;
        }

        const syncState = parse(msg.state);
        this.simulator.makeConcrete(syncState);
        this.currentState = syncState;
        this.framesSinceLastSync = 0;
    }

    @autobind
    private sendPingMsg() {
        this.currentState && this.network.send({
            type: MessageType.Ping,
            frame: this.currentState.frame
        });
    }

    @autobind
    private handlePongMsg(msg: PongMsg) {
        this.frameSamples.push(msg.hostFrame - msg.clientFrame);

        if (this.frameSamples.length > this.maxFrameSamples) {
            this.frameSamples.shift();
        }
    }

    protected advance() {
        if (!this.inited || !this.currentState) {
            return;
        }

        const estimatedHostFrame = this.simulator.concreteState.frame + this.framesSinceLastSync;
        const frameLead = percentile(this.frameSamples.slice().sort(), 0.9);
        const targetFrame = Math.min(estimatedHostFrame + frameLead + 1, this.simulator.concreteState.frame + 300);

        this.currentState = this.simulator.simulate(targetFrame, this.currentState);
        ++this.framesSinceLastSync;
    }

    public getCurrentState() {
        return this.currentState;
    }
}

// https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2
function percentile(arr: number[], p: number) {
    if (arr.length === 0) {
        return 0;
    }

    if (p <= 0) {
        return arr[0];
    }

    if (p >= 1) {
        return arr[arr.length - 1];
    }

    const index = (arr.length - 1) * p;
    const lower = Math.floor(index);
    const upper = lower + 1;
    const weight = index % 1;

    if (upper >= arr.length) {
        return arr[lower];
    }

    return arr[lower] * (1 - weight) + arr[upper] * weight;
}

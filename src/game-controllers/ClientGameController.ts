import { autobind } from 'core-decorators';
import _ from 'lodash';

import { NetworkGameController, PlayerInfo } from './NetworkGameController';
import { Message, InitMsg, EventMsg, SyncMsg } from '../network/NetworkInterface';
import NetworkClient from '../network/p2p/NetworkClient';
import Disc from '../entities/Disc';
import State from '../state/State';
import * as Events from '../state/Events';

export default class ClientGameController extends NetworkGameController {
    private lastSyncFrame = 0;
    protected network: NetworkClient;

    private msgHandlers = {
        'init': this.handleInitMsg,
        'event': this.handleEventMsg,
        'sync': this.handleSyncMsg
    };

    public init() {
        this.network.on('host:msg', this.handleMsg);
    }

    public join(roomId: string, player: PlayerInfo) {
        return this.network.connectTo(roomId)
            .then(() => this);
    }

    @autobind
    private handleMsg(msg: Message) {
        if (!this.msgHandlers[msg.type] || typeof this.msgHandlers[msg.type] !== 'function') {
            throw new Error(`Invalid msg type recieved: ${msg.type}`);
        }

        this.msgHandlers[msg.type](msg);
    }

    @autobind
    private handleInitMsg(msg: InitMsg) {
        const state = State.parse(msg.state);

        Disc.nextDiscId = _.maxBy(state.discs, disc => disc.id).id + 1;

        this.simulator.resetState(state);
        const newState = this.simulator.advance(this.game);

        const player = newState.getPlayerById(msg.id);
        const myDisc = newState.getPlayerDisc(player);

        if (myDisc) {
            myDisc.isMe = true;
        }

        this.setMe({
            id: player.clientId,
            name: player.name,
            avatar: player.avatar
        })

        this.init();
    }

    @autobind
    private handleEventMsg(msg: EventMsg) {
        const event = Events[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event.frame >= this.simulator.currentFrame) {
            this.simulator.addEvent(event, event.frame);
        } else if (this.simulator.hasFrameInHistory(event.frame)) {
            const currentFrame = this.simulator.currentFrame;

            this.simulator.rewind(event.frame);
            this.simulator.addEvent(event);
            this.simulator.fastForward(currentFrame, this.game);
        }
    }

    @autobind
    handleSyncMsg(msg: SyncMsg) {
        const currentFrame = this.simulator.currentFrame;

        // if sync state is earlier than the last synced state, we can ignore it
        if (msg.state.frame <= this.lastSyncFrame) {
            console.log('frame earlier than last sync');
            return;
        }

        // if sync state is before the current state we need to check if we have the states
        // after it so we can simulate forward again (ie oldest state should at least be the one after)
        if (msg.state.frame < currentFrame && this.simulator.oldestFrame > msg.state.frame + 1) {
            console.log('sync frame too far behind', currentFrame, msg.state.frame);
            return;
        }

        const predictedState = this.simulator.findStateFromFrame(msg.state.frame);

        /*if (predictedState) {
            msg.state.events = msg.state.events.concat(predictedState.events.map(event => event.pack()));
        }*/

        const syncState = State.parse(msg.state);
        this.simulator.resetState(syncState);
        this.lastSyncFrame = msg.state.frame;

        if (currentFrame > msg.state.frame) {
            this.simulator.fastForward(currentFrame, this.game);
        }
    }

    protected advance() {
        this.simulator.advance(this.game);
    }
}

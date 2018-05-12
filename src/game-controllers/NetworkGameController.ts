import GameController from './GameController';
import Keyboard from '../Keyboard';
import Renderer from '../Renderer';
import { NetworkInterface } from '../network/NetworkInterface';
import { Event } from '../state/Event';
import { Keypress, StartGame, StopGame } from '../state/event/events';
import Simulator from '../state/Simulator';
import toMessage from '../state/event/to-message';

export interface PlayerInfo {
    name: string,
    avatar: string | number
}

export interface LocalPlayerInfo extends PlayerInfo {
    id: number
}

export abstract class NetworkGameController extends GameController {
    protected me: LocalPlayerInfo = {
        id: -1,
        name: '',
        avatar: ''
    };

    public constructor(
        protected simulator: Simulator,
        protected network: NetworkInterface,
        protected keyboard: Keyboard,
        protected renderer?: Renderer
    ) {
        super(simulator, renderer);
    }

    public initKeyboard(element: HTMLElement) {
        this.keyboard
            .bindTo(element)
            .setCallback((key, state) => {
                const event = new Keypress(this.getCurrentState().frame, this.me.id, { clientId: this.me.id, key, state });
                this.addEvent(event);
            });
    }

    public destroy() {
        super.destroy();
        this.network.disconnect();
    }

    public addEvent(event: Event, send: boolean = true) {
        this.simulator.addEvent(event);

        if (send) {
            this.network.send(toMessage(event));
        }
    }

    public start() {
        const event = new StartGame(this.getCurrentState().frame, this.me.id);
        this.addEvent(event);
    }

    public stop() {
        const event = new StopGame(this.getCurrentState().frame, this.me.id);
        this.addEvent(event);
    }

    public getMe() {
        return this.me;
    }

    public setMe(me: LocalPlayerInfo) {
        this.me = me;
    }
}

import GameController from './GameController';
import Keyboard from '../Keyboard';
import Renderer from '../Renderer';
import { NetworkInterface } from '../network/NetworkInterface';
import Event from '../state/Event';
import { Keypress, StartGame, StopGame } from '../state/events';
import Simulator from '../state/Simulator';

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
                const event = new Keypress(this.me.id, { clientId: this.me.id, key, state });
                this.addEvent(event);
            });
    }

    public destroy() {
        super.destroy();
        this.network.disconnect();
    }

    public addEvent(event: Event, frame?: number, send: boolean = true) {
        this.simulator.addEvent(event, frame);

        if (send) {
            this.network.send(event.toMessage());
        }
    }

    public start() {
        this.addEvent(new StartGame(this.me.id));
    }

    public stop() {
        this.addEvent(new StopGame(this.me.id));
    }

    public getMe() {
        return this.me;
    }

    public setMe(me: LocalPlayerInfo) {
        this.me = me;
    }
}

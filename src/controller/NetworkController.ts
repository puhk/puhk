import Controller from './Controller';
import Keyboard from '../Keyboard';
import Renderer from '../Renderer';
import { NetworkInterface } from '../network/NetworkInterface';
import Simulator from '../state/Simulator';
import { Event } from '../state/event';
import { Keypress, StartGame, StopGame } from '../state/event/events';
import toMessage from '../state/event/to-message';

export interface PlayerInfo {
    name: string;
    avatar: string | number;
}

export interface LocalPlayerInfo extends PlayerInfo {
    id: number;
}

export abstract class NetworkController extends Controller {
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
                const currentState = this.getCurrentState();

                if (currentState) {
                    const event = new Keypress(currentState.frame, this.me.id, { clientId: this.me.id, key, state });
                    this.addEvent(event);
                }
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
        const state = this.getCurrentState();

        if (state) {
            const event = new StartGame(state.frame, this.me.id);
            this.addEvent(event);
        }
    }

    public stop() {
        const state = this.getCurrentState();

        if (state) {
            const event = new StopGame(state.frame, this.me.id);
            this.addEvent(event);
        }
    }

    public getMe() {
        return this.me;
    }

    public setMe(me: LocalPlayerInfo) {
        this.me = me;
    }
}

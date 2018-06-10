import { autobind } from 'core-decorators';

export interface Keys {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    kick: boolean;
}

export type callback = (key: keyof Keys, state: boolean) => void;

const keyCodes = new Map<number, keyof Keys>([
    [37, 'left'],
    [38, 'up'],
    [39, 'right'],
    [40, 'down'],
    [32, 'kick'],
    [88, 'kick']
]);

export default class Keyboard {
    private element?: HTMLElement | null;
    private callback?: callback;

    private keyDown: Keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    public setCallback(callback: callback) {
        this.callback = callback;
        return this;
    }

    public bindTo(element: HTMLElement) {
        if (this.element) {
            this.unBind();
        }

        this.element = element;
        element.addEventListener('keydown', this.keyDownHandler);
        element.addEventListener('keyup', this.keyUpHandler);
        return this;
    }

    public unBind() {
       if (!this.element) {
            return;
        }

        this.element.removeEventListener('keydown', this.keyDownHandler);
        this.element.removeEventListener('keyup', this.keyUpHandler);
        this.element = null;
    }

    private setKey(e: KeyboardEvent, state: boolean) {
        const key = keyCodes.get(e.keyCode);

        if (!key) {
            return;
        }

        e.preventDefault();

        if (this.keyDown[key] === state) {
            return;
        }

        this.keyDown[key] = state;

        if (this.callback) {
            this.callback(key, state);
        }
    }

    @autobind
    private keyDownHandler(e: KeyboardEvent) {
        this.setKey(e, true);
    }

    @autobind
    protected keyUpHandler(e: KeyboardEvent) {
        this.setKey(e, false);
    }

    public isDown(key: keyof Keys): boolean {
        return this.keyDown[key];
    }

    public isUp(key: keyof Keys): boolean {
        return !this.isDown(key);
    }
}

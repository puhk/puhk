import { autobind } from 'core-decorators';

const keyCodes = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'kick',
    88: 'kick'
};

export interface Keys {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    kick: boolean
}

export type callback = (key: keyof Keys, state: boolean) => void;

export default class Keyboard {
    private element: HTMLElement;
    private callback: callback;

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
        if (!keyCodes[e.keyCode]) {
            return;
        }

        let key = this.codeToKey(e.keyCode);
        e.preventDefault();

        if (typeof this.keyDown[key] != 'undefined' && this.keyDown[key] !== state) {
            this.keyDown[key] = state;
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

    private codeToKey(code: number): keyof Keys {
        return keyCodes[code];
    }

    public isDown(key: keyof Keys): boolean {
        return this.keyDown[key];
    }

    public isUp(key: keyof Keys): boolean {
        return !this.isDown(key);
    }
}

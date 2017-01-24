// @flow

const keyCodes = {
    [37]: 'left',
    [38]: 'up',
    [39]: 'right',
    [40]: 'down',
    [32]: 'kick',
    [88]: 'kick'
};

export default class Keyboard {
    element: ?HTMLElement;
    callback: callback;
    keyDownHandler: handler;
    keyUpHandler: handler;

    keyDown: keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    constructor(callback: callback) {
        this.callback = callback;

        this.keyDownHandler = (e: KeyboardEvent) => {
            this.setKey(e, true);
        };

        this.keyUpHandler = (e: KeyboardEvent) => {
            this.setKey(e, false);
        };
    }

    bindTo(element: HTMLElement) {
        if (this.element) {
            this.unBind();
        }

        this.element = element;
        element.addEventListener('keydown', this.keyDownHandler);
        element.addEventListener('keyup', this.keyUpHandler);
    }

    unBind() {
        const element = this.element;

        if (!element) {
            return;
        }

        element.removeEventListener('keydown', this.keyDownHandler);
        element.removeEventListener('keyup', this.keyUpHandler);
        this.element = null;
    }

    setKey(e: KeyboardEvent, state: boolean) {
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

    codeToKey(code: number): $Keys<keys> {
        return keyCodes[code];
    }

    isDown(key: $Keys<keys>): boolean {
        return this.keyDown[key];
    }

    isUp(key: $Keys<keys>): boolean {
        return !this.isDown(key);
    }
}

export type keys = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    kick: boolean
};

type callback = (key: $Keys<keys>, state: boolean) => void;
type handler = (e: KeyboardEvent) => void;

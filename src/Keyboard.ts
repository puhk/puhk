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
export type handler = (e: KeyboardEvent) => void;

export default class Keyboard {
    private element: HTMLElement;
    private callback: callback;
    private keyDownHandler: handler;
    private keyUpHandler: handler;

    private keyDown: Keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    public constructor(callback: callback) {
        this.callback = callback;

        this.keyDownHandler = (e: KeyboardEvent) => {
            this.setKey(e, true);
        };

        this.keyUpHandler = (e: KeyboardEvent) => {
            this.setKey(e, false);
        };
    }

    public bindTo(element: HTMLElement) {
        if (this.element) {
            this.unBind();
        }

        this.element = element;
        element.addEventListener('keydown', this.keyDownHandler);
        element.addEventListener('keyup', this.keyUpHandler);
    }

    public unBind() {
        const element = this.element;

        if (!element) {
            return;
        }

        element.removeEventListener('keydown', this.keyDownHandler);
        element.removeEventListener('keyup', this.keyUpHandler);
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

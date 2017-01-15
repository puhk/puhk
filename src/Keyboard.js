// @flow

export default class Keyboard {
    handler: handler;
    
    keyCodes = {
        '37': 'left',
        '38': 'up',
        '39': 'right',
        '40': 'down',
        '32': 'kick',
        '88': 'kick'
    };

    keyDown: keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };

    constructor(handler: handler) {
        this.handler = handler;

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            this.setKey(e, true);
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            this.setKey(e, false);
        });
    }

    setKey(e: KeyboardEvent, state: boolean) {
        let key = this.codeToKey(e.keyCode);
        e.preventDefault();

        if (typeof this.keyDown[key] != 'undefined' && this.keyDown[key] !== state) {
            this.keyDown[key] = state;
            this.handler(key, state);
        }
    }

    codeToKey(code: number): string {
        return this.keyCodes[code];
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

type handler = (key: string, state: boolean) => void;

import { autobind } from 'core-decorators';

export enum Keys {
	up,
	down,
	left,
	right,
	kick,
}
export type KeyState = Record<Keys, boolean>;
export type callback = (key: Keys, state: boolean) => void;

const keyCodes = new Map([
	[37, Keys.left],
	[38, Keys.up],
	[39, Keys.right],
	[40, Keys.down],
	[32, Keys.kick],
	[88, Keys.kick],
]);

export default class Keyboard {
	private element?: HTMLElement | null;
	private callback?: callback;

	private keyDown: KeyState = {
		[Keys.up]: false,
		[Keys.down]: false,
		[Keys.left]: false,
		[Keys.right]: false,
		[Keys.kick]: false,
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

		if (typeof key === 'undefined') {
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

	public isDown(key: Keys): boolean {
		return this.keyDown[key];
	}

	public isUp(key: Keys): boolean {
		return !this.isDown(key);
	}
}

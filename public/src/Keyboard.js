export default class Keyboard {
	keyCodes = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		32: 'kick',
		88: 'kick'
	};

	keyDown = {
		up: false,
		down: false,
		left: false,
		right: false,
		kick: false
	};

	constructor(handler) {
		this.handler = handler;

		document.addEventListener('keydown', e => {
			this.setKey(e, true);
		});

		document.addEventListener('keyup', e => {
			this.setKey(e, false);
		});
	}

	setKey(e, state) {
		let key = this.codeToKey(e.keyCode);
		e.preventDefault();

		if (typeof this.keyDown[key] != 'undefined' && this.keyDown[key] !== state) {
			this.keyDown[key] = state;
			this.handler(key, state);
		}
	}

	codeToKey(code) {
		return this.keyCodes[code];
	}

	isDown(key) {
		return this.keyDown[key];
	}

	isUp(key) {
		return !this.isDown(key);
	}
}

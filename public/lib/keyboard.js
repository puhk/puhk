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
	
	constructor() {
		document.onkeydown = e => {
			this.setKey(e, true);
		};
		
		document.onkeyup = e => {
			this.setKey(e, false);
		};
	}
	
	setKey(e, state) {
		if (typeof this.keyDown[this.codeToKey(e.keyCode)] != 'undefined') {
			e.preventDefault();
			this.keyDown[this.codeToKey(e.keyCode)] = state;
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
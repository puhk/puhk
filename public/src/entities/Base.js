import Vec from 'maxkueng/victor';

export default class Base {
	constructor(position) {
		this.position = position instanceof Vec ? position : new Vec(0, 0);
	}
}

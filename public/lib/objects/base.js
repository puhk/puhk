import Vec from 'maxkueng/victor';

export default class Base {
	position = new Vec(0, 0);
	
	constructor(position) {
		this.position = position;
		this.velocity = new Vec(0, 0);
	}
}
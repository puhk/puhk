export default class World {
	discs = [];
	height = 500;
	width = 900;
	
	addDiscs(...discs) {
		this.discs = this.discs.concat(discs);
	}
}
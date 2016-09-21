export default class Renderer {
    width = 0;
    height = 0;

	constructor(width, height) {
        this.width = width;
        this.height = height;

		this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.ctx.translate(this.width / 2, this.height / 2);
	}

	createCanvas() {
		let canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
        canvas.oncontextmenu = function() { return false; };

		document.body.appendChild(canvas);

		return canvas;
	}

	draw(state) {
        let area = [-this.width / 2, -this.height / 2, this.width, this.height];

        this.ctx.clearRect(...area);
        this.ctx.fillStyle = '#718c5a';
		this.ctx.fillRect(...area);

		state.discs.forEach(disc => {
			disc.draw(this.ctx);
		});
	}
}

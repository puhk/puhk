export default class Renderer {
    width = 0;
    height = 0;

	constructor(width, height, element) {
        this.width = width;
        this.height = height;
        this.element = element;
	}

    init() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.center();
    }

    destroy() {
        this.canvas.remove();
    }

	createCanvas(element) {
		let canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
        canvas.oncontextmenu = function() { return false; };

		this.element.appendChild(canvas);

		return canvas;
	}

    center() {
        this.ctx.translate(this.width / 2, this.height / 2);
    }

    setWidth(width) {
        this.width = width;
        this.canvas.width = width;
        this.center();
    }

	draw(state) {
        let area = [-this.width / 2, -this.height / 2, this.width, this.height];

        this.ctx.clearRect(...area);
        this.ctx.fillStyle = '#718c5a';
		this.ctx.fillRect(...area);

        state.stadium.backgrounds.forEach(background => {
            background.draw(this.ctx);
        });

        state.stadium.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        state.stadium.goals.forEach(goal => {
            goal.draw(this.ctx);
        });

        state.discs.forEach(disc => {
			disc.draw(this.ctx);
		});
	}
}

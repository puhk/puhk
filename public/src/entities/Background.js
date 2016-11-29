export default class Background {
    loaded = false;

    constructor(pos, width, height, type) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    load() {
        this.img = new Image;
        this.img.src = `images/backgrounds/${this.type}.png`;

        this.img.onload = () => {
            this.loaded = true;
        };
    }

    draw(ctx) {
        if (!this.loaded) {
            return;
        }
        
        let pattern = ctx.createPattern(this.img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

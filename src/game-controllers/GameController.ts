import MainLoop from 'mainloop.js';
import Renderer from '../Renderer';
import Event from '../state/Event';
import Simulator from '../state/Simulator';

export default abstract class GameController {
    protected inited = false;

    public constructor(protected simulator: Simulator, protected renderer?: Renderer) {}

    public init() {
        if (this.inited) {
            return;
        }

        this.setupLoop();
        this.startLoop();
        this.inited = true;
    }

    public destroy() {
        if (!this.inited) {
            return;
        }

        this.stopLoop();
    }

    private setupLoop() {
        MainLoop.setUpdate(() => {
            this.advance();
        });

        MainLoop.setDraw(() => {
            if (this.renderer) {
                this.renderer.draw(this.simulator.currentState);
            }
        });
    }

    public startLoop() {
        MainLoop.start();
    }

    public stopLoop() {
        MainLoop.stop();
    }

    protected advance() {
        this.simulator.advance();
    }
}

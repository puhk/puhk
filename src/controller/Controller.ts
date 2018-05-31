import MainLoop from 'mainloop.js';
import Renderer from 'Renderer';
import Simulator from 'state/Simulator';
import State from 'state/State';

export default abstract class Controller {
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
            const state = this.getCurrentState();

            if (this.renderer && state) {
                this.renderer.draw(state);
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

    protected abstract getCurrentState(): State | undefined;
}

// @flow

import Game from './Game';
import Engine from './Engine';
import Stadium from './entities/Stadium';
import Host from './network/Host';
import Client from './network/Client';
import Simulator from './state/Simulator';
import State from './state/State';

import classic from './stadiums/classic.json';

import type Renderer from './Renderer';
import type {Config} from './network/Base';

type Opts = Config & {
    renderer?: Renderer
};

type ClientOps = Opts & {
    id: string
};

const createGame = (renderer?: Renderer) => {
    const engine = new Engine;
    const simulator = new Simulator(engine);

    const game = new Game(simulator, renderer);
    engine.setGame(game);

    const state = State.createFromStadium(Stadium.parse(classic));
    simulator.addState(state);

    return game;
}

const GameCreator = {
    host({host, path, renderer}: Opts): Promise<Game> {
        const game = createGame(renderer);
        const network = new Host(game, {host, path});

        return new Promise((resolve, reject) => {
            network.peer.on('open', () => {
                game.initLocalPlayer();
                game.init();

                resolve(game);
            });
        });
    },

    join({host, path, id, renderer}: ClientOps) {
        const game = createGame(renderer);
        const network = new Client(game, {host, path});

        return network.connectTo(id);
    }
};

export default GameCreator;

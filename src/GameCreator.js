// @flow

import Game from './Game';
import Engine from './Engine';
import Stadium from './Stadium';
import Host from './network/Host';
import Client from './network/Client';
import Simulator from './state/Simulator';
import State from './state/State';

import classic from './stadiums/classic.json';

import type Renderer from './Renderer';

const createGame = (renderer?: Renderer) => {
    const engine = new Engine;
    const simulator = new Simulator(engine);

    const game = new Game(simulator, renderer);
    engine.setGame(game);

    const state = State.createFromStadium(new Stadium(classic));
    simulator.addState(state);

    return game;
}

const GameCreator = {
    host(renderer?: Renderer) {
        const game = createGame(renderer);
        const network = new Host(game);

        network.peer.on('open', () => {
            game.initLocalPlayer();
            game.init();
        });

        return game;
    },

    join(host: string, renderer?: Renderer) {
        const game = createGame(renderer);
        const network = new Client(game);
        network.connectTo(host);

        return game;
    }
};

export default GameCreator;

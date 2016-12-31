// @flow

import Game from './Game';
import Host from './network/Host';
import Client from './network/Client';

import type Renderer from './Renderer';

let GameCreator = {
    host(renderer?: Renderer) {
        let game = new Game(renderer);
        let network = new Host(game);

        network.peer.on('open', () => {
            game.createInitialState();
            game.init();
        });

        return game;
    },

    join(host: string, renderer?: Renderer) {
        let game = new Game(renderer);
        let network = new Client(game);
        
        network.connectTo(host);

        return game;
    }
};

export default GameCreator;
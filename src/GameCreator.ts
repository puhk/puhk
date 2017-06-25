import Game, { PlayerInfo } from './Game';
import Engine from './Engine';
import Renderer from './Renderer';
import Stadium, { JsonStadium } from './entities/Stadium';
import { Config } from './network/AbstractNetwork';
import Host from './network/Host';
import Client from './network/Client';
import Simulator from './state/Simulator';
import State from './state/State';
import classic from './stadiums/classic';

export interface Opts extends Config {
    player: PlayerInfo;
    renderer?: Renderer;
}

export interface ClientOps extends Opts {
    roomId: string;
}

const createGame = (renderer?: Renderer) => {
    const engine = new Engine;
    const simulator = new Simulator(engine);

    const game = new Game(simulator, renderer);
    engine.setGame(game);

    const state = State.createFromStadium(Stadium.parse(classic));
    simulator.addState(state);

    return game;
};

export function host({ host, path, player, renderer }: Opts): Promise<Game> {
    const game = createGame(renderer);
    const network = new Host(game, { host, path });

    return new Promise((resolve, reject) => {
        network.peer.on('open', () => {
            game.createLocalPlayer(player);
            game.init();
            resolve(game);
        });
    });
};

export function join({ host, path, roomId, player, renderer }: ClientOps) {
    const game = createGame(renderer);
    const network = new Client(game, { host, path });

    return network.connectTo(roomId, player);
};

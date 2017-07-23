import { EventAggregator } from 'aurelia-event-aggregator';

import Game from './Game';
import Engine from './Engine';
import Keyboard from './Keyboard';
import Renderer from './Renderer';
import Simulator from './state/Simulator';
import State from './state/State';

import { NetworkGameController, PlayerInfo } from './game-controllers/NetworkGameController';
import ClientGameController from './game-controllers/ClientGameController';
import HostGameController from './game-controllers/HostGameController';

import { Config } from './network/p2p/AbstractP2PNetwork';
import NetworkHost from './network/p2p/NetworkHost';
import NetworkClient from './network/p2p/NetworkClient';

import Stadium from './entities/Stadium';
import classic from './stadiums/classic';

export interface Opts extends Config {
    player: PlayerInfo;
    renderer?: Renderer;
}

export interface ClientOps extends Opts {
    roomId: string;
}

const createController = <T extends (typeof HostGameController | typeof ClientGameController)>(
    Controller: T,
    { host, path, renderer }: Opts
) => {
    const engine = new Engine;
    const simulator = new Simulator(engine);

    const state = State.createFromStadium(Stadium.parse(classic));
    simulator.addState(state);

    return new Controller(
        new Game(simulator, engine, new EventAggregator),
        simulator,
        new NetworkHost({ host, path }),
        new Keyboard,
        renderer
    );
}

export function host(opts: Opts) {
    const controller = <HostGameController>createController(HostGameController, opts);
    return controller.hostGame(opts.player);
};

export function join(opts: ClientOps) {
    const controller = <ClientGameController>createController(ClientGameController, opts);
    return controller.join(opts.roomId, opts.player);
};

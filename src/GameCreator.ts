import { EventAggregator } from 'aurelia-event-aggregator';

import Engine from './Engine';
import Keyboard from './Keyboard';
import Renderer from './Renderer';
import Simulator from './state/Simulator';
import State from './state/State';

import { NetworkGameController, PlayerInfo } from './game-controllers/NetworkGameController';
import ClientGameController from './game-controllers/ClientGameController';
import HostGameController from './game-controllers/HostGameController';

import { NetworkInterface } from './network/NetworkInterface';
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

interface ControllerConstructor<T> {
    new(
        simulator: Simulator,
        network: NetworkInterface,
        keyboard: Keyboard,
        renderer?: Renderer
    ): T
}

export const eventApi = new EventAggregator;

const createStateFromStadium = (stadium: Stadium) => {
    let state = new State;

    state.stadium = stadium;
    state.discs = stadium.discs.map(disc => disc.clone());
    state.initScores();

    return state;
};

const createController = <T extends NetworkGameController, N extends NetworkInterface>(
    Controller: ControllerConstructor<T>,
    Network: new(opts: Config) => N,
    { host, path, renderer }: Opts
) => {
    const engine = new Engine;
    const simulator = new Simulator(engine, eventApi);

    const state = createStateFromStadium(Stadium.parse(classic));
    simulator.makeConcrete(state);

    return new Controller(
        simulator,
        new Network({ host, path }),
        new Keyboard,
        renderer
    );
}

export function host(opts: Opts) {
    const controller = createController(HostGameController, NetworkHost, opts);
    return controller.hostGame(opts.player);
};

export function join(opts: ClientOps) {
    const controller = createController(ClientGameController, NetworkClient, opts);
    return controller.join(opts.roomId, opts.player);
};

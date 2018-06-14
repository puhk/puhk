import { EventAggregator } from 'aurelia-event-aggregator';

import Keyboard from '@src/Keyboard';
import Renderer from '@src/Renderer';
import Simulator from '@src/state/Simulator';
import State from '@src/state/State';

import { NetworkController, PlayerInfo } from '@src/controller/NetworkController';
import ClientController from '@src/controller/ClientController';
import HostController from '@src/controller/HostController';

import { NetworkInterface } from '@src/network/NetworkInterface';
import { Config } from '@src/network/p2p/AbstractP2PNetwork';
import NetworkHost from '@src/network/p2p/NetworkHost';
import NetworkClient from '@src/network/p2p/NetworkClient';

import Stadium from '@src/entities/Stadium';
import classic from '@src/stadiums/classic';

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
    const state = new State(stadium);
    state.discs = stadium.discs.map(disc => disc.clone());
    state.initScores();

    return state;
};

const createController = <T extends NetworkController, N extends NetworkInterface>(
    Controller: ControllerConstructor<T>,
    Network: new(opts: Config) => N,
    { host, path, renderer }: Opts
) => {
    const state = createStateFromStadium(Stadium.parse(classic));

    const simulator = new Simulator(eventApi);
    simulator.makeConcrete(state);

    return new Controller(
        simulator,
        new Network({ host, path }),
        new Keyboard,
        renderer
    );
}

export const host = (opts: Opts) =>
    createController(HostController, NetworkHost, opts)
        .hostGame(opts.player);

export const join = (opts: ClientOps) =>
    createController(ClientController, NetworkClient, opts)
        .join(opts.roomId, opts.player);

import Peer from 'peerjs';
import Keyboard from './Keyboard';
import Renderer from './Renderer';
import Simulator from './state/Simulator';
import { createState, initScores } from './state/State';

import { NetworkController, PlayerInfo } from './controller/NetworkController';
import ClientController from './controller/ClientController';
import HostController from './controller/HostController';

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

const createStateFromStadium = (stadium: Stadium) => initScores(createState(stadium));

const createController = <T extends NetworkController>(
    Controller: ControllerConstructor<T>,
    Network: new(peer: Peer) => NetworkInterface,
    opts: Opts
) => {
    const state = createStateFromStadium(Stadium.parse(classic));
    const simulator = new Simulator;
    simulator.makeConcrete(state);

    return new Controller(
        simulator,
        createNetwork(Network, opts),
        new Keyboard,
        opts.renderer
    );
};

const createNetwork = (network: new(peer: Peer) => NetworkInterface, { host, path }: Opts) => {
    const ident = Math.random().toString(36).substring(7);
    return new network(new Peer(ident, { host, path }));
};

export const host = (opts: Opts) =>
    createController(HostController, NetworkHost, opts)
        .hostGame(opts.player);

export const join = (opts: ClientOps) =>
    createController(ClientController, NetworkClient, opts)
        .join(opts.roomId, opts.player);

import Peer, { PeerJSOption } from 'peerjs';
import Keyboard from './Keyboard';
import Renderer from './Renderer';
import Simulator from './state/Simulator';
import { createState, initScores } from './state/State';

import { NetworkController, PlayerInfo } from './controller/NetworkController';
import ClientController from './controller/ClientController';
import HostController from './controller/HostController';

import { NetworkInterface } from './network/NetworkInterface';
import NetworkHost from './network/p2p/NetworkHost';
import NetworkClient from './network/p2p/NetworkClient';

import Stadium from './entities/Stadium';
import classic from './stadiums/classic';

export interface Opts extends PeerJSOption {
	player: PlayerInfo;
	renderer?: Renderer;
}

export interface ClientOps extends Opts {
	roomId: string;
}

interface ControllerConstructor<T> {
	new (simulator: Simulator, network: NetworkInterface, keyboard: Keyboard, renderer?: Renderer): T;
}

const createStateFromStadium = (stadium: Stadium) => initScores(createState(stadium));

const createController = <T extends NetworkController>(
	Controller: ControllerConstructor<T>,
	network: NetworkInterface,
	opts: Opts
) => {
	const state = createStateFromStadium(Stadium.parse(classic));
	const simulator = new Simulator();
	simulator.makeConcrete(state);

	return new Controller(simulator, network, new Keyboard(), opts.renderer);
};

const createPeer = (opts: PeerJSOption): Promise<Peer> => {
	return new Promise((resolve, reject) => {
		const peer = new Peer(opts);
		peer.on('open', () => resolve(peer));
		peer.on('error', err => reject(err));
	});
};

export const host = async (opts: Opts): Promise<HostController> => {
	const peer = await createPeer(opts);
	const network = new NetworkHost(peer).init();
	return createController(HostController, network, opts).hostGame(opts.player);
};

export const join = async (opts: ClientOps): Promise<ClientController> => {
	const peer = await createPeer(opts);
	const network = new NetworkClient(peer);
	return createController(ClientController, network, opts).join(opts.roomId, opts.player);
};

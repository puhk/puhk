import Game from './Game';
import Renderer  from './Renderer';
import NetworkHost from './network/NetworkHost';
import NetworkClient from './network/NetworkClient';

let renderer = new Renderer(900, 500, document.body);

let game = new Game(renderer);
window.game = game;

let hostLink = document.getElementById('startHost');
let clientLink = document.getElementById('startClient');

hostLink.addEventListener('click', () => {
	let network = new NetworkHost(game);

	network.peer.on('open', () => {
		game.createInitialState();
		// game.start();
	});
});

clientLink.addEventListener('click', () => {
	let network = new NetworkClient(game);
	network.connectTo('host');
});

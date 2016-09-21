import NetworkHost from './network/NetworkHost';
import NetworkClient from './network/NetworkClient';
import Game from './Game';

let game = new Game;

let hostLink = document.getElementById('startHost');
let clientLink = document.getElementById('startClient');

hostLink.addEventListener('click', () => {
	let network = new NetworkHost(game);

	network.peer.on('open', () => {
		game.createInitialState();
		game.start();
	});
});

clientLink.addEventListener('click', () => {
	let network = new NetworkClient(game);
	network.connectTo('host');
});

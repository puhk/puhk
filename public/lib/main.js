import Vec from 'maxkueng/victor';

import Engine from 'lib/engine';
import Keyboard from 'lib/keyboard';
import World from 'lib/world';
import Disc from 'lib/objects/disc';

let world = new World;
let keyboard = new Keyboard;

let player = new Disc(new Vec(25, 25), 15, {
	color: '#e56e56',
	mass: 2
});
player.isPlayer = true;

let ball = new Disc(new Vec(110, 110), 10, {
	color: '#fff',
	damping: 0.96
});

world.addDiscs(player, ball);

let engine = new Engine(world, keyboard);
engine.run();
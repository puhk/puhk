import { JsonStadium } from '../entities/Stadium';

const classic = <JsonStadium>{
	name: 'Classic',
	cameraConstraints: [420, 200],

	teams: [
		{ name: 'red', color: '#e56e56', kickOffPos: [-250, 0] },
		{ name: 'blue', color: '#5689e5', kickOffPos: [250, 0] },
	],

	player: {
		acceleration: 0.1,
		damping: 0.96,
		kickingAcceleration: 0.07,
		kickStrength: 4,
		invMass: 0.5,
		radius: 15,
	},

	backgrounds: [{ pos: [-370, -170], width: 740, height: 340, type: 'grass' }],

	segments: [
		{ p0: [-370, -170], p1: [-370, -64] },
		{ p0: [-370, 64], p1: [-370, 170] },

		{ p0: [-370, -64], p1: [-400, -64], bounce: 0.2 },
		{ p0: [-400, -64], p1: [-400, 64], bounce: 0.2 },
		{ p0: [-400, 64], p1: [-370, 64], bounce: 0.2 },

		{ p0: [370, -170], p1: [370, -64] },
		{ p0: [370, 64], p1: [370, 170] },

		{ p0: [370, -64], p1: [400, -64], bounce: 0.2 },
		{ p0: [400, -64], p1: [400, 64], bounce: 0.2 },
		{ p0: [400, 64], p1: [370, 64], bounce: 0.2 },

		{ p0: [-370, -170], p1: [370, -170] },
		{ p0: [-370, 170], p1: [370, 170] },
	],

	goals: [
		{ p0: [-370, -64], p1: [-370, 64], teamScored: 'blue' },
		{ p0: [370, -64], p1: [370, 64], teamScored: 'red' },
	],

	discs: [
		{ pos: [0, 0], ball: true, color: '#FFF', damping: 0.99, invMass: 1, radius: 10 },
		{ pos: [-370, 64], color: '#FFCCCC', bounce: 0.5, radius: 8, invMass: 0 },
		{ pos: [-370, -64], color: '#FFCCCC', bounce: 0.5, radius: 8, invMass: 0 },
		{ pos: [370, 64], color: '#CCCCFF', bounce: 0.5, radius: 8, invMass: 0 },
		{ pos: [370, -64], color: '#CCCCFF', bounce: 0.5, radius: 8, invMass: 0 },
	],
};

export default classic;

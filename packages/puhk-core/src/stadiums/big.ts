import { JsonStadium } from '../entities/Stadium';

const big = <JsonStadium>{
	name: 'Big',
	cameraConstraints: [600, 270],
	teams: [
		{
			name: 'red',
			color: '#e56e56',
			kickOffPos: [-250, 0],
		},
		{
			name: 'blue',
			color: '#5689e5',
			kickOffPos: [250, 0],
		},
	],
	player: {
		acceleration: 0.1,
		damping: 0.96,
		kickingAcceleration: 0.07,
		kickStrength: 4,
		invMass: 0.5,
		radius: 15,
	},
	backgrounds: [
		{
			pos: [-550, -240],
			width: 1100,
			height: 480,
			type: 'grass',
		},
	],
	segments: [
		{
			p0: [-550, -240],
			p1: [-550, -80],
		},
		{
			p0: [-550, 80],
			p1: [-550, 240],
		},
		{
			p0: [-550, -80],
			p1: [-580, -80],
			bounce: 0.2,
		},
		{
			p0: [-580, -80],
			p1: [-580, 80],
			bounce: 0.2,
		},
		{
			p0: [-580, 80],
			p1: [-550, 80],
			bounce: 0.2,
		},
		{
			p0: [550, -240],
			p1: [550, -80],
		},
		{
			p0: [550, 80],
			p1: [550, 240],
		},
		{
			p0: [550, -80],
			p1: [580, -80],
			bounce: 0.2,
		},
		{
			p0: [580, -80],
			p1: [580, 80],
			bounce: 0.2,
		},
		{
			p0: [580, 80],
			p1: [550, 80],
			bounce: 0.2,
		},
		{
			p0: [-550, -240],
			p1: [550, -240],
		},
		{
			p0: [-550, 240],
			p1: [550, 240],
		},
	],
	goals: [
		{
			p0: [-550, -80],
			p1: [-550, 80],
			teamScored: 'blue',
		},
		{
			p0: [550, -80],
			p1: [550, 80],
			teamScored: 'red',
		},
	],
	discs: [
		{
			pos: [0, 0],
			ball: true,
			color: '#FFF',
			damping: 0.99,
			invMass: 1,
			radius: 10,
		},
		{
			pos: [-550, 80],
			color: '#FFCCCC',
			bounce: 0.5,
			radius: 8,
			invMass: 0,
		},
		{
			pos: [-550, -80],
			color: '#FFCCCC',
			bounce: 0.5,
			radius: 8,
			invMass: 0,
		},
		{
			pos: [550, 80],
			color: '#CCCCFF',
			bounce: 0.5,
			radius: 8,
			invMass: 0,
		},
		{
			pos: [550, -80],
			color: '#CCCCFF',
			bounce: 0.5,
			radius: 8,
			invMass: 0,
		},
	],
};

export default big;

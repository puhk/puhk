import _ from 'lodash';
import Vec from 'maxkueng/victor';
import * as Events from './Events';
import Disc from '../entities/Disc';

export default class State {
	discs = [];
	events = [];
	frame = 0;
	players = [];

	addPlayers(...players) {
		this.players = this.players.concat(players);
	}

	addDiscs(...discs) {
		this.discs = this.discs.concat(discs);
	}

	clone() {
		let clone = new State;
		clone.frame = this.frame;
		clone.players = _.cloneDeep(this.players);

		clone.discs = this.discs.map(disc => {
			let clone = disc.clone();
			clone.playerId = disc.playerId;
			return clone;
		});

		return clone;
	}

	static parse(json) {
		let state = new State;
		state.frame = json.frame;
		state.players = json.players;

		state.discs = json.discs.map(obj => {
			let disc = new Disc(Vec.fromObject(obj.position), obj.radius, {
				color: obj.color,
				damping: obj.damping,
				mass: obj.mass
			});

			disc.velocity = Vec.fromObject(obj.velocity);
			disc.playerId = obj.playerId;

			return disc;
		});

		state.events = json.events.map(e => {
			return new Events[e.type + 'Event'](e.data);
		});

		return state;
	}
}

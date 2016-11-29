import _ from 'lodash';
import Vec from 'maxkueng/victor';
import * as Events from './Events';
import Disc from '../entities/Disc';
import Segment from '../entities/Segment';

export default class State {
	discs = [];
	events = [];
	frame = 0;
	players = [];
	segments = [];

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
		clone.stadium = this.stadium;

		clone.discs = this.discs.map(disc => {
			let clone = disc.clone();
			clone.playerId = disc.playerId;
			return clone;
		});

		clone.segments = this.segments.map(segment => {
			return segment.clone();
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
				invMass: obj.invMass
			});

			disc.velocity = Vec.fromObject(obj.velocity);
			disc.playerId = obj.playerId;

			return disc;
		});

		state.segments = json.segments.map(seg => {
			let start = Vec.fromObject(seg.p0);
			let end = Vec.fromObject(seg.p1);

			return new Segment(start, end);
		});

		state.events = json.events.map(e => {
			return new Events[e.type + 'Event'](e.data);
		});

		return state;
	}

	static createFromStadium(stadium) {
		let state = new State;
		state.stadium = stadium;
		state.discs = stadium.discs.map(disc => disc.clone());
		return state;
	}
}

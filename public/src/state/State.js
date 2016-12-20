import _ from 'lodash';
import Vec from 'maxkueng/victor';

import * as Events from './Events';
import Stadium from '../stadium';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Segment from '../entities/Segment';

export default class State {
	discs = [];
	events = [];
	frame = 0;
	players = [];
	
    scoreLimit = 3;
	scores = {};
	timeLimit = 1;

	addPlayers(...players) {
		this.players = this.players.concat(players);
	}

	getPlayerById(id) {
		return this.players.find(player => player.clientId == id);
	}

	getTeamPlayers(team) {
        return this.players.filter(player => player.team == team.name);
    }

	addDiscs(...discs) {
		this.discs = this.discs.concat(discs);
	}

	getPlayerDisc(player) {
		return this.discs.find(disc => disc.id == player.discId);
	}

	clone() {
		let clone = new State;
		clone.frame = this.frame;
		clone.stadium = this.stadium;
		clone.scoreLimit = this.scoreLimit;
		clone.scores = _.clone(this.scores);
		clone.timeLimit = this.timeLimit;

		clone.players = this.players.map(player => player.clone());
		clone.discs = this.discs.map(disc => disc.clone());

		return clone;
	}

	pack() {
		let state = {
			frame: this.frame,
			discs: this.discs.map(disc => disc.pack()),
			events: this.events.map(event => event.pack()),
			players: this.players.map(player => player.pack()),
			stadium: this.stadium.pack(),
			scoreLimit: this.scoreLimit,
			scores: this.scores,
			timeLimit: this.timeLimit
		};

		return state;
	}

	static parse(json) {
		let state = new State;
		state.frame = json.frame;
		state.stadium = new Stadium(json.stadium);
		state.scoreLimit = json.scoreLimit;
		state.scores = json.scores;
		state.timeLimit = json.timeLimit;

		state.players = json.players.map(obj => Player.parse(obj));
		state.discs = json.discs.map(obj => Disc.parse(obj));

		state.events = json.events.map(e => {
			let event = Events[e.eventType + 'Event'].parse(e.sender, e.data);
			event.frame = e.frame;
			return event;
		});

		return state;
	}

	static createFromStadium(stadium) {
		let state = new State;

		state.stadium = stadium;
		state.discs = stadium.discs.map(disc => disc.clone());

		stadium.teams.forEach(team => {
			state.scores[team.name] = 0;
		});

		return state;
	}
}

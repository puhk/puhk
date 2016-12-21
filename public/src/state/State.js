import _ from 'lodash';
import Vec from 'maxkueng/victor';

import * as Events from './events/Events';
import Stadium from '../stadium';
import Disc from '../entities/Disc';
import Player from '../entities/Player';
import Segment from '../entities/Segment';

export default class State {
	static STATE_KICKOFF = 0;
	static STATE_INPLAY = 1;
	static STATE_GOALSCORED = 2;
	static STATE_ENDGAME = 3;

	discs = [];
	events = [];
	frame = 0;
	players = [];
	playing = false;
	
    scores = {};
	scoreLimit = 3;

	timer = 0;
	timeLimit = 3;

	matchState = State.STATE_KICKOFF;
	matchStateTimer = 0;

	addPlayers(...players) {
		this.players = this.players.concat(players);
	}

	getPlayerById(id) {
		return this.players.find(player => player.clientId == id);
	}

	getTeamPlayers(team) {
        return this.players.filter(player => player.team == team.name);
    }

	addDiscs(discs) {
		this.discs = this.discs.concat(discs);
	}

	addDisc(disc) {
		this.discs.push(disc);
	}

	removeDisc(disc) {
		this.discs.splice(this.discs.indexOf(disc), 1);
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
		clone.timer = this.timer;
		clone.timeLimit = this.timeLimit;
		clone.playing = this.playing;
		clone.matchState = this.matchState;
		clone.matchStateTimer = this.matchStateTimer;

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
			timer: this.timer,
			timeLimit: this.timeLimit,
			playing: this.playing,
			matchState: this.matchState,
			matchStateTimer: this.matchStateTimer
		};

		return state;
	}

	static parse(json) {
		let state = new State;
		state.frame = json.frame;
		state.stadium = new Stadium(json.stadium);
		state.scoreLimit = json.scoreLimit;
		state.scores = json.scores;
		state.timer = json.timer;
		state.timeLimit = json.timeLimit;
		state.playing = json.playing;
		state.matchState = json.matchState;
		state.matchStateTimer = json.matchStateTimer;

		state.players = json.players.map(obj => Player.parse(obj));
		state.discs = json.discs.map(obj => Disc.parse(obj));

		state.events = json.events.map(e => {
			let event = Events[e.eventType].parse(e.sender, e.data);
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

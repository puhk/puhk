import update from 'immutability-helper';

import { MatchStates } from './MatchStates';
import kickOffHandler from './matchstate-handlers/kick-off-handler';
import inPlayHandler from './matchstate-handlers/in-play-handler';
import goalScoredHandler from './matchstate-handlers/goal-scored-handler';
import endGameHandler from './matchstate-handlers/end-game-handler';
import ChatMessage from '../entities/ChatMessage';
import Disc, { JsonDisc } from '../entities/Disc';
import Player, { JsonPlayer } from '../entities/Player';
import Stadium, { JsonStadium } from '../entities/Stadium';

export interface JsonState {
	frame: number;
	roomName: string;
	scores: [string, number][];
	scoreLimit: number;
	timer: number;
	timeLimit: number;
	playing: boolean;
	matchState: MatchStates;
	matchStateTimer: number;

	stadium: JsonStadium;
	discs: JsonDisc[];
	players: JsonPlayer[];
}

export default interface State {
	frame: number;
	matchState: MatchStates;
	matchStateTimer: number;

	roomName: string;
	scores: Map<string, number>;
	scoreLimit: number;
	timer: number;
	timeLimit: number;
	playing: boolean;

	stadium: Stadium;
	discs: Disc[];
	players: Player[];
	chatMessages: ChatMessage[];
}

export const createState = (stadium: Stadium): State => ({
	frame: 0,
	matchState: MatchStates.Kickoff,
	matchStateTimer: 0,
	roomName: '',
	scores: new Map(),
	scoreLimit: 3,
	timer: 0,
	timeLimit: 3,
	playing: false,
	discs: stadium.discs,
	players: [],
	chatMessages: [],
	stadium,
});

export const initScores = (state: State) => {
	const scores = state.stadium.teams.map(t => <[string, number]>[t.name, 0]);
	return update(state, { scores: { $add: scores } });
};

type StateHandler = (state: State, previousState: State) => State;
const matchStateHandlers: Record<MatchStates, StateHandler> = {
	[MatchStates.Kickoff]: kickOffHandler,
	[MatchStates.Inplay]: inPlayHandler,
	[MatchStates.GoalScored]: goalScoredHandler,
	[MatchStates.EndGame]: endGameHandler,
};

export const runMatchState = (state: State, previousState: State) =>
	matchStateHandlers[state.matchState](state, previousState);

export const parse = (json: JsonState) => {
	const state = createState(Stadium.parse(json.stadium));
	state.frame = json.frame;
	state.roomName = json.roomName;
	state.scores = new Map(json.scores);
	state.scoreLimit = json.scoreLimit;
	state.timer = json.timer;
	state.timeLimit = json.timeLimit;
	state.playing = json.playing;
	state.matchState = json.matchState;
	state.matchStateTimer = json.matchStateTimer;

	state.players = json.players.map(obj => Player.parse(obj));
	state.discs = json.discs.map(obj => Disc.parse(obj));

	return state;
};

export const pack = (state: State) => ({
	...state,
	discs: state.discs.map(disc => disc.pack()),
	players: state.players.map(player => player.pack()),
	stadium: state.stadium.pack(),
	scores: Array.from(state.scores),
});

import update from 'immutability-helper';
import { Event } from '..';
import State from '../../State';
import { MatchStates } from '../../MatchStates';
import kickOffState from '../../funcs/kick-off-state';
import { createPlayerDisc, getPlayerFromDisc } from '../../funcs/player';

export default class StartGame implements Event {
    public constructor(public frame: number, public sender?: number) { }

    public apply(state: State) {
        if (state.playing) {
            return state;
        }

        const discsToRemove = state.discs.filter(disc => getPlayerFromDisc(state, disc));
        const scores = state.stadium.teams.reduce((scores, team) => scores.set(team.name, 0), new Map);

        const newState = state.players.reduce((state, player, i) => {
            const disc = createPlayerDisc(state, player);
            return !disc ? state : update(state, {
                discs: { $push: [disc] },
                players: {
                    [i]: {
                        discId: { $set: disc.id }
                    }
                }
            });
        }, update(state, {
            $merge: {
                matchState: MatchStates.Kickoff,
                timer: 0,
                playing: true,
                scores
            },
            discs: {
                $splice: discsToRemove.map(disc => <[number, number]>[state.discs.indexOf(disc), 1])
            },
        }));

        return kickOffState(newState);
    }
}

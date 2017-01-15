// @flow

import React from 'react';

import type {Game, JsonTeam, Goal, State} from 'nojball-game';

export default class TopBar extends React.Component<void, Props, TopBarState> {
    state: TopBarState = {
        scores: {},
        teams: [],
        timer: 0
    };

    goalScoredSubscriber: any;
    timerInterval: number;

    constructor(props: Props) {
        super(props);
        const {game} = props;

        this.state = {
            teams: game.getTeams(),
            timer: game.getTimer(),
            scores: game.getScores()
        };

        this.timerInterval = setInterval(() => {
            this.setState({timer: game.getTimer()});
        }, 100);

        this.goalScoredSubscriber = game.eventAggregator.subscribe('goalScored', ({goal, state}: {goal: Goal, state: State}) => {
            this.setState({scores: state.scores});
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
        this.goalScoredSubscriber.dispose();
    }
    
    render() {
        const mins = Math.floor(this.state.timer / 60);
        const seconds = Math.floor(this.state.timer % 60);
        const timer = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

        return (
            <div className="top-bar">
                <ul className={`scores teams-${this.state.teams.length}`}>
                    {this.state.teams.map(team => (
                        <li key={team.name}>
                            <span className="color-block" style={{backgroundColor: team.color}}></span>
                            <span className="score">{this.state.scores[team.name]}</span>
                        </li>
                    ))}
                </ul>

                <div className="room-name">Nojs Room</div>
                <div className="timer">{timer}</div>
            </div>
        );
    }
}

type Props = {
    game: Game
};

type TopBarState = {
    scores: Object,
    teams: JsonTeam[],
    timer: number
};

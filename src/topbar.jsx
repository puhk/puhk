// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import type {Game, JsonTeam, Goal, State} from 'nojball-game';

export default class TopBar extends React.Component<void, Props, TopBarState> {
    state: TopBarState = {
        scores: new Map,
        teams: [],
        timer: 0
    };

    goalScoredSubscriber: any;
    timerInterval: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            teams: props.game.getTeams(),
            timer: props.game.getTimer(),
            scores: props.game.getScores()
        };
    }

    componentDidMount() {
        const {game} = this.props;

        const updateTimer = () => {
            this.timerInterval = requestAnimationFrame(updateTimer);

            const timer =  game.getTimer();
            const currentSeconds = Math.floor(this.state.timer % 60);
            const newSeconds = Math.floor(timer % 60);

            if (Math.floor(timer) > Math.floor(this.state.timer)) {
                this.setState({timer: game.getTimer()});
            }
        };

        this.timerInterval = requestAnimationFrame(updateTimer);

        this.goalScoredSubscriber = game.eventAggregator.subscribe('goalScored', ({goal, state}: {goal: Goal, state: State}) => {
            this.setState({scores: state.scores});
        });
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timerInterval);
        this.goalScoredSubscriber.dispose();
    }

    render() {
        const mins = Math.floor(this.state.timer / 60);
        const seconds = Math.floor(this.state.timer % 60);
        const timer = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

        return (
            <div className="top-bar">
                <ul className={`scores teams-${this.state.teams.length}`}>
                    {this.state.teams.map(team =>
                        <li key={team.name}>
                            <span className="color-block" style={{backgroundColor: team.color}}></span>
                            <span className="score">{this.state.scores.get(team.name)}</span>
                        </li>
                    )}
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
    scores: Map<string, number>,
    teams: JsonTeam[],
    timer: number
};

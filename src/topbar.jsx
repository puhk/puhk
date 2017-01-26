// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Timer from './timer';

import type {Game, JsonTeam, Goal, State} from 'nojball-game';

export default class TopBar extends React.Component<void, Props, TopBarState> {
    state: TopBarState = {
        scores: new Map,
        teams: []
    };

    goalScoredSubscriber: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            teams: props.game.getTeams(),
            scores: props.game.getScores()
        };
    }

    componentDidMount() {
        const handler = (event: {goal: Goal, state: State}) => {
            this.setState({scores: event.state.scores});
        };

        this.goalScoredSubscriber = this.props.game.eventAggregator.subscribe('goalScored', handler);
    }

    componentWillUnmount() {
        this.goalScoredSubscriber.dispose();
    }

    render() {
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
                <Timer game={this.props.game} />
            </div>
        );
    }
}

type Props = {
    game: Game
};

type TopBarState = {
    scores: Map<string, number>,
    teams: JsonTeam[]
};

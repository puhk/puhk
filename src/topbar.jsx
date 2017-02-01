// @flow

import React from 'react';
import {Events} from 'nojball-game';

import Timer from './timer';

import type {Game, JsonTeam, Goal, State} from 'nojball-game';

export default class TopBar extends React.Component<void, Props, TopBarState> {
    state: TopBarState = {
        roomName: '',
        scores: new Map,
        teams: []
    };

    subscribers = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            roomName: props.game.getRoomName(),
            teams: props.game.getTeams(),
            scores: props.game.getScores()
        };
    }

    componentDidMount() {
        this.initGoalSubscriber();
        this.initRoomNameSubscriber();
    }

    componentWillUnmount() {
        for (const subscriber of this.subscribers) {
            subscriber.dispose();
        }
    }

    initGoalSubscriber() {
        const handler = (event: {goal: Goal, state: State}) => {
            this.setState({scores: event.state.scores});
        };

        this.subscribers.push(this.props.game.eventAggregator.subscribe('goalScored', handler));
    }

    initRoomNameSubscriber() {
        const handler = (event: Events.ChangeRoomName) => {
            this.setState({roomName: event.data.name});
        };

        this.subscribers.push(this.props.game.eventAggregator.subscribe(Events.ChangeRoomName, handler));
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

                <div className="room-name">{this.state.roomName}</div>
                <Timer game={this.props.game} />
            </div>
        );
    }
}

type Props = {
    game: Game
};

type TopBarState = {
    roomName: string,
    scores: Map<string, number>,
    teams: JsonTeam[]
};

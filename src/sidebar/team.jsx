// @flow

import React from 'react';
import {Events} from 'nojball-game';

import Player from './player';

import type {Game, JsonTeam, State, Goal, Player as PlayerType} from 'nojball-game';

export default class Team extends React.Component<void, TeamProps, TeamState> {
    eventSubscribers = [];
    state: TeamState = {
        players: [],
        score: 0
    };

    componentDidMount() {
        const {game, team, specs} = this.props;

        this.initChangeTeamListener();

        if (specs) {
            this.initPlayerJoinedListener();
            return;
        }

        this.setState({
            players: game.getTeamPlayers(team.name),
            score: game.getScore(team.name)
        });

        this.initStartGameListener();
        this.initGoalScoredSubscriber();
    }

    initChangeTeamListener() {
        const handler = (event: Events.ChangeTeam) => {
            const {player} = event;

            if (player.team == this.props.team.name || (this.props.specs && !player.team)) {
                this.setState({
                    players: this.state.players.concat(player)
                });

                return;
            }

            this.setState({
                players: this.state.players.filter(p => p.clientId !== player.clientId)
            });
        };

        const subscriber = this.props.game.eventAggregator.subscribe(Events.ChangeTeam, handler);
        this.eventSubscribers.push(subscriber);
    }

    initPlayerJoinedListener() {
        const handler = (event: Events.PlayerJoined) => {
            this.setState({
                players: this.state.players.concat(event.player)
            });
        };

        const subscriber = this.props.game.eventAggregator.subscribe(Events.PlayerJoined, handler);
        this.eventSubscribers.push(subscriber);
    }

    initStartGameListener() {
        const handler = (event: Events.StartGame) => {
            this.setState({score: 0});
        };

        const subscriber = this.props.game.eventAggregator.subscribe(Events.StartGame, handler);
        this.eventSubscribers.push(subscriber);
    }

    initGoalScoredSubscriber() {
        const handler = ({goal, state}: {goal: Goal, state: State}) => {
            if (goal.teamScored == this.props.team.name) {
                this.setState({score: this.state.score + 1});
            }
        };

        const subscriber = this.props.game.eventAggregator.subscribe('goalScored', handler);
        this.eventSubscribers.push(subscriber);
    }

    switchTeam() {
        const team = this.props.specs ? null : this.props.team.name;
        this.props.game.movePlayerToTeam(this.props.game.me.id, team);
    }

    componentWillUnmount() {
        for (const subscriber of this.eventSubscribers) {
            subscriber.dispose();
        }
    }

    render() {
        return (
            <li>
                <a href="#" onDoubleClick={e => this.switchTeam()}>
                    <span className="color-block" style={{backgroundColor: this.props.team.color}}></span>
                    <span>{this.props.team.name}</span>
                </a>

                {!this.props.specs &&
                    <span className="score">{this.state.score}</span>
                }

                {this.state.players.length > 0 &&
                    <ul>
                        {this.state.players.map(player =>
                            <li key={player.clientId}>
                                <Player game={this.props.game} player={player} />
                            </li>
                        )}
                    </ul>
                }
            </li>
        );
    }
}

type TeamProps = {
    game: Game,
    team: JsonTeam,
    specs?: boolean
};

type TeamState = {
    players: PlayerType[],
    score: number
};

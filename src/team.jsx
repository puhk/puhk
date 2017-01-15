// @flow

import React from 'react';
import {Events} from 'nojball-game';

import type {Game, JsonTeam, State, Goal, Player} from 'nojball-game';

export default class Team extends React.Component<void, TeamProps, TeamState> {
    eventSubscribers = [];
    state: TeamState = {
        players: [],
        score: 0
    };

    constructor(props: TeamProps) {
        super(props);
        const {game, team, specs} = this.props;

        this.initChangeTeamListener();

        if (specs) {
            this.initPlayerJoinedListener();
        } else {
            this.state.players = game.getTeamPlayers(team.name);
            this.state.score = game.getScore(team.name);
        }

        const subscriber = this.props.game.eventAggregator.subscribe('goalScored', ({goal, state}: {goal: Goal, state: State}) => {
            if (goal.teamScored == team.name) {
                this.setState({score: this.state.score + 1});
            }
        });

        this.eventSubscribers.push(subscriber);
    }

    initChangeTeamListener() {
        const handler = event => {
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
        const handler = event => {
            this.setState({
                players: this.state.players.concat(event.player)
            });
        };

        const subscriber = this.props.game.eventAggregator.subscribe(Events.PlayerJoined, handler);
        this.eventSubscribers.push(subscriber);
    }

    switchTeam() {
        const team = this.props.specs ? null : this.props.team.name;
        this.props.game.movePlayerToTeam(this.props.game.myId, team);
    }

    componentWillUnmount() {
        for (const subscriber of this.eventSubscribers) {
            subscriber.dispose();
        }
    }

    render() {
        return (
            <li>
                <span className="color-block" style={{backgroundColor: this.props.team.color}}></span>
                <a href="#" onDoubleClick={e => this.switchTeam()}>{this.props.team.name}</a>

                {!this.props.specs &&
                    <span className="score">{this.state.score}</span>
                }

                {(this.state.players.length || this.props.team.name == 'red') &&
                    <ul>
                        {this.state.players.map(player =>
                            <li key={player.clientId}>
                                <img src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
                                <span>{player.nick}</span>
                            </li>
                        )}

                        {this.props.team.name == 'red' &&
                            <li>
                                <img src={'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'} />
                                <span>socrates</span>
                            </li>
                        }
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
    players: Player[],
    score: number
};

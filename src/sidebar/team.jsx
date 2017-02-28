// @flow

import React from 'react';
import {Events} from 'nojball-game';

import Player from './player';
import withSubscribers from '../enhancers/with-subscribers';

import type {Game, JsonTeam, State, Goal, Player as PlayerType} from 'nojball-game';
import type {SubscriberCreator} from '../enhancers/with-subscribers';

type TeamProps = {
    createSubscriber: SubscriberCreator,
    game: Game,
    team: JsonTeam,
    specs?: boolean
};

type TeamState = {
    players: PlayerType[],
    score: number
};

class Team extends React.Component<void, TeamProps, TeamState> {
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
            players: game.state.getTeamPlayers(team),
            score: game.state.getTeamScore(team)
        });

        this.initStartGameListener();
        this.initGoalScoredSubscriber();
    }

    initChangeTeamListener() {
        this.props.createSubscriber(Events.ChangeTeam, (event: Events.ChangeTeam) => {
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
        });
    }

    initPlayerJoinedListener() {
        this.props.createSubscriber(Events.PlayerJoined, (event: Events.PlayerJoined) => {
            this.setState({
                players: this.state.players.concat(event.player)
            });
        });
    }

    initStartGameListener() {
        this.props.createSubscriber(Events.StartGame, (event: Events.StartGame) => {
            this.setState({score: 0});
        });
    }

    initGoalScoredSubscriber() {
        this.props.createSubscriber('goalScored', ({goal, state}: {goal: Goal, state: State}) => {
            if (goal.teamScored == this.props.team.name) {
                this.setState({score: this.state.score + 1});
            }
        });
    }

    switchTeam() {
        const {id} = this.props.game.me;

        const event = new Events.ChangeTeam(id, {
            clientId: id,
            team: this.props.specs ? null : this.props.team.name
        });

        this.props.game.addEvent(event);
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
                    <ul className="player-list">
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

export default withSubscribers(Team);

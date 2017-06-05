import React from 'react';
import styled from 'styled-components';
import { Events, Entities, State } from 'nojball-game';

import Player from './player';
import withSubscribers, { SubscriberProps } from '../../enhancers/with-subscribers';
import ColorBlock from '../../elements/color-block';

export interface TeamProps extends SubscriberProps {
    team: Entities.JsonTeam,
    specs?: boolean
}

export interface TeamState {
    players: Entities.Player[],
    score: number
}

const Item = styled.li`
    border-bottom: 1px solid #000;
    border-top: 1px solid #1f2528;
    padding: 8px 2px;

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }

    a {
        color: #fff;
        font-weight: bold;
        text-decoration: none;
    }
`;

const Score = styled.span`
    float: right;
    font-weight: bold;
`;

const Players = styled.ul`
    background: #181d20;
    font-size: 0.8rem;
    margin-top: 8px;
    list-style: none;
    padding-left: 0px;

    li {
        margin-bottom: 0;
        padding: 4px 6px;
    }
`;

class Team extends React.Component<TeamProps, TeamState> {
    state: TeamState = {
        players: [],
        score: 0
    };

    componentDidMount() {
        const { game, team, specs } = this.props;

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
            const { player } = event;

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
            this.setState({ score: 0 });
        });
    }

    initGoalScoredSubscriber() {
        this.props.createSubscriber('goalScored', ({ goal, state }: { goal: Entities.Goal, state: State }) => {
            if (goal.teamScored == this.props.team.name) {
                this.setState({ score: this.state.score + 1 });
            }
        });
    }

    switchTeam() {
        const { id } = this.props.game.me;

        const event = new Events.ChangeTeam(id, {
            clientId: id,
            team: this.props.specs ? null : this.props.team.name
        });

        this.props.game.addEvent(event);
    }

    render() {
        return (
            <Item>
                <a href="#" onDoubleClick={e => this.switchTeam()}>
                    <ColorBlock style={{ backgroundColor: this.props.team.color }}></ColorBlock>
                    <span>{this.props.team.name}</span>
                </a>

                {!this.props.specs &&
                    <Score>{this.state.score}</Score>
                }

                {this.state.players.length > 0 &&
                    <Players>
                        {this.state.players.map(player =>
                            <li key={player.clientId}>
                                <Player game={this.props.game} player={player} />
                            </li>
                        )}
                    </Players>
                }
            </Item>
        );
    }
}

export default withSubscribers(Team);

// @flow

import React from 'react';
import {Events} from 'nojball-game';

import Chat from './chat';
import Menu from './menu';
import Pitch from './pitch';
import Sidebar from './sidebar';
import TopBar from './topbar';

import grassImage from '../images/grass.png';

import type {Game as GameType, Renderer} from 'nojball-game';

export default class Game extends React.Component<void, GameProps, GameState> {
    eventSubscribers = [];
    state: GameState = {
        playing: false
    };

    constructor(props: GameProps) {
        super(props);
        const {game} = props;

        this.state.playing = game.isPlaying();

        const startGameHandler = () => {
            this.setState({playing: true});
        };

        const stopGameHandler = () => {
            this.setState({playing: false});
        };

        this.eventSubscribers = [
            game.eventAggregator.subscribe(Events.StartGame, startGameHandler),
            game.eventAggregator.subscribe(Events.StopGame, stopGameHandler)
        ];
    }

    componentWillUnmount() {
        for (const subscriber of this.eventSubscribers) {
            subscriber.dispose();
        }
    }

    render() {
        const {game} = this.props;

        return (
            <div className="game-container">
                <div className="main-area">
                    {this.state.playing &&
                        <TopBar game={game} />
                    }

                    <div className="content">
                        <Pitch game={game} renderer={this.props.renderer} />

                        {!this.state.playing &&
                            <div className="menu-container">
                                <Menu game={game} />
                            </div>
                        }
                    </div>

                    <div className="chat-container">
                        <Chat game={game} />
                    </div>
                </div>

                <Sidebar game={game} />
            </div>
        );
    }
}

type GameProps = {
    game: GameType,
    renderer: Renderer
};

type GameState = {
    playing: boolean
};

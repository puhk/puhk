// @flow

import React from 'react';
import {Events} from 'nojball-game';

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

        this.state.playing = this.props.game.isPlaying();

        const startGame = this.props.game.eventAggregator.subscribe(Events.StartGame, (msg) => {
            this.setState({playing: true});
        });

        const stopGame = this.props.game.eventAggregator.subscribe(Events.StopGame, (msg) => {
            this.setState({playing: false});
        });

        this.eventSubscribers = [startGame, stopGame];
    }

    componentWillUnmount() {
        for (const subscriber of this.eventSubscribers) {
            subscriber.dispose();
        }
    }
    
    render() {
        let mainArea;

        if (this.state.playing) {
            mainArea = (
                <div>
                    <TopBar game={this.props.game} />
                    <Pitch renderer={this.props.renderer} />
                </div>
            );
        } else {
            mainArea = <div className="menu" />
        }

        return (
            <div className="game-container">
                <div className="main-area">{mainArea}</div>
                <Sidebar game={this.props.game} />
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

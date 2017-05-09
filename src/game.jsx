// @flow

import React from 'react';
import {Events} from 'nojball-game';

import Chat from './chat';
import Menu from './menu';
import Pitch from './pitch';
import Sidebar from './sidebar';
import TopBar from './topbar';
import withSubscribers from './enhancers/with-subscribers';

import grassImage from '../images/grass.png';

import type {Game as GameType, Renderer} from 'nojball-game';
import type {SubscriberCreator} from './enhancers/with-subscribers';

type GameProps = {
    createSubscriber: SubscriberCreator,
    game: GameType,
    renderer: Renderer
};

type GameState = {
    playing: boolean,
    showMenu: boolean
};

class Game extends React.Component<void, GameProps, GameState> {
    state: GameState = {
        playing: false,
        showMenu: false
    };

    constructor(props: GameProps) {
        super(props);

        this.state.playing = props.game.state.playing;
    }

    componentDidMount() {
        this.props.createSubscriber(Events.StartGame, () => {
            this.setState({
                playing: true,
                showMenu: false
            });
        });

        this.props.createSubscriber(Events.StopGame, () => {
            this.setState({playing: false});
        });
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    };

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

                        {(this.state.showMenu || !this.state.playing) &&
                            <div className="menu-container">
                                <Menu game={game} />
                            </div>
                        }
                    </div>

                    <div className="chat-container">
                        <Chat game={game} />
                    </div>
                </div>

                <Sidebar game={game} toggleMenu={this.toggleMenu} />
            </div>
        );
    }
}

export default withSubscribers(Game);

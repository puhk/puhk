// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {GameCreator, Renderer, Background} from 'nojball-game';

import Game from './game';
import grassImage from '../images/grass.png';
import '../styles/main.scss';

import type {Game as GameType} from 'nojball-game';

const renderer = new Renderer;

const img = new Image;
img.src = grassImage;
Background.images.grass = img;

const render = (game: GameType) => {
    ReactDOM.render(
        <AppContainer>
            <Game game={game} renderer={renderer} />
        </AppContainer>,
        document.getElementById('gameMount')
    );
};

const host = (name: string, avatar: number|string) => {
    const game = GameCreator.host(renderer);
    window.game = game;

    game.setLocalPlayer({name, avatar});

    render(game);
};

const join = (host: string, avatar: number|string) => {
    const game = GameCreator.join(host, renderer);
    window.game = game;

    render(game);
};

window.host = host;
window.join = join;

// Hot Module Replacement API
if (module.hot && typeof module.hot.accept == 'function') {
    module.hot.accept('./game', () => {
        const Game = require('./game').default;

        ReactDOM.render(
            <AppContainer>
                <Game game={window.game} renderer={renderer} />
            </AppContainer>,
            document.getElementById('gameMount')
        );
    });
}

// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {GameCreator, Renderer, Background} from 'nojball-game';

import Game from './game.jsx';
import grassImage from '../images/grass.png';
import '../styles/main.scss';

import type {Game as GameType} from 'nojball-game';

const renderer = new Renderer;

const img = new Image;
img.src = grassImage;
Background.images.grass = img;

const render = (game: GameType) => {
    ReactDOM.render(
        <Game game={game} renderer={renderer} />,
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

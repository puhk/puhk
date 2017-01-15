// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {GameCreator, Renderer, Background} from 'nojball-game';

import Game from './game.jsx';
import grassImage from '../images/grass.png';
import '../styles/main.scss';

const renderer = new Renderer;
const game = GameCreator.host(renderer);
window.game = game;

const img = new Image;
img.src = grassImage;
Background.images.grass = img;

ReactDOM.render(
    <Game game={game} renderer={renderer} />,
    document.getElementById('gameMount')
);

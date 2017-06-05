import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { host, join, Game as GameType, Renderer, Background } from 'nojball-game';

import Game from '../src/components/game';
const grassImage = require('./images/grass.png') as string;

interface Window {
    game: GameType;
    host: (name: string, avatar: string) => void;
    join: (host: string, avatar: string) => void;
}

declare var window: Window;

const renderer = new Renderer;

const img = new Image;
img.src = grassImage;
Background.images.set('grass', img);

const render = (game: GameType) => {
    ReactDOM.render(
        <AppContainer>
            <Game game={ game } renderer={ renderer } />
        </AppContainer>,
        document.getElementById('gameMount')
    );
};

const hostGame = (name: string, avatar: string) => {
    const game = host({
        host: 'localhost',
        path: '/p2p',
        renderer
    }).then(game => {
        window.game = game;
        render(game);
    });
};

const joinGame = (host: string, avatar: string) => {
    const game = join({
        host: 'localhost',
        path: '/p2p',
        id: host,
        renderer
    }).then(game => {
        window.game = game;
        render(game);
    });
};

window.host = hostGame;
window.join = joinGame;

// Hot Module Replacement API
if (module.hot && typeof module.hot.accept == 'function') {
    module.hot.accept('../src/components/game', () => {
        const Game = (require('../src/components/game') as any).default;

        ReactDOM.render(
            <AppContainer>
                <Game game={ window.game } renderer={ renderer } />
            </AppContainer>,
            document.getElementById('gameMount')
        );
    });
}

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { host, join, NetworkController, Renderer, Background } from '@nojball/client';

import Game from '../src/components/game';
const grassImage = require('./images/grass.png') as string;

interface Window {
    controller: NetworkController;
    host: (name: string, avatar: string) => void;
    join: (host: string, name: string, avatar: string) => void;
}

declare var window: Window;

const renderer = new Renderer;

const img = new Image;
img.src = grassImage;
Background.images.grass = img;

const render = (controller: NetworkController) => {
    ReactDOM.render(
        <AppContainer>
            <Game controller={ controller } renderer={ renderer } />
        </AppContainer>,
        document.getElementById('gameMount')
    );
};

const hostGame = (name: string, avatar: string) => {
    host({
        host: 'localhost',
        path: '/p2p',
        player: { name, avatar},
        renderer
    }).then(controller => {
        window.controller = controller;
        render(controller);
    }).catch(e => {
        console.log('failed to connect', e);
    });
};

const joinGame = (host: string, name: string, avatar: string) => {
    join({
        host: 'localhost',
        path: '/p2p',
        player: { name, avatar },
        roomId: host,
        renderer
    }).then(controller => {
        window.controller = controller;
        render(controller);
    }).catch(e => {
        console.log('failed to connect', e);
    });
};

window.host = hostGame;
window.join = joinGame;

// Hot Module Replacement API
if (module.hot && typeof module.hot.accept == 'function') {
    module.hot.accept('../src/components/game', () => {
        const Game = (require('../src/components/game') as any).default;
        render(window.controller);
    });
}

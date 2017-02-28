// @flow

import React from 'react';

import Input from './input';
import MessageList from './message-list';

import type {Game} from 'nojball-game';

type ChatProps = {
    game: Game
};

export default ({game}: ChatProps) => (
    <div className="chat">
        <div className="messages">
            <MessageList game={game} />
        </div>

        <Input game={game} />
    </div>
);

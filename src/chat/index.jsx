// @flow

import React from 'react';

import Input from './input';
import MessageList from './message-list';

import type {Game} from 'nojball-game';

export default (props: ChatProps) => (
    <div className="chat">
        <div className="messages">
            <MessageList game={props.game} />
        </div>

        <Input game={props.game} />
    </div>
);

type ChatProps = {
    game: Game
};

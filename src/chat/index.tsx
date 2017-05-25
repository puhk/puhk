import React from 'react';
import styled from 'styled-components';
import { Game } from 'nojball-game';

import Input from './input';
import MessageList from './message-list';

export interface ChatProps {
    game: Game
}

const Chat = styled.div`
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    width: 75%;
`;

const Messages = styled.div`
    color: #efefef;
    font-size: 0.8rem;
    flex: 1;
    height: calc(100% - 25px);
    margin: 0;
    padding: 5px 8px;
`;

export default ({ game }: ChatProps) => (
    <Chat>
        <Messages>
            <MessageList game={game} />
        </Messages>

        <Input game={game} />
    </Chat>
);

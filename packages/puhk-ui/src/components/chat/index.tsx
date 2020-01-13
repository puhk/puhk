import React from 'react';
import styled from 'styled-components';
import { Entities } from '@puhk/puhk-core';

import Input from './input';
import MessageList from './message-list';
import { ControllerProps } from '../component-props';

export interface ChatProps extends ControllerProps {
	messages: Entities.ChatMessage[];
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

const component = ({ controller, messages }: ChatProps) => (
	<Chat>
		<Messages>
			<MessageList controller={controller} messages={messages} />
		</Messages>

		<Input controller={controller} />
	</Chat>
);

export default React.memo(component);

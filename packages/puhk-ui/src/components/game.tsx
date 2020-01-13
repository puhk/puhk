import React from 'react';
import styled from 'styled-components';
import { autobind } from 'core-decorators';
import { NetworkController, Renderer, State } from '@puhk/puhk-core';

import Chat from './chat';
import Menu from './menu';
import Pitch from './pitch';
import Sidebar from './sidebar';
import TopBar from './topbar';
import colors from '../colors';

export interface GameProps {
	controller: NetworkController;
	renderer: Renderer;
}

interface GameState {
	gameState: State;
	showMenu: boolean;
}

const GameContainer = styled.div`
	display: flex;
	height: 100%;
`;

const MainArea = styled.div`
	display: flex;
	flex: 5;
	flex-direction: column;
	position: relative;
`;

const Content = styled.div`
	flex: 1;
	position: relative;
`;

const MenuContainer = styled.div`
	bottom: 0;
	display: flex;
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
`;

const ChatContainer = styled.div`
	background: ${colors.bg};
	flex: 1;
	max-height: 25%;
	padding: 1%;
`;

class Game extends React.PureComponent<GameProps, GameState> {
	interval: Nullable<number> = null;

	state: GameState = {
		gameState: this.props.controller.getCurrentState(),
		showMenu: false,
	};

	@autobind
	updateState() {
		this.setState({ gameState: this.props.controller.getCurrentState() });
	}

	componentDidMount() {
		this.interval = window.setInterval(this.updateState, 100);
	}

	componentWillUnmount() {
		if (this.interval) {
			window.clearInterval(this.interval);
			this.interval = null;
		}
	}

	toggleMenu = () => {
		this.setState(state => ({ showMenu: !state.showMenu }));
	};

	render() {
		const { controller } = this.props;
		const { gameState } = this.state;

		if (!gameState) {
			return null;
		}

		return (
			<GameContainer>
				<MainArea>
					{gameState.playing && (
						<TopBar
							controller={controller}
							teams={gameState.stadium.teams}
							scores={gameState.scores}
							roomName={gameState.roomName}
							timer={gameState.timer}
							timeLimit={gameState.timeLimit}
						/>
					)}

					<Content>
						<Pitch controller={controller} renderer={this.props.renderer} />

						{(this.state.showMenu || !gameState.playing) && (
							<MenuContainer>
								<Menu controller={controller} gameState={gameState} />
							</MenuContainer>
						)}
					</Content>

					<ChatContainer>
						<Chat controller={controller} messages={gameState.chatMessages} />
					</ChatContainer>
				</MainArea>

				<Sidebar
					controller={controller}
					teams={gameState.stadium.teams}
					players={gameState.players}
					scores={gameState.scores}
					playing={gameState.playing}
					toggleMenu={this.toggleMenu}
				/>
			</GameContainer>
		);
	}
}

export default Game;

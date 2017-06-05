import React from 'react';
import styled from 'styled-components';
import { Events, Renderer } from 'nojball-game';

import Chat from './chat';
import Menu from './menu';
import Pitch from './pitch';
import Sidebar from './sidebar';
import TopBar from './topbar';
import withSubscribers, { SubscriberProps } from '../enhancers/with-subscribers';
import colors from '../colors';

export interface GameProps extends SubscriberProps {
    renderer: Renderer
}

interface GameState {
    playing: boolean,
    showMenu: boolean
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

class Game extends React.Component<GameProps, GameState> {
    state: GameState = {
        playing: false,
        showMenu: false
    };

    constructor(props: GameProps) {
        super(props);

        this.state.playing = props.game.state.playing;
    }

    componentDidMount() {
        this.props.createSubscriber(Events.StartGame, () => {
            this.setState({
                playing: true,
                showMenu: false
            });
        });

        this.props.createSubscriber(Events.StopGame, () => {
            this.setState({ playing: false });
        });
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    };

    render() {
        const { game } = this.props;

        return (
            <GameContainer>
                <MainArea>
                    {this.state.playing &&
                        <TopBar game={game} />
                    }

                    <Content>
                        <Pitch game={game} renderer={this.props.renderer} />

                        {(this.state.showMenu || !this.state.playing) &&
                            <MenuContainer>
                                <Menu game={game} />
                            </MenuContainer>
                        }
                    </Content>

                    <ChatContainer>
                        <Chat game={game} />
                    </ChatContainer>
                </MainArea>

                <Sidebar game={game} toggleMenu={this.toggleMenu} />
            </GameContainer>
        );
    }
}

export default withSubscribers(Game);

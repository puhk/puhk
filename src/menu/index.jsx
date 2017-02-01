// @flow

import React from 'react';
import {Events, defaultStadiums} from 'nojball-game';

import type {Game, Stadium} from 'nojball-game';

export default class Menu extends React.Component<void, MenuProps, MenuState> {
    state: MenuState = {
        currentStadium: null,
        roomNameInput: '',
        roomName: '',
        stadiums: [],
        scoreLimit: 0,
        timeLimit: 0
    };

    subscribers = [];

    constructor(props: MenuProps) {
        super(props);

        this.state.stadiums = defaultStadiums;
    }

    componentDidMount() {
        const {game} = this.props;

        this.setState({
            currentStadium: game.getStadium(),
            roomName: game.getRoomName(),
            roomNameInput: game.getRoomName(),
            scoreLimit: game.getScoreLimit(),
            timeLimit: game.getTimeLimit()
        });

        this.createSubscriber(Events.ChangeRoomName, (event: Events.ChangeRoomName) => {
            this.setState({roomName: event.data.name});
        });

        this.createSubscriber(Events.ChangeStadium, (event: Events.ChangeStadium) => {
            this.setState({currentStadium: event.stadium});
        });

        this.createSubscriber(Events.ChangeScoreLimit, (event: Events.ChangeScoreLimit) => {
            this.setState({scoreLimit: event.data.limit});
        });

        this.createSubscriber(Events.ChangeTimeLimit, (event: Events.ChangeTimeLimit) => {
            this.setState({timeLimit: event.data.limit});
        });
    }

    componentWillUnmount() {
        for (const subscriber of this.subscribers) {
            subscriber.dispose();
        }
    }

    createSubscriber<T>(event: Class<T>, handler: (event: T) => void) {
        const subscriber = this.props.game.eventAggregator.subscribe(event, handler);
        this.subscribers.push(subscriber);
    }

    changeRoomName(event: SyntheticInputEvent) {
        this.setState({
            roomNameInput: event.target.value
        });
    }

    setRoomName() {
        this.props.game.setRoomName(this.state.roomNameInput);
    }

    changeStadium(event: SyntheticInputEvent) {
        const stadium = this.state.stadiums.find(stadium => stadium.name == event.target.value);

        if (stadium) {
            this.props.game.changeStadium(stadium);
        }
    }

    changeScoreLimit(event: SyntheticInputEvent) {
        this.props.game.setScoreLimit(parseInt(event.target.value));
    }

    changeTimeLimit(event: SyntheticInputEvent) {
        this.props.game.setTimeLimit(parseInt(event.target.value));
    }

    render() {
        return (
            <div className="menu">
                <div className="setting-group">
                    <h2>Room Settings</h2>

                    <div className="input-group">
                        <label>
                            <span>Room name</span>
                            <input type="text" onChange={e => this.changeRoomName(e)} onBlur={() => this.setRoomName()} value={this.state.roomNameInput} />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Password</span>
                            <input type="password" />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Max players</span>
                            <input type="number" />
                        </label>
                    </div>
                </div>

                <div className="setting-group">
                    <h2>Match settings</h2>

                    <div className="input-group">
                        <label>
                            <span>Time limit</span>
                            <input type="number" min="0" onChange={e => this.changeTimeLimit(e)} value={this.state.timeLimit} />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Score limit</span>
                            <input type="number" min="0" onChange={e => this.changeScoreLimit(e)} value={this.state.scoreLimit} />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Stadium</span>

                            <select
                                onChange={e => this.changeStadium(e)}
                                value={(this.state.currentStadium && this.state.currentStadium.name) || ''}
                                disabled={this.props.game.isPlaying()}>
                                {this.state.stadiums.map(stadium =>
                                    <option value={stadium.name} key={stadium.name}>{stadium.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

type MenuProps = {
    game: Game
};

type MenuState = {
    currentStadium: ?Stadium,
    roomName: string,
    roomNameInput: string,
    stadiums: Stadium[],
    scoreLimit: number,
    timeLimit: number
};

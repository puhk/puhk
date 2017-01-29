// @flow

import React from 'react';
import {Events, defaultStadiums} from 'nojball-game';

import type {Game, Stadium} from 'nojball-game';

export default class Menu extends React.Component<void, MenuProps, MenuState> {
    state: MenuState = {
        currentStadium: null,
        stadiums: []
    };

    stadiumSubscriber: any;

    constructor(props: MenuProps) {
        super(props);

        this.state.stadiums = defaultStadiums;
    }

    componentDidMount() {
        this.setState({
            currentStadium: this.props.game.getStadium()
        });

        const handler = (event: Events.ChangeStadium) => {
            this.setState({currentStadium: event.stadium});
        };

        this.stadiumSubscriber = this.props.game.eventAggregator.subscribe(Events.ChangeStadium, handler);
    }

    componentWillUnmount() {
        this.stadiumSubscriber.dispose();
    }

    changeStadium(event: SyntheticInputEvent) {
        const stadium = this.state.stadiums.find(stadium => stadium.name == event.target.value);

        if (stadium) {
            this.props.game.changeStadium(stadium);
        }
    }

    render() {
        return (
            <div className="menu">
                <div className="setting-group">
                    <h2>Room Settings</h2>

                    <div className="input-group">
                        <label>
                            <span>Room name</span>
                            <input type="text" />
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
                            <input type="number" />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Score limit</span>
                            <input type="number" />
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            <span>Stadium</span>

                            <select onChange={e => this.changeStadium(e)} value={(this.state.currentStadium && this.state.currentStadium.name) || ''}>
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
    stadiums: Stadium[]
};

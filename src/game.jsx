import React from 'react';
import {GameCreator, Renderer, Events, Background} from 'nojball-game';

import View from './view';
import grassImage from '../images/grass.png';

export default class Game extends React.Component {
    eventSubscribers = {};

    constructor(props) {
        super(props);

        this.state = {
            playing: this.props.game.simulator.currentState && this.props.game.simulator.currentState.playing
        };
    }

    componentDidMount() {
        let startGame = this.props.game.eventAggregator.subscribe(Events.StartGame, (msg) => {
            this.setState({playing: true});
        });

        let stopGame = this.props.game.eventAggregator.subscribe(Events.StopGame, (msg) => {
            this.setState({playing: false});
        });

        this.eventSubscribers = {startGame, stopGame};
    }

    componentWillUnmount() {
        this.eventSubscribers.startGame.dispose();
        this.eventSubscribers.stopGame.dispose();
    }
    
    render() {
        return <div>
            {this.state.playing ? <View renderer={this.props.renderer} /> : ''}
        </div>;
    }
}

// @flow

import React from 'react';

import type {Game} from 'nojball-game';

export default class Timer extends React.Component {
    state: TimerState = {
        timer: 0
    };

    timerInterval: number;

    componentDidMount() {
        const game = this.props.game;

        const updateTimer = () => {
            this.timerInterval = requestAnimationFrame(updateTimer);

            const timer =  game.getTimer();
            const currentSeconds = Math.floor(this.state.timer % 60);
            const newSeconds = Math.floor(timer % 60);

            if (Math.floor(timer) > Math.floor(this.state.timer)) {
                this.setState({timer});
            }
        };

        this.timerInterval = requestAnimationFrame(updateTimer);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timerInterval);
    }

    render() {
        const mins = Math.floor(this.state.timer / 60);
        const seconds = Math.floor(this.state.timer % 60);
        const timer = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

        return <div className="timer">{timer}</div>;
    }
}

type TimerProps = {
    game: Game
};

type TimerState = {
    timer: number
};

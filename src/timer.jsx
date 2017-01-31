// @flow

import React from 'react';

import type {Game} from 'nojball-game';

export default class Timer extends React.Component<void, TimerProps, TimerState> {
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
        const {timer} = this.state;
        const {game} = this.props;

        const mins = Math.floor(timer / 60);
        const seconds = Math.floor(timer % 60);
        const time = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

        const timeLimit = game.getTimeLimit() * 60;
        const overtime = timer > timeLimit && game.scoresEqual();
        const flash = timer <= timeLimit && timer > timeLimit - 30;

        return (
            <div className="timer">
                {overtime &&
                    <span className="overtime">overtime</span>
                }
                <span className={`${flash ? 'flash' : ''}`}>{time}</span>
            </div>
        );
    }
}

type TimerProps = {
    game: Game
};

type TimerState = {
    timer: number
};

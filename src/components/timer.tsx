import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Game } from 'nojball-game';

export interface TimerProps {
    game: Game;
}

export interface TimerState {
    timer: number;
}

interface TimeProps {
    flash: boolean;
}

const MatchTimer = styled.div`
    text-align: right;
`;

const Overtime = styled.span`
    font-size: 0.6rem;
    letter-spacing: 1px;
    margin-right: 5px;
    text-transform: uppercase;
`;

const flash = keyframes`
    from {
        color: white;
    }

    to {
        color: #e35252;
    }
`;

const Time = styled.span`
    ${(props: TimeProps) => props.flash &&
        `animation: ${flash} linear 500ms alternate infinite`
    }
`;

export default class Timer extends React.Component<TimerProps, TimerState> {
    state: TimerState = {
        timer: 0
    };

    timerInterval: number;

    componentDidMount() {
        const game = this.props.game;

        const updateTimer = () => {
            this.timerInterval = requestAnimationFrame(updateTimer);

            const timer = game.state.timer;
            const currentSeconds = Math.floor(this.state.timer % 60);
            const newSeconds = Math.floor(timer % 60);

            if (Math.floor(timer) > Math.floor(this.state.timer)) {
                this.setState({ timer });
            }
        };

        this.timerInterval = requestAnimationFrame(updateTimer);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timerInterval);
    }

    render() {
        const { timer } = this.state;
        const { game } = this.props;

        const mins = Math.floor(timer / 60);
        const seconds = Math.floor(timer % 60);
        const time = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

        const timeLimit = game.state.timeLimit * 60;

        return (
            <MatchTimer>
                {timer > timeLimit && game.scoresEqual() &&
                    <Overtime>overtime</Overtime>
                }
                <Time flash={timer <= timeLimit && timer > timeLimit - 30}>{time}</Time>
            </MatchTimer>
        );
    }
}

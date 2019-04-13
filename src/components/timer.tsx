import React from 'react';
import styled, { keyframes } from 'styled-components';
import { scoresEqual } from '@nojball/client';
import { ControllerProps } from './component-props';

export interface TimerProps extends ControllerProps {
    timer: number;
    timeLimit: number;
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

const component = ({ controller, timer, timeLimit }: TimerProps) => {
    const mins = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const time = `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

    const secondsLimit = timeLimit * 60;

    return (
        <MatchTimer>
            {timer > secondsLimit * 60 && scoresEqual(controller.getCurrentState()) &&
                <Overtime>overtime</Overtime>
            }
            <Time flash={timer <= secondsLimit && timer > secondsLimit - 30}>{time}</Time>
        </MatchTimer>
    );
};

const areEqual = (prevProps: TimerProps, nextProps: TimerProps) => Math.floor(nextProps.timer) === Math.floor(prevProps.timer)
export default React.memo(component, areEqual);

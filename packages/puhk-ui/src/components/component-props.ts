import { NetworkController, State } from '@nojball/client';

export interface StateProps {
    gameState: State;
}

export interface ControllerProps {
    controller: NetworkController;
}

export interface StateControllerProps extends StateProps, ControllerProps { }

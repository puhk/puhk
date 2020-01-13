import { NetworkController, State } from '@puhk/puhk-core';

export interface StateProps {
	gameState: State;
}

export interface ControllerProps {
	controller: NetworkController;
}

export interface StateControllerProps extends StateProps, ControllerProps {}

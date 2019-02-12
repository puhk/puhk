import * as Entities from './entities';
import * as Events from './state/event/events';
import big from './stadiums/big';
import classic from './stadiums/classic';

const defaultStadiums: Entities.Stadium[] = [
    Entities.Stadium.parse(classic),
    Entities.Stadium.parse(big),
];

export { host, join } from './init';
export { default as Renderer } from './Renderer';
export { NetworkController } from './controller/NetworkController'
export { default as Background } from './entities/Background';
export { Goal } from './entities/Stadium';
export { default as State } from './state/State';
export { Event } from './state/event';
export * from './state/funcs/player';
export { scoresEqual } from './state/funcs/end-game';
export { Entities, Events, defaultStadiums };

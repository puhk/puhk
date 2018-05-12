import * as Entities from './entities';
import { JsonStadium } from './entities/Stadium';
import * as Events from './state/event/events';
import big from './stadiums/big';
import classic from './stadiums/classic';

let defaultStadiums: Entities.Stadium[] = [];
defaultStadiums.push(Entities.Stadium.parse(classic));
defaultStadiums.push(Entities.Stadium.parse(big));

export { host, join } from './GameCreator';
export { default as Renderer } from './Renderer';
export { default as State } from './state/State';
export { default as Background } from './entities/Background';
export { Entities, Events, defaultStadiums };

// @flow

import Stadium from './entities/Stadium';
import classic from './stadiums/classic.json';
import big from './stadiums/big.json';

let defaultStadiums: Stadium[] = [];
defaultStadiums.push(Stadium.parse(classic));
defaultStadiums.push(Stadium.parse(big));

export {default as GameCreator} from './GameCreator';
export {default as Renderer} from './Renderer';
export {default as Background} from './entities/Background';
export * as Events from './state/events';
export {defaultStadiums};

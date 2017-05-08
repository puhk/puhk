import Stadium from './entities/Stadium';
import * as Events from './state/events';
const classic = require('./stadiums/classic.json');
const big = require('./stadiums/big.json');

let defaultStadiums: Stadium[] = [];
defaultStadiums.push(Stadium.parse(classic));
defaultStadiums.push(Stadium.parse(big));

export { host, join } from './GameCreator';
export { default as Renderer } from './Renderer';
export { default as Background } from './entities/Background';
export { Events };
export { defaultStadiums };

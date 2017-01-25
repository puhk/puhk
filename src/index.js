// @flow

import Stadium from './entities/Stadium';
import classic from './stadiums/classic.json';
import big from './stadiums/big.json';

export {default as GameCreator} from './GameCreator';
export {default as Renderer} from './Renderer';
export {default as Background} from './entities/Background';
export * as Events from './state/events';

export let stadiums = {
    classic: Stadium.parse(classic),
    big: Stadium.parse(big)
};

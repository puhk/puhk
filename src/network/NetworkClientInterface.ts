import { PlayerInfo } from '../controller/NetworkController';

export default interface NetworkClientInterface {
    connectTo(host: string, player: PlayerInfo): Promise<void>;
}

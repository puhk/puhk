export default interface NetworkClientInterface {
    connectTo(host: string): Promise<void>;
}

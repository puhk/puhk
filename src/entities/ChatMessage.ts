export interface JsonChatMessage {
    playerId: number;
    msg: string;
}

export default class ChatMessage {
    public constructor(private playerId: number, private msg: string) {}

    public pack(): JsonChatMessage {
        return {
            playerId: this.playerId,
            msg: this.msg
        };
    }

    public static parse(data: JsonChatMessage) {
        return new ChatMessage(data.playerId, data.msg);
    }
}

// @flow

export default class ChatMessage {
    playerId: number;
    msg: string;

    constructor(playerId: number, msg: string) {
        this.playerId = playerId;
        this.msg = msg;
    }

    pack(): JsonChatMessage {
        return {
            playerId: this.playerId,
            msg: this.msg
        };
    }

    static parse(data: JsonChatMessage) {
        return new ChatMessage(data.playerId, data.msg);
    }
}

export type JsonChatMessage = {
    playerId: number,
    msg: string
};

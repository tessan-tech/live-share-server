import { ParticipantData } from "./participantData";

export class Store{
    private store : Map<string, ParticipantData>;

    constructor() {
        this.store = new Map<string, ParticipantData>();
    }

    public getData(socketId: string) : ParticipantData {
        return this.store.get(socketId)!;
    }

    public createData(socketId: string) : ParticipantData {
        const data = new ParticipantData();
        this.store.set(socketId, data);
        return data;
    }
}
export interface IResponseEvent {
    eventName: string
    getArguments(): any[]
}

export class TroloController {
    private actions : {key: string; action: (...params: any[]) => any}[];

    constructor() {
        this.actions = [
            {key: "a", action: this.invite}
        ]
    }

    public subscribe(socket: any): void {
        this.actions.forEach((key, action) => socket.on(key, action));
    }


    public invite(nickname: string, age: number) : void {
        return;
    }

    
}
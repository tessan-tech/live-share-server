export interface Socket extends NodeJS.EventEmitter {
    id: string;
    rooms: { [id: string]: string };
    connected: boolean;
    disconnected: boolean;
    json: Socket;
    volatile: Socket;
    broadcast: Socket;
    to( room: string ): Socket;
    in( room: string ): Socket;
    send( ...args: any[] ): Socket;
    write( ...args: any[] ): Socket;
    join( name: string|string[], fn?: ( err?: any ) => void ): Socket;
    leave( name: string, fn?: Function ): Socket;
    leaveAll(): void;
    disconnect( close?: boolean ): Socket;
    listeners( event: string ):Function[];
    compress( compress: boolean ): Socket;
    error(err: any): void;
}
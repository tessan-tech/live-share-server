export interface Packet extends Array<any> {
    /**
     * Event name
     */
    [0]: string;
    /**
     * Packet data
     */
    [1]: any;
    /**
     * Ack function
     */
    [2]: (...args: any[]) => void;
}
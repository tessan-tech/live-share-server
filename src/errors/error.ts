export class Error{
    public readonly message?: string;
    public readonly code: ErrorCode;

    constructor(code : ErrorCode, message?: string){
        this.code = code;
        this.message = message; 
    }
}

export enum ErrorCode{
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    CANT_CREATE_CONFERENCE_USER_ALREADY_ASSIGNED = "CANT_CREATE_CONFERENCE_USER_ALREADY_ASSIGNED"
}
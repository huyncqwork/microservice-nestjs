export class BaseResponse<T> {
    data: T;
    status: number;
    messages: string;

    constructor( data: T, status: number, messages: string ) {
        this.data = data;
        this.status = status;
        this.messages = messages;
    }
}
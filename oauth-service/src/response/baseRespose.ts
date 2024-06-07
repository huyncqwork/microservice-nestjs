export class BaseResponse<T>  {
    data: T;
    status: number;
    messages: string;

    constructor(data:T, messages:string, status:number ) {
        this.data = data ;
        this.status = status;
        this.messages = messages;
    }
}
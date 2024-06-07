import { BaseResponse } from "./baseResponse";

export class ExceptionResponse<T> extends BaseResponse<T> {
    constructor( data: T, status: number, messages: string ) {
        super( data, status, messages );
    }
}
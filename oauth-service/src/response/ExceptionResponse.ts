import { BaseResponse } from './baseRespose';

export class ExceptionResponse<T> extends BaseResponse<T> {
  constructor( data: T, message: string, statusCode: number) {
    super(data, message, statusCode);
  }
}

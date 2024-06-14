import { Observable } from "rxjs";

export interface GrpcInventoryClientService {
    CreateInventory(data: CreateInventoryRequest): Observable<EmptyDataResponse>;
}

export interface CreateInventoryRequest {
    id: number;
}

export interface EmptyDataResponse {
    data: null;
    message: string,
    status: number
}
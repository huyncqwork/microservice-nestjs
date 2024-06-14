import { Observable } from 'rxjs';

export interface GrpcClientProductService {
  GetProduct(data: ProductRequest): Observable<ProductResponse>;
}

export interface ProductRequest {
  id: number;
}

export interface ProductResponse {
  id: number;
  images: string;
  name_product: string;
  price: number;
  description: string;
  status: boolean;
}

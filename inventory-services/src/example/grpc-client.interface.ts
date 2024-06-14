import { Observable } from 'rxjs';

export interface EmptyDataResponse {
  status: number;
  message: string;
  data: null;
}

export interface CustomerAlolineProfileDTO {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  birthday: string;
  gender: number;
  city_id: number;
  district_id: number;
  ward_id: number;
  status: number;
  address_full_text: string;
  avatar: string;
  email: string;
  nick_name: string;
  street_name: string;
}

export interface UpdateAvatarUserDTO {
  user_id: number;
  avatar: string;
}

export interface NestjsSyncAlolineService {
  syncUpdateUser(data: CustomerAlolineProfileDTO): Observable<EmptyDataResponse>;
  syncUpdateAvatarUser(data: UpdateAvatarUserDTO): Observable<EmptyDataResponse>;
}

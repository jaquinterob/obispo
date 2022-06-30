import { Joven } from './models/joven';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import { Action } from './models/action';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(
      `${environment.server}:5050/api_mongo/test/user/login`,
      user
    );
  }

  guardarNuevoJoven(joven: Joven): Observable<any> {
    return this.http.post(
      `${environment.server}:5050/api_mongo/test/young`,
      joven
    );
  }

  getAllJovenes(ward: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/young/all/${ward}`
    );
  }

  guardarNuevoRegistro(action: Action): Observable<any> {
    return this.http.post(
      `${environment.server}:5050/api_mongo/test/action`,
      action
    );
  }

  deleteJoven(_id: string): Observable<any> {
    return this.http.delete(
      `${environment.server}:5050/api_mongo/test/young/${_id}`
    );
  }

  getJoven(_id: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/young/${_id}`
    );
  }

  getMinistraciones(_id: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/action/${_id}/ministracion`
    );
  }

  getPreocupaciones(_id: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/action/${_id}/preocupacion`
    );
  }

  getDeseos(_id: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/action/${_id}/deseo`
    );
  }

  getTalentos(_id: string): Observable<any> {
    return this.http.get(
      `${environment.server}:5050/api_mongo/test/action/${_id}/talento`
    );
  }

  deleteAction(_id: string): Observable<any> {
    return this.http.delete(
      `${environment.server}:5050/api_mongo/test/action/${_id}`
    );
  }

  uploadPhoto(formData: FormData): Observable<any> {
    return this.http.post(
      `${environment.server}:5050/api_mongo/test/upload/photo`,
      formData
    );
  }
}

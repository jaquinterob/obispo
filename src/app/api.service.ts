import { Joven } from './models/joven';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import { Registro } from './models/registro';

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

  getAllJovenes(): Observable<any> {
    return this.http.get(`${environment.server}:5050/api_mongo/test/young`);
  }

  guardarNuevoRegistro(registro:Registro): Observable<any> {
   return this.http.post(
     `${environment.server}:5050/api_mongo/test/action`,
     registro
   );
  }
}

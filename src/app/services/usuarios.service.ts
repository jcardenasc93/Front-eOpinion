import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) {}

  loginUser(user, pass): Observable<any> {
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/auth/token/login/', {username: user, password: pass});
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  token = sessionStorage.getItem('token');
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) {
  }

  loginUser(user, pass): Observable<any> {
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/auth/token/login/', {username: user, password: pass});
  }

  getUserByToken(): Observable<any> {
    console.log("token en servicio ", this.token)
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/self', {'headers': headers});
  }
}

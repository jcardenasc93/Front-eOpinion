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

  getUserByToken(token): Observable<any> {
    console.log("token en servicio ", token)
    this.token = token;
    let headers = new HttpHeaders({'Authorization': 'Token ' + token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/self', {'headers': headers});
  }

  getAsableistasXEvento(idEvento): Observable<any> {
    console.log("token en servicio ", this.token)
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/' + idEvento, {'headers': headers});
  }


  crearAsambleistas(form, idEvento): Observable<any> {
    const formData = new FormData();
    formData.append('documento_excel', form.get('documento_excel').value);
    console.log("token en servicio ", form.get('documento_excel').value)
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/actualizar/' + idEvento, formData, {'headers': headers});
  }

  persistirAsambleistas(idEvento): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/new_asam/' + idEvento, {'headers': headers});
  }

  crearPoder(file): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados/nuevo', file, {'headers': headers});
  }


}

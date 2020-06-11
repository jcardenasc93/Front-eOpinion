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

  getUserByToken2(): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/self', {'headers': headers});
  }


  createSingleAsambleista(form): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/asambleistas/nuevo', form, {'headers': headers});
  }

  updateSingleAsambleista(form, idAsambleistas): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/actualizar/' + idAsambleistas, form, {'headers': headers});
  }

  updateSingleAsambleistaP(form, idAsambleistas): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/actualizar/' + idAsambleistas, {propietario:form}, {'headers': headers});
  }

  deleteAsambleista(idAsambleistas): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/asambleistas/eliminar/' + idAsambleistas, {}, {'headers': headers});
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
    console.log('exclel', form.get('documento_excel').value)
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/actualizar/' + idEvento, formData, {'headers': headers});

  }

  persistirAsambleistas(idEvento): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/new_asam/' + idEvento, {'headers': headers});
  }

  crearPoder(file, evento): Observable<any> {
    console.log("evento", evento)
    const formData = new FormData();
    console.log('poder maximo xdxd', file)
    formData.append('documento_poder', file);
    formData.append('evento', evento);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados/nuevo/', formData, {
      'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }

  getPoderXusuario(): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados/', {'headers': headers});
  }

  getPoderXAsamblea(idAsmablea): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados/'+idAsmablea, {'headers': headers});
  }

  getPoderesXEvento(idEvento): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados/' + idEvento, {'headers': headers});
  }

  getUserById(idUser): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleista/' + idUser, {'headers': headers});
  }


  aprobarPoder(representa, evento, idPoder) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderado/actualizar/' + idPoder, {
      validado: true,
      representa_a: representa,
      evento: evento,
    }, {'headers': headers});
  }

  adesasociarPoder(idPoder, evento) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderado/actualizar/' + idPoder, {
      validado: false,
      evento: evento,
    }, {'headers': headers});
  }

  setPoderNull(idPoder, evento) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderado/actualizar/' + idPoder, {
      validado: false,
      representa_a: null,
      evento: evento,
    }, {'headers': headers});
  }


  calculoCoeficientes(idAsambleista) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'usuarios/api/v1/asambleistas/caclulo_coeficientes/' + idAsambleista, {}, {'headers': headers});
  }

  borrarPoder(idPoder) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.delete(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderado/eliminar/' + idPoder, {'headers': headers});
  }

  sendInviteEmail(idPersona) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/reenviar_correo/' + idPersona, {'headers': headers});
  }

  validateAopderado(): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'usuarios/api/v1/asambleistas/apoderados_self', {'headers': headers});
  }

}

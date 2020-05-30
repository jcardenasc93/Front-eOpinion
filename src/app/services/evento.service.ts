import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  token = sessionStorage.getItem('token');
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) {
  }

  updateEvento(idEvento, form: any): Observable<any> {
    const formData = new FormData();
    formData.append('id', idEvento);
    formData.append('fecha', form.get('fecha').value);
    formData.append('bodyCorreo', form.get('bodyCorreo').value);
    formData.append('linkEvento', form.get('link').value);
    formData.append('nombre', form.get('nombre').value);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/actualizar/' + idEvento, formData,{'headers': headers});
  }


  getEventoXId(idEvento): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/' + idEvento, {'headers': headers});
  }

  getEventos(): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/', {'headers': headers});
  }

  crearEvento(form: any) {
    const formData = new FormData();
    formData.append('nombre', form.get('nombre').value);
    formData.append('fecha', form.get('fecha').value);
    formData.append('bodyCorreo', form.get('correo').value);
    formData.append('linkEvento', form.get('link').value)
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/nuevo', formData, {
      'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }

  borrarEvento(idEvento: number) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/eliminar/' + idEvento, {}, {'headers': headers});
  }


}

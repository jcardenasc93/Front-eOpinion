import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  token = sessionStorage.getItem('token');
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) {
  }

  getPreguntaAbierta(idEvento): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/evento/' + idEvento, {'headers': headers});
  }

  getPreguntaMultiple(idEvento): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/evento/' + idEvento, {'headers': headers});
  }

  getPreguntaAbiertaDecimal(idEvento): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_decimal/evento/' + idEvento, {'headers': headers});
  }

  createPreguntaAbierta(form: any, idEvento) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    console.log('idEvento', idEvento);
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/nuevo',
      {enunciado: form.get('enunciado').value, evento: idEvento, activa: false}, {'headers': headers});
  }

  createPreguntaMultiple(form: any) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/nuevo', form, {'headers': headers});
  }

  createPreguntaDecimal(form: any) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_decimal/nuevo', form, {'headers': headers});
  }

  deletePreguntaAbierta(idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/eliminar/' + idPregunta, {}, {'headers': headers});

  }

  deletePreguntaMultiple(idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/eliminar/' + idPregunta, {}, {'headers': headers});


  }

  deletePreguntaDecimal(idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_decimal/eliminar/' + idPregunta, {}, {'headers': headers});
  }

  editPreguntaAbierta(form, idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/actualizar/' + idPregunta, form, {'headers': headers});
  }

  editPreguntaAbiertaNumero(form, idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_decimal/actualizar/' + idPregunta, form, {'headers': headers});
  }

  editPreguntaMultiple(form, idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/actualizar/' + idPregunta, form, {'headers': headers});
  }


}

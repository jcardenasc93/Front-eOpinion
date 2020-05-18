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
    console.log('idEvento',idEvento);
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/nuevo',
      {enunciado: form.get('enunciado').value, evento: idEvento, activa: false}, {'headers': headers});
  }

    createPreguntaMultiple(form: any) {
    /*
    const formData = new FormData();
    console.log('opciones',form.get('opciones').value)
      console.log('enunciado',form.get('enunciado').value)
      console.log('esMultipleResp',form.get('esMultipleResp').value)
      console.log('numeroDeIntentos',form.get('numeroDeIntentos').value)
      console.log('esNominal',form.get('esNominal').value)

    formData.append('enunciado', form.get('enunciado').value);
    formData.append('opiciones', form.get('opciones').value);
    formData.append('esMultipleResp', form.get('esMultipleResp').value);
    formData.append('respuestasPermitidas', form.get('numeroDeIntentos').value);
    formData.append('puntajeCoeficiente', form.get('esNominal').value);
    formData.append('activa', form.get('activa').value);
    formData.append('evento', form.get('evento').value);
*/

    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/nuevo', form, {'headers': headers});
  }


}

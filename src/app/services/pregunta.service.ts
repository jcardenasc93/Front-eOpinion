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

  createPreguntaAbierta(form: any) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/nuevo', form, {'headers': headers});
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

  bloqueaMoraPreguntaMultiple(mora, idPregunta) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/actualizar/' + idPregunta, {bloquea_mora: mora}, {'headers': headers});
  }

  saveMultipleRespuesta(arreglo, idPregunta) {
    console.log('pregunta', idPregunta);
    console.log('arreglo', arreglo);
    let cars = [1, 2, 3];
    const formData = new FormData();
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'respuestas/api/v1/respuesta/op_multiple/nuevo/', {
      pregunta: idPregunta,
      opciones: arreglo
    }, {'headers': headers});
  }

  saveRespuestaAbierta(respuesta, idPregunta) {

    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'respuestas/api/v1/respuesta/abierta/nuevo/', {
      pregunta: idPregunta,
      respuesta_texto: respuesta
    }, {'headers': headers});
  }

  saveRespuestaDecimal(respuesta, idPregunta) {
    const respuestaFloat = parseFloat(respuesta);
    console.log('idpregunta', idPregunta);
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'respuestas/api/v1/respuesta/decimal/nuevo/', {
      pregunta: idPregunta,
      respuesta_decimal: respuestaFloat
    }, {'headers': headers});
  }


  activarMultiple(idPregunta, activa) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_multiple/actualizar/' + idPregunta, {activa: activa}, {'headers': headers});
  }

  activarAbierta(idPregunta, activa) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_abierta/actualizar/' + idPregunta, {activa: activa}, {'headers': headers});
  }

  activarDecimal(idPregunta, activa) {
    const headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/pregunta_decimal/actualizar/' + idPregunta, {activa: activa}, {'headers': headers});
  }

  guardarQuorum(idEvento: number) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/quorum_asambleista/' + idEvento, {'headers': headers});
  }

  habilitarQuorum(idEvento: number) {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/quorum_status/' + idEvento, {'headers': headers});
  }

  resetQuorum(idEvento: number) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/quorum_reset/' + idEvento, {'headers': headers});
  }

  guardarQuorumTotal(idEvento: number) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/quorum_nuevo', {evento: idEvento}, {'headers': headers});
  }

  resetearPreguntaDecimal(idPregunta: number) {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.delete(this.URL_HOST + 'respuestas/api/v1/respuesta/decimal/reset/' + idPregunta, {'headers': headers});
  }

  resetearPreguntaAbierta(idPregunta: number) {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.delete(this.URL_HOST + 'respuestas/api/v1/respuesta/abierta/reset/' + idPregunta, {'headers': headers});
  }

  resetearPreguntaMultiple(idPregunta: number) {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.delete(this.URL_HOST + 'respuestas/api/v1/respuesta/op_multiple/reset/' + idPregunta, {'headers': headers});
  }

  getRespuestas(idPregunta: number): Observable<any> {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'respuestas/api/v1/respuesta/op_multiple/' + idPregunta, {'headers': headers});
  }

  getRespuestasAbiertas(idPregunta: number): Observable<any> {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'respuestas/api/v1/respuesta/abierta/' + idPregunta, {'headers': headers});
  }

    getRespuestasDecimales(idPregunta: number): Observable<any> {
    console.log('entro a actuliazr')
    let headers = new HttpHeaders({'Authorization': 'Token ' + '19ab845c3087581a222af7346376e4e0db927735'});
    return this.http.get(this.URL_HOST + 'respuestas/api/v1/respuesta/decimal/' + idPregunta, {'headers': headers});
  }


  getQuorumXEvento(idEvento): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/quorum/' + idEvento, {'headers': headers});
  }


}

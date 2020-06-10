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
    if (form.get('nombre').value != 'cristianoRonaldo') {
      formData.append('nombre', form.get('nombre').value);
    }


    if (form.get('bodyCorreo').value != 'cristianoRonaldo') {
      formData.append('bodyCorreo', form.get('bodyCorreo').value);
    }
    if (form.get('link_conferencia').value != 'cristianoRonaldo') {
      formData.append('link_conferencia', form.get('link_conferencia').value);
    }
    if (form.get('logo_asamblea').value != 'cristianoRonaldo') {
      formData.append('logo_asamblea', form.get('logo_asamblea').value);
    }
    if (form.get('codConferencia').value != 'cristianoRonaldo') {
      formData.append('codConferencia', form.get('codConferencia').value);
    }
        formData.append('fecha', form.get('fecha').value);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'eventos/api/v1/eventos/actualizar/' + idEvento, formData, {'headers': headers});
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
    formData.append('bodyCorreo', form.get('bodyCorreo').value);
    formData.append('link_conferencia', form.get('link_conferencia').value);
    formData.append('logo_asamblea', form.get('logo_asamblea').value);
    formData.append('linkEvento', form.get('linkEvento').value);
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

  saveFiles(evento, documento): Observable<any> {
    const formData = new FormData();
    formData.append('evento', evento);
    formData.append('nombre', documento.name);
    formData.append('documento', documento);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'eventos/api/v1/eventos/documento_nuevo', formData, {
      'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }

  getFiles(idEvento: number): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'eventos/api/v1/eventos/documentos/' + idEvento, {'headers': headers});
  }

  deleteFile(idEvento) {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.delete(this.URL_HOST + 'eventos/api/v1/eventos/eliminar_documento/' + idEvento, {'headers': headers});
  }
}

import {Component, OnInit} from '@angular/core';
import {PreguntaMultipleComponent} from "../../admin/pregunta/pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";
import {CargaPoderesComponent} from "../carga-poderes/carga-poderes.component";
import {UsuariosService} from "../../services/usuarios.service";
import {PreguntaService} from "../../services/pregunta.service";
import {ActivatedRoute} from "@angular/router";
import {RespuestaMultipleComponent} from "../Respuestas/respuesta-multiple/respuesta-multiple.component";
import {RespuestaAbiertaComponent} from "../Respuestas/respuesta-abierta/respuesta-abierta.component";
import {RespuestaDecimalComponent} from "../Respuestas/respuesta-decimal/respuesta-decimal.component";
import Swal from "sweetalert2";

class PreguntaMultiple {
  enunciado: any;
  activa: any;
  respuestasPermitidas: any;
  opciones: [];
  id: any;
  strictMax: any;
  numeracion: any;
  time_final: any;
}



@Component({
  selector: 'app-home-asambleista',
  templateUrl: './home-asambleista.component.html',
  styleUrls: ['./home-asambleista.component.css']
})
export class HomeAsambleistaComponent implements OnInit {

  constructor(public dialog: MatDialog, public authService: UsuariosService, private preguntaService: PreguntaService,
              private route: ActivatedRoute) {
  }
  public nombres = [];
  public idEvento
  public usuario: any;
  public pMultiple;
  public pAbierta;
  public pDecimal;
  pMultiples: Array<PreguntaMultiple> = [];

  ngOnInit(): void {
    this.idEvento = this.route.snapshot.paramMap.get('idEvento');
    this.getInfoAsambleista();
    this.getPreguntasMultiples();
    this.getPreguntasAbiertas();
    this.getPreguntasDecimal();
    this.getPoderes();
  }

  openPoderesModal(): void {
    this.dialog.open(CargaPoderesComponent, {
      width: '70%',
    });
  }


  getPreguntasAbiertas() {
    this.preguntaService.getPreguntaAbierta(this.idEvento).subscribe(data => {
      this.pAbierta = [];

      data.pregunta_abierta.forEach(dataItem => {
        if (dataItem.activa == true) {
          this.pAbierta.push(dataItem);
        }
      });
    }, error => {
      console.log('Error trayendo pregunta abierta', error);
    });
  }

  getPreguntasDecimal() {
    this.preguntaService.getPreguntaAbiertaDecimal(this.idEvento).subscribe(data => {

      this.pDecimal = [];

      data.pregunta_decimal.forEach(dataItem => {
        if (dataItem.activa == true) {
          this.pDecimal.push(dataItem);
        }
      });
    }, error => {
      console.log('Error trayendo pregunta abierta', error);
    });
  }

  getInfoAsambleista() {
    this.authService.getUserByToken(sessionStorage.getItem('token')).subscribe(datas => {
      this.usuario = datas[0];
      console.log('usuario data', this.usuario);
    }, error => {
      console.log('Error login redir-> ', error);

    });
  }

  getPoderes() {
    this.authService.getPoderXusuario().subscribe(data => {
      this.authService.getAsableistasXEvento(this.idEvento).subscribe(datas => {
        let j;
        let k;
        const asableistas = datas.asambleistas;
        const poderes = data.apoderados;
        for (j = 0; j < asableistas.length; j++) {
           for (k = 0; k < poderes.length; k++) {
             if (asableistas[j].id == poderes[k].representado_por) {
               this.nombres.push(asableistas[j].inmueble)
             }
           }
        }

      }, error => {
        console.log('Error login redir-> ', error);
      });
    }, error => {
      console.log('Error login redir-> ', error);
    });
  }

  getPreguntasMultiples() {
    this.preguntaService.getPreguntaMultiple(this.idEvento).subscribe(data => {
      console.log('p multiples', data)
      data.pregunta_multiple.forEach(dataItem => {
        if (dataItem.activa == true) {
          const pMultiple = new PreguntaMultiple();
          pMultiple.id = dataItem.id;
          pMultiple.enunciado = dataItem.enunciado;
          pMultiple.opciones = dataItem.opciones;
          pMultiple.respuestasPermitidas = dataItem.respuestasPermitidas;
          pMultiple.strictMax = dataItem.strictMax;
          pMultiple.numeracion = dataItem.numeracion;
          pMultiple.time_final = dataItem.time_final;
          this.pMultiples.push(pMultiple);
        }
      });

    }, error => {
      console.log('Error trayendo pregunta multiple', error);
    });
  }

  gotoPreguntaMultiple(preguntaMultiple): void {
    this.dialog.open(RespuestaMultipleComponent, {
      width: '70%',
      data: {
        preguntaMultiple: preguntaMultiple,
      }
    });
  }

  gotoPreguntaAbuerta(preguntaAbierta): void {
    this.dialog.open(RespuestaAbiertaComponent, {
      width: '70%',
      data: {
        preguntaAbierta: preguntaAbierta,
      }
    });
  }

  gotoPreguntaDecimal(preguntaDecimal): void {
    this.dialog.open(RespuestaDecimalComponent, {
      width: '70%',
      data: {
        preguntaDecimal: preguntaDecimal,
      }
    });
  }

  refreshPreguntas() {
window.location.reload();
  }

  marcarQuorum() {
    this.preguntaService.guardarQuorum(this.idEvento).subscribe(data => {
      Swal.fire('Success!', 'Quorum registrado', 'success');
    }, error => {
      Swal.fire('error!', error.error.detail, 'error');
      console.log('Error registrando el QORO', error);
    });
  }
}

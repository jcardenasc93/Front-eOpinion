import {Component, OnInit} from '@angular/core';
import {PreguntaMultipleComponent} from "../pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";
import {PreguntaAbiertaComponent} from "../pregunta-abierta/pregunta-abierta.component";
import {EventoService} from "../../../services/evento.service";
import {PreguntaService} from "../../../services/pregunta.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {PreguntaAbiertaNumeroComponent} from "../pregunta-abierta-numero/pregunta-abierta-numero.component";
import {EditarEventoComponent} from "../../evento/editar-evento/editar-evento.component";
import {EditPreguntaAbiertaComponent} from "../edit-pregunta-abierta/edit-pregunta-abierta.component";
import {EditPreguntaAbiertaNumeroComponent} from "../edit-pregunta-abierta-numero/edit-pregunta-abierta-numero.component";
import {EditPreguntaMultipleComponent} from "../edit-pregunta-multiple/edit-pregunta-multiple.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuorumGraphComponent} from "../../../quorum-graph/quorum-graph.component";
import {ResultadosComponent} from "../../../resultados/resultados.component";
import {UsuariosService} from "../../../services/usuarios.service";
import {ExcelServiceService} from "../../../services/excel-service.service";


class Enum {
  id: any;
  coeficiente: any;
  opcion: any;
  index: any;
  votos: any;
  porcentaje: number;
  pregunta: any;
}


class RespAbierta {
  inmueble: any;
  pregunta: any;
  respuesta: any;
}

@Component({
  selector: 'app-admin-pregunta',
  templateUrl: './admin-pregunta.component.html',
  styleUrls: ['./admin-pregunta.component.css']
})
export class AdminPreguntaComponent implements OnInit {
  public coeficientes = [];
  private totalasambleistas = 0;
  private votos = [];
  public opciones: Array<Enum> = [];
  public opcionesTotal: Array<Enum> = [];
  public respAbiertas: Array<RespAbierta> = [];
  selected: number;
  private idEvent;
  public pAbierta;
  public pMultiple;
  public pAbiertaDec;
  public nomEvent;
  public formGroup: FormGroup;
  isChecked = false;
  private respDecimal: Array<RespAbierta> = [];


  constructor(private formBuilder: FormBuilder,
              private eventoService: EventoService, private route: ActivatedRoute,
              public dialog: MatDialog, private preguntaService: PreguntaService,
              private userService: UsuariosService,
              private excelService: ExcelServiceService) {

  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvento');
    this.getPreguntasAbiertas();
    this.getPreguntasMultiples();
    this.getPreguntasAbiertasDecimal();
    this.getEventoName();
  }


  getEventoName() {
    this.eventoService.getEventoXId(this.idEvent).subscribe(data => {
      console.log(data)
      this.nomEvent = data.evento.nombre;
      this.isChecked = data.evento.regitroQuorum;
    }, error => {
      console.log('Error login-> ', error);
    });
  }

  getPreguntasAbiertas() {
    this.preguntaService.getPreguntaAbierta(this.idEvent).subscribe(data => {
      this.pAbierta = data.pregunta_abierta;
      console.log('preguntas abiertas', data.pregunta_abierta);
    }, error => {
      console.log('Error login-> ', error);
    });
  }

  getPreguntasMultiples() {
    this.preguntaService.getPreguntaMultiple(this.idEvent).subscribe(data => {
      this.pMultiple = data.pregunta_multiple;
      console.log('preguntas multiples', data.pregunta_multiple);
    }, error => {
      console.log('Error login-> ', error);
    });
  }

  getPreguntasAbiertasDecimal() {
    this.preguntaService.getPreguntaAbiertaDecimal(this.idEvent).subscribe(data => {
      this.pAbiertaDec = data.pregunta_decimal;
      console.log('preguntas abiertas decimal', data.pregunta_decimal);
    }, error => {
      console.log('Error login-> ', error);
    });
  }


  openPregunta(tipoPregunta): void {
    if (tipoPregunta == 4) {
      this.openPreguntaMultipleModal();
    }
    if (tipoPregunta == 1) {
      this.openPreguntaAbiertaModal();
    }
    if (tipoPregunta == 2) {
      this.openPreguntaNumeroModal();
    }
  }


  openPreguntaMultipleModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaMultipleComponent, {
      width: '70%',
      data: {
        idEvento: this.idEvent,
      }
    });
  }


  openPreguntaAbiertaModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaAbiertaComponent, {
      width: '70%',
      data: {
        idEvento: this.idEvent,
      }
    });
  }

  openPreguntaNumeroModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaAbiertaNumeroComponent, {
      width: '70%',
      data: {
        idEvento: this.idEvent,
      }
    });
  }

  borrarPreguntaAbierta(idPregunta) {
    if (confirm('Esta seguro de eliminar esta pregunta?')) {
      this.preguntaService.deletePreguntaAbierta(idPregunta).subscribe(data => {
        Swal.fire('Success!', 'Pregunta borrada satisfactiriamente', 'success');
        window.location.reload();
      }, error => {
        console.log('Error login-> ', error);
      });
    }

  }

  borrarPreguntaMultiple(idPregunta) {
    if (confirm('Esta seguro de eliminar esta pregunta?')) {
      this.preguntaService.deletePreguntaMultiple(idPregunta).subscribe(data => {
        Swal.fire('Success!', 'Pregunta borrada satisfactiriamente', 'success');
        window.location.reload();
      }, error => {
        console.log('Error login-> ', error);
      });

    }
  }

  borrarPreguntaDecimal(idPregunta) {
    if (confirm('Esta seguro de eliminar esta pregunta?')) {

      this.preguntaService.deletePreguntaDecimal(idPregunta).subscribe(data => {
        Swal.fire('Success!', 'Pregunta borrada satisfactiriamente', 'success');
        window.location.reload();
      }, error => {
        console.log('Error login-> ', error);
      });
    }
  }

  editarPreguntaAbierta(idPregunta, enunciado, timer): void {
    const dialogRef = this.dialog.open(EditPreguntaAbiertaComponent, {
      width: '70%',
      data: {
        idPregunta: idPregunta,
        enunciado: enunciado,
        timer: timer
      }
    });
  }


  editarPreguntaAbiertaDecimal(Pregunta): void {
    const dialogRef = this.dialog.open(EditPreguntaAbiertaNumeroComponent, {
      width: '70%',
      data: {
        pregunta: Pregunta,
      }
    });
  }

  editarPreguntaMultiple(pregunta): void {
    const dialogRef = this.dialog.open(EditPreguntaMultipleComponent, {
      width: '70%',
      data: {
        pregunta: pregunta,
      }
    });
  }

  changeActivarMultiple(contenidoInt: any) {
    const activa = !contenidoInt.activa
    this.preguntaService.activarMultiple(contenidoInt.id, activa).subscribe(data => {
      console.log('polaridad', data);
      this.getPreguntasMultiples();
    }, error => {
      console.log('Error activa-> ', error);
    });
  }

  changeActivarAbierta(contenidoInt: any) {
    const activa = !contenidoInt.activa
    this.preguntaService.activarAbierta(contenidoInt.id, activa).subscribe(data => {
      console.log('polaridad', data);
      this.getPreguntasAbiertas();
    }, error => {
      console.log('Error activa-> ', error);
    });
  }

  changeActivarDecimal(contenidoInt: any) {
    const activa = !contenidoInt.activa
    this.preguntaService.activarDecimal(contenidoInt.id, activa).subscribe(data => {
      console.log('polaridad', data);
      this.getPreguntasAbiertasDecimal();
    }, error => {
      console.log('Error activa-> ', error);
    });
  }


  changeQuorumStatus() {
    this.preguntaService.habilitarQuorum(this.idEvent).subscribe(data => {
      console.log('estad', data);
      Swal.fire('Success!', 'Quorum status updated', 'success');
    }, error => {
      console.log('Error activa-> ', error.error);
    });
  }

  restablecerDecimal(id: any) {

    console.log('Error activa-> ', 'sdsdsdds');
    this.preguntaService.resetearPreguntaDecimal(id).subscribe(data => {
      console.log('Error activa-> ', 'sdsdsdds');
      Swal.fire('Success!', 'Respuestas reestablecidas con éxito', 'success');
    }, error => {
      console.log('Error activa-> ', error.error);
    });
  }

  restablecerAbierto(id: any) {
    this.preguntaService.resetearPreguntaDecimal(id).subscribe(data => {
      Swal.fire('Success!', 'Respuestas reestablecidas con éxito', 'success');
    }, error => {
      console.log('Error activa-> ', error.error);
    });
  }

  restablecerMultiple(id: any) {
    this.preguntaService.resetearPreguntaMultiple(id).subscribe(data => {
      Swal.fire('Success!', 'Respuestas reestablecidas con éxito', 'success');
    }, error => {
      console.log('Error activa-> ', error.error);
    });
  }

  guardarQoro() {
    this.preguntaService.guardarQuorumTotal(this.idEvent).subscribe(data => {
      this.preguntaService.resetQuorum(this.idEvent).subscribe(datax => {
        Swal.fire('Success!', 'Quorum Guardado con exito', 'success');
      }, error => {
        console.log('Error Quroro-> ', error);
      });
    }, error => {
      console.log('Error Quroro-> ', error.error);
    });

  }

  gotoVerQuoro() {
    const dialogRef = this.dialog.open(QuorumGraphComponent, {
      width: '90%',
      data: {
        idEvent: this.idEvent
      }
    });
  }

  gotoResultados(contenidoInt) {

    this.dialog.open(ResultadosComponent, {
      width: '70%',

      data: {
        pregunta: contenidoInt,
        idEvento: this.idEvent
      }
    });
  }

  bloqueaMora(idPregunta, bloqueaMora) {
    console.log('LA mora a 1000', !bloqueaMora);
    this.preguntaService.bloqueaMoraPreguntaMultiple(!bloqueaMora, idPregunta).subscribe(data => {
      Swal.fire('Success!', 'Mora actualizada con exito', 'success');
    }, error => {
      console.log('Error Quroro-> ', error.error);
    });
  }

  getCoeficienteXrespuesta() {
    this.userService.getAsableistasXEvento(this.idEvent).subscribe(datax => {
        this.totalasambleistas = datax.asambleistas.length;
        console.log('9perros', this.pMultiple);
        this.pMultiple.forEach(dataItem => {
          this.preguntaService.getRespuestas(dataItem.id).subscribe(data => {
              let cont = 1;
              dataItem.opciones.forEach(dataItems => {
                const opcion = new Enum();
                opcion.index = cont;
                opcion.id = dataItems.id;
                opcion.opcion = dataItems.opcion;
                opcion.pregunta = dataItem.enunciado;
                opcion.votos = 0;
                opcion.coeficiente = 0;
                opcion.porcentaje = 0;
                this.opciones.push(opcion);
                cont++;
              });
              console.log('respuestas', data)
              // console.log('pregunta', this.data.pregunta)
              // console.log('opciones respondidas', data[1].opciones)
              let i = 0;
              for (i; i < this.opciones.length; i++) {
                let j = 0;
                for (j; j < data.length; j++) {
                  let k = 0;
                  for (k; k < data[j].opciones.length; k++) {
                    if (this.opciones[i].id == data[j].opciones[k]) {
                      this.opciones[i].coeficiente = this.opciones[i].coeficiente + parseFloat(data[j].coeficientes);
                      this.opciones[i].votos = this.opciones[i].votos + data[j].votos;
                      this.opciones[i].porcentaje = this.opciones[i].votos / this.totalasambleistas * 100;
                    }
                  }
                }
              }

              let coeficienteVotado = 0;
              let votosTotales = 0;
              this.opciones.forEach(dataItemx => {
                coeficienteVotado = coeficienteVotado + dataItemx.coeficiente;
                votosTotales = votosTotales + dataItemx.votos;
                this.votos.push(dataItemx.votos);
                this.coeficientes.push(dataItemx.coeficiente);
              });

              console.log('vootsso', this.totalasambleistas);

              const opcion2 = new Enum();
              opcion2.index = 'NS/NR';
              opcion2.opcion = 'NS/NR';
              opcion2.coeficiente = 100 - coeficienteVotado;
              opcion2.votos = this.totalasambleistas - votosTotales;
              opcion2.porcentaje = opcion2.votos / this.totalasambleistas * 100;
              this.opciones.push(opcion2);
              this.coeficientes.push(opcion2.coeficiente);
              this.votos.push(opcion2.votos);

              //this.dataSource = this.opciones;
              this.opciones.forEach(dataItemz => {
                this.opcionesTotal.push(dataItemz);
              });
              this.opciones = [];
              console.log('coeficientes ', this.opcionesTotal);

            },
            error => {
              console.log('Error trayendo pregunta multiple');
            }
          );

        });


      }
      ,
      error => {
        console.log('Error trayendo pregunta multiple');
      }
    );
    this.excelService.exportAsExcelFile(this.opcionesTotal, 'resumen de respuestas');

  }

  getMulipleResXrespuesta() {
    this.userService.getAsableistasXEvento(this.idEvent).subscribe(datax => {
        this.totalasambleistas = datax.asambleistas.length;
        console.log('9perros', this.pMultiple);
        this.pMultiple.forEach(dataItem => {
          this.preguntaService.getRespuestas(dataItem.id).subscribe(data => {
              let cont = 1;
              dataItem.opciones.forEach(dataItems => {
                const opcion = new Enum();
                opcion.index = cont;
                opcion.id = dataItems.id;
                opcion.opcion = dataItems.opcion;
                opcion.pregunta = dataItem.enunciado;
                opcion.votos = 0;
                opcion.coeficiente = 0;
                opcion.porcentaje = 0;
                this.opciones.push(opcion);
                cont++;
              });
              console.log('respuestas', data)
              // console.log('pregunta', this.data.pregunta)
              // console.log('opciones respondidas', data[1].opciones)
              let i = 0;
              for (i; i < this.opciones.length; i++) {
                let j = 0;
                for (j; j < data.length; j++) {
                  let k = 0;
                  for (k; k < data[j].opciones.length; k++) {
                    if (this.opciones[i].id == data[j].opciones[k]) {
                      this.opciones[i].coeficiente = this.opciones[i].coeficiente + parseFloat(data[j].coeficientes);
                      this.opciones[i].votos = this.opciones[i].votos + data[j].votos;
                      this.opciones[i].porcentaje = this.opciones[i].votos / this.totalasambleistas * 100;
                    }
                  }
                }
              }

              let coeficienteVotado = 0;
              let votosTotales = 0;
              this.opciones.forEach(dataItemx => {
                coeficienteVotado = coeficienteVotado + dataItemx.coeficiente;
                votosTotales = votosTotales + dataItemx.votos;
                this.votos.push(dataItemx.votos);
                this.coeficientes.push(dataItemx.coeficiente);
              });

              console.log('vootsso', this.totalasambleistas);

              const opcion2 = new Enum();
              opcion2.index = 'NS/NR';
              opcion2.opcion = 'NS/NR';
              opcion2.coeficiente = 100 - coeficienteVotado;
              opcion2.votos = this.totalasambleistas - votosTotales;
              opcion2.porcentaje = opcion2.votos / this.totalasambleistas * 100;
              this.opciones.push(opcion2);
              this.coeficientes.push(opcion2.coeficiente);
              this.votos.push(opcion2.votos);

              //this.dataSource = this.opciones;
              this.opciones.forEach(dataItemz => {
                this.opcionesTotal.push(dataItemz);
              });
              this.opciones = [];
              console.log('coeficientes ', this.opcionesTotal);

            },
            error => {
              console.log('Error trayendo pregunta multiple');
            }
          );

        });


      }
      ,
      error => {
        console.log('Error trayendo pregunta multiple');
      }
    );
    this.excelService.exportAsExcelFile(this.opcionesTotal, 'resumen de respuestas');

  }

  getAnswersByAsambleista() {
    this.userService.getAsableistasXEvento(this.idEvent).subscribe(datax => {
      console.log('asambleustas', datax.asambleistas);


      this.preguntaService.getPreguntaAbierta(this.idEvent).subscribe(pregunta => {
        pregunta.pregunta_abierta.forEach(dataItem => {
          this.preguntaService.getRespuestasAbiertas(dataItem.id).subscribe(repuestasXpregunta => {
            repuestasXpregunta.forEach(dataItemz => {
              const respuesta = new RespAbierta();
              datax.asambleistas.forEach(asambleista => {
                if (asambleista.id == dataItemz.asambleista) {
                  respuesta.inmueble = asambleista.inmueble;
                  respuesta.pregunta = dataItem.enunciado;
                  respuesta.respuesta = dataItemz.respuesta_texto;
                  this.respAbiertas.push(respuesta);
                  return;
                }

              });

            });
            const respuestaNull = new RespAbierta();
            respuestaNull.inmueble = '';
            respuestaNull.pregunta = '';
            respuestaNull.respuesta = '';
            this.respAbiertas.push(respuestaNull);

          }, error => {
            console.log('Error trayendo pregunta multiple');
          });

        });

        this.excelService.exportAsExcelFile(this.respAbiertas, 'Resumen de respuestas abiertas');
      }, error => {
        console.log('Error trayendo pregunta multiple');
      });

    }, error => {
      console.log('Error trayendo pregunta multiple');
    });

  }

  getAnswersDecimalByAsambleista() {
    this.userService.getAsableistasXEvento(this.idEvent).subscribe(datax => {
      console.log('asambleustas', datax.asambleistas);


      this.preguntaService.getPreguntaAbiertaDecimal(this.idEvent).subscribe(pregunta => {
        pregunta.pregunta_decimal.forEach(dataItem => {
          this.preguntaService.getRespuestasDecimales(dataItem.id).subscribe(repuestasXpregunta => {
            repuestasXpregunta.forEach(dataItemz => {
              const respuesta = new RespAbierta();
              datax.asambleistas.forEach(asambleista => {
                if (asambleista.id == dataItemz.asambleista) {
                  respuesta.inmueble = asambleista.inmueble;
                  respuesta.pregunta = dataItem.enunciado;
                  respuesta.respuesta = dataItemz.respuesta_decimal;
                  this.respDecimal.push(respuesta);
                  return;
                }

              });

            });
            const respuestaNull = new RespAbierta();
            respuestaNull.inmueble = '';
            respuestaNull.pregunta = '';
            respuestaNull.respuesta = '';
            this.respDecimal.push(respuestaNull);

          }, error => {
            console.log('Error trayendo pregunta multiple');
          });

        });


        this.excelService.exportAsExcelFile(this.respDecimal, 'Resumen de respuestas abiertas');
        this.respDecimal = [];
      }, error => {
        console.log('Error trayendo pregunta multiple');
      });

    }, error => {
      console.log('Error trayendo pregunta multiple');
    });

  }


}

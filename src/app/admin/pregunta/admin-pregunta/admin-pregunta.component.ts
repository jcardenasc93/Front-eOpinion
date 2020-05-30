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

@Component({
  selector: 'app-admin-pregunta',
  templateUrl: './admin-pregunta.component.html',
  styleUrls: ['./admin-pregunta.component.css']
})
export class AdminPreguntaComponent implements OnInit {
  selected: number;
  private idEvent;
  public pAbierta;
  public pMultiple;
  public pAbiertaDec;
  public nomEvent;
  public formGroup: FormGroup;
  isChecked = false;


  constructor(private formBuilder: FormBuilder,
              private eventoService: EventoService, private route: ActivatedRoute,
              public dialog: MatDialog, private preguntaService: PreguntaService) {

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
}

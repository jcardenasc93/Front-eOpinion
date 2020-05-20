import {Component, Inject, OnInit} from '@angular/core';
import {EditarEventoComponent} from "../../evento/editar-evento/editar-evento.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminPreguntaComponent} from "../../admin-pregunta/admin-pregunta.component";
import {EventoService} from "../../../services/evento.service";
import {PreguntaService} from "../../../services/pregunta.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-pregunta-abierta',
  templateUrl: './edit-pregunta-abierta.component.html',
  styleUrls: ['./edit-pregunta-abierta.component.css']
})
export class EditPreguntaAbiertaComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idPregunta, enunciado },
              public dialogRef: MatDialogRef<EditPreguntaAbiertaComponent>,
              private preguntaService: PreguntaService) {
  }

  ngOnInit(): void {
    this.getEvento();
  }

  getEvento(): void {
    this.registerForm = new FormGroup({
      enunciado: new FormControl('', [Validators.required]),
    });
    this.registerForm.get('enunciado').setValue(this.data.enunciado);
  }

  editEvent() {
    this.preguntaService.editPreguntaAbierta(this.registerForm.value,this.data.idPregunta ).subscribe(data => {
      Swal.fire('Success!', 'Pregunta editada satisfactiriamente', 'success');
    }, error => {
      console.log('Error trayendo evento', error);
    });

  }

  cancel() {

  }
}
